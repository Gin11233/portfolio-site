import { useEffect, useRef } from 'react'

// 背景光斑配置：颜色 / 尺寸 / 位置 / 视差深度 / 透明度
const BLOBS = [
  { color: '108, 92, 231', alpha: 0.4, size: '44vw', top: '-10vw', right: '-6vw', depth: 0.5, dur: 28, delay: 0 },
  { color: '0, 0, 0', alpha: 0.05, size: '36vw', bottom: '-12vw', left: '12vw', depth: 0.8, dur: 34, delay: 2 },
  { color: '138, 92, 246', alpha: 0.32, size: '30vw', top: '22vh', left: '-8vw', depth: 0.6, dur: 30, delay: 4 },
  { color: '0, 0, 0', alpha: 0.045, size: '22vw', top: '50vh', left: '34vw', depth: 0.35, dur: 36, delay: 6 },
]

// 背景光斑：缓慢流动 + 鼠标视差（不同深度跟随光标）
export default function AmbientBackground() {
  const blobRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf
    const targets = blobRefs.current.map((el, i) => ({
      el,
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      depth: BLOBS[i].depth,
    }))

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      for (const t of targets) {
        t.tx = nx * t.depth * 48
        t.ty = ny * t.depth * 48
      }
    }

    const tick = () => {
      for (const t of targets) {
        t.x += (t.tx - t.x) * 0.08
        t.y += (t.ty - t.y) * 0.08
        t.el.style.translate = `${t.x}px ${t.y}px`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el
          }}
          className="ambient__blob"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            background: `radial-gradient(circle at 45% 45%, rgba(${b.color}, ${b.alpha}), transparent 65%)`,
            animationDuration: `${b.dur}s, ${b.dur * 1.4}s`,
            animationDelay: `${b.delay}s, ${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
