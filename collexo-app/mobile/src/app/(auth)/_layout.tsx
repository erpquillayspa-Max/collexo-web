import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function AuthLayout() {
  const { accessToken } = useAuthStore();
  if (accessToken) return <Redirect href="/(tabs)" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
