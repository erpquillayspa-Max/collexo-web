import { db } from "../config/database";

export interface UserRow {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
  country: string;
  role: string;
  refresh_token_hash: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export const UserModel = {
  async findById(id: string): Promise<UserRow | null> {
    const { rows } = await db.query<UserRow>(
      "SELECT * FROM users WHERE id = $1 AND is_active = true",
      [id]
    );
    return rows[0] ?? null;
  },

  async findByEmail(email: string): Promise<UserRow | null> {
    const { rows } = await db.query<UserRow>(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return rows[0] ?? null;
  },

  async findByUsername(username: string): Promise<UserRow | null> {
    const { rows } = await db.query<UserRow>(
      "SELECT * FROM users WHERE username = $1 AND is_active = true",
      [username]
    );
    return rows[0] ?? null;
  },

  async create(params: {
    username: string;
    email: string;
    passwordHash: string;
    country: string;
  }): Promise<UserRow> {
    const { rows } = await db.query<UserRow>(
      `INSERT INTO users (username, email, password_hash, country)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [params.username, params.email, params.passwordHash, params.country]
    );
    return rows[0];
  },

  async updateRefreshToken(id: string, hash: string | null): Promise<void> {
    await db.query(
      "UPDATE users SET refresh_token_hash = $1, updated_at = NOW() WHERE id = $2",
      [hash, id]
    );
  },

  async updateAvatar(id: string, avatarUrl: string): Promise<void> {
    await db.query(
      "UPDATE users SET avatar_url = $1, updated_at = NOW() WHERE id = $2",
      [avatarUrl, id]
    );
  },
};
