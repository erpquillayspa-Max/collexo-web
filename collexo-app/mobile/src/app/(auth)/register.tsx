import { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";

export default function RegisterScreen() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    country: "AR",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();

  function update(field: keyof typeof form) {
    return (value: string) => setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleRegister() {
    setLoading(true);
    try {
      await register(form);
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Crear cuenta</Text>
      <Input placeholder="Nombre de usuario" value={form.username} onChangeText={update("username")} autoCapitalize="none" />
      <Input placeholder="Email" value={form.email} onChangeText={update("email")} keyboardType="email-address" autoCapitalize="none" />
      <Input placeholder="Contraseña (min. 8 caracteres)" value={form.password} onChangeText={update("password")} secureTextEntry />
      <Input placeholder="País (código ISO ej: AR)" value={form.country} onChangeText={update("country")} autoCapitalize="characters" maxLength={2} />
      <Button title="Registrarse" onPress={handleRegister} loading={loading} />
      <Link href="/(auth)/login" style={styles.link}>
        ¿Ya tenés cuenta? Iniciá sesión
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1a1a2e",
    padding: 24,
    justifyContent: "center",
    gap: 12,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#fff", textAlign: "center", marginBottom: 24 },
  link: { color: "#6c63ff", textAlign: "center", marginTop: 8 },
});
