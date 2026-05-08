import { db } from "../config/database";

export interface ExchangeOfferRow {
  id: string;
  from_user_id: string;
  to_user_id: string;
  type: string;
  status: string;
  offered_sticker_ids: string[];
  requested_sticker_ids: string[];
  price_amount: number | null;
  price_currency: string | null;
  message: string | null;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export const ExchangeModel = {
  async create(params: {
    fromUserId: string;
    toUserId: string;
    type: string;
    offeredStickerIds: string[];
    requestedStickerIds: string[];
    priceAmount?: number;
    priceCurrency?: string;
    message?: string;
    expiresAt: Date;
  }): Promise<ExchangeOfferRow> {
    const { rows } = await db.query<ExchangeOfferRow>(
      `INSERT INTO exchange_offers
         (from_user_id, to_user_id, type, offered_sticker_ids,
          requested_sticker_ids, price_amount, price_currency, message, expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        params.fromUserId,
        params.toUserId,
        params.type,
        params.offeredStickerIds,
        params.requestedStickerIds,
        params.priceAmount ?? null,
        params.priceCurrency ?? null,
        params.message ?? null,
        params.expiresAt,
      ]
    );
    return rows[0];
  },

  async findById(id: string): Promise<ExchangeOfferRow | null> {
    const { rows } = await db.query<ExchangeOfferRow>(
      "SELECT * FROM exchange_offers WHERE id = $1",
      [id]
    );
    return rows[0] ?? null;
  },

  async findByUser(userId: string): Promise<ExchangeOfferRow[]> {
    const { rows } = await db.query<ExchangeOfferRow>(
      `SELECT * FROM exchange_offers
       WHERE (from_user_id = $1 OR to_user_id = $1) AND status = 'pending'
       ORDER BY created_at DESC`,
      [userId]
    );
    return rows;
  },

  async updateStatus(
    id: string,
    status: string
  ): Promise<ExchangeOfferRow | null> {
    const { rows } = await db.query<ExchangeOfferRow>(
      "UPDATE exchange_offers SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [status, id]
    );
    return rows[0] ?? null;
  },
};
