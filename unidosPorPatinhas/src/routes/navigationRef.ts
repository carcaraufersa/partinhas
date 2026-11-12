import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "@/types/navigation";

// Referência global ao NavigationContainer: permite navegar fora de componentes
// (ex.: logout ou sessão expirada disparados por um serviço).
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Reinicia a pilha com apenas uma rota: o botão Voltar não consegue
// reabrir a tela anterior (ex.: Perfil depois de sair da conta).
export function resetTo(name: "signIn" | "main") {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name }] })
    );
}
