import { Response } from "express";
import { StickerService } from "../services/sticker.service";
import { AuthRequest, ok, fail } from "../types";

export const StickerController = {
  async getAllTemplates(_req: AuthRequest, res: Response): Promise<void> {
    try {
      const templates = await StickerService.getAllTemplates();
      res.json(ok(templates));
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },

  async getUserAlbum(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.userId ?? req.user!.id;
      const album = await StickerService.getUserAlbum(userId);
      res.json(ok(album));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },

  async getMyAlbum(req: AuthRequest, res: Response): Promise<void> {
    try {
      const album = await StickerService.getUserAlbum(req.user!.id);
      res.json(ok(album));
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },
};
