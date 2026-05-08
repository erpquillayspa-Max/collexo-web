import { apiClient } from "./client";

export const authApi = {
  register: (data: { username: string; email: string; password: string; country: string }) =>
    apiClient.post("/auth/register", data).then((r) => r.data.data),

  login: (email: string, password: string) =>
    apiClient.post("/auth/login", { email, password }).then((r) => r.data.data),

  refresh: (refreshToken: string) =>
    apiClient.post("/auth/refresh", { refreshToken }).then((r) => r.data.data),

  logout: () => apiClient.post("/auth/logout"),
};
