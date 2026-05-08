import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { authApi } from "@/services/api/auth.api";
import { apiClient } from "@/services/api/client";

interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  country: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { username: string; email: string; password: string; country: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  initialized: false,

  async initialize() {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) {
        const { data } = await apiClient.get("/users/me");
        set({ accessToken: token, user: mapUser(data.data), initialized: true });
      } else {
        set({ initialized: true });
      }
    } catch {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      set({ initialized: true });
    }
  },

  async login(email, password) {
    const tokens = await authApi.login(email, password);
    await persistTokens(tokens);
    const { data } = await apiClient.get("/users/me");
    set({ accessToken: tokens.accessToken, user: mapUser(data.data) });
  },

  async register(params) {
    const tokens = await authApi.register(params);
    await persistTokens(tokens);
    const { data } = await apiClient.get("/users/me");
    set({ accessToken: tokens.accessToken, user: mapUser(data.data) });
  },

  async logout() {
    try { await authApi.logout(); } catch {}
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    set({ user: null, accessToken: null });
  },
}));

async function persistTokens(tokens: { accessToken: string; refreshToken: string }) {
  await SecureStore.setItemAsync("accessToken", tokens.accessToken);
  await SecureStore.setItemAsync("refreshToken", tokens.refreshToken);
}

function mapUser(data: any): AuthUser {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    avatarUrl: data.avatar_url ?? null,
    country: data.country,
    role: data.role,
  };
}
