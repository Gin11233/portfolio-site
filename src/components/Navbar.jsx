import { useEffect, useState } from 'react'
import { siteData } from '../data/site.js'

// Moonshot 风格顶部导航：Logo + 菜单 + CTA 按钮
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('#home')

  const nav = siteData.nav

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 16)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (y / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 高亮当前板块
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [nav])

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          <a className="navbar__brand" href="#home">
            <span className="navbar__logo">{siteData.hero.name.slice(0, 1)}</span>
            <span className="navbar__name">{siteData.hero.name}</span>
          </a>

          <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={active === item.href ? 'nav-active' : ''}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="btn btn--primary btn--sm navbar__cta"
              href={siteData.contact.email ? `mailto:${siteData.contact.email}` : '#contact'}
              onClick={() => setOpen(false)}
            >
              联系我
            </a>
          </nav>

          <button
            className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  )
}
