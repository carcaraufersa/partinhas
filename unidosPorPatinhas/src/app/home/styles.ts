import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        padding: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: 16,
    },
    logo: {
        width: 60,
        height: 60
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    }
})