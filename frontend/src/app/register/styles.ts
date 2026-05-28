import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: 16,
    },
    backButton: {
        fontSize: 16,
    },
    form: {
        width: "100%",
        alignItems: "flex-start",
        gap: 16,
    },
    input: {
        width: "100%",
        gap:4,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 24,
        fontFamily: 'Quicksand_700Bold',
    },
    description: {
        fontSize: 16,
        fontFamily: 'Quicksand_400Regular',
    },
    label: {
        fontSize: 14,
        fontFamily: 'Quicksand_400Regular',
    },

})