import { useState, type FormEvent } from 'react'
import { sendMessage } from '../ContactService'
import { profile } from '../../data/portfolio'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
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
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'No se pudo enviar el mensaje.')
    }
  }

  return (
    <section id="contacto" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Contáctame</h2>
        <p className="section-subtitle">
          ¿Tienes un proyecto en mente o quieres saludar? Escríbeme a{' '}
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>
        <div className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="contact-name">Nombre</label>
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
              <label htmlFor="contact-email">Email</label>
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
              <label htmlFor="contact-message">Mensaje</label>
              <textarea
                id="contact-message"
                rows={5}
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
            {status === 'success' && (
              <p className="form-feedback form-success">¡Mensaje enviado! Te responderé pronto.</p>
            )}
            {status === 'error' && <p className="form-feedback form-error">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}