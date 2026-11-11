import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { setUnauthorizedHandler } from "@/services/api";
import { clearSession, getToken, saveToken } from "@/services/tokenStorage";
import { resetTo } from "@/routes/navigationRef";

type AuthContextData = {
    token: string | null;
    isRestoring: boolean;           // true enquanto lê a sessão salva ao abrir o app
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [isRestoring, setIsRestoring] = useState(true);

    // Restaura a sessão salva em aberturas anteriores do app
    useEffect(() => {
        getToken()
            .then(setToken)
            .finally(() => setIsRestoring(false));
    }, []);

    const signIn = useCallback(async (newToken: string) => {
        await saveToken(newToken);
        setToken(newToken);
    }, []);

    const signOut = useCallback(async () => {
        await clearSession();
        setToken(null);
    }, []);

    // Token rejeitado pela API: encerra a sessão e volta ao login
    useEffect(() => {
        setUnauthorizedHandler(() => {
            signOut().then(() => resetTo("signIn"));
        });
        return () => setUnauthorizedHandler(null);
    }, [signOut]);

    const value = useMemo(
        () => ({ token, isRestoring, signIn, signOut }),
        [token, isRestoring, signIn, signOut]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}
