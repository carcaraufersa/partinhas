import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingTop: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 8,
    },
    item: {
        flex: 1,
        alignItems: "center",
        gap: 4,
    },
    iconBox: {
        width: 56,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    iconBoxActive: {
        backgroundColor: "#7952b3",
    },
    label: {
        fontSize: 12,
        fontFamily: "Quicksand_400Regular",
        color: "#9A9A9A",
    },
    labelActive: {
        fontFamily: "Quicksand_700Bold",
        color: "#7952b3",
    },
});
