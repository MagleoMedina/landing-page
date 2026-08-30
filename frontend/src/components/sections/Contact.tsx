import { useState, type CSSProperties, type FormEvent } from 'react'
import { FaFacebook, FaFilePdf, FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { sendMessage } from '../ContactService'
import { socials } from '../../data/portfolio'
import { useLang } from '../../use-lang'

type Status = 'idle' | 'sending' | 'success' | 'error'

const CV_SPANISH =
  'https://github.com/MagleoMedina/MagleoMedina/releases/download/CV/CV_MAGLEO_Linkldn.-.Espanol.pdf'
const CV_ENGLISH =
  'https://github.com/MagleoMedina/MagleoMedina/releases/download/CV/CV_MAGLEO_Linkldn.-.English.pdf'

const SOCIAL_ICONS: Record<string, IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  telegram: FaTelegram,
  facebook: FaFacebook,
}

export default function Contact() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await sendMessage({ name, email, message })
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
      setError(t('contact.errorGeneric'))
    }
  }

  return (
    <section id="contacto" className="section section-alt">
      <div className="container">
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.subtitlePre')}</p>
        <div className="contact-card">
          <div className="contact-layout">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="contact-name">{t('contact.name')}</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">{t('contact.email')}</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">{t('contact.message')}</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>
              {status === 'success' && (
                <p className="form-feedback form-success">{t('contact.success')}</p>
              )}
              {status === 'error' && <p className="form-feedback form-error">{error}</p>}
            </form>
            <aside className="cv-side">
              <h3 className="cv-title">{t('contact.cv')}</h3>
              <div className="cv-buttons">
                <a
                  className="btn btn-primary cv-btn"
                  href={CV_SPANISH}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFilePdf aria-hidden="true" />
                  {t('contact.cvSpanish')}
                </a>
                <a className="btn cv-btn" href={CV_ENGLISH} download target="_blank" rel="noreferrer">
                  <FaFilePdf aria-hidden="true" />
                  {t('contact.cvEnglish')}
                </a>
              </div>
            </aside>
          </div>
        </div>
        <div className="socials">
          <h3 className="socials-title">{t('contact.socials')}</h3>
          <ul className="socials-grid">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon]
              return (
                <li key={social.name}>
                  <a
                    className="social-link"
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    title={social.name}
                    aria-label={social.name}
                    data-light={social.light ? 'true' : undefined}
                    style={{ '--social': social.color } as CSSProperties}
                  >
                    <Icon size={20} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}