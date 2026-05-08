import { db } from "../config/database";
import { ExchangeModel } from "../models/exchange.model";
import { StickerModel } from "../models/sticker.model";
import { StickerService } from "./sticker.service";

const OFFER_TTL_DAYS = 7;

export const ExchangeService = {
  async createOffer(params: {
    fromUserId: string;
    toUserId: string;
    type: string;
    offeredStickerIds: string[];
    requestedStickerIds: string[];
    priceAmount?: number;
    priceCurrency?: string;
    message?: string;
  }) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + OFFER_TTL_DAYS);
    return ExchangeModel.create({ ...params, expiresAt });
  },

  async acceptOffer(offerId: string, userId: string) {
    const offer = await ExchangeModel.findById(offerId);
    if (!offer) throw Object.assign(new Error("Offer not found"), { status: 404 });
    if (offer.to_user_id !== userId)
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    if (offer.status !== "pending")
      throw Object.assign(new Error("Offer is no longer pending"), { status: 409 });

    const client = await db.connect();
    try {
      await client.query("BEGIN");

      for (const stickerTemplateId of offer.offered_sticker_ids) {
        await StickerModel.decrementQuantity(offer.from_user_id, stickerTemplateId);
        await StickerModel.upsertUserSticker(offer.to_user_id, stickerTemplateId);
      }

      for (const stickerTemplateId of offer.requested_sticker_ids) {
        await StickerModel.decrementQuantity(offer.to_user_id, stickerTemplateId);
        await StickerModel.upsertUserSticker(offer.from_user_id, stickerTemplateId);
      }

      await ExchangeModel.updateStatus(offerId, "completed");
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    await Promise.all([
      StickerService.invalidateAlbumCache(offer.from_user_id),
      StickerService.invalidateAlbumCache(offer.to_user_id),
    ]);

    return ExchangeModel.findById(offerId);
  },

  async rejectOffer(offerId: string, userId: string) {
    const offer = await ExchangeModel.findById(offerId);
    if (!offer) throw Object.assign(new Error("Offer not found"), { status: 404 });
    if (offer.to_user_id !== userId && offer.from_user_id !== userId)
      throw Object.assign(new Error("Forbidden"), { status: 403 });
    if (offer.status !== "pending")
      throw Object.assign(new Error("Offer is no longer pending"), { status: 409 });

    return ExchangeModel.updateStatus(offerId, "rejected");
  },

  async getUserOffers(userId: string) {
    return ExchangeModel.findByUser(userId);
  },
};
