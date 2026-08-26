import { useEffect, useState } from 'react'
import { siteData } from '../data/site.js'

// 每个导航链接的图标（hover 时会跳动）
const NAV_ICONS = {
  '#home': '🏠',
  '#about': '👤',
  '#skills': '⚡',
  '#projects': '🎨',
  '#experience': '📜',
  '#contact': '✉️',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (y / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 滚动时高亮当前所在板块
  useEffect(() => {
    const ids = siteData.nav.map((n) => n.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container">
          <div className="navbar__inner">
            <a className="navbar__brand" href="#home">
              <span className="navbar__logo">{siteData.hero.name.slice(0, 1)}</span>
              <span className="navbar__brand-name">{siteData.hero.name}</span>
            </a>

            <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
              {siteData.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={active === item.href ? 'nav-active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {NAV_ICONS[item.href] ?? '•'}
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
              <a
                className="btn btn--primary btn--sm navbar__cta btn--pulse"
                href={siteData.contact.email ? `mailto:${siteData.contact.email}` : '#contact'}
                onClick={() => setOpen(false)}
              >
                联系我 ✉️
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
        </div>
      </header>
    </>
  )
}
