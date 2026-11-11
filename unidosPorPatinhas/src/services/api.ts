import axios from "axios";
import { getToken } from "./tokenStorage";

// URL base da API. No celular/emulador "localhost" aponta para o próprio aparelho:
// defina EXPO_PUBLIC_API_URL com o IP da máquina que roda o backend.
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let unauthorizedHandler: (() => void) | null = null;

// Registrado pelo AuthContext: chamado quando a API rejeita o token (sessão expirada).
export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

// Envia o token de autenticação em toda requisição, quando houver sessão.
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogin = error?.config?.url === "/auth/login";
    const hadToken = !!error?.config?.headers?.Authorization;

    // 401 com token em rota protegida = sessão inválida/expirada.
    // No login, 401 significa só "credenciais inválidas" e não deve deslogar.
    if (axios.isAxiosError(error) && error.response?.status === 401 && hadToken && !isLogin) {
      unauthorizedHandler?.();
    }
    return Promise.reject(error);
  }
);

export default api;
