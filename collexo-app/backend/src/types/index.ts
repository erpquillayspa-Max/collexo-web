import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}

export function ok<T>(data: T, meta?: ApiResponse["meta"]): ApiResponse<T> {
  return { success: true, data, ...(meta && { meta }) };
}

export function fail(error: string): ApiResponse {
  return { success: false, error };
}
