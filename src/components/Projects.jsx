import './Projects.css'
import { projectLinks } from '../config/links'

export default function Projects() {
  const projects = [
    {
      title: 'AI-Trip-Planner',
      description: 'An intelligent travel planning application that uses AI to generate personalized trip itineraries based on user preferences, travel dates, and budget.',
      tech: ['AI/ML', 'Python', 'React', 'API Integration'],
      repo: projectLinks.aiTripPlanner.repo,
      live: projectLinks.aiTripPlanner.live,
      showLive: true,
      command: 'start --planner=ai --mode=smart-trip',
      icon: '🗺️'
    },
    {
      title: 'TravelEase – Cloud-Native Travel Platform',
      description: 'Containerized and deployed the payment microservice using Docker, reducing environment setup time from 2 hours to under 15 minutes. Built automated CI/CD pipelines using Jenkins and GitHub Actions for faster builds and smoother releases.',
      tech: ['Docker', 'Jenkins', 'GitHub Actions', 'AWS', 'Microservices'],
      repo: projectLinks.travelease.repo,
      live: projectLinks.travelease.live,
      showLive: false,
      command: 'deploy --env=aws --pipeline=jenkins',
      icon: '✈️'
    },
    {
      title: 'AI-Powered Interview Preparation System',
      description: 'Designed and developed a web platform generating personalized interview questions based on user skills. Built the frontend using React and Vite, improving page load speed by 40% and delivering a smooth, responsive user experience.',
      tech: ['React', 'Vite', 'Node.js', 'JWT', 'REST API'],
      repo: projectLinks.aiInterviewPrep.repo,
      live: projectLinks.aiInterviewPrep.live,
      showLive: false,
      command: 'run --stack=react-node --auth=jwt',
      icon: '🤖'
    }
  ]

  return (
    <section id="projects" className="projects section reveal">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-terminal-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-text">project-{index + 1}.sh</span>
              </div>

              <p className="project-command">$ {project.command}</p>
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
                  git open --repo
                </a>
                {project.showLive && (
                  <a href={project.live} className="project-link" target="_blank" rel="noreferrer">
                    open --live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
