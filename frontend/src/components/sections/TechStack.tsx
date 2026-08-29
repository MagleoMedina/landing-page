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
import { techStack, type TechGroup } from '../../data/portfolio'

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

function GroupCard({ group }: { group: TechGroup }) {
  const { lang } = useLang()

  return (
    <div className="stack-group">
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
  )
}

export default function TechStack() {
  const { t } = useLang()
  const deploys = techStack.find((group) => group.title.en === 'Deploys')
  const groups = techStack.filter((group) => group.title.en !== 'Deploys')

  return (
    <section id="stack" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">{t('stack.subtitle')}</p>
        <div className="stack-groups">
          {groups.map((group) => (
            <GroupCard key={group.title.es} group={group} />
          ))}
        </div>
        <div className="stack-deploys">
          {deploys && <GroupCard group={deploys} />}
          <GitHubStats />
        </div>
      </div>
    </section>
  )
}