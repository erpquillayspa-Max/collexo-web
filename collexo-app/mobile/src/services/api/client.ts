import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        await SecureStore.setItemAsync("accessToken", data.data.accessToken);
        await SecureStore.setItemAsync("refreshToken", data.data.refreshToken);

        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return apiClient(original);
      } catch {
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        throw error;
      }
    }
    const message = error.response?.data?.error ?? error.message;
    throw Object.assign(new Error(message), { status: error.response?.status });
  }
);
