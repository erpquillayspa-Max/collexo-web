import { Server, Socket } from "socket.io";
import { db } from "../config/database";

export function registerChatHandlers(io: Server, socket: Socket): void {
  const userId: string = (socket as any).userId;

  socket.on("chat:join", async (roomId: string) => {
    const { rows } = await db.query(
      `SELECT 1 FROM chat_rooms cr
       JOIN chat_room_members crm ON crm.room_id = cr.id
       WHERE cr.id = $1 AND crm.user_id = $2`,
      [roomId, userId]
    );
    if (!rows.length) {
      socket.emit("error", "Not a member of this room");
      return;
    }
    socket.join(`room:${roomId}`);
  });

  socket.on("chat:leave", (roomId: string) => {
    socket.leave(`room:${roomId}`);
  });

  socket.on(
    "chat:message",
    async (payload: { roomId: string; content: string }) => {
      if (!payload.content?.trim()) return;

      const { rows } = await db.query(
        `INSERT INTO chat_messages (room_id, sender_id, content)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [payload.roomId, userId, payload.content.trim().slice(0, 1000)]
      );

      const message = rows[0];
      io.to(`room:${payload.roomId}`).emit("chat:message", message);
    }
  );

  socket.on("chat:typing", (roomId: string) => {
    socket.to(`room:${roomId}`).emit("chat:typing", { userId, roomId });
  });
}
