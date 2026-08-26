import { siteData } from '../data/site.js'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

export default function Projects() {
  const { projects } = siteData
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <h2 className="section__title">作品</h2>
          <p className="section__subtitle">我参与和主导的一些项目</p>
        </Reveal>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <TiltCard max={7}>
                <article className="project-card glass">
                  <div
                    className="project-card__cover"
                    style={{ background: p.gradient }}
                  >
                    <span className="project-card__emoji">{p.emoji}</span>
                    <div className="project-card__shade" />
                  </div>
                  <div className="project-card__body">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="project-card__tags">
                      {p.tags.map((t) => (
                        <span key={t} className="chip chip--sm">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="project-card__links">
                      <a className="link" href={p.demo} target="_blank" rel="noreferrer">
                        在线演示 ↗
                      </a>
                      <a className="link" href={p.code} target="_blank" rel="noreferrer">
                        源码 ↗
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
