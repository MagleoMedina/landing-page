import type { Localized } from '../i18n/messages'

export interface ProfileData {
  name: string
  title: Localized
  handle: string
  status: string
  avatarUrl: string
  email: string
  presentation: {
    greeting: Localized
    bio: Localized
    ctaPrimary: { label: Localized; href: string }
    ctaSecondary: { label: Localized; href: string }
  }
}

export interface Project {
  title: Localized
  description: Localized
  tags: string[]
  repo: string
  demo: string
}

export type ProjectCategoryId = 'web' | 'mobile' | 'games' | 'tools'

export interface ProjectCategory {
  id: ProjectCategoryId
  title: Localized
  color: string
  projects: Project[]
}

export interface TechItem {
  name: string
  icon: string
  color: string
  light?: boolean
}

export interface SocialLink {
  name: string
  icon: string
  color: string
  url: string
  light?: boolean
}

export interface TechGroup {
  title: Localized
  items: TechItem[]
}

export const profile: ProfileData = {
  name: 'Tu Nombre',
  title: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
  handle: 'tunombre',
  status: 'Disponible',
  avatarUrl: '/assets/demo/person.webp',
  email: 'tu@correo.com',
  presentation: {
    greeting: { es: 'Hola, soy', en: "Hi, I'm" },
    bio: {
      es: 'Desarrollo aplicaciones web con React en el frontend y Spring Boot / NestJS en el backend. Me apasiona construir productos escalables, limpios y bien diseñados.',
      en: "I build web applications with React on the frontend and Spring Boot / NestJS on the backend. I'm passionate about building scalable, clean and well-designed products.",
    },
    ctaPrimary: { label: { es: 'Ver proyectos', en: 'View projects' }, href: '#proyectos' },
    ctaSecondary: { label: { es: 'Contáctame', en: 'Contact' }, href: '#contacto' },
  },
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'web',
    title: { es: 'Proyectos Web', en: 'Web Projects' },
    color: '#5227FF',
    projects: [
      {
        title: { es: 'Dashboard Web', en: 'Dashboard Web' },
        description: {
          es: 'Panel de administración con métricas en tiempo real, autenticación y panel de usuarios. Desarrollado con React y una API en Spring Boot.',
          en: 'Admin dashboard with real-time metrics, authentication and a user panel. Built with React and a Spring Boot API.',
        },
        tags: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL'],
        repo: '#',
        demo: '#',
      },
      {
        title: { es: 'E-commerce API', en: 'E-commerce API' },
        description: {
          es: 'API REST para una tienda en línea con carrito de compras, pasarela de pagos y catálogo de productos sobre NestJS y MySQL.',
          en: 'REST API for an online store with shopping cart, payment gateway and product catalog built on NestJS and MySQL.',
        },
        tags: ['NestJS', 'JavaScript', 'MySQL'],
        repo: '#',
        demo: '#',
      },
    ],
  },
  {
    id: 'mobile',
    title: { es: 'Aplicaciones Móviles', en: 'Mobile Apps' },
    color: '#00C2A8',
    projects: [
      {
        title: { es: 'App de Tareas', en: 'Task App' },
        description: {
          es: 'Aplicación móvil multiplataforma de gestión de tareas con notificaciones y sincronización en la nube.',
          en: 'Cross-platform mobile app for task management with notifications and cloud sync.',
        },
        tags: ['React Native', 'TypeScript', 'SQLite'],
        repo: '#',
        demo: '#',
      },
    ],
  },
  {
    id: 'games',
    title: { es: 'Juegos', en: 'Games' },
    color: '#FF5C39',
    projects: [
      {
        title: { es: 'Plataformas 2D', en: '2D Platformer' },
        description: {
          es: 'Juego de plataformas con físicas, niveles generados proceduralmente y sistema de puntuación.',
          en: 'Platformer game with physics, procedurally generated levels and a scoring system.',
        },
        tags: ['Python', 'Pygame'],
        repo: '#',
        demo: '#',
      },
      {
        title: { es: 'Puzzle Arcade', en: 'Puzzle Arcade' },
        description: {
          es: 'Mini juego de puzles directamente en el navegador con tablero de puntuaciones y efectos visuales.',
          en: 'Mini puzzle game right in the browser with a scoreboard and visual effects.',
        },
        tags: ['JavaScript', 'HTML', 'CSS'],
        repo: '#',
        demo: '#',
      },
    ],
  },
  {
    id: 'tools',
    title: { es: 'Herramientas', en: 'Tools' },
    color: '#FFB020',
    projects: [
      {
        title: { es: 'Generador de Reportes', en: 'Report Generator' },
        description: {
          es: 'Herramienta CLI que genera reportes automatizados a partir de datos SQLite con salida en PDF y CSV.',
          en: 'CLI tool that generates automated reports from SQLite data with PDF and CSV output.',
        },
        tags: ['Java', 'Spring Boot', 'SQLite'],
        repo: '#',
        demo: '#',
      },
    ],
  },
]

export const socials: SocialLink[] = [
  { name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2', url: 'https://www.linkedin.com/in/magleo-medina-b83877375/' },
  { name: 'GitHub', icon: 'github', color: '#181717', url: 'https://github.com/MagleoMedina', light: true },
  { name: 'WhatsApp', icon: 'whatsapp', color: '#25D366', url: 'https://wa.me/+584129323072' },
  { name: 'Instagram', icon: 'instagram', color: '#E4405F', url: 'https://www.instagram.com/magleo2003/' },
  { name: 'Telegram', icon: 'telegram', color: '#26A5E4', url: 'https://t.me/magleoM' },
  { name: 'Facebook', icon: 'facebook', color: '#1877F2', url: 'https://www.facebook.com/profile.php?id=100078196646967' },
]

export const techStack: TechGroup[] = [
  {
    title: { es: 'Lenguajes', en: 'Languages' },
    items: [
      { name: 'Java', icon: 'java', color: '#EA2D2E' },
      { name: 'Python', icon: 'python', color: '#3776AB' },
      { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
    ],
  },
  {
    title: { es: 'Frontend', en: 'Frontend' },
    items: [
      { name: 'React', icon: 'react', color: '#61DAFB' },
      { name: 'CSS', icon: 'css', color: '#1572B6' },
      { name: 'HTML', icon: 'html', color: '#E34F26' },
    ],
  },
  {
    title: { es: 'Backend', en: 'Backend' },
    items: [
      { name: 'Spring Boot', icon: 'springboot', color: '#6DB33F' },
      { name: 'NestJS', icon: 'nestjs', color: '#E0234E' },
    ],
  },
  {
    title: { es: 'Bases de datos', en: 'Databases' },
    items: [
      { name: 'MySQL', icon: 'mysql', color: '#4479A1' },
      { name: 'MariaDB', icon: 'mariadb', color: '#003545' },
      { name: 'SQLite', icon: 'sqlite', color: '#003B57' },
      { name: 'Turso Cloud', icon: 'turso', color: '#4FF8D2' },
      { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1' },
    ],
  },
  {
    title: { es: 'Herramientas', en: 'Tools' },
    items: [
      { name: 'Git', icon: 'git', color: '#F03C2E' },
      { name: 'Docker', icon: 'docker', color: '#2496ED' },
    ],
  },
  {
    title: { es: 'Deploys', en: 'Deploys' },
    items: [
      { name: 'Render', icon: 'render', color: '#000000', light: true },
      { name: 'Vercel', icon: 'vercel', color: '#000000', light: true },
      { name: 'Supabase', icon: 'supabase', color: '#3FCF8E' },
      { name: 'Railway', icon: 'railway', color: '#0B0D0E', light: true },
    ],
  },
]