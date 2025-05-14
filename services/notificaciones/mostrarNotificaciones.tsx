import api from '../api'; // Usa la configuración de Axios con baseURL

export interface Notificacion {
  id: number;
  idProyecto: number; // Agregado
  mensaje: string; // Agregado
  fechaEnvio: string; // Agregado
  leido: boolean; // Agregado si es necesario
}
export const obtenerNotificaciones = async (idEstudiante: number): Promise<Notificacion[]> => {
  try {
    // Realiza la solicitud GET al endpoint con el ID del estudiante
    const response = await api.get<Notificacion[]>(
      `/api/Notificaciones/estudiante/${idEstudiante}`
    );

    console.log('Notificaciones obtenidas:', response.data);
    return response.data; // Devuelve las notificaciones obtenidas
  } catch (error: any) {
    if (error.response) {
      // Manejo de errores con respuesta del servidor
      console.error(
        `Error al obtener las notificaciones: ${error.response.status} ${error.response.statusText}`,
        error.response.data
      );
      throw new Error(
        error.response.data.message || 'Error al obtener las notificaciones'
      );
    } else if (error.request) {
      // Manejo de errores de conexión
      console.error('Error de conexión: No se recibió respuesta del servidor.', error.message);
      throw new Error('Error de conexión con el servidor');
    } else {
      // Manejo de otros errores
      console.error('Error al configurar la solicitud:', error.message);
      throw new Error('Error al configurar la solicitud');
    }
  }
};