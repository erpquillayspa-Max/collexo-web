import { useEffect } from "react";
import { Stack } from "expo-router";
import { SplashScreen } from "expo-splash-screen";
import { useAuthStore } from "@/store/authStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initialize, initialized } = useAuthStore();

  useEffect(() => {
    initialize().finally(() => SplashScreen.hideAsync());
  }, []);

  if (!initialized) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="sticker/[id]" options={{ presentation: "modal" }} />
      <Stack.Screen name="exchange/[id]" options={{ presentation: "modal" }} />
    </Stack>
  );
}
