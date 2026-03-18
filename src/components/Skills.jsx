import './Skills.css'

export default function Skills() {
  const skillCategories = [
    {
      category: 'Cloud Platforms',
      skills: ['AWS', 'Azure']
    },
    {
      category: 'Container & Orchestration',
      skills: ['Docker', 'Kubernetes']
    },
    {
      category: 'CI/CD Tools',
      skills: ['Jenkins', 'GitHub Actions', 'GitLab']
    },
    {
      category: 'Infrastructure as Code',
      skills: ['Terraform', 'Ansible']
    },
    {
      category: 'Monitoring & Logging',
      skills: ['Prometheus', 'Grafana']
    },
    {
      category: 'Programming Languages',
      skills: ['C++', 'Bash']
    },
    {
      category: 'Version Control',
      skills: ['Git', 'GitHub', 'GitLab']
    },
    {
      category: 'Operating Systems',
      skills: ['Linux']
    }
  ]

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <span className="bracket">&gt;</span>
                <h3>{category.category}</h3>
              </div>
              <div className="skill-items">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <span className="skill-dot">●</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
