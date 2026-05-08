import { Response } from "express";
import { ExchangeService } from "../services/exchange.service";
import { AuthRequest, ok, fail } from "../types";

export const ExchangeController = {
  async createOffer(req: AuthRequest, res: Response): Promise<void> {
    try {
      const offer = await ExchangeService.createOffer({
        fromUserId: req.user!.id,
        ...req.body,
      });
      res.status(201).json(ok(offer));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },

  async getMyOffers(req: AuthRequest, res: Response): Promise<void> {
    try {
      const offers = await ExchangeService.getUserOffers(req.user!.id);
      res.json(ok(offers));
    } catch (err: any) {
      res.status(500).json(fail(err.message));
    }
  },

  async acceptOffer(req: AuthRequest, res: Response): Promise<void> {
    try {
      const offer = await ExchangeService.acceptOffer(req.params.id, req.user!.id);
      res.json(ok(offer));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },

  async rejectOffer(req: AuthRequest, res: Response): Promise<void> {
    try {
      const offer = await ExchangeService.rejectOffer(req.params.id, req.user!.id);
      res.json(ok(offer));
    } catch (err: any) {
      res.status(err.status ?? 500).json(fail(err.message));
    }
  },
};
