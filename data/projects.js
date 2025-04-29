const projects = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: 'Desarrollador Backend (Node.js)',
    description:
      'Estamos buscando un Desarrollador Backend (Node.js) con experiencia en la creación de APIs escalables y optimizadas. Te unirás a un equipo dinámico que desarrolla soluciones innovadoras para el sector fintech.',
    deadline: '2025-08-20T23:59:59',
    status: 'pendiente', // se sigue usando como string, no booleano
    numero_participantes: 15,
    id_empresa: 101,
    id_tipo_recompensa: 2,
    salario: 'USD 2,500 - 3,500 / mes',
    ubicacion: '100% Remoto',
    contrato: 'Full-time',
    publicado: 'Hace 18 horas',
    certificado: true,
    tecnologias: ['React.js', 'Node.js', 'AWS', 'MySQL', 'OAuth'],
    responsabilidades: [
      'Desarrollar y mantener APIs RESTful utilizando Node.js y Express.js.',
      'Optimizar la base de datos en MongoDB y PostgreSQL.',
      'Implementar autenticación y seguridad en los endpoints.',
      'Integrar sistemas de terceros mediante API.',
      'Escribir código limpio y documentado siguiendo buenas prácticas.'
    ]
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: 'Aplicación Web para Gestión Interna',
    description:
      'Proyecto para desarrollar una plataforma web que gestione los procesos internos de la empresa y mejore la eficiencia operativa.',
    deadline: '2025-08-20T23:59:59',
    status: 'completado',
    numero_participantes: 8,
    id_empresa: 102,
    id_tipo_recompensa: 1,
    salario: 'USD 2,000 - 2,800 / mes',
    ubicacion: 'Remoto parcial',
    contrato: 'Por proyecto',
    publicado: 'Hace 2 días',
    certificado: false,
    tecnologias: ['JavaScript', 'React', 'Firebase'],
    responsabilidades: [
      'Desarrollar componentes interactivos con React.',
      'Conectar la app con servicios en la nube usando Firebase.',
      'Optimizar la experiencia de usuario.',
      'Implementar pruebas unitarias y de integración.'
    ]
  }
];

export default projects;
