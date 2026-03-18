import './Hero.css'

export default function Hero() {
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
            <span className="chip">AWS Certified Cloud Practitioner</span>
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

          <div className="quick-links">
            <a href="mailto:svsamarsingh@gmail.com">svsamarsingh@gmail.com</a>
            <a href="tel:+918409420691">+91 8409420691</a>
            <a href="https://github.com/samariium" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/samar-singh-42577b1ab" target="_blank" rel="noreferrer">LinkedIn</a>
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
            <a href="#projects" className="btn">Explore Projects</a>
            <a href="#contact" className="btn btn-secondary">Let's Collaborate</a>
            <a href="https://github.com/samariium" className="btn" target="_blank" rel="noreferrer">Open GitHub</a>
          </div>

          <div className="cursor">|</div>
        </div>
      </div>
    </section>
  )
}
