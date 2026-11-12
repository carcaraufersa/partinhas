import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    texts: {
        flex: 1,
        gap: 2,
    },
    label: {
        fontSize: 13,
        fontFamily: "Quicksand_400Regular",
        color: "#555555",
    },
    value: {
        fontSize: 16,
        fontFamily: "Quicksand_400Regular",
        color: "#222222",
    },
});
