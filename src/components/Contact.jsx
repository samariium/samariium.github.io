import './Contact.css'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Open email client
    const mailtoLink = `mailto:svsamarsingh@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="contact section reveal">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div className="info-text">
                <h4>Email</h4>
                <a href="mailto:svsamarsingh@gmail.com">svsamarsingh@gmail.com</a>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📱</span>
              <div className="info-text">
                <h4>Phone</h4>
                <a href="tel:+918409420691">+91 8409420691</a>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📍</span>
              <div className="info-text">
                <h4>Location</h4>
                <p>Dehradun, India</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Quick Actions</h4>
              <div className="links">
                <a href="https://github.com/samariium" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                <a href="https://linkedin.com/in/samar-singh-42577b1ab" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                <a href="mailto:svsamarsingh@gmail.com" className="social-link">Email</a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send me a message</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}
