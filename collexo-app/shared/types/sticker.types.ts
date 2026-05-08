export type StickerRarity = "common" | "uncommon" | "rare" | "legendary";
export type StickerCondition = "mint" | "near_mint" | "good" | "fair";

export interface StickerTemplate {
  id: string;
  number: string;
  name: string;
  teamId: string;
  teamName: string;
  groupCode: string;
  imageUrl: string;
  rarity: StickerRarity;
}

export interface UserSticker {
  id: string;
  userId: string;
  templateId: string;
  template: StickerTemplate;
  quantity: number;
  condition: StickerCondition;
  isListed: boolean;
  acquiredAt: Date;
}

export interface AlbumProgress {
  userId: string;
  totalStickers: number;
  uniqueStickers: number;
  completionPercent: number;
  missingStickers: StickerTemplate[];
  duplicateStickers: UserSticker[];
}

export interface Team {
  id: string;
  name: string;
  groupCode: string;
  logoUrl: string;
  confederation: string;
}
