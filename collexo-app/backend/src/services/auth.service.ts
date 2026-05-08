import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../models/user.model";
import { redis, CACHE_TTL } from "../config/redis";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";

const SALT_ROUNDS = 12;

export const AuthService = {
  async register(params: {
    username: string;
    email: string;
    password: string;
    country: string;
  }) {
    const existing = await UserModel.findByEmail(params.email);
    if (existing) throw Object.assign(new Error("Email already in use"), { status: 409 });

    const usernameTaken = await UserModel.findByUsername(params.username);
    if (usernameTaken) throw Object.assign(new Error("Username already taken"), { status: 409 });

    const passwordHash = await bcrypt.hash(params.password, SALT_ROUNDS);
    const user = await UserModel.create({ ...params, passwordHash });

    return issueTokens(user.id, user.role);
  },

  async login(email: string, password: string) {
    const user = await UserModel.findByEmail(email);
    if (!user || !user.is_active)
      throw Object.assign(new Error("Invalid credentials"), { status: 401 });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      throw Object.assign(new Error("Invalid credentials"), { status: 401 });

    return issueTokens(user.id, user.role);
  },

  async refresh(token: string) {
    let payload: { sub: string; jti: string };
    try {
      payload = verifyRefreshToken(token);
    } catch {
      throw Object.assign(new Error("Invalid refresh token"), { status: 401 });
    }

    const blacklisted = await redis.get(`rt:blacklist:${payload.jti}`);
    if (blacklisted)
      throw Object.assign(new Error("Token already used"), { status: 401 });

    await redis.setex(`rt:blacklist:${payload.jti}`, CACHE_TTL.session, "1");

    const user = await UserModel.findById(payload.sub);
    if (!user)
      throw Object.assign(new Error("User not found"), { status: 401 });

    return issueTokens(user.id, user.role);
  },

  async logout(userId: string): Promise<void> {
    await UserModel.updateRefreshToken(userId, null);
  },
};

async function issueTokens(userId: string, role: string) {
  const jti = uuidv4();
  const accessToken = signAccessToken({ sub: userId, role });
  const refreshToken = signRefreshToken({ sub: userId, jti });
  const refreshHash = await bcrypt.hash(refreshToken, 8);
  await UserModel.updateRefreshToken(userId, refreshHash);
  return { accessToken, refreshToken };
}
