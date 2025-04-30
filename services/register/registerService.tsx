import api from '@/services/api';

export const registerUser = async (data: any) => {
  try {
    const response = await api.post('/register', data); // ahy que cambiar por el endpoint correcto
    return response.data; 
  } catch (error: any) {
    console.error('Error al registrar el usuario:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al registrar el usuario');
  }
};