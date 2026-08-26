import { useEffect, useRef } from 'react'

// 液态粒子场（增强版）：粒子更大更亮、鼠标强吸引漩涡、粒子拖尾、
// 光标划过泛起涟漪环 —— 液态反馈清晰可见，整体仍保持克制
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

    // 深色粒子（浅色背景上可见）
    const COLORS = ['79, 70, 229', '2, 132, 199', '126, 34, 206']
    const R = 210 // 鼠标影响半径
    const LINK = 150 // 粒子连线距离
    const TRAIL = 8 // 拖尾长度

    let w = 0
    let h = 0
    let raf = 0
    let particles = []
    const rings = []
    const mouse = { x: -9999, y: -9999, active: false }
    let lastRingX = -9999
    let lastRingY = -9999

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // 粒子数量随屏幕大小自适应
      const count = Math.max(48, Math.min(110, Math.floor((w * h) / 15000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: 1.5 + Math.random() * 2.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        near: false,
        trail: [],
      }))
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
      // 鼠标移动足够距离时泛起涟漪
      if (Math.hypot(mouse.x - lastRingX, mouse.y - lastRingY) > 26) {
        rings.push({ x: mouse.x, y: mouse.y, r: 0, max: 130 })
        lastRingX = mouse.x
        lastRingY = mouse.y
      }
    }

    const onLeave = () => {
      mouse.active = false
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)

      // 更新粒子：布朗漂移 + 鼠标强吸引漩涡
      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 0.07
        p.vy += (Math.random() - 0.5) * 0.07
        p.vx *= 0.94
        p.vy *= 0.94

        p.near = false
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d = Math.hypot(dx, dy)
          if (d < R && d > 0.01) {
            p.near = true
            const f = (1 - d / R) * 0.1
            // 径向吸引（聚拢）
            p.vx += (dx / d) * f * 1.7
            p.vy += (dy / d) * f * 1.7
            // 切向环绕（液态漩涡）
            p.vx += (-dy / d) * f * 1.15
            p.vy += (dx / d) * f * 1.15
          }
        }

        p.x += p.vx
        p.y += p.vy

        // 记录拖尾
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > TRAIL) p.trail.shift()

        // 边界回绕
        if (p.x < -30) p.x = w + 30
        else if (p.x > w + 30) p.x = -30
        if (p.y < -30) p.y = h + 30
        else if (p.y > h + 30) p.y = -30
      }

      // 拖尾（液态彗星尾巴：靠近粒子最亮，向尾端渐隐）
      ctx.lineCap = 'round'
      for (const p of particles) {
        const len = p.trail.length
        if (len < 2) continue
        for (let k = 1; k < len; k += 1) {
          const fade = 1 - k / len
          const a = p.trail[len - k - 1]
          const b = p.trail[len - k]
          ctx.strokeStyle = `rgba(${p.color}, ${fade * (p.near ? 0.5 : 0.28)})`
          ctx.lineWidth = Math.max(0.4, p.r * fade * (p.near ? 1.3 : 0.9))
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
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
            let alpha = t * 0.24
            if (a.near || b.near) alpha = Math.max(alpha, t * 0.55)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // 涟漪环（液态水面波纹）
      for (let i = rings.length - 1; i >= 0; i -= 1) {
        const ring = rings[i]
        ring.r += 3.2
        const t = 1 - ring.r / ring.max
        if (t <= 0) {
          rings.splice(i, 1)
          continue
        }
        ctx.strokeStyle = `rgba(14, 165, 233, ${t * 0.4})`
        ctx.lineWidth = 1.6
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // 粒子
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color}, ${p.near ? 0.95 : 0.55})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.near ? p.r + 1.2 : p.r, 0, Math.PI * 2)
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
