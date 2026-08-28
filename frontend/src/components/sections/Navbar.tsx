import PillNav from '../PillNav'
import { profile } from '../../data/portfolio'

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'Contáctame', href: '#contacto' },
]

export default function Navbar() {
  return (
    <PillNav
      logo={profile.avatarUrl}
      logoAlt={profile.name}
      items={NAV_ITEMS}
      baseColor="var(--pillnav-base)"
      pillColor="var(--pillnav-pill)"
      pillTextColor="var(--pillnav-pill-text)"
      hoveredPillTextColor="var(--pillnav-hover-text)"
    />
  )
}