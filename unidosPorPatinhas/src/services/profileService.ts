import axios from "axios";
import api from "./api";

export type Profile = {
    id: string;
    name: string;
    email: string;
};

export type ServiceErrorKind = "unauthorized" | "network" | "server" | "validation" | "unknown";

export type ServiceError = {
    kind: ServiceErrorKind;
    message: string;       // texto pronto para exibir ao usuário
    retryable: boolean;    // vale oferecer "Tentar novamente"?
};

// Resultado tipado: as telas tratam sucesso e erro sem lidar com axios.
export type ServiceResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: ServiceError };

// O backend ainda não tem GET/PATCH /users/me. Enquanto isso, usa dados simulados.
// Para usar a API real em desenvolvimento: defina EXPO_PUBLIC_USE_MOCK_PROFILE=false.
// O mock só existe em desenvolvimento (__DEV__): um build de produção nunca exibe dados falsos.
const USE_MOCK = __DEV__ && process.env.EXPO_PUBLIC_USE_MOCK_PROFILE !== "false";

let mockProfile: Profile = { id: "mock-user", name: "Maria Luiza", email: "maria@gmail.com" };
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function toServiceError(error: unknown): ServiceError {
    if (!axios.isAxiosError(error) || !error.response) {
        return {
            kind: "network",
            message: "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
            retryable: true,
        };
    }

    const { status, data } = error.response;
    const apiMessage = Array.isArray(data?.message) ? data.message[0] : data?.message;

    if (status === 401) {
        return { kind: "unauthorized", message: "Sua sessão expirou. Entre novamente.", retryable: false };
    }
    if (status === 400 || status === 422) {
        return { kind: "validation", message: apiMessage ?? "Dados inválidos.", retryable: false };
    }
    if (status >= 500) {
        return { kind: "server", message: "O servidor teve um problema. Tente novamente em instantes.", retryable: true };
    }
    return { kind: "unknown", message: apiMessage ?? "Algo deu errado. Tente novamente.", retryable: true };
}

export async function getProfile(): Promise<ServiceResult<Profile>> {
    if (USE_MOCK) {
        await wait(600);
        return { ok: true, data: { ...mockProfile } };
    }

    try {
        const response = await api.get<Profile>("/users/me");
        return { ok: true, data: response.data };
    } catch (error) {
        return { ok: false, error: toServiceError(error) };
    }
}

export async function updateProfileName(name: string): Promise<ServiceResult<Profile>> {
    if (USE_MOCK) {
        await wait(600);
        mockProfile = { ...mockProfile, name };
        return { ok: true, data: { ...mockProfile } };
    }

    try {
        const response = await api.patch<Profile>("/users/me", { name });
        return { ok: true, data: response.data };
    } catch (error) {
        return { ok: false, error: toServiceError(error) };
    }
}
