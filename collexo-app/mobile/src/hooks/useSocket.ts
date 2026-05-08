import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { socketService } from "@/services/socket/socket.service";
import { useAuthStore } from "@/store/authStore";

export function useSocket(): Socket | null {
  const socketRef = useRef<Socket | null>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    socketService.connect().then((s) => {
      socketRef.current = s;
    });

    return () => {
      socketService.disconnect();
      socketRef.current = null;
    };
  }, [accessToken]);

  return socketRef.current;
}
