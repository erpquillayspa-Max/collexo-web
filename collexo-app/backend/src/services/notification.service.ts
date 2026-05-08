import { db } from "../config/database";

export type NotificationData = {
  type: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
};

export const NotificationService = {
  async create(userId: string, notification: NotificationData) {
    const { rows } = await db.query(
      `INSERT INTO notifications (user_id, type, title, body, data)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        userId,
        notification.type,
        notification.title,
        notification.body,
        JSON.stringify(notification.data ?? {}),
      ]
    );
    return rows[0];
  },

  async findByUser(userId: string, unreadOnly = false) {
    const query = unreadOnly
      ? "SELECT * FROM notifications WHERE user_id = $1 AND read_at IS NULL ORDER BY created_at DESC LIMIT 50"
      : "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50";
    const { rows } = await db.query(query, [userId]);
    return rows;
  },

  async markRead(notificationId: string, userId: string): Promise<void> {
    await db.query(
      "UPDATE notifications SET read_at = NOW() WHERE id = $1 AND user_id = $2",
      [notificationId, userId]
    );
  },

  async markAllRead(userId: string): Promise<void> {
    await db.query(
      "UPDATE notifications SET read_at = NOW() WHERE user_id = $1 AND read_at IS NULL",
      [userId]
    );
  },
};
