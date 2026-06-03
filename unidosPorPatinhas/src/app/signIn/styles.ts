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
    buttons: {
        width: "100%",
        gap: 30,
        alignItems: "center",
    },
    buttonIcon: {
        borderRadius: 100,
        borderWidth: .2,
        borderColor: "#505050",
        padding: 8,
    },
    findPassword: {
        fontSize: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    register: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
    },
    ouLine: {
        width: "100%",
        height: 24,
    },
    googleButton: {
        width: "100%",
        height: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#C3C5CB",
    },
    googleImg: {
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: 'Quicksand_700Bold',
    }

})