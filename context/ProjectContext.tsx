import React, { createContext, useContext, useState } from 'react';
import projectsData from '@/data/projects';
import { Alert } from 'react-native';

export type Project = typeof projectsData[0] & { entregado?: boolean };

interface Notificacion {
  id: number;
  mensaje: string;
  tipo: 'aceptado' | 'rechazado';
  avatar: string; // Nueva propiedad
  name: string; // Nueva propiedad
  time: string; // Nueva propiedad
  leido: boolean; // Nueva propiedad
}

interface ProjectContextType {
  proyectosDisponibles: Project[];
  proyectosPostulados: Project[];
  proyectosAceptados: Project[];
  notificaciones: Notificacion[];
  postularAProyecto: (project: Project) => void;
  entregarProyecto: (projectId: number) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjectContext debe usarse dentro de ProjectProvider');
  return context;
};

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [proyectosDisponibles, setProyectosDisponibles] = useState<Project[]>(projectsData);
  const [proyectosPostulados, setProyectosPostulados] = useState<Project[]>([]);
  const [proyectosAceptados, setProyectosAceptados] = useState<Project[]>([]);

  const postularAProyecto = (project: Project) => {
    const yaFuePostulado = proyectosPostulados.some((p) => p.id === project.id);
    const yaFueAceptado = proyectosAceptados.some((p) => p.id === project.id);

    if (yaFuePostulado || yaFueAceptado) return;

    setProyectosPostulados((prev) => [...prev, { ...project, status: 'pendiente' }]);
    setProyectosDisponibles((prev) => prev.filter((p) => p.id !== project.id));

    setTimeout(() => {
      const aceptado = Math.random() < 0.6;
      if (aceptado) {
        setProyectosAceptados((prev) => [...prev, { ...project, status: 'completado', entregado: false }]);
        setNotificaciones((prev) => [
          ...prev,
          {
            id: Date.now(),
            mensaje: `Tu postulación a "${project.title}" fue aceptada.`,
            tipo: 'aceptado',
            avatar: 'https://via.placeholder.com/50', // Ejemplo de avatar
            name: 'Empresa XYZ', // Ejemplo de nombre
            time: 'Hace 2 horas', // Ejemplo de tiempo
            leido: false, // Ejemplo de estado de lectura
          },
        ]);
        Alert.alert('🎉 ¡Felicidades!', 'La empresa ha aceptado tu postulación.');
      } else {
        setNotificaciones((prev) => [
          ...prev,
          {
            id: Date.now(),
            mensaje: `Tu postulación a "${project.title}" fue rechazada.`,
            tipo: 'rechazado',
            avatar: 'https://via.placeholder.com/50', // Ejemplo de avatar
            name: 'Empresa XYZ', // Ejemplo de nombre
            time: 'Hace 2 horas', // Ejemplo de tiempo
            leido: false, // Ejemplo de estado de lectura
          },
        ]);
        Alert.alert('😢 Rechazado', 'La empresa no aceptó tu postulación esta vez.');
      }

      setProyectosPostulados((prev) => prev.filter((p) => p.id !== project.id));
    }, 3000);
  };

  const entregarProyecto = (projectId: number) => {
    setProyectosAceptados((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, entregado: true } : p))
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        proyectosDisponibles,
        proyectosPostulados,
        proyectosAceptados,
        notificaciones,
        postularAProyecto,
        entregarProyecto,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};