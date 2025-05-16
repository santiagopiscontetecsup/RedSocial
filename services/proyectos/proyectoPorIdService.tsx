import api from '../api'; // Asegúrate de que esta ruta sea correcta

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

/**
 * Obtiene el proyecto filtrado por ID mediante un GET con body.
 * @param id ID del proyecto a filtrar.
 * @returns Proyecto filtrado.
 */
export const traerProyectoPorId = async (fecha: string, empresaId: number): Promise<Proyecto[]> => {
    try {
      const response = await api.get<Proyecto[]>('/api/StudentControllerGet/proyectos/filtrar', {
        params: {
          fecha,
          empresaId,
        },
      });
  
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Error al obtener el proyecto por ID: ${error.response.status} ${error.response.statusText} - `,
          error.response.data
        );
      } else if (error.request) {
        console.error('Error de conexión: No se recibió respuesta del servidor.', error.message);
      } else {
        console.error('Error al configurar la petición:', error.message);
      }
      throw error;
    }
  };
  
