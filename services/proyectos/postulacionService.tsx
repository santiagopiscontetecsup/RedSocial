import api from '../api'; // Usa la configuración de axios con baseURL
import { AxiosResponse } from 'axios';

export interface SolicitudPost {
  idEstudiante: number;
  idProyecto: number;
  resumenHabilidades: string;
}

export const postularProyecto = async (solicitud: SolicitudPost): Promise<AxiosResponse<any>> => {
    try {
      const response = await api.post('/api/Solicitudes', solicitud);
      console.log('Postulación exitosa:', response.data);
      return response;
    } catch (error: any) {
      if (error.response) {
        console.error('Error al postular al proyecto:', error.response.data);
        throw new Error(error.response.data.message || 'Error al postular al proyecto');
      } else {
        console.error('Error de red:', error.message);
        throw new Error('Error de conexión con el servidor');
      }
    }
  };