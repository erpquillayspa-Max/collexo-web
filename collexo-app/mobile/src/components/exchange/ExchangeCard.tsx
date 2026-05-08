import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useExchangeStore } from "@/store/exchangeStore";
import { useAuthStore } from "@/store/authStore";

interface ExchangeCardProps {
  offer: {
    id: string;
    from_user_id: string;
    to_user_id: string;
    type: string;
    status: string;
    offered_sticker_ids: string[];
    requested_sticker_ids: string[];
    price_amount?: number;
    price_currency?: string;
    message?: string;
    created_at: string;
  };
}

export function ExchangeCard({ offer }: ExchangeCardProps) {
  const { user } = useAuthStore();
  const { acceptOffer, rejectOffer } = useExchangeStore();
  const isIncoming = offer.to_user_id === user?.id;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.typeBadge, styles[offer.type as keyof typeof styles] as any]}>
          <Text style={styles.typeText}>{offer.type.toUpperCase()}</Text>
        </View>
        <Text style={styles.direction}>{isIncoming ? "Recibido" : "Enviado"}</Text>
      </View>

      <Text style={styles.count}>
        Ofrece {offer.offered_sticker_ids.length} • Pide {offer.requested_sticker_ids.length}
      </Text>

      {offer.price_amount && (
        <Text style={styles.price}>
          {offer.price_amount} {offer.price_currency}
        </Text>
      )}

      {offer.message && <Text style={styles.message}>{offer.message}</Text>}

      {isIncoming && offer.status === "pending" && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.acceptBtn} onPress={() => acceptOffer(offer.id)}>
            <Text style={styles.btnText}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectBtn} onPress={() => rejectOffer(offer.id)}>
            <Text style={styles.btnText}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#16213e", borderRadius: 12, padding: 16, marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  typeBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  trade: { backgroundColor: "#27ae60" },
  sale: { backgroundColor: "#2980b9" },
  gift: { backgroundColor: "#8e44ad" },
  typeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  direction: { color: "#a0a0b0", fontSize: 13 },
  count: { color: "#fff", marginBottom: 4 },
  price: { color: "#f39c12", fontWeight: "600", marginBottom: 4 },
  message: { color: "#a0a0b0", fontSize: 13, fontStyle: "italic", marginBottom: 8 },
  actions: { flexDirection: "row", gap: 8, marginTop: 8 },
  acceptBtn: { flex: 1, backgroundColor: "#27ae60", borderRadius: 8, padding: 10, alignItems: "center" },
  rejectBtn: { flex: 1, backgroundColor: "#e74c3c", borderRadius: 8, padding: 10, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
});
