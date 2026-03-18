import './App.css'
import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import SysMon from './components/SysMon'
import DevOpsToolchain from './components/DevOpsToolchain'
import CicdPipeline from './components/CicdPipeline'
import InfrastructureMetrics from './components/InfrastructureMetrics'
import KubernetesCluster from './components/KubernetesCluster'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import { profileLinks } from './config/links'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  const commands = useMemo(
    () => [
      {
        id: 'about',
        label: 'cd ./about',
        hint: 'Go to About section',
        action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'projects',
        label: 'ls ./projects',
        hint: 'Go to Projects section',
        action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'devops',
        label: 'cat ./devops-toolchain',
        hint: 'Explore DevOps Toolchain',
        action: () => document.getElementById('devops-toolchain')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'cicd',
        label: 'tail -f ./pipelines.log',
        hint: 'View CI/CD Pipeline Status',
        action: () => document.getElementById('cicd-pipeline')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'infra',
        label: 'df -h ./infrastructure',
        hint: 'Check Infrastructure Metrics',
        action: () => document.getElementById('infrastructure-metrics')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'k8s',
        label: 'kubectl cluster-info',
        hint: 'View Kubernetes Cluster',
        action: () => document.getElementById('kubernetes-cluster')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'contact',
        label: 'run ./contact.sh',
        hint: 'Go to Contact section',
        action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      },
      {
        id: 'github',
        label: 'open github',
        hint: 'Open GitHub profile',
        action: () => window.open(profileLinks.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'open linkedin',
        hint: 'Open LinkedIn profile',
        action: () => window.open(profileLinks.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'top',
        label: 'cd ~',
        hint: 'Scroll to top',
        action: () => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }),
      },
    ],
    [],
  )

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    const cursor = document.getElementById('custom-cursor')
    const progress = document.getElementById('scroll-progress')

    const onMove = (event) => {
      if (!cursor) return
      cursor.style.transform = `translate(${event.clientX - 5}px, ${event.clientY - 5}px)`
    }

    const onScroll = () => {
      if (!progress) return
      const height = document.body.scrollHeight - window.innerHeight
      const width = height > 0 ? (window.scrollY / height) * 100 : 0
      progress.style.width = `${width}%`
    }

    const onKeyDown = (event) => {
      const target = event.target
      const inInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((value) => !value)
        return
      }

      if (inInput || paletteOpen) {
        if (event.key === 'Escape') {
          setPaletteOpen(false)
        }
        return
      }

      const key = event.key.toLowerCase()
      if (key === 'g') {
        window.open(profileLinks.github, '_blank', 'noopener,noreferrer')
      } else if (key === 'p') {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      } else if (key === 'c') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('keydown', onKeyDown)
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [paletteOpen])

  return (
    <div className="app" id="top">
      <div id="custom-cursor" aria-hidden="true"></div>
      <div id="scroll-progress" aria-hidden="true"></div>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <SysMon />
      <DevOpsToolchain />
      <CicdPipeline />
      <InfrastructureMetrics />
      <KubernetesCluster />
      <Contact />
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
    </div>
  )
}
