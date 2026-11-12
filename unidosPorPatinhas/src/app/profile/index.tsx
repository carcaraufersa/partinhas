import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

// Estrutura inicial da tela: os dados do usuário entram nos próximos cards (#161/#164).
export default function Profile() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
            <Text style={styles.title}>Perfil</Text>
        </View>
    );
}
