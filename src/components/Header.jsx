import './Header.css'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="header">
      <div className="container header-content">
        <a href="#top" className="logo" aria-label="Go to top">
          <span className="bracket">&lt;</span>
          <span>Samar Singh</span>
          <span className="bracket">/&gt;</span>
        </a>
        
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="header-actions">
          <a href="https://github.com/samariium" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/samar-singh-42577b1ab" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        <button 
          aria-label="Toggle navigation"
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  )
}
