import { useEffect, useState } from 'react'
import { siteData } from '../data/site.js'

// 每个导航按钮的图标
const NAV_ICONS = {
  '#home': '🏠',
  '#about': '👤',
  '#skills': '⚡',
  '#projects': '🎨',
  '#experience': '📜',
  '#contact': '✉️',
}

// 左侧导航：每个板块一个按钮，简洁干净
export default function LineNav() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('#home')

  const nav = siteData.nav

  // 滚动进度（顶部细条）
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
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
      { rootMargin: '-40% 0px -55% 0px' },
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
      <nav className="line-nav" aria-label="主导航">
        <a className="line-nav__brand" href="#home" aria-label="回到首页">
          {siteData.hero.name.slice(0, 1)}
        </a>

        {nav.map((item) => (
          <a
            key={item.href}
            className={`line-nav__link ${active === item.href ? 'line-nav__link--active' : ''}`}
            href={item.href}
            aria-label={item.label}
          >
            <span className="line-nav__icon" aria-hidden="true">
              {NAV_ICONS[item.href] ?? '•'}
            </span>
            <span className="line-nav__label">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
