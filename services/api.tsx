import axios from 'axios';

// esta es la url que hace conexiona la api
const API_BASE_URL = process.env.API_BASE_URL;

// configuracion de axios para la api
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;