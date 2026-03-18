import { useMemo, useState } from 'react'
import './DevOpsToolchain.css'

const TOOLCHAIN = {
  'Containers': [
    { name: 'Docker', icon: '🐳', category: 'containerization' },
    { name: 'Podman', icon: '🍎', category: 'containerization' },
    { name: 'Kubernetes', icon: '☸️', category: 'orchestration' },
    { name: 'Helm', icon: '⎈', category: 'orchestration' },
  ],
  'Infrastructure as Code': [
    { name: 'Terraform', icon: '🏗️', category: 'iac' },
    { name: 'Ansible', icon: '🔧', category: 'iac' },
    { name: 'CloudFormation', icon: '☁️', category: 'iac' },
    { name: 'Bicep', icon: '📦', category: 'iac' },
  ],
  'CI/CD & Deployment': [
    { name: 'GitHub Actions', icon: '⚡', category: 'cicd' },
    { name: 'GitLab CI', icon: '🦊', category: 'cicd' },
    { name: 'Jenkins', icon: '🔌', category: 'cicd' },
    { name: 'ArgoCD', icon: '➡️', category: 'cicd' },
  ],
  'Monitoring & Observability': [
    { name: 'Prometheus', icon: '📊', category: 'monitoring' },
    { name: 'Grafana', icon: '📈', category: 'monitoring' },
    { name: 'ELK Stack', icon: '🔍', category: 'monitoring' },
    { name: 'Datadog', icon: '🐕', category: 'monitoring' },
  ],
  'Cloud Platforms': [
    { name: 'AWS', icon: '☁️', category: 'cloud' },
    { name: 'Azure', icon: '♦️', category: 'cloud' },
    { name: 'Google Cloud', icon: '🌐', category: 'cloud' },
  ],
  'Version Control & Collaboration': [
    { name: 'Git', icon: '📝', category: 'vcs' },
    { name: 'GitHub', icon: '🐙', category: 'vcs' },
    { name: 'GitLab', icon: '🦊', category: 'vcs' },
  ],
}

export default function DevOpsToolchain() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = useMemo(() => Object.keys(TOOLCHAIN), [])

  return (
    <section id="devops-toolchain" className="devops-toolchain">
      <div className="terminal-header">
        <div className="traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="filename">devops-toolchain.yml</div>
        <div className="spacer"></div>
      </div>

      <div className="toolchain-content">
        <div className="toolchain-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              <span className="category-label">{category}</span>
              <span className="item-count">[{TOOLCHAIN[category].length}]</span>
            </button>
          ))}
        </div>

        <div className="tools-grid">
          {selectedCategory ? (
            <>
              <div className="category-title">&gt; {selectedCategory}</div>
              <div className="tools-list">
                {TOOLCHAIN[selectedCategory].map((tool) => (
                  <div key={tool.name} className="tool-item">
                    <span className="tool-icon">{tool.icon}</span>
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-status">✓ proficient</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="tools-hint">
              <span className="hint-text">$ select a category to explore</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
