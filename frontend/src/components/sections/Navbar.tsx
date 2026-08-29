import { useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../../use-theme'
import { useLang } from '../../use-lang'
import { profile } from '../../data/portfolio'

const LINKS = [
  { href: '#inicio', key: 'nav.home' },
  { href: '#proyectos', key: 'nav.projects' },
  { href: '#stack', key: 'nav.tech' },
  { href: '#contacto', key: 'nav.contact' },
] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()
  const isDark = theme === 'dark'

  return (
    <header className="nav">
      <nav className="nav-inner container">
        <a href="#inicio" className="nav-brand" onClick={() => setOpen(false)}>
          {profile.name}
        </a>
        <ul className={open ? 'nav-links open' : 'nav-links'}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            className="lang-toggle"
            type="button"
            aria-label={lang === 'es' ? t('nav.langToEn') : t('nav.langToEs')}
            onClick={toggleLang}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            className="theme-toggle"
            type="button"
            aria-label={isDark ? t('nav.themeToLight') : t('nav.themeToDark')}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
          </button>
          <button
            className="nav-toggle"
            type="button"
            aria-label={t('nav.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </nav>
    </header>
  )
}