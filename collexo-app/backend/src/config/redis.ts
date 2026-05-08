import Redis from "ioredis";
import { env } from "./env";

export const redis = new Redis(env.redis.url, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 100, 3_000),
});

redis.on("error", (err) => console.error("[Redis]", err.message));

export const CACHE_TTL = {
  user: 300,
  stickerTemplate: 3_600,
  albumProgress: 60,
  session: 60 * 60 * 24 * 30,
} as const;
