import { useEffect, useState } from 'react'
import { siteData } from '../data/site.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__brand" href="#home">
          <span className="navbar__logo">{siteData.hero.name.slice(0, 1)}</span>
          <span>{siteData.hero.name}</span>
        </a>

        <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {siteData.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--primary btn--sm navbar__cta" href={siteData.contact.email ? `mailto:${siteData.contact.email}` : '#contact'}>
            联系我
          </a>
        </nav>

        <button
          className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
          aria-label="菜单"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
