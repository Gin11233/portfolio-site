import { useEffect, useRef } from 'react'

// 液态粒子场：粒子缓慢漂浮，靠近鼠标时被吸引并形成微漩涡，
// 相邻粒子之间出现半透明连线 —— 整体克制、不繁杂
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 尊重系统设置：减少动态效果 / 触屏设备 → 不渲染动画
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(hover: none)').matches
    ) {
      return
    }

    const COLORS = ['99, 102, 241', '34, 211, 238', '168, 85, 247']
    const R = 170 // 鼠标影响半径
    const LINK = 130 // 粒子连线距离

    let w = 0
    let h = 0
    let raf = 0
    let particles = []
    const mouse = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // 粒子数量随屏幕大小变化，保持克制
      const count = Math.max(28, Math.min(64, Math.floor((w * h) / 24000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        near: false,
      }))
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const onLeave = () => {
      mouse.active = false
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)

      // 更新粒子：布朗漂移 + 鼠标液态扰动
      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 0.06
        p.vy += (Math.random() - 0.5) * 0.06
        p.vx *= 0.95
        p.vy *= 0.95

        p.near = false
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d = Math.hypot(dx, dy)
          if (d < R && d > 0.01) {
            p.near = true
            const f = (1 - d / R) * 0.055
            // 径向吸引（水被手指聚拢）
            p.vx += (dx / d) * f * 1.5
            p.vy += (dy / d) * f * 1.5
            // 切向环绕（液态漩涡）
            p.vx += (-dy / d) * f * 0.9
            p.vy += (dx / d) * f * 0.9
          }
        }

        p.x += p.vx
        p.y += p.vy

        // 边界回绕
        if (p.x < -30) p.x = w + 30
        else if (p.x > w + 30) p.x = -30
        if (p.y < -30) p.y = h + 30
        else if (p.y > h + 30) p.y = -30
      }

      // 液态网格连线
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            const t = 1 - d / LINK
            let alpha = t * 0.14
            // 鼠标附近的连线更亮，形成液态聚合感
            if (a.near || b.near) alpha = Math.max(alpha, t * 0.32)
            ctx.strokeStyle = `rgba(148, 163, 249, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // 绘制粒子
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color}, ${p.near ? 0.8 : 0.4})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.near ? p.r + 0.8 : p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    step()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
