import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useExchangeStore } from "@/store/exchangeStore";
import { useAuthStore } from "@/store/authStore";

export default function ExchangeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { offers, acceptOffer, rejectOffer } = useExchangeStore();
  const { user } = useAuthStore();
  const offer = offers.find((o) => o.id === id);

  if (!offer) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Intercambio no encontrado</Text>
      </View>
    );
  }

  const isIncoming = offer.to_user_id === user?.id;

  async function handleAccept() {
    try {
      await acceptOffer(offer.id);
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  async function handleReject() {
    try {
      await rejectOffer(offer.id);
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: "Detalle del intercambio", presentation: "modal" }} />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.label}>Tipo</Text>
          <Text style={styles.value}>{offer.type}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Láminas ofrecidas</Text>
          <Text style={styles.value}>{offer.offered_sticker_ids.length} láminas</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Láminas pedidas</Text>
          <Text style={styles.value}>{offer.requested_sticker_ids.length} láminas</Text>
        </View>
        {offer.message && (
          <View style={styles.section}>
            <Text style={styles.label}>Mensaje</Text>
            <Text style={styles.value}>{offer.message}</Text>
          </View>
        )}
        {isIncoming && offer.status === "pending" && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
              <Text style={styles.btnText}>Aceptar intercambio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
              <Text style={styles.btnText}>Rechazar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e", padding: 20 },
  section: { marginBottom: 20 },
  label: { color: "#a0a0b0", fontSize: 13, marginBottom: 4 },
  value: { color: "#fff", fontSize: 16 },
  empty: { color: "#a0a0b0", textAlign: "center", marginTop: 48 },
  actions: { gap: 12, marginTop: 20 },
  acceptBtn: { backgroundColor: "#27ae60", borderRadius: 10, padding: 16, alignItems: "center" },
  rejectBtn: { backgroundColor: "#e74c3c", borderRadius: 10, padding: 16, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
