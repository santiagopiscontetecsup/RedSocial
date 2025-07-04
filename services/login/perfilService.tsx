import api from '@/services/api';

export interface Habilidad {
  id: number;
  nombre: string;
}

export interface Idioma {
  idIdioma: number;
  idioma: string;
  nivel: string;
}

export interface Link {
  id: number;
  tipoLink: string;
  url: string;
}

export interface PerfilEstudiante {
  idUsuario: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  avatar: string;
  acercaDe: string;
  nombreCarrera: string;
  nombreUniversidad: string;
  habilidades: Habilidad[];
  idiomas: Idioma[];
  links: Link[];
}

export const obtenerPerfilEstudiante = async (idUsuario: number): Promise<PerfilEstudiante> => {
  try {
    const response = await api.get<PerfilEstudiante>(`/api/StudentControllerGet/${idUsuario}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener el perfil del estudiante:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del estudiante');
  }
};