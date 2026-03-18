import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer reveal">
      <div className="container footer-content">
        <div className="footer-text">
          <p>&lt; Built for cloud, tuned for scale, shipped with DevOps /&gt;</p>
        </div>
        
        <div className="footer-links">
          <a href="#top">Top</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#sysmon">SysMon</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-credit">
          <p>© {currentYear} Samar Singh. Dehradun, India.</p>
        </div>
      </div>
    </footer>
  )
}
