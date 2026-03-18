import './Header.css'
import { useState } from 'react'
import { profileLinks } from '../config/links'

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
          <a href="#about" onClick={closeMenu}>./about</a>
          <a href="#skills" onClick={closeMenu}>./skills</a>
          <a href="#projects" onClick={closeMenu}>./projects</a>
          <a href="#experience" onClick={closeMenu}>./experience</a>
          <a href="#sysmon" onClick={closeMenu}>./sysmon</a>
          <a href="#devops-toolchain" onClick={closeMenu}>./devops</a>
          <a href="#cicd-pipeline" onClick={closeMenu}>./pipelines</a>
          <a href="#infrastructure-metrics" onClick={closeMenu}>./infra</a>
          <a href="#kubernetes-cluster" onClick={closeMenu}>./k8s</a>
          <a href="#infra-defense-game" onClick={closeMenu}>./game</a>
          <a href="#contact" onClick={closeMenu}>./contact</a>
        </nav>

        <div className="header-actions">
          <a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span className="status-pill"><span className="status-dot"></span>AVAILABLE</span>
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
