import { useEffect, useState } from 'react'
import { siteData } from '../data/site.js'

export default function Hero() {
  const { hero } = siteData
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % hero.roles.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [hero.roles.length])

  return (
    <section id="home" className="hero section">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="hero__greeting">{hero.greeting}</p>
          <h1 className="hero__name">{hero.name}</h1>
          <div className="hero__role">
            <span key={roleIndex} className="hero__role-text">
              {hero.roles[roleIndex]}
            </span>
          </div>
          <p className="hero__tagline">{hero.tagline}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </a>
            <a className="btn btn--ghost" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__avatar-wrap">
            <img className="hero__avatar" src={hero.avatar} alt={hero.name} />
            <div className="hero__orbit hero__orbit--1" />
            <div className="hero__orbit hero__orbit--2" />
            <span className="hero__badge hero__badge--code">&lt;/&gt;</span>
            <span className="hero__badge hero__badge--spark">✨</span>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="向下滚动">
        <span className="hero__scroll-dot" />
      </a>
    </section>
  )
}
