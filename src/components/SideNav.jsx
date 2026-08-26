import { useEffect, useState } from 'react'
import { siteData } from '../data/site.js'
import { ICONS } from './icons.jsx'

// 每个导航链接的图标
const NAV_ICONS = {
  '#home': '🏠',
  '#about': '👤',
  '#skills': '⚡',
  '#projects': '🎨',
  '#experience': '📜',
  '#contact': '✉️',
}

// 左侧弧形导航（始终展开 · 显眼）
export default function SideNav() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('#home')
  const [pos, setPos] = useState([])
  const [panelH, setPanelH] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  const nav = siteData.nav
  const activeLabel = (nav.find((n) => n.href === active) || nav[0]).label

  // 滚动进度
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

  // 计算链接沿弧线的位置（小屏退化为竖排图标条）
  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight
      setPanelH(vh)
      const small = window.innerWidth < 960
      const top = small ? 92 : 112
      const statusH = small ? 0 : 208
      const bottomPad = small ? 28 : 0
      const usable = Math.max(140, vh - top - statusH - bottomPad)
      const depth = small ? 0 : Math.min(96, Math.round(usable * 0.24))
      const n = nav.length
      const list = nav.map((_, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1)
        return {
          left: Math.round((small ? 7 : 12) + Math.sin(t * Math.PI) * depth),
          top: Math.round(top + t * usable),
        }
      })
      setPos(list)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [nav])

  // 弧线轨迹路径
  const arcPath = `M 18 36 C ${118 + panelH * 0.28} ${panelH * 0.3}, ${118 + panelH * 0.28} ${panelH * 0.7}, 18 ${panelH - 36}`

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="sidenav">
        <aside className="sidenav__panel">
          <a className="sidenav__brand" href="#home">
            <span className="sidenav__brand-logo">{siteData.hero.name.slice(0, 1)}</span>
            <span className="sidenav__brand-name">{siteData.hero.name}</span>
          </a>

          <svg className="sidenav__arc" viewBox={`0 0 300 ${panelH}`} fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.65" />
              </linearGradient>
            </defs>
            <path d={arcPath} stroke="url(#arcGrad)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>

          <nav className="sidenav__links">
            {nav.map((item, i) => (
              <a
                key={item.href}
                className={`sidenav__link ${active === item.href ? 'sidenav__link--active' : ''}`}
                style={{ left: pos[i]?.left, top: pos[i]?.top }}
                href={item.href}
              >
                <span className="sidenav__link-dot">
                  <span className="sidenav__link-icon">{NAV_ICONS[item.href] ?? '•'}</span>
                </span>
                <span className="sidenav__link-label">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="sidenav__status">
            <div className="sidenav__status-row">
              <span>当前板块</span>
              <span className="sidenav__status-current">{activeLabel}</span>
            </div>
            <div className="sidenav__progress-track">
              <span className="sidenav__progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="sidenav__status-row">
              <span>页面进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="sidenav__status-row">
              <span>状态</span>
              <span className="sidenav__status-online">
                <span className="sidenav__status-dot" />
                在线
              </span>
            </div>
            <div className="sidenav__socials">
              {siteData.contact.socials.slice(0, 3).map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                  {ICONS[s.icon] ?? ICONS.blog}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
