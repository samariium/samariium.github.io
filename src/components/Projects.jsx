import './Projects.css'

export default function Projects() {
  const projects = [
    {
      title: 'TravelEase – Cloud-Native Travel Platform',
      description: 'Containerized and deployed the payment microservice using Docker, reducing environment setup time from 2 hours to under 15 minutes. Built automated CI/CD pipelines using Jenkins and GitHub Actions for faster builds and smoother releases.',
      tech: ['Docker', 'Jenkins', 'GitHub Actions', 'AWS', 'Microservices'],
      repo: 'https://github.com/samariium',
      live: 'https://samariium.github.io',
      icon: '✈️'
    },
    {
      title: 'AI-Powered Interview Preparation System',
      description: 'Designed and developed a web platform generating personalized interview questions based on user skills. Built the frontend using React and Vite, improving page load speed by 40% and delivering a smooth, responsive user experience.',
      tech: ['React', 'Vite', 'Node.js', 'JWT', 'REST API'],
      repo: 'https://github.com/samariium',
      live: 'https://samariium.github.io',
      icon: '🤖'
    },
    {
      title: 'AI-Trip-Planner',
      description: 'An intelligent travel planning application that uses AI to generate personalized trip itineraries based on user preferences, travel dates, and budget.',
      tech: ['AI/ML', 'Python', 'React', 'API Integration'],
      repo: 'https://github.com/samariium/AI-Trip-Planner',
      live: 'https://github.com/samariium/AI-Trip-Planner',
      icon: '🗺️'
    }
  ]

  return (
    <section id="projects" className="projects section reveal">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-icon">{project.icon}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={project.repo} className="project-link" target="_blank" rel="noreferrer">
                  Repository
                </a>
                <a href={project.live} className="project-link" target="_blank" rel="noreferrer">
                  Live / Preview
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
