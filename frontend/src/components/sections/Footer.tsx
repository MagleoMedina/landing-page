import { profile } from '../../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. Hecho con React, Vite y ReactBits.
        </p>
      </div>
    </footer>
  )
}