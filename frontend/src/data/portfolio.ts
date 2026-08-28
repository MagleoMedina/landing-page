export interface ProfileData {
  name: string
  title: string
  handle: string
  status: string
  avatarUrl: string
  email: string
  presentation: {
    greeting: string
    bio: string
    ctaPrimary: { label: string; href: string }
    ctaSecondary: { label: string; href: string }
  }
}

export interface Project {
  title: string
  description: string
  tags: string[]
  repo: string
  demo: string
}

export type ProjectCategoryId = 'web' | 'mobile' | 'games' | 'tools'

export interface ProjectCategory {
  id: ProjectCategoryId
  title: string
  color: string
  projects: Project[]
}

export interface TechItem {
  name: string
  icon: string
  color: string
  light?: boolean
}

export interface TechGroup {
  title: string
  items: TechItem[]
}

export const profile: ProfileData = {
  name: 'Tu Nombre',
  title: 'Desarrollador Full Stack',
  handle: 'tunombre',
  status: 'Disponible',
  avatarUrl: '/assets/demo/person.webp',
  email: 'tu@correo.com',
  presentation: {
    greeting: 'Hola, soy',
    bio: 'Desarrollo aplicaciones web con React en el frontend y Spring Boot / NestJS en el backend. Me apasiona construir productos escalables, limpios y bien diseñados.',
    ctaPrimary: { label: 'Ver proyectos', href: '#proyectos' },
    ctaSecondary: { label: 'Contáctame', href: '#contacto' },
  },
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'web',
    title: 'Proyectos Web',
    color: '#5227FF',
    projects: [
      {
        title: 'Dashboard Web',
        description:
          'Panel de administración con métricas en tiempo real, autenticación y panel de usuarios. Desarrollado con React y una API en Spring Boot.',
        tags: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL'],
        repo: '#',
        demo: '#',
      },
      {
        title: 'E-commerce API',
        description:
          'API REST para una tienda en línea con carrito de compras, pasarela de pagos y catálogo de productos sobre NestJS y MySQL.',
        tags: ['NestJS', 'JavaScript', 'MySQL'],
        repo: '#',
        demo: '#',
      },
    ],
  },
  {
    id: 'mobile',
    title: 'Aplicaciones Móviles',
    color: '#00C2A8',
    projects: [
      {
        title: 'App de Tareas',
        description:
          'Aplicación móvil multiplataforma de gestión de tareas con notificaciones y sincronización en la nube.',
        tags: ['React Native', 'TypeScript', 'SQLite'],
        repo: '#',
        demo: '#',
      },
    ],
  },
  {
    id: 'games',
    title: 'Juegos',
    color: '#FF5C39',
    projects: [
      {
        title: 'Plataformas 2D',
        description:
          'Juego de plataformas con físicas, niveles generados proceduralmente y sistema de puntuación.',
        tags: ['Python', 'Pygame'],
        repo: '#',
        demo: '#',
      },
      {
        title: 'Puzzle Arcade',
        description:
          'Mini juego de puzles directamente en el navegador con tablero de puntuaciones y efectos visuales.',
        tags: ['JavaScript', 'HTML', 'CSS'],
        repo: '#',
        demo: '#',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Herramientas',
    color: '#FFB020',
    projects: [
      {
        title: 'Generador de Reportes',
        description:
          'Herramienta CLI que genera reportes automatizados a partir de datos SQLite con salida en PDF y CSV.',
        tags: ['Java', 'Spring Boot', 'SQLite'],
        repo: '#',
        demo: '#',
      },
    ],
  },
]

export const techStack: TechGroup[] = [
  {
    title: 'Lenguajes',
    items: [
      { name: 'Java', icon: 'java', color: '#EA2D2E' },
      { name: 'Python', icon: 'python', color: '#3776AB' },
      { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React', icon: 'react', color: '#61DAFB' },
      { name: 'CSS', icon: 'css', color: '#1572B6' },
      { name: 'HTML', icon: 'html', color: '#E34F26' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Spring Boot', icon: 'springboot', color: '#6DB33F' },
      { name: 'NestJS', icon: 'nestjs', color: '#E0234E' },
    ],
  },
  {
    title: 'Bases de datos',
    items: [
      { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
      { name: 'MariaDB', icon: 'mariadb', color: '#003545' },
      { name: 'SQLite', icon: 'sqlite', color: '#003B57' },
      { name: 'Turso Cloud', icon: 'turso', color: '#4FF8D2' },
      { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1' },
    ],
  },
  {
    title: 'Herramientas',
    items: [
      { name: 'Git', icon: 'git', color: '#F03C2E' },
      { name: 'Docker', icon: 'docker', color: '#2496ED' },
    ],
  },
  {
    title: 'Deploys',
    items: [
      { name: 'Render', icon: 'render', color: '#000000', light: true },
      { name: 'Vercel', icon: 'vercel', color: '#000000', light: true },
      { name: 'Supabase', icon: 'supabase', color: '#3FCF8E' },
      { name: 'Railway', icon: 'railway', color: '#0B0D0E', light: true },
    ],
  },
]