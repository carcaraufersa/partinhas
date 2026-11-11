import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    backdrop: {
        flex: 1,
    },
    sheet: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        paddingBottom: 24,
        gap: 24,
    },
    handle: {
        alignSelf: "center",
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#7952b3",
    },
    field: {
        gap: 4,
    },
    label: {
        fontSize: 14,
        fontFamily: "Quicksand_400Regular",
    },
    submitting: {
        opacity: 0.6,
    },
});
