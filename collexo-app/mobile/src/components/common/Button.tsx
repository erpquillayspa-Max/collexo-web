import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
}

export function Button({ title, onPress, loading, disabled, variant = "primary", style }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], (disabled || loading) && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { height: 48, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  primary: { backgroundColor: "#6c63ff" },
  secondary: { backgroundColor: "#0f3460" },
  danger: { backgroundColor: "#e74c3c" },
  disabled: { opacity: 0.5 },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
