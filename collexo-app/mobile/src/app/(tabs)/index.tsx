import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useStickerStore } from "@/store/stickerStore";
import { StickerCard } from "@/components/stickers/StickerCard";

export default function AlbumScreen() {
  const { album, loading, fetchAlbum } = useStickerStore();

  useEffect(() => { fetchAlbum(); }, []);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator color="#6c63ff" /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Álbum</Text>
        <Text style={styles.progress}>
          {album?.uniqueStickers ?? 0}/{album?.totalStickers ?? 0} láminas ({album?.completionPercent ?? 0}%)
        </Text>
      </View>
      <FlatList
        data={album?.userStickers ?? []}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => <StickerCard sticker={item} />}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a2e" },
  header: { padding: 16, paddingTop: 56 },
  title: { fontSize: 24, fontWeight: "700", color: "#fff" },
  progress: { fontSize: 14, color: "#a0a0b0", marginTop: 4 },
  grid: { padding: 8 },
});
