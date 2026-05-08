import { Pool } from "pg";
import { env } from "./env";

export const db = new Pool({
  connectionString: env.database.url,
  min: env.database.poolMin,
  max: env.database.poolMax,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl: env.nodeEnv === "production" ? { rejectUnauthorized: true } : false,
});

db.on("error", (err) => {
  console.error("[DB] Unexpected pool error:", err);
});

export async function connectDB(): Promise<void> {
  const client = await db.connect();
  client.release();
}
