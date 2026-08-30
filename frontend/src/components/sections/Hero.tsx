import Balatro from '../Balatro'
import ProfileCard from '../ProfileCard'
import TextType from '../TextType'
import { useTheme } from '../../use-theme'
import { useLang } from '../../use-lang'
import { profile } from '../../data/portfolio'

export default function Hero() {
  const { theme } = useTheme()
  const { lang } = useLang()

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <Balatro
          color1={theme === 'light' ? '#991b1b' : '#4a148c'}
          color2="#0b3d91"
          color3="#0a0a14"
          pixelFilter={700}
          spinSpeed={12}
        />
      </div>
      <div className="hero-content container">
        <div className="hero-text">
          <p className="hero-greeting">{profile.presentation.greeting[lang]}</p>
          <TextType
            as="h1"
            className="hero-name"
            text={profile.name}
            loop={false}
            initialDelay={300}
            typingSpeed={70}
            showCursor={false}
          />
          <TextType
            as="p"
            className="hero-title"
            text={profile.title[lang]}
            loop={false}
            initialDelay={1400}
            typingSpeed={70}
            cursorCharacter="|"
            cursorClassName="hero-cursor"
          />
          <p className="hero-bio">{profile.presentation.bio[lang]}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={profile.presentation.ctaPrimary.href}>
              {profile.presentation.ctaPrimary.label[lang]}
            </a>
            <a className="btn btn-secondary" href={profile.presentation.ctaSecondary.href}>
              {profile.presentation.ctaSecondary.label[lang]}
            </a>
          </div>
        </div>
        <div className="hero-card">
          <ProfileCard
            name="Javi A. Torres"
            title="Software Engineer"
            showUserInfo={false}
            enableTilt
            enableMobileTilt={false}
            avatarUrl="/assets/demo/person.webp"
            iconUrl="/assets/demo/iconpattern.png"
            grainUrl="/assets/demo/grain.webp"
            behindGlowEnabled
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>
      </div>
    </section>
  )
}