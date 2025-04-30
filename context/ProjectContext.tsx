// ProjectContext.tsx
import React, { createContext, useContext, useState } from 'react';
import projectsData from '@/data/projects';
import { Alert } from 'react-native';

// 👇 Define tipo Project explícito (si no lo has hecho)
export type Project = typeof projectsData[0];

interface Notificacion {
  id: number;
  mensaje: string;
  tipo: 'aceptado' | 'rechazado';
}

interface ProjectContextType {
  proyectosDisponibles: Project[];
  proyectosPostulados: Project[];
  proyectosAceptados: Project[];
  notificaciones: Notificacion[];
  postularAProyecto: (project: Project) => void;
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
    setProyectosPostulados((prev) => [...prev, { ...project, status: 'pendiente' }]);
    setProyectosDisponibles((prev) => prev.filter((p) => p.id !== project.id));
  
    setTimeout(() => {
      const aceptado = Math.random() < 0.6;
  
      if (aceptado) {
        setProyectosAceptados((prev) => [...prev, { ...project, status: 'completado' }]);
        setNotificaciones((prev) => [
          ...prev,
          { id: Date.now(), mensaje: `Tu postulación a "${project.title}" fue aceptada.`, tipo: 'aceptado' },
        ]);
        Alert.alert(
          '🎉 ¡Felicidades!',
          'La empresa ha aceptado tu postulación. El proyecto se ha añadido a tus proyectos.',
          [{ text: 'Aceptar' }]
        );
      } else {
        setNotificaciones((prev) => [
          ...prev,
          { id: Date.now(), mensaje: `Tu postulación a "${project.title}" fue rechazada.`, tipo: 'rechazado' },
        ]);
        Alert.alert(
          '😢 Postulación rechazada',
          'Lamentablemente, la empresa no ha aceptado tu postulación esta vez.',
          [{ text: 'Aceptar' }]
        );
      }
  
      setProyectosPostulados((prev) => prev.filter((p) => p.id !== project.id));
    }, 3000);
  };
  return (
    <ProjectContext.Provider
      value={{ proyectosDisponibles, proyectosPostulados, proyectosAceptados, notificaciones, postularAProyecto }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
