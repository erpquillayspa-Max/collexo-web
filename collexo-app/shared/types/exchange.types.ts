export type ExchangeStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";

export type ExchangeType = "trade" | "sale" | "gift";

export interface ExchangeOffer {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: ExchangeType;
  status: ExchangeStatus;
  offeredStickerIds: string[];
  requestedStickerIds: string[];
  priceAmount?: number;
  priceCurrency?: string;
  message?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketListing {
  id: string;
  sellerId: string;
  userStickerId: string;
  priceAmount: number;
  priceCurrency: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  readAt: Date | null;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  readAt: Date | null;
  createdAt: Date;
}

export type NotificationType =
  | "exchange_offer"
  | "exchange_accepted"
  | "exchange_rejected"
  | "new_message"
  | "payment_confirmed"
  | "sticker_shipped";
