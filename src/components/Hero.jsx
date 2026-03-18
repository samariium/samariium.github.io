import './Hero.css'
import { useEffect, useState } from 'react'
import { profileLinks } from '../config/links'

export default function Hero() {
  const typingLines = [
    'terraform plan --target=portfolio_infra',
    'kubectl get pods -n production',
    'gh workflow run deploy.yml',
  ]

  const [lineIndex, setLineIndex] = useState(0)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const line = typingLines[lineIndex]

    if (typedText.length < line.length) {
      const timer = setTimeout(() => {
        setTypedText(line.slice(0, typedText.length + 1))
      }, 48)
      return () => clearTimeout(timer)
    }

    const pause = setTimeout(() => {
      setTypedText('')
      setLineIndex((value) => (value + 1) % typingLines.length)
    }, 1300)

    return () => clearTimeout(pause)
  }, [lineIndex, typedText])

  return (
    <section className="hero reveal">
      <div className="container hero-content">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="button red"></div>
            <div className="button yellow"></div>
            <div className="button green"></div>
          </div>
          <span className="terminal-path">samar@devops:~/portfolio</span>
        </div>
        
        <div className="hero-text">
          <div className="chips-row">
            <span className="chip">DevOps Intern at Xebia</span>
          </div>

          <h1>
            <span className="command">$ whoami</span>
            <span className="welcome">Samar Singh</span>
          </h1>
          
          <p className="subtitle">
            Computer Science undergraduate focused on cloud-native delivery,
            CI/CD automation, and reliable DevOps systems.
          </p>

          <div className="typing-console" aria-live="polite">
            <span className="typing-prompt">$</span>
            <span className="typing-text">{typedText}</span>
            <span className="typing-caret"></span>
          </div>

          <div className="quick-links">
            <a href={profileLinks.email}>svsamarsingh@gmail.com</a>
            <a href={profileLinks.phone}>+91 8409420691</a>
            <a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-label">01</span>
              <span className="stat-value">Docker-based deployment setup from 2h to under 15m</span>
            </div>
            <div className="stat">
              <span className="stat-label">02</span>
              <span className="stat-value">Release speed improved by 60% with Jenkins + Docker</span>
            </div>
            <div className="stat">
              <span className="stat-label">03</span>
              <span className="stat-value">Monitoring and response workflow sustaining 99% uptime</span>
            </div>
            <div className="stat">
              <span className="stat-label">04</span>
              <span className="stat-value">Hands-on with AWS, Kubernetes, Terraform, and Ansible</span>
            </div>
          </div>

          <div className="cta-buttons">
            <a href="#projects" className="btn">ls -la projects</a>
            <a href="#contact" className="btn btn-secondary">Let's Collaborate</a>
            <a href={profileLinks.github} className="btn" target="_blank" rel="noreferrer">git clone profile</a>
          </div>

          <div className="cursor">|</div>
        </div>
      </div>
    </section>
  )
}
