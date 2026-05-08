import { io, Socket } from "socket.io-client";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const SERVER_URL = (Constants.expoConfig?.extra?.apiUrl as string ?? "http://localhost:3000").replace("/api/v1", "");

let socket: Socket | null = null;

export const socketService = {
  async connect(): Promise<Socket> {
    if (socket?.connected) return socket;

    const token = await SecureStore.getItemAsync("accessToken");

    socket = io(SERVER_URL, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1_000,
    });

    return new Promise((resolve, reject) => {
      socket!.on("connect", () => resolve(socket!));
      socket!.on("connect_error", reject);
    });
  },

  disconnect() {
    socket?.disconnect();
    socket = null;
  },

  get instance(): Socket | null {
    return socket;
  },
};
