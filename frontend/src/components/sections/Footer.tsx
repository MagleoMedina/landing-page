import { useLang } from '../../use-lang'
import { profile } from '../../data/portfolio'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t('footer.madeWith')}
        </p>
      </div>
    </footer>
  )
}