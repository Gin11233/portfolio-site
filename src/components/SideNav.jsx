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

// 左侧弧形导航：点击手柄，弧形导航与状态栏一同滑出
export default function SideNav() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('#home')
  const [pos, setPos] = useState([])
  const [panelH, setPanelH] = useState(520)

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

  // 计算链接沿弧线的位置
  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight
      const h = Math.min(520, Math.round(vh * 0.8))
      setPanelH(h)
      const top = 44
      const statusH = 196
      const usable = h - top - statusH
      const depth = Math.min(96, Math.round(usable * 0.24))
      const n = nav.length
      const list = nav.map((_, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1)
        return {
          left: Math.round(12 + Math.sin(t * Math.PI) * depth),
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
  const arcPath = `M 18 30 C ${110 + panelH * 0.28} ${panelH * 0.28}, ${110 + panelH * 0.28} ${panelH * 0.72}, 18 ${panelH - 34}`

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div
        className={`sidenav__backdrop ${open ? 'sidenav__backdrop--show' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="sidenav">
        <button
          className={`sidenav__handle ${open ? 'sidenav__handle--open' : ''}`}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M3 5h18M3 12h18M3 19h18" />
            </svg>
          )}
        </button>

        <aside
          className={`sidenav__panel ${open ? 'sidenav__panel--open' : ''}`}
          style={{ '--panel-h': `${panelH}px` }}
          aria-hidden={!open}
        >
          <svg className="sidenav__arc" viewBox={`0 0 300 ${panelH}`} fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
                <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <path d={arcPath} stroke="url(#arcGrad)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          <nav className="sidenav__links">
            {nav.map((item, i) => (
              <a
                key={item.href}
                className={`sidenav__link ${active === item.href ? 'sidenav__link--active' : ''}`}
                style={{
                  left: pos[i]?.left,
                  top: pos[i]?.top,
                  transitionDelay: `${i * 55 + 140}ms`,
                }}
                href={item.href}
                onClick={() => setOpen(false)}
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
