import api from '../api'; // Ajusta la ruta según la estructura de tu proyecto

export interface Habilidad {
  id: number;
  nombre: string;
}

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  fechaLimite: string;
  tipoRecompensa: string;
  habilidades: Habilidad[];
}

export const traerProyectos = async (): Promise<Proyecto[]> => {
  try {
    const response = await api.get<Proyecto[]>('/api/StudentControllerGet/proyectos');
    return response.data; 
  } catch (error: any) {
    // Manejo detallado del error con Axios
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error(
        `Error al obtener los proyectos: ${error.response.status} ${error.response.statusText} - `,
        error.response.data
      );
    } else if (error.request) {
      // La petición fue realizada pero no se recibió respuesta
      console.error('Error de conexión: No se recibió respuesta del servidor.', error.message);
    } else {
      // Ocurrió un error al preparar la petición
      console.error('Error al configurar la petición:', error.message);
    }
    throw error;
  }
};
