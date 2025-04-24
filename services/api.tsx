import axios from 'axios';

// esta es la url que hace conexiona la api
const API_BASE_URL = 'https://b13f-2080-200-f410-1ea-c4f7-9cbe-11c5-1570.ngrok-free.app';

// configuracion de axios para la api
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;