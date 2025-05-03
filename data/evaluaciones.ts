export type Evaluation = {
  id: number;
  reto: string;
  fechaEntrega: string;
  calificacion: number;
  comentarios: string;
  estado: 'En proceso' | 'Rechazado' | 'Aprobado';
};

const evaluations: Evaluation[] = [
  {
    id: 1,
    reto: 'Diseño de App Móvil para E-commerce',
    fechaEntrega: '17/01/2025',
    calificacion: 5,
    comentarios: 'Excelente trabajo, diseño limpio y funcional.',
    estado: 'Aprobado',
  },
  {
    id: 2,
    reto: 'Rediseño de Plataforma de Reservas',
    fechaEntrega: '20/02/2025',
    calificacion: 4,
    comentarios: 'Buen trabajo, pero faltaron algunos detalles.',
    estado: 'Aprobado',
  },
  {
    id: 3,
    reto: 'Desarrollo de Dashboard de Análisis',
    fechaEntrega: '15/03/2025',
    calificacion: 2,
    comentarios: 'El proyecto no cumplió con los requisitos.',
    estado: 'Rechazado',
  },
];

export default evaluations;