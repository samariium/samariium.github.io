import './Experience.css'

export default function Experience() {
  const experiences = [
    {
      role: 'DevOps Intern',
      company: 'Xebia',
      period: 'Jun 2025 - Jul 2025',
      responsibilities: [
        'Automated builds and deployments using Dockerfiles and Jenkinsfiles, reducing manual work by 70%',
        'Managed end-to-end deployment pipelines with Jenkins and Docker, increasing release speed by 60%',
        'Monitored deployed services to ensure high availability, maintaining 99% uptime',
        'Collaborated with team members to plan tasks, review changes, and deliver features on time',
        'Enhanced system reliability by proactively identifying issues and refining workflows'
      ]
    }
  ]

  return (
    <section id="experience" className="experience section reveal">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="timeline-dot"></div>
              
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="role">{exp.role}</h3>
                  <span className="period">{exp.period}</span>
                </div>
                
                <p className="company">{exp.company}</p>
                
                <ul className="responsibilities">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>
                      <span className="bullet">→</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
