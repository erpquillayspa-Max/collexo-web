import { apiClient } from "./client";

export const stickerApi = {
  getTemplates: () =>
    apiClient.get("/stickers/templates").then((r) => r.data.data),

  getMyAlbum: () =>
    apiClient.get("/stickers/my-album").then((r) => r.data.data),

  getUserAlbum: (userId: string) =>
    apiClient.get(`/stickers/album/${userId}`).then((r) => r.data.data),
};
