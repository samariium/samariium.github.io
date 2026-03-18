import { useEffect, useState, useMemo } from 'react'
import './CicdPipeline.css'

const PIPELINES = [
  {
    id: 1,
    name: 'deploy-main',
    branch: 'main',
    status: 'success',
    duration: '2m 45s',
    timestamp: '5 mins ago',
    stages: ['build', 'test', 'deploy'],
  },
  {
    id: 2,
    name: 'feature-auth',
    branch: 'feature/auth',
    status: 'running',
    duration: '1m 20s',
    timestamp: 'now',
    stages: ['build', 'test', 'deploy'],
    currentStage: 1,
  },
  {
    id: 3,
    name: 'hotfix-database',
    branch: 'hotfix/db-issue',
    status: 'failed',
    duration: '1m 05s',
    timestamp: '15 mins ago',
    stages: ['build', 'test', 'deploy'],
    failedStage: 2,
  },
  {
    id: 4,
    name: 'release-v2.1.0',
    branch: 'release/v2.1.0',
    status: 'success',
    duration: '3m 12s',
    timestamp: '1 hour ago',
    stages: ['build', 'test', 'deploy'],
  },
  {
    id: 5,
    name: 'docs-update',
    branch: 'docs/readme',
    status: 'pending',
    duration: '0s',
    timestamp: 'queued',
    stages: ['build', 'test', 'deploy'],
  },
]

export default function CicdPipeline() {
  const [pipelines, setPipelines] = useState(PIPELINES)

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelines((prev) =>
        prev.map((pipeline) => {
          if (pipeline.status === 'running') {
            const random = Math.random()
            if (random > 0.5) {
              return {
                ...pipeline,
                currentStage: Math.min(pipeline.currentStage + 1, 3),
                duration: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
              }
            }
          }
          return pipeline
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✓'
      case 'failed':
        return '✗'
      case 'running':
        return '⟳'
      case 'pending':
        return '⊙'
      default:
        return '?'
    }
  }

  const getStatusClass = (status) => {
    return `status-${status}`.replace(' ', '-')
  }

  return (
    <section id="cicd-pipeline" className="cicd-pipeline">
      <div className="terminal-header">
        <div className="traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="filename">github-actions.log</div>
        <div className="spacer"></div>
      </div>

      <div className="pipeline-container">
        <div className="pipeline-header">
          <span className="header-title">&gt; GitHub Actions Workflows</span>
          <span className="pipeline-count">[{pipelines.length} runs]</span>
        </div>

        <div className="pipelines-list">
          {pipelines.map((pipeline) => (
            <div key={pipeline.id} className={`pipeline-item ${getStatusClass(pipeline.status)}`}>
              <div className="pipeline-main">
                <div className="status-indicator">
                  <span className={`icon ${pipeline.status}`}>{getStatusIcon(pipeline.status)}</span>
                </div>

                <div className="pipeline-info">
                  <div className="pipeline-name">
                    <span className="name">{pipeline.name}</span>
                    <span className="branch">{pipeline.branch}</span>
                  </div>
                  <div className="pipeline-meta">
                    <span className={`status ${pipeline.status}`}>{pipeline.status.toUpperCase()}</span>
                    <span className="duration">{pipeline.duration}</span>
                    <span className="timestamp">{pipeline.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="pipeline-stages">
                {pipeline.stages.map((stage, idx) => (
                  <div
                    key={`${pipeline.id}-${stage}`}
                    className={`stage ${
                      pipeline.currentStage !== undefined
                        ? idx < pipeline.currentStage
                          ? 'completed'
                          : idx === pipeline.currentStage
                            ? 'active'
                            : 'pending'
                        : pipeline.failedStage === idx
                          ? 'failed'
                          : pipeline.status === 'success'
                            ? 'completed'
                            : 'pending'
                    }`}
                  >
                    <span className="stage-name">{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pipeline-footer">
          <span className="footer-text">$ monitoring active workflows...</span>
        </div>
      </div>
    </section>
  )
}
