import { TextInput, TextInputProps, StyleSheet, View, Text } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#666"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: "#a0a0b0", marginBottom: 4, fontSize: 14 },
  input: {
    backgroundColor: "#16213e",
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#0f3460",
  },
  inputError: { borderColor: "#e74c3c" },
  error: { color: "#e74c3c", fontSize: 12, marginTop: 4 },
});
