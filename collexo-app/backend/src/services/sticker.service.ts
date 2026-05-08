import { StickerModel } from "../models/sticker.model";
import { redis, CACHE_TTL } from "../config/redis";

export const StickerService = {
  async getAllTemplates() {
    const cacheKey = "sticker:templates:all";
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const templates = await StickerModel.findAllTemplates();
    await redis.setex(cacheKey, CACHE_TTL.stickerTemplate, JSON.stringify(templates));
    return templates;
  },

  async getUserAlbum(userId: string) {
    const cacheKey = `sticker:album:${userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const [allTemplates, userStickers] = await Promise.all([
      StickerModel.findAllTemplates(),
      StickerModel.findUserStickers(userId),
    ]);

    const ownedIds = new Set(userStickers.map((s) => s.template_id));
    const missing = allTemplates.filter((t) => !ownedIds.has(t.id));
    const duplicates = userStickers.filter((s) => s.quantity > 1);

    const album = {
      totalStickers: allTemplates.length,
      uniqueStickers: ownedIds.size,
      completionPercent: Math.round((ownedIds.size / allTemplates.length) * 100),
      missingStickers: missing,
      duplicateStickers: duplicates,
      userStickers,
    };

    await redis.setex(cacheKey, CACHE_TTL.albumProgress, JSON.stringify(album));
    return album;
  },

  async invalidateAlbumCache(userId: string): Promise<void> {
    await redis.del(`sticker:album:${userId}`);
  },
};
