import { useEffect, useState } from 'react'
import { siteData } from '../data/site.js'

// 左侧线条导航：一条弧线轨道 + 沿线小圆点，极简不占空间
export default function LineNav() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('#home')
  const [pos, setPos] = useState([])
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 800)

  const nav = siteData.nav

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

  // 圆点沿弧线分布
  useEffect(() => {
    const compute = () => {
      const h = window.innerHeight
      setVh(h)
      const top = 82
      const bottom = 36
      const usable = Math.max(160, h - top - bottom)
      const n = nav.length
      const list = nav.map((_, i) => {
        const t = n === 1 ? 0.5 : i / (n - 1)
        return {
          left: Math.round(12 + Math.sin(t * Math.PI) * 14),
          top: Math.round(top + t * usable),
        }
      })
      setPos(list)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [nav])

  // 弧线路径
  const arcPath = `M 22 80 C 40 ${vh * 0.32}, 40 ${vh * 0.68}, 22 ${vh - 40}`

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <nav className="line-nav" aria-label="主导航">
        <a className="line-nav__brand" href="#home" aria-label="回到首页">
          {siteData.hero.name.slice(0, 1)}
        </a>

        <svg className="line-nav__arc" viewBox={`0 0 52 ${vh - 120}`} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="lineNavGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="55%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path d={arcPath} stroke="url(#lineNavGrad)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>

        {nav.map((item, i) => (
          <a
            key={item.href}
            className={`line-nav__link ${active === item.href ? 'line-nav__link--active' : ''}`}
            style={{ left: pos[i]?.left, top: pos[i]?.top }}
            href={item.href}
            aria-label={item.label}
          >
            <span className="line-nav__dot" />
            <span className="line-nav__label">{item.label}</span>
          </a>
        ))}

        <div className="line-nav__progress" aria-hidden="true">
          <span style={{ height: `${progress}%` }} />
        </div>
      </nav>
    </>
  )
}
