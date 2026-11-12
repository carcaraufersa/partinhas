import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Quicksand_700Bold",
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        paddingBottom: 80,
    },
    feedback: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Quicksand_400Regular",
    },
    retryButton: {
        width: "100%",
    },
    content: {
        marginTop: 24,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 32,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#7952b3",
        backgroundColor: "#F3EEF9",
        alignItems: "center",
        justifyContent: "center",
    },
    greeting: {
        fontSize: 18,
        fontFamily: "Quicksand_700Bold",
    },
    section: {
        fontSize: 14,
        fontFamily: "Quicksand_400Regular",
        color: "#555555",
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
});
