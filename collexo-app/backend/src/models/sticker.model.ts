import { db } from "../config/database";

export interface StickerTemplateRow {
  id: string;
  number: string;
  name: string;
  team_id: string;
  team_name: string;
  group_code: string;
  image_url: string;
  rarity: string;
}

export interface UserStickerRow {
  id: string;
  user_id: string;
  template_id: string;
  quantity: number;
  condition: string;
  is_listed: boolean;
  acquired_at: Date;
}

export const StickerModel = {
  async findAllTemplates(): Promise<StickerTemplateRow[]> {
    const { rows } = await db.query<StickerTemplateRow>(
      "SELECT * FROM sticker_templates ORDER BY number ASC"
    );
    return rows;
  },

  async findTemplateById(id: string): Promise<StickerTemplateRow | null> {
    const { rows } = await db.query<StickerTemplateRow>(
      "SELECT * FROM sticker_templates WHERE id = $1",
      [id]
    );
    return rows[0] ?? null;
  },

  async findUserStickers(userId: string): Promise<UserStickerRow[]> {
    const { rows } = await db.query<UserStickerRow>(
      "SELECT * FROM user_stickers WHERE user_id = $1 ORDER BY acquired_at DESC",
      [userId]
    );
    return rows;
  },

  async findUserDuplicates(userId: string): Promise<UserStickerRow[]> {
    const { rows } = await db.query<UserStickerRow>(
      "SELECT * FROM user_stickers WHERE user_id = $1 AND quantity > 1",
      [userId]
    );
    return rows;
  },

  async upsertUserSticker(
    userId: string,
    templateId: string,
    quantity = 1
  ): Promise<UserStickerRow> {
    const { rows } = await db.query<UserStickerRow>(
      `INSERT INTO user_stickers (user_id, template_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, template_id)
       DO UPDATE SET quantity = user_stickers.quantity + EXCLUDED.quantity
       RETURNING *`,
      [userId, templateId, quantity]
    );
    return rows[0];
  },

  async decrementQuantity(
    userId: string,
    templateId: string,
    amount = 1
  ): Promise<UserStickerRow> {
    const { rows } = await db.query<UserStickerRow>(
      `UPDATE user_stickers
       SET quantity = quantity - $3
       WHERE user_id = $1 AND template_id = $2 AND quantity >= $3
       RETURNING *`,
      [userId, templateId, amount]
    );
    if (!rows[0]) throw new Error("Insufficient sticker quantity");
    return rows[0];
  },
};
