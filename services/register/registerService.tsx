import api from '@/services/api';

export const registerUser = async (data: any) => {
  try {
    console.log('URL de la API:', process.env.API_BASE_URL);
    const response = await api.post('/api/UserRegister/register/estudiante', data);
    return response.data;
  } catch (error: any) {
    if (!error.response) {
      console.error('Error de red:', error.message);
      throw new Error('Error de conexión con el servidor. Por favor, verifica tu conexión a internet y vuelve a intentarlo.');
    }
    console.error('Error al registrar el usuario:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al registrar el usuario');
  }
};