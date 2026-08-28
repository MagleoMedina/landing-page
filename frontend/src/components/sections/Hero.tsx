import Balatro from '../Balatro'
import ProfileCard from '../ProfileCard'
import { profile } from '../../data/portfolio'

export default function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <Balatro color1="#4a148c" color2="#0b3d91" color3="#0a0a14" pixelFilter={700} />
      </div>
      <div className="hero-content container">
        <div className="hero-text">
          <p className="hero-greeting">{profile.presentation.greeting}</p>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-bio">{profile.presentation.bio}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={profile.presentation.ctaPrimary.href}>
              {profile.presentation.ctaPrimary.label}
            </a>
            <a className="btn btn-secondary" href={profile.presentation.ctaSecondary.href}>
              {profile.presentation.ctaSecondary.label}
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