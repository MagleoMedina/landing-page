import { useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useTheme } from '../../use-theme'
import { profile } from '../../data/portfolio'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#stack', label: 'Tech Stack' },
  { href: '#contacto', label: 'Contáctame' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
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
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            {isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
          </button>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Abrir menú"
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