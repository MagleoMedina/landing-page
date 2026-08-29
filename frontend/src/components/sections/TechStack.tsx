import type { CSSProperties, ReactNode } from 'react'
import {
  SiCss,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMariadb,
  SiMysql,
  SiNestjs,
  SiPostgresql,
  SiPython,
  SiRailway,
  SiReact,
  SiRender,
  SiSpringboot,
  SiSqlite,
  SiSupabase,
  SiTurso,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import JavaIcon, { type JavaIconProps } from '../icons/JavaIcon'
import GitHubStats from './GitHubStats'
import { useLang } from '../../use-lang'
import { techStack } from '../../data/portfolio'

type TechIcon = (props: JavaIconProps) => ReactNode

const ICONS: Record<string, TechIcon> = {
  java: JavaIcon,
  python: SiPython,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  css: SiCss,
  html: SiHtml5,
  springboot: SiSpringboot,
  nestjs: SiNestjs,
  mysql: SiMysql,
  mariadb: SiMariadb,
  sqlite: SiSqlite,
  turso: SiTurso,
  postgresql: SiPostgresql,
  git: SiGit,
  docker: SiDocker,
  render: SiRender,
  vercel: SiVercel,
  supabase: SiSupabase,
  railway: SiRailway,
}

export default function TechStack() {
  const { lang, t } = useLang()

  return (
    <section id="stack" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">{t('stack.subtitle')}</p>
        <div className="stack-groups">
          {techStack.map((group) => (
            <div key={group.title.es} className="stack-group">
              <h3 className="stack-group-title">{group.title[lang]}</h3>
              <ul className="stack-items">
                {group.items.map((item) => {
                  const Icon = ICONS[item.icon]
                  return (
                    <li
                      key={item.name}
                      className="tech-icon"
                      title={item.name}
                      aria-label={item.name}
                      data-light={item.light ? 'true' : undefined}
                      style={{ '--tech': item.color } as CSSProperties}
                    >
                      <Icon size={30} />
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <GitHubStats />
      </div>
    </section>
  )
}