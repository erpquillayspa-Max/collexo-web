import { Response } from "express";
import { UserModel } from "../models/user.model";
import { StorageService } from "../services/storage.service";
import { AuthRequest, ok, fail } from "../types";
import { redis, CACHE_TTL } from "../config/redis";

export const UserController = {
  async getMe(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await UserModel.findById(req.user!.id);
      if (!user) { res.status(404).json(fail("User not found")); return; }
      const { password_hash, refresh_token_hash, ...safeUser } = user;
      res.json(ok(safeUser));
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },

  async getByUsername(req: AuthRequest, res: Response): Promise<void> {
    try {
      const cacheKey = `user:username:${req.params.username}`;
      const cached = await redis.get(cacheKey);
      if (cached) { res.json(ok(JSON.parse(cached))); return; }

      const user = await UserModel.findByUsername(req.params.username);
      if (!user) { res.status(404).json(fail("User not found")); return; }

      const publicUser = {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatar_url,
        country: user.country,
      };

      await redis.setex(cacheKey, CACHE_TTL.user, JSON.stringify(publicUser));
      res.json(ok(publicUser));
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },

  async uploadAvatar(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.file) { res.status(400).json(fail("No file provided")); return; }
      const avatarUrl = await StorageService.uploadAvatar(
        req.file.buffer,
        req.file.mimetype
      );
      await UserModel.updateAvatar(req.user!.id, avatarUrl);
      res.json(ok({ avatarUrl }));
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },
};
