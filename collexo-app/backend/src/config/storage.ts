import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${env.r2.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.r2.accessKeyId,
    secretAccessKey: env.r2.secretAccessKey,
  },
});

export const R2_BUCKET = env.r2.bucketName;
export const R2_PUBLIC_URL = env.r2.publicUrl;
