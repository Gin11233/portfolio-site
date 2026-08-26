import { siteData } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function Skills() {
  const { skills } = siteData
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <div className="glass-module">
          <Reveal>
            <h2 className="section__title">技能</h2>
            <p className="section__subtitle">我熟悉的技术栈与工具</p>
          </Reveal>

          <div className="skills__grid">
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={i * 80}>
                <div className="skill-card glass">
                  <h3 className="skill-card__title">{group.category}</h3>
                  <div className="skill-card__items">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
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
