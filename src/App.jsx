import './App.css'
import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import SysMon from './components/SysMon'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
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

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

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
      <Contact />
      <Footer />
    </div>
  )
}
