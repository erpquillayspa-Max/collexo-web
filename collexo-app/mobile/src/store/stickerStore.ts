import { create } from "zustand";
import { stickerApi } from "@/services/api/sticker.api";

interface AlbumData {
  totalStickers: number;
  uniqueStickers: number;
  completionPercent: number;
  missingStickers: any[];
  duplicateStickers: any[];
  userStickers: any[];
}

interface StickerState {
  album: AlbumData | null;
  templates: any[];
  loading: boolean;
  error: string | null;
  fetchAlbum: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
}

export const useStickerStore = create<StickerState>((set) => ({
  album: null,
  templates: [],
  loading: false,
  error: null,

  async fetchAlbum() {
    set({ loading: true, error: null });
    try {
      const album = await stickerApi.getMyAlbum();
      set({ album, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  async fetchTemplates() {
    set({ loading: true, error: null });
    try {
      const templates = await stickerApi.getTemplates();
      set({ templates, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
