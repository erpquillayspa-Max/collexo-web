import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { Avatar } from "@/components/common/Avatar";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  async function handleLogout() {
    Alert.alert("Cerrar sesión", "¿Seguro que querés salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Avatar uri={user?.avatarUrl ?? null} size={80} />
      <Text style={styles.username}>@{user?.username}</Text>
      <Text style={styles.country}>{user?.country}</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e", alignItems: "center", paddingTop: 80 },
  username: { fontSize: 20, fontWeight: "700", color: "#fff", marginTop: 12 },
  country: { color: "#a0a0b0", marginTop: 4 },
  logoutBtn: { marginTop: 40, backgroundColor: "#e74c3c", paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  logoutText: { color: "#fff", fontWeight: "600" },
});
