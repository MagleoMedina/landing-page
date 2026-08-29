import { useCallback, useEffect, useRef, type CSSProperties } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import ElectricBorder from '../ElectricBorder'
import { useLang } from '../../use-lang'
import type { Project, ProjectCategory } from '../../data/portfolio'
import { animateScrollTo, ANIM_DURATION } from './animatedScroll'

interface ProjectCarouselProps {
  category: ProjectCategory
}

const AUTOPLAY_DELAY = 4500
const CARD_GAP = 24
const NORMALIZE_DELAY = 150

export default function ProjectCarousel({ category }: ProjectCarouselProps) {
  const { lang } = useLang()
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const animatingRef = useRef(false)
  const animationCancelRef = useRef<(() => void) | null>(null)

  const originWidth = useCallback(() => {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    const cardWidth = card?.offsetWidth ?? 0
    const count = category.projects.length
    return count * cardWidth + (count - 1) * CARD_GAP
  }, [category.projects.length])

  const wrapIfCloned = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const width = originWidth()
    if (width > 0 && track.scrollLeft >= width) {
      track.scrollLeft -= width
    }
  }, [originWidth])

  const advanceNext = useCallback(() => {
    const track = trackRef.current
    if (!track || animatingRef.current) return
    const card = track.firstElementChild as HTMLElement | null
    if (!card) return
    const maxScroll = track.scrollWidth - track.clientWidth
    if (maxScroll <= 0) return

    const step = card.offsetWidth + CARD_GAP
    const target = Math.min(track.scrollLeft + step, maxScroll)

    animationCancelRef.current?.()
    animatingRef.current = true
    animationCancelRef.current = animateScrollTo(track, target, ANIM_DURATION, () => {
      animatingRef.current = false
      wrapIfCloned()
    })
  }, [wrapIfCloned])

  const advancePrev = useCallback(() => {
    const track = trackRef.current
    if (!track || animatingRef.current) return
    const card = track.firstElementChild as HTMLElement | null
    if (!card) return

    const step = card.offsetWidth + CARD_GAP
    let target = track.scrollLeft - step
    if (target < 0) {
      const width = originWidth()
      if (width > 0) {
        track.scrollLeft = width
        target = width - step
      } else {
        target = 0
      }
    }

    animationCancelRef.current?.()
    animatingRef.current = true
    animationCancelRef.current = animateScrollTo(track, target, ANIM_DURATION, () => {
      animatingRef.current = false
    })
  }, [originWidth])

  const pause = useCallback(() => {
    animationCancelRef.current?.()
    animatingRef.current = false
    pausedRef.current = true
  }, [])

  const resume = useCallback(() => {
    pausedRef.current = false
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        advanceNext()
      }
    }, AUTOPLAY_DELAY)
    return () => window.clearInterval(id)
  }, [advanceNext])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let timeout: number | undefined
    const onScroll = () => {
      window.clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        const width = originWidth()
        if (width > 0 && track.scrollLeft >= width) {
          track.scrollLeft -= width
        }
      }, NORMALIZE_DELAY)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timeout)
      track.removeEventListener('scroll', onScroll)
    }
  }, [originWidth])

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
            className={cardClass}
          >
            <ProjectCard project={project} />
          </ElectricBorder>
        ))}
        <div className="projects-clone" aria-hidden="true" inert>
          {category.projects.map((project) => (
            <ElectricBorder
              key={`${project.title.es}-clone`}
              color={category.color}
              borderRadius={16}
              className={cardClass}
            >
              <ProjectCard project={project} />
            </ElectricBorder>
          ))}
        </div>
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
      <ul className="project-tags">
        {project.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>
      <div className="project-links">
        {project.repo && (
          <a className="btn btn-small" href={project.repo} target="_blank" rel="noreferrer">
            {t('projects.repo')}
          </a>
        )}
        {project.demo && (
          <a className="btn btn-small btn-ghost" href={project.demo} target="_blank" rel="noreferrer">
            {t('projects.demo')}
          </a>
        )}
      </div>
    </article>
  )
}