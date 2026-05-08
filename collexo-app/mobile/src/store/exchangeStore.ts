import { create } from "zustand";
import { exchangeApi } from "@/services/api/exchange.api";

interface ExchangeState {
  offers: any[];
  loading: boolean;
  error: string | null;
  fetchOffers: () => Promise<void>;
  createOffer: (data: any) => Promise<void>;
  acceptOffer: (id: string) => Promise<void>;
  rejectOffer: (id: string) => Promise<void>;
}

export const useExchangeStore = create<ExchangeState>((set, get) => ({
  offers: [],
  loading: false,
  error: null,

  async fetchOffers() {
    set({ loading: true, error: null });
    try {
      const offers = await exchangeApi.getOffers();
      set({ offers, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  async createOffer(data) {
    const offer = await exchangeApi.createOffer(data);
    set((s) => ({ offers: [offer, ...s.offers] }));
  },

  async acceptOffer(id) {
    const updated = await exchangeApi.acceptOffer(id);
    set((s) => ({
      offers: s.offers.map((o) => (o.id === id ? updated : o)),
    }));
  },

  async rejectOffer(id) {
    const updated = await exchangeApi.rejectOffer(id);
    set((s) => ({
      offers: s.offers.map((o) => (o.id === id ? updated : o)),
    }));
  },
}));
