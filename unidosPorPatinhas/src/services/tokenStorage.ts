import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

// Cache em memória: evita ler o armazenamento a cada requisição.
// undefined = ainda não carregado; null = sem sessão.
let cachedToken: string | null | undefined;

// SecureStore não existe na web, então lá usamos localStorage.
const isWeb = Platform.OS === "web";

export async function getToken(): Promise<string | null> {
    if (cachedToken !== undefined) return cachedToken;

    try {
        cachedToken = isWeb
            ? localStorage.getItem(TOKEN_KEY)
            : await SecureStore.getItemAsync(TOKEN_KEY);
    } catch {
        cachedToken = null;
    }
    return cachedToken;
}

export async function saveToken(token: string): Promise<void> {
    cachedToken = token;
    if (isWeb) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
}

// Remove o token e qualquer dado de sessão guardado.
export async function clearSession(): Promise<void> {
    cachedToken = null;
    try {
        if (isWeb) {
            localStorage.removeItem(TOKEN_KEY);
        } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        }
    } catch {
        // O cache já foi limpo; falha ao apagar do disco não deve impedir o logout.
    }
}
