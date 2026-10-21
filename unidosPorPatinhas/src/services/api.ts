import axios from 'axios';

// URL base da API — alterar para a URL de produção quando o deploy for feito
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
