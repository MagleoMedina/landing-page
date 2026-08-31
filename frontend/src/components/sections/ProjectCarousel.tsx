import { useCallback, useEffect, useRef, type CSSProperties } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import ElectricBorder from '../ElectricBorder'
import { useLang } from '../../use-lang'
import type { Project, ProjectCategory } from '../../data/portfolio'
import { TagIcon } from '../TagIcon'
import LazyImage from '../LazyImage'

interface ProjectCarouselProps {
  category: ProjectCategory
}

const CARD_GAP = 24
const AUTOPLAY_MS = 4200

export default function ProjectCarousel({ category }: ProjectCarouselProps) {
  const { lang } = useLang()
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  const stepSize = useCallback(() => {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    return (card?.offsetWidth ?? 0) + CARD_GAP
  }, [])

  const slideTo = useCallback(
    (dir: -1 | 1) => {
      const track = trackRef.current
      if (!track) return
      const step = stepSize()
      const maxScroll = track.scrollWidth - track.clientWidth
      if (step <= CARD_GAP || maxScroll <= 0) return

      const page = Math.round(track.scrollLeft / step)
      const lastPage = Math.round(maxScroll / step)
      let next = page + dir
      if (next > lastPage) next = 0
      if (next < 0) next = lastPage
      track.scrollTo({ left: Math.min(next * step, maxScroll), behavior: 'smooth' })
    },
    [stepSize]
  )

  const advanceNext = useCallback(() => slideTo(1), [slideTo])
  const advancePrev = useCallback(() => slideTo(-1), [slideTo])

  const pause = useCallback(() => {
    pausedRef.current = true
  }, [])

  const resume = useCallback(() => {
    pausedRef.current = false
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.hidden || pausedRef.current) return
      slideTo(1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [slideTo])

  const cardClass = 'project-card-wrap project-track-card'

  return (
    <div className="project-category">
      <div className="project-category-head">
        <h3 className="project-category-title" style={{ color: category.color }}>
          {category.title[lang]}
        </h3>
        <div className="project-nav">
          <button
            type="button"
            className="project-nav-btn"
            aria-label={`${category.title[lang]} · anterior`}
            onClick={advancePrev}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="project-nav-btn"
            aria-label={`${category.title[lang]} · siguiente`}
            onClick={advanceNext}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="projects-carousel"
        style={{ '--card-gap': `${CARD_GAP}px` } as CSSProperties}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerCancel={resume}
      >
        {category.projects.map((project) => (
          <ElectricBorder
            key={project.title.es}
            color={category.color}
            borderRadius={16}
            speed={1.8}
            className={cardClass}
          >
            <ProjectCard project={project} />
          </ElectricBorder>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang()
  return (
    <article className="project-card">
      <h4 className="project-title">{project.title[lang]}</h4>
      <p className="project-description">{project.description[lang]}</p>
      {project.image && (
        <LazyImage className="project-image" src={project.image} alt={project.title[lang]} loading="lazy" />
      )}
      <ul className="project-tags">
        {project.tags.map((tag) => (
          <li key={tag} className="chip" title={tag}>
            <TagIcon tag={tag} />
          </li>
        ))}
      </ul>
      {project.repo && (
        <div className="project-links">
          <a className="btn btn-small" href={project.repo} target="_blank" rel="noreferrer">
            {t('projects.repo')}
          </a>
        </div>
      )}
    </article>
  )
}