import { Server, Socket } from "socket.io";
import { NotificationService } from "../services/notification.service";

export function registerNotificationHandlers(
  _io: Server,
  socket: Socket
): void {
  const userId: string = (socket as any).userId;

  socket.on("notifications:fetch", async () => {
    const notifications = await NotificationService.findByUser(userId, true);
    socket.emit("notifications:list", notifications);
  });

  socket.on("notifications:read", async (notificationId: string) => {
    await NotificationService.markRead(notificationId, userId);
    socket.emit("notifications:read_ack", notificationId);
  });

  socket.on("notifications:read_all", async () => {
    await NotificationService.markAllRead(userId);
    socket.emit("notifications:read_all_ack");
  });
}

export async function pushNotification(
  io: Server,
  userId: string,
  notification: Parameters<typeof NotificationService.create>[1]
): Promise<void> {
  const saved = await NotificationService.create(userId, notification);
  io.to(`user:${userId}`).emit("notifications:new", saved);
}
