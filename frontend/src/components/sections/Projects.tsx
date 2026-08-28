import ElectricBorder from '../ElectricBorder'
import { projectCategories } from '../../data/portfolio'

export default function Projects() {
  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2 className="section-title">Proyectos destacados</h2>
        <p className="section-subtitle">Una selección de los proyectos en los que he trabajado.</p>
        <div className="project-categories">
          {projectCategories.map((category) => (
            <div key={category.id} className="project-category">
              <h3 className="project-category-title" style={{ color: category.color }}>
                {category.title}
              </h3>
              <div className="projects-grid">
                {category.projects.map((project) => (
                  <ElectricBorder
                    key={project.title}
                    color={category.color}
                    borderRadius={16}
                    className="project-card-wrap"
                  >
                    <article className="project-card">
                      <h4 className="project-title">{project.title}</h4>
                      <p className="project-description">{project.description}</p>
                      <ul className="project-tags">
                        {project.tags.map((tag) => (
                          <li key={tag} className="chip">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="project-links">
                        <a className="btn btn-small" href={project.repo} target="_blank" rel="noreferrer">
                          Repositorio
                        </a>
                        <a className="btn btn-small btn-ghost" href={project.demo} target="_blank" rel="noreferrer">
                          Demo
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