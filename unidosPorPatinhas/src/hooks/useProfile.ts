import { useCallback, useEffect, useRef, useState } from "react";
import { getProfile, Profile, ServiceError } from "@/services/profileService";

export type ProfileState =
    | { status: "loading" }
    | { status: "success"; profile: Profile }
    | { status: "error"; error: ServiceError };

// Carrega o perfil e expõe o estado da consulta (carregando, sucesso ou falha).
export function useProfile() {
    const [state, setState] = useState<ProfileState>({ status: "loading" });
    const isMounted = useRef(true);

    const load = useCallback(async () => {
        setState({ status: "loading" });
        const result = await getProfile();
        if (!isMounted.current) return;

        setState(
            result.ok
                ? { status: "success", profile: result.data }
                : { status: "error", error: result.error }
        );
    }, []);

    useEffect(() => {
        isMounted.current = true;
        load();
        return () => {
            isMounted.current = false;
        };
    }, [load]);

    // Atualiza o perfil exibido sem nova consulta (ex.: depois de editar o nome)
    const setProfile = useCallback((profile: Profile) => {
        setState({ status: "success", profile });
    }, []);

    return { state, reload: load, setProfile };
}
