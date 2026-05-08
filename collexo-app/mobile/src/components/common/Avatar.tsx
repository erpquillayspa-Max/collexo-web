import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface AvatarProps {
  uri: string | null;
  size?: number;
  username?: string;
}

export function Avatar({ uri, size = 40, username }: AvatarProps) {
  const initial = username?.[0]?.toUpperCase() ?? "?";

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        contentFit="cover"
        transition={200}
      />
    );
  }

  return (
    <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {},
  placeholder: { backgroundColor: "#6c63ff", justifyContent: "center", alignItems: "center" },
  initial: { color: "#fff", fontWeight: "700" },
});
