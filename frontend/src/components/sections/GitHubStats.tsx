import { useLang } from '../../use-lang'
import { useTheme } from '../../use-theme'
import LazyImage from '../LazyImage'

export default function GitHubStats() {
  const { lang, t } = useLang()
  const { theme } = useTheme()
  const statsBase = `https://streak-stats.demolab.com/?user=MagleoMedina&locale=${lang}&mode=daily&hide_border=false&border_radius=5&order=3`
  const statsLight = `${statsBase}&theme=default`
  const statsDark = `${statsBase}&theme=dark`

  return (
    <div className="stack-gstats">
      <h3 className="stack-group-title">{t('stack.github')}</h3>
      <LazyImage
        src={theme === 'dark' ? statsDark : statsLight}
        alt={t('stack.githubAlt')}
        width="495"
        height="195"
        loading="lazy"
      />
    </div>
  )
}