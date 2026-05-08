import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useExchangeStore } from "@/store/exchangeStore";
import { ExchangeCard } from "@/components/exchange/ExchangeCard";

export default function ExchangeScreen() {
  const { offers, loading, fetchOffers } = useExchangeStore();

  useEffect(() => { fetchOffers(); }, []);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color="#6c63ff" /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intercambios</Text>
      {offers.length === 0 ? (
        <Text style={styles.empty}>No tenés intercambios pendientes</Text>
      ) : (
        <FlatList
          data={offers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExchangeCard offer={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a2e" },
  title: { fontSize: 24, fontWeight: "700", color: "#fff", padding: 16, paddingTop: 56 },
  empty: { color: "#a0a0b0", textAlign: "center", marginTop: 48 },
  list: { padding: 16 },
});
