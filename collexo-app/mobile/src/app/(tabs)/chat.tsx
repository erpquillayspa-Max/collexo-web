import { View, Text, StyleSheet } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <Text style={styles.subtitle}>Mensajes con otros coleccionistas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e", padding: 16, paddingTop: 56 },
  title: { fontSize: 24, fontWeight: "700", color: "#fff" },
  subtitle: { color: "#a0a0b0", marginTop: 8 },
});
