import "dotenv/config";
import http from "http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import { env } from "./config/env";
import { connectDB } from "./config/database";
import { redis } from "./config/redis";
import { globalRateLimit } from "./middlewares/rateLimit.middleware";
import apiRoutes from "./routes";
import { createSocketServer } from "./sockets";
import { logger } from "./utils/logger";

const app = express();
const server = http.createServer(app);

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(compression());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(globalRateLimit);

app.use("/api/payments/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

createSocketServer(server);

async function start() {
  await connectDB();
  await redis.connect();
  server.listen(env.port, () => {
    logger.info(`Collexo API running on port ${env.port}`);
  });
}

start().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});

export { app, server };
