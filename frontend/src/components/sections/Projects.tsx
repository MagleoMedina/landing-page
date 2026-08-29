import ProjectCarousel from './ProjectCarousel'
import { useLang } from '../../use-lang'
import { useProjects } from '../../use-projects'
import type { ProjectCategory } from '../../data/portfolio'

function ProjectSkeleton() {
  return (
    <div className="project-card-wrap project-card-skeleton" aria-hidden="true">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line" />
      <div className="skeleton-line skeleton-short" />
    </div>
  )
}

export default function Projects() {
  const { t } = useLang()
  const { categories, status, retry } = useProjects()

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-subtitle">{t('projects.subtitle')}</p>
        {status === 'loading' && (
          <div className="project-categories" role="status" aria-live="polite">
            <div className="projects-grid">
              <ProjectSkeleton />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </div>
            <span className="projects-loading" aria-hidden="true">
              {t('projects.loading')}
            </span>
          </div>
        )}
        {status === 'error' && (
          <div className="projects-error" role="alert">
            <p>{t('projects.error')}</p>
            <button type="button" className="btn" onClick={retry}>
              {t('projects.retry')}
            </button>
          </div>
        )}
        {status === 'ready' && (
          <div className="project-categories">
            {categories.map((category: ProjectCategory) => (
              <ProjectCarousel key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}