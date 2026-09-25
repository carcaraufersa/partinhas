import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    gap: 4,
  },
  inputRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#C3C5CB",
  },
  inputError: {
    borderColor: "#E53E3E",
  },
  container: {
    flex: 1,
    padding: 8,
    fontFamily: "Inter_500Medium",
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 12,
    color: "#E53E3E",
    fontFamily: "Inter_400Regular",
  },
});