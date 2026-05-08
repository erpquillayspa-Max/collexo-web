import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { Image } from "expo-image";
import { useStickerStore } from "@/store/stickerStore";

export default function StickerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { templates } = useStickerStore();
  const template = templates.find((t) => t.id === id);

  return (
    <>
      <Stack.Screen options={{ title: template?.name ?? "Lámina", presentation: "modal" }} />
      <ScrollView style={styles.container}>
        {template ? (
          <>
            <Image source={{ uri: template.image_url }} style={styles.image} contentFit="contain" />
            <View style={styles.info}>
              <Text style={styles.number}>#{template.number}</Text>
              <Text style={styles.name}>{template.name}</Text>
              <Text style={styles.team}>{template.team_name}</Text>
              <Text style={styles.rarity}>{template.rarity.toUpperCase()}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.empty}>Lámina no encontrada</Text>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e" },
  image: { width: "100%", aspectRatio: 0.7 },
  info: { padding: 20 },
  number: { color: "#a0a0b0", fontSize: 14 },
  name: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 4 },
  team: { color: "#6c63ff", fontSize: 16, marginTop: 4 },
  rarity: { color: "#f39c12", fontSize: 12, fontWeight: "700", marginTop: 8 },
  empty: { color: "#a0a0b0", textAlign: "center", marginTop: 48 },
});
