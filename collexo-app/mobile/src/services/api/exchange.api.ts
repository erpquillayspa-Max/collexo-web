import { apiClient } from "./client";

export const exchangeApi = {
  getOffers: () =>
    apiClient.get("/exchanges").then((r) => r.data.data),

  createOffer: (data: {
    toUserId: string;
    type: string;
    offeredStickerIds: string[];
    requestedStickerIds: string[];
    priceAmount?: number;
    priceCurrency?: string;
    message?: string;
  }) => apiClient.post("/exchanges", data).then((r) => r.data.data),

  acceptOffer: (id: string) =>
    apiClient.patch(`/exchanges/${id}/accept`).then((r) => r.data.data),

  rejectOffer: (id: string) =>
    apiClient.patch(`/exchanges/${id}/reject`).then((r) => r.data.data),
};
