import { useEffect, useState, useMemo } from 'react'
import './KubernetesCluster.css'

const INITIAL_STATE = {
  nodes: [
    { id: 1, name: 'node-10.245.1.2', status: 'Ready', pods: 28, cpu: 62, memory: 71 },
    { id: 2, name: 'node-10.245.1.3', status: 'Ready', pods: 35, cpu: 78, memory: 85 },
    { id: 3, name: 'node-10.245.1.4', status: 'Ready', pods: 22, cpu: 45, memory: 52 },
    { id: 4, name: 'node-10.245.1.5', status: 'Ready', pods: 19, cpu: 38, memory: 41 },
  ],
  namespaces: [
    { name: 'production', deployments: 8, pods: 42, cpu: '2.4 cores', memory: '4.8 GB' },
    { name: 'staging', deployments: 5, pods: 18, cpu: '0.8 cores', memory: '1.6 GB' },
    { name: 'monitoring', deployments: 3, pods: 12, cpu: '0.6 cores', memory: '1.2 GB' },
    { name: 'ingress-nginx', deployments: 1, pods: 3, cpu: '0.2 cores', memory: '0.4 GB' },
  ],
  services: [
    { name: 'api-gateway', type: 'LoadBalancer', clusterIP: '10.96.0.1', port: 443, status: '✓' },
    { name: 'database', type: 'ClusterIP', clusterIP: '10.96.1.5', port: 5432, status: '✓' },
    { name: 'cache', type: 'ClusterIP', clusterIP: '10.96.2.3', port: 6379, status: '✓' },
    {
      name: 'message-queue',
      type: 'ClusterIP',
      clusterIP: '10.96.3.7',
      port: 5672,
      status: '✓',
    },
  ],
}

export default function KubernetesCluster() {
  const [state, setState] = useState(INITIAL_STATE)
  const [activeTab, setActiveTab] = useState('nodes')

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) => ({
          ...node,
          cpu: Math.floor(Math.random() * 85) + 20,
          memory: Math.floor(Math.random() * 80) + 30,
          pods: Math.floor(Math.random() * 20) + 15,
        })),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const tabs = useMemo(
    () => [
      { id: 'nodes', label: 'Nodes', count: state.nodes.length },
      { id: 'namespaces', label: 'Namespaces', count: state.namespaces.length },
      { id: 'services', label: 'Services', count: state.services.length },
    ],
    [state.nodes.length, state.namespaces.length, state.services.length]
  )

  const getResourceHealth = (value, threshold = 70) => {
    if (value > 80) return 'critical'
    if (value > threshold) return 'warning'
    return 'healthy'
  }

  return (
    <section id="kubernetes-cluster" className="kubernetes-cluster">
      <div className="terminal-header">
        <div className="traffic-lights">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="filename">kubectl-view.yaml</div>
        <div className="spacer"></div>
      </div>

      <div className="k8s-container">
        <div className="k8s-header">
          <span className="header-title">&gt; Kubernetes Cluster Status</span>
          <span className="cluster-badge">production-us-east-1a</span>
        </div>

        <div className="k8s-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-label">{tab.label}</span>
              <span className="tab-count">[{tab.count}]</span>
            </button>
          ))}
        </div>

        <div className="k8s-content">
          {activeTab === 'nodes' && (
            <div className="nodes-view">
              <div className="view-header">$ kubectl get nodes -o wide</div>
              <div className="nodes-list">
                {state.nodes.map((node) => (
                  <div key={node.id} className="node-item">
                    <div className="node-main">
                      <div className="node-status">
                        <span className={`status-dot ${node.status.toLowerCase()}`}></span>
                        <span className="node-name">{node.name}</span>
                      </div>
                      <span className="node-status-text">{node.status}</span>
                    </div>

                    <div className="node-metrics">
                      <div className="metric-single">
                        <span className="label">CPU</span>
                        <div className={`bar-small ${getResourceHealth(node.cpu)}`}>
                          <div className={`fill ${getResourceHealth(node.cpu)}`} style={{ width: `${node.cpu}%` }}></div>
                        </div>
                        <span className="value">{node.cpu}%</span>
                      </div>

                      <div className="metric-single">
                        <span className="label">Memory</span>
                        <div className={`bar-small ${getResourceHealth(node.memory)}`}>
                          <div className={`fill ${getResourceHealth(node.memory)}`} style={{ width: `${node.memory}%` }}></div>
                        </div>
                        <span className="value">{node.memory}%</span>
                      </div>

                      <div className="metric-single">
                        <span className="label">Pods</span>
                        <span className="value pod-count">{node.pods}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'namespaces' && (
            <div className="namespaces-view">
              <div className="view-header">$ kubectl get namespaces</div>
              <div className="namespaces-list">
                {state.namespaces.map((ns) => (
                  <div key={ns.name} className="namespace-item">
                    <div className="ns-header">
                      <span className="ns-name">{ns.name}</span>
                      <span className="status-badge">Active</span>
                    </div>
                    <div className="ns-details">
                      <div className="detail-field">
                        <span className="label">Deployments</span>
                        <span className="value">{ns.deployments}</span>
                      </div>
                      <div className="detail-field">
                        <span className="label">Pods</span>
                        <span className="value">{ns.pods}</span>
                      </div>
                      <div className="detail-field">
                        <span className="label">CPU</span>
                        <span className="value">{ns.cpu}</span>
                      </div>
                      <div className="detail-field">
                        <span className="label">Memory</span>
                        <span className="value">{ns.memory}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-view">
              <div className="view-header">$ kubectl get services --all-namespaces</div>
              <div className="services-list">
                {state.services.map((svc) => (
                  <div key={svc.name} className="service-item">
                    <div className="service-header">
                      <div className="service-info">
                        <span className={`status-indicator ${svc.status === '✓' ? 'healthy' : 'warning'}`}>
                          {svc.status}
                        </span>
                        <span className="service-name">{svc.name}</span>
                      </div>
                      <span className="service-type">{svc.type}</span>
                    </div>
                    <div className="service-details">
                      <div className="detail">
                        <span className="label">ClusterIP</span>
                        <span className="value">{svc.clusterIP}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Port</span>
                        <span className="value">{svc.port}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="k8s-footer">
          <span className="footer-text">$ cluster-version: v1.28.1 | nodes-ready: 4/4 | services-healthy: 4/4</span>
        </div>
      </div>
    </section>
  )
}
