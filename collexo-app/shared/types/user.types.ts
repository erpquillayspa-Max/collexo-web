export type UserRole = "user" | "admin" | "moderator";

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  country: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUser {
  id: string;
  username: string;
  avatarUrl: string | null;
  country: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  country: string;
}
