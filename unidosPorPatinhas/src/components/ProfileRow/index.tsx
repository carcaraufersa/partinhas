import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

type Props = {
    label: string;
    value: string;
    onPress?: () => void;   // sem onPress a linha é apenas informativa (sem seta)
};

export function ProfileRow({ label, value, onPress }: Props) {
    const content = (
        <>
            <View style={styles.texts}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
            {onPress && <Ionicons name="chevron-forward" size={22} color="#7952b3" />}
        </>
    );

    if (!onPress) {
        return <View style={styles.container}>{content}</View>;
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={`Editar ${label}: ${value}`}
        >
            {content}
        </TouchableOpacity>
    );
}
