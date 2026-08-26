import { siteData } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function About() {
  const { about } = siteData
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="glass-module">
          <Reveal>
            <h2 className="section__title">{about.heading}</h2>
            <p className="section__subtitle">{about.lead}</p>
          </Reveal>

          <div className="about__grid">
            <Reveal className="about__text" delay={80}>
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>

            <div className="about__highlights">
              {about.highlights.map((h, i) => (
                <Reveal key={h.label} delay={i * 90}>
                  <div className="highlight-card glass">
                    <span className="highlight-card__icon">{h.icon}</span>
                    <div>
                      <h3>{h.label}</h3>
                      <p>{h.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
