import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

// Home mínima do MVP: o conteúdo completo (busca, pets) virá em cards futuros.
export default function Home() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
            <Text style={styles.title}>Unidos pelas patinhas</Text>
            <Text style={styles.description}>
                Em breve você poderá encontrar aqui os pets disponíveis para adoção.
            </Text>
        </View>
    );
}
