import { useEffect, useMemo, useState } from 'react'
import './SysMon.css'

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function jitter(value, spread, min, max) {
  return clamp(value + (Math.random() - 0.5) * spread, min, max)
}

export default function SysMon() {
  const [running, setRunning] = useState(true)
  const [incident, setIncident] = useState(false)
  const [cpu, setCpu] = useState(28)
  const [memory, setMemory] = useState(41)
  const [network, setNetwork] = useState(58)
  const [uptime, setUptime] = useState(0)
  const [logs, setLogs] = useState([
    'sysmon initialized',
    'prometheus scrape success',
    'argocd sync healthy',
  ])

  useEffect(() => {
    const uptimeInterval = setInterval(() => {
      setUptime((value) => value + 1)
    }, 1000)

    return () => clearInterval(uptimeInterval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!running) {
        return
      }

      setCpu((value) => jitter(value, incident ? 18 : 8, incident ? 60 : 12, 99))
      setMemory((value) => jitter(value, incident ? 16 : 6, incident ? 55 : 28, 96))
      setNetwork((value) => jitter(value, incident ? 22 : 10, 8, 100))

      if (Math.random() > 0.75) {
        const feed = incident
          ? 'alert: high cpu threshold exceeded'
          : ['pipeline check passed', 'k8s nodes healthy', 'build queue stable'][
              Math.floor(Math.random() * 3)
            ]

        setLogs((prev) => [feed, ...prev].slice(0, 8))
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [incident, running])

  const formattedUptime = useMemo(() => {
    const h = String(Math.floor(uptime / 3600)).padStart(2, '0')
    const m = String(Math.floor((uptime % 3600) / 60)).padStart(2, '0')
    const s = String(uptime % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }, [uptime])

  const triggerIncident = () => {
    setIncident(true)
    setLogs((prev) => ['incident triggered', ...prev].slice(0, 8))

    setTimeout(() => {
      setIncident(false)
      setLogs((prev) => ['incident resolved', ...prev].slice(0, 8))
    }, 9000)
  }

  const triggerDeploy = () => {
    setLogs((prev) => ['deployment started', ...prev].slice(0, 8))
    setTimeout(() => {
      setLogs((prev) => ['deployment completed', ...prev].slice(0, 8))
    }, 3500)
  }

  return (
    <section id="sysmon" className="sysmon section reveal">
      <div className="container">
        <h2 className="section-title">Live SysMon</h2>

        <div className="sysmon-shell">
          <div className="sysmon-head">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="sysmon-title">samar@prod-node:~ htop</span>
          </div>

          <div className="sysmon-body">
            <div className="metrics-grid">
              <div className="metric-card">
                <p>CPU</p>
                <strong>{Math.round(cpu)}%</strong>
                <div className="metric-track"><span style={{ width: `${cpu}%` }}></span></div>
              </div>

              <div className="metric-card">
                <p>Memory</p>
                <strong>{Math.round(memory)}%</strong>
                <div className="metric-track"><span style={{ width: `${memory}%` }}></span></div>
              </div>

              <div className="metric-card">
                <p>Network</p>
                <strong>{Math.round(network)} Mbps</strong>
                <div className="metric-track"><span style={{ width: `${network}%` }}></span></div>
              </div>
            </div>

            <div className="sysmon-controls">
              <button type="button" className="btn" onClick={() => setRunning((v) => !v)}>
                {running ? 'pause --monitor' : 'resume --monitor'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={triggerDeploy}>
                deploy --now
              </button>
              <button type="button" className="btn" onClick={triggerIncident}>
                incident --simulate
              </button>
              <span className="uptime">uptime {formattedUptime}</span>
            </div>

            <div className={`incident-banner ${incident ? 'show' : ''}`}>
              severity 1 alert: elevated utilization detected
            </div>

            <div className="sysmon-logs">
              {logs.map((line, idx) => (
                <p key={`${line}-${idx}`}>
                  <span>log&gt;</span> {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}