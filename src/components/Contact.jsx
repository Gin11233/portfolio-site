import { siteData } from '../data/site.js'
import Reveal from './Reveal.jsx'
import { ICONS } from './icons.jsx'

export default function Contact() {
  const { contact } = siteData
  return (
    <section id="contact" className="section">
      <div className="container container--narrow">
        <div className="glass-module">
          <Reveal>
            <h2 className="section__title">{contact.heading}</h2>
            <p className="section__subtitle">{contact.lead}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="contact__cards">
              <a className="contact-card glass" href={`mailto:${contact.email}`}>
                <span className="contact-card__icon">{ICONS.email}</span>
                <span className="contact-card__label">邮箱</span>
                <span className="contact-card__value">{contact.email}</span>
              </a>
              <a className="contact-card glass" href={`tel:${contact.phone}`}>
                <span className="contact-card__icon">📞</span>
                <span className="contact-card__label">电话</span>
                <span className="contact-card__value">{contact.phone}</span>
              </a>
              <div className="contact-card glass">
                <span className="contact-card__icon">📍</span>
                <span className="contact-card__label">坐标</span>
                <span className="contact-card__value">{contact.location}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="contact__socials">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  className="social-btn glass"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  {ICONS[s.icon] ?? ICONS.blog}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}