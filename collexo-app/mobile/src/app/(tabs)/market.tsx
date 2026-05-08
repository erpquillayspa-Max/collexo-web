import { View, Text, StyleSheet } from "react-native";

export default function MarketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercado</Text>
      <Text style={styles.subtitle}>Comprá y vendé láminas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e", padding: 16, paddingTop: 56 },
  title: { fontSize: 24, fontWeight: "700", color: "#fff" },
  subtitle: { color: "#a0a0b0", marginTop: 8 },
});
