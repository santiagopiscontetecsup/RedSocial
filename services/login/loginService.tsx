import api from '@/services/api';

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/api/Auth/login', data); // hya que cambiar por el endpoint correcto
    return response.data; // Devuelve la respuesta del servidor
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};