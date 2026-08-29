import { useTheme } from '../../use-theme'

const STATS_BASE = 'https://streak-stats.demolab.com/?user=MagleoMedina&locale=es&mode=daily&hide_border=false&border_radius=5&order=3'
const STATS_LIGHT = `${STATS_BASE}&theme=default`
const STATS_DARK = `${STATS_BASE}&theme=dark`

export default function GitHubStats() {
  const { theme } = useTheme()

  return (
    <div className="stack-gstats">
      <h3 className="stack-group-title">Estadísticas de GitHub</h3>
      <img
        src={theme === 'dark' ? STATS_DARK : STATS_LIGHT}
        alt="Rachas y contribuciones de GitHub de MagleoMedina"
        width="495"
        height="195"
        loading="lazy"
      />
    </div>
  )
}