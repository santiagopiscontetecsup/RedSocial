import React, { createContext, useContext, useState } from 'react';
import projectsData from '@/data/projects'; // tu archivo estático

// Definimos el tipo de proyecto
type Project = typeof projectsData[0];

// Definimos el contexto
interface ProjectContextType {
  proyectosDisponibles: Project[];
  proyectosPostulados: Project[];
  postularAProyecto: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjectContext debe usarse dentro de ProjectProvider');
  return context;
};

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [proyectosDisponibles, setProyectosDisponibles] = useState<Project[]>(projectsData);
  const [proyectosPostulados, setProyectosPostulados] = useState<Project[]>([]);

  const postularAProyecto = (project: Project) => {
    setProyectosPostulados((prev) => [...prev, { ...project, status: 'pendiente' }]);
    setProyectosDisponibles((prev) => prev.filter((p) => p.id !== project.id));
  };

  return (
    <ProjectContext.Provider value={{ proyectosDisponibles, proyectosPostulados, postularAProyecto }}>
      {children}
    </ProjectContext.Provider>
  );
};
