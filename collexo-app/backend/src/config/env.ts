import dotenv from "dotenv";
dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env variable: ${key}`);
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseInt(process.env.PORT ?? "3000", 10),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:8081",

  database: {
    url: required("DATABASE_URL"),
    poolMin: parseInt(process.env.DATABASE_POOL_MIN ?? "2", 10),
    poolMax: parseInt(process.env.DATABASE_POOL_MAX ?? "20", 10),
  },

  redis: {
    url: required("REDIS_URL"),
  },

  jwt: {
    accessSecret: required("JWT_ACCESS_SECRET"),
    refreshSecret: required("JWT_REFRESH_SECRET"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "30d",
  },

  r2: {
    accountId: required("R2_ACCOUNT_ID"),
    accessKeyId: required("R2_ACCESS_KEY_ID"),
    secretAccessKey: required("R2_SECRET_ACCESS_KEY"),
    bucketName: required("R2_BUCKET_NAME"),
    publicUrl: required("R2_PUBLIC_URL"),
  },

  mercadopago: {
    accessToken: required("MERCADOPAGO_ACCESS_TOKEN"),
    publicKey: required("MERCADOPAGO_PUBLIC_KEY"),
    webhookSecret: required("MERCADOPAGO_WEBHOOK_SECRET"),
  },

  stripe: {
    secretKey: required("STRIPE_SECRET_KEY"),
    publishableKey: required("STRIPE_PUBLISHABLE_KEY"),
    webhookSecret: required("STRIPE_WEBHOOK_SECRET"),
  },
} as const;
