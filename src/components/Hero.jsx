import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="button red"></div>
            <div className="button yellow"></div>
            <div className="button green"></div>
          </div>
          <span className="terminal-path">~/portfolio</span>
        </div>
        
        <div className="hero-text">
          <h1>
            <span className="command">$ </span>
            <span className="welcome">Welcome to my DevOps Portfolio</span>
          </h1>
          
          <p className="subtitle">
            <span className="command">❯ </span>
            Passionate about Infrastructure, Automation & Cloud Solutions
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-label">$</span>
              <span className="stat-value">Infrastructure as Code</span>
            </div>
            <div className="stat">
              <span className="stat-label">$</span>
              <span className="stat-value">CI/CD Pipelines</span>
            </div>
            <div className="stat">
              <span className="stat-label">$</span>
              <span className="stat-value">Cloud Deployment</span>
            </div>
            <div className="stat">
              <span className="stat-label">$</span>
              <span className="stat-value">Container Orchestration</span>
            </div>
          </div>

          <div className="cta-buttons">
            <a href="#projects" className="btn">View My Work</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>

          <div className="cursor">|</div>
        </div>
      </div>
    </section>
  )
}
