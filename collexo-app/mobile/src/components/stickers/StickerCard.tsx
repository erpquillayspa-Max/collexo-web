import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

interface StickerCardProps {
  sticker: {
    id: string;
    template_id: string;
    quantity: number;
    template?: { name: string; number: string; image_url: string; rarity: string };
  };
}

const RARITY_COLOR: Record<string, string> = {
  common: "#4a4a5a",
  uncommon: "#27ae60",
  rare: "#2980b9",
  legendary: "#f39c12",
};

export function StickerCard({ sticker }: StickerCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/sticker/${sticker.template_id}`)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: sticker.template?.image_url }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      {sticker.quantity > 1 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>×{sticker.quantity}</Text>
        </View>
      )}
      <View style={[styles.rarityBar, { backgroundColor: RARITY_COLOR[sticker.template?.rarity ?? "common"] }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    aspectRatio: 0.7,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#16213e",
    maxWidth: "30%",
  },
  image: { flex: 1 },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#6c63ff",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  rarityBar: { height: 3 },
});
