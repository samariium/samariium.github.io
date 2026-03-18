import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-text">
          <p>&lt; Made with ❤️ by Samar Singh /&gt;</p>
        </div>
        
        <div className="footer-links">
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-credit">
          <p>© {currentYear} Samar Singh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
