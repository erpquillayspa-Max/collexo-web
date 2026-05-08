import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthRequest, ok, fail } from "../types";

export const AuthController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const tokens = await AuthService.register(req.body);
      res.status(201).json(ok(tokens));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const tokens = await AuthService.login(req.body.email, req.body.password);
      res.json(ok(tokens));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const tokens = await AuthService.refresh(req.body.refreshToken);
      res.json(ok(tokens));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },

  async logout(req: AuthRequest, res: Response): Promise<void> {
    try {
      await AuthService.logout(req.user!.id);
      res.json(ok(null));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },
};
