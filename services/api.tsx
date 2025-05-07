import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

if (!API_BASE_URL) {
  console.error('Error: API_BASE_URL no está configurada en el archivo .env');
}

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Tiempo de espera de 10 segundos
});

// Interceptor para manejar errores de red y respuestas
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error('Error de red:', error.message);
      error.message =
        'Error de conexión con el servidor. Por favor, verifica tu conexión a internet.';
    }
    return Promise.reject(error);
  }
);

export default api;
