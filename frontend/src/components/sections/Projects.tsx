import ElectricBorder from '../ElectricBorder'
import { useLang } from '../../use-lang'
import { projectCategories } from '../../data/portfolio'

export default function Projects() {
  const { lang, t } = useLang()

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-subtitle">{t('projects.subtitle')}</p>
        <div className="project-categories">
          {projectCategories.map((category) => (
            <div key={category.id} className="project-category">
              <h3 className="project-category-title" style={{ color: category.color }}>
                {category.title[lang]}
              </h3>
              <div className="projects-grid">
                {category.projects.map((project) => (
                  <ElectricBorder
                    key={project.title.es}
                    color={category.color}
                    borderRadius={16}
                    className="project-card-wrap"
                  >
                    <article className="project-card">
                      <h4 className="project-title">{project.title[lang]}</h4>
                      <p className="project-description">{project.description[lang]}</p>
                      <ul className="project-tags">
                        {project.tags.map((tag) => (
                          <li key={tag} className="chip">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="project-links">
                        <a className="btn btn-small" href={project.repo} target="_blank" rel="noreferrer">
                          {t('projects.repo')}
                        </a>
                        <a className="btn btn-small btn-ghost" href={project.demo} target="_blank" rel="noreferrer">
                          {t('projects.demo')}
                        </a>
                      </div>
                    </article>
                  </ElectricBorder>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}