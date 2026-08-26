import { siteData } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function Experience() {
  const { experience } = siteData
  return (
    <section id="experience" className="section section--alt">
      <div className="container container--narrow">
        <div className="glass-module">
          <Reveal>
            <h2 className="section__title">经历</h2>
            <p className="section__subtitle">我的教育与职业历程</p>
          </Reveal>

          <div className="timeline">
            {experience.map((item, i) => (
              <Reveal key={`${item.period}-${item.role}`} delay={i * 90}>
                <div className="timeline__item">
                  <div className="timeline__dot" />
                  <div className="timeline__card glass">
                    <span className="timeline__period">{item.period}</span>
                    <h3>
                      {item.role} <span className="timeline__company">@ {item.company}</span>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
