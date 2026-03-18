import { useEffect, useState } from 'react'
import './InfrastructureMetrics.css'

export default function InfrastructureMetrics() {
  const [metrics, setMetrics] = useState({
    compute: { used: 18, total: 32, unit: 'instances' },
    storage: { used: 2450, total: 5000, unit: 'GB' },
    network: { used: 42, total: 100, unit: 'Gbps' },
    database: { used: 12, total: 20, unit: 'clusters' },
    containers: { used: 284, total: 500, unit: 'running' },
    regions: { used: 3, total: 6, unit: 'active' },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        compute: { ...prev.compute, used: Math.floor(Math.random() * 25) + 10 },
        storage: { ...prev.storage, used: Math.floor(Math.random() * 3000) + 1500 },
        network: { ...prev.network, used: Math.floor(Math.random() * 60) + 20 },
        database: { ...prev.database, used: Math.floor(Math.random() * 18) + 8 },
        containers: { ...prev.containers, used: Math.floor(Math.random() * 400) + 150 },
        regions: { ...prev.regions, used: 3 },
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getColorClass = (used, total) => {
    const percentage = (used / total) * 100
    if (percentage > 80) return 'critical'
    if (percentage > 60) return 'warning'
    return 'healthy'
  }

  const getPercentage = (used, total) => Math.round((used / total) * 100)

  return (
    <section id="infrastructure-metrics" className="infrastructure-metrics">
      <div className="terminal-header">
        <div className="traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="filename">cloud-resources.json</div>
        <div className="spacer"></div>
      </div>

      <div className="metrics-container">
        <div className="metrics-title">&gt; Infrastructure Resource Utilization</div>

        <div className="metrics-grid">
          {Object.entries(metrics).map(([key, data]) => {
            const percentage = getPercentage(data.used, data.total)
            const colorClass = getColorClass(data.used, data.total)

            return (
              <div key={key} className={`metric-card ${colorClass}`}>
                <div className="metric-header">
                  <span className="metric-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="metric-percentage">{percentage}%</span>
                </div>

                <div className="metric-bar">
                  <div
                    className={`bar-fill ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="bar-value">
                      {data.used}/{data.total}
                    </span>
                  </div>
                </div>

                <div className="metric-footer">
                  <span className="metric-usage">
                    {data.used} {data.unit}
                  </span>
                  <span className={`metric-status ${colorClass}`}>
                    {colorClass === 'critical' ? '⚠ CRITICAL' : colorClass === 'warning' ? '⚡ WARNING' : '✓ OK'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="metrics-summary">
          <div className="summary-row">
            <span className="summary-label">$ aws s3 ls / --recursive | wc -l</span>
            <span className="summary-value">2,847 objects</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">$ kubectl get pods --all-namespaces</span>
            <span className="summary-value">284 running</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">$ terraform state show</span>
            <span className="summary-value">156 resources</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">$ gcloud compute instances list</span>
            <span className="summary-value">18 active</span>
          </div>
        </div>

        <div className="metrics-footer">
          <span className="footer-text">$ last update: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </section>
  )
}
