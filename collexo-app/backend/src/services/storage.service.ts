import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "../config/storage";

export const StorageService = {
  async uploadAvatar(buffer: Buffer, mimeType: string): Promise<string> {
    const webp = await sharp(buffer)
      .resize(256, 256, { fit: "cover" })
      .webp({ quality: 85 })
      .toBuffer();

    const key = `avatars/${uuidv4()}.webp`;
    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: webp,
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    return `${R2_PUBLIC_URL}/${key}`;
  },

  async uploadStickerImage(buffer: Buffer): Promise<string> {
    const webp = await sharp(buffer)
      .resize(400, 560, { fit: "contain", background: "transparent" })
      .webp({ quality: 90 })
      .toBuffer();

    const key = `stickers/${uuidv4()}.webp`;
    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: webp,
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    return `${R2_PUBLIC_URL}/${key}`;
  },

  async deleteFile(url: string): Promise<void> {
    const key = url.replace(`${R2_PUBLIC_URL}/`, "");
    await r2.send(
      new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key })
    );
  },
};
