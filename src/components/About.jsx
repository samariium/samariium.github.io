import './About.css'

export default function About() {
  return (
    <section id="about" className="about section reveal">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          <div className="about-text-card">
            <p>
              I am Samar Singh, a DevOps-focused Computer Science undergraduate who
              enjoys turning manual infrastructure work into repeatable automation.
            </p>
            <p>
              I worked as a DevOps Intern at Xebia where I automated delivery
              pipelines with Docker and Jenkins, improved release speed, and
              supported production-like reliability practices.
            </p>
            <p>
              My focus areas are CI/CD, cloud deployments, container orchestration,
              and observability-driven operations.
            </p>
          </div>

          <div className="about-terminal">
            <div className="terminal-header-mini">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-mini-title">samar@devops:~</span>
            </div>
            <div className="terminal-body-mini">
              <p><span className="cmd">$</span> cat profile.json</p>
              <p><span className="k">"name"</span>: <span className="v">"Samar Singh"</span>,</p>
              <p><span className="k">"role"</span>: <span className="v">"DevOps Engineer"</span>,</p>
              <p><span className="k">"education"</span>: <span className="v">"B.Tech CSE @ UPES"</span>,</p>
              <p><span className="k">"location"</span>: <span className="v">"Dehradun, India"</span></p>
              <p><span className="cmd">$</span> <span className="blink-caret"></span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}