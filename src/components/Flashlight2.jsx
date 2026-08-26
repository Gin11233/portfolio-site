import { useEffect, useRef } from 'react'

// 手电筒：点击导航后，一束白光从导航位置掉落，照亮对应模块后渐隐
export default function Flashlight() {
  const beamRef = useRef(null)

  useEffect(() => {
    let raf = 0
    let timers = []

    const clearAll = () => {
      cancelAnimationFrame(raf)
      timers.forEach((t) => clearTimeout(t))
      timers = []
    }

    const clearLit = () => {
      document.querySelectorAll('.module-lit').forEach((n) => n.classList.remove('module-lit'))
    }

    const fire = (id) => {
      if (!id) return
      const el = document.getElementById(id)
      const beam = beamRef.current
      if (!el || !beam) return

      clearAll()
      clearLit()

      const navH = 64
      // 光束先出现在导航位置
      beam.style.transition = 'opacity 0.45s ease'
      beam.style.top = `${navH - 40}px`
      beam.style.opacity = '1'

      // 跟随模块位置掉落（滚动期间模块上移，光束随之"掉"到模块顶部）
      let settled = 0
      const tick = () => {
        const rect = el.getBoundingClientRect()
        beam.style.top = `${Math.max(navH - 40, rect.top - 12)}px`
        if (rect.top <= 120 && rect.top >= 30) {
          settled += 1
          if (settled > 10) {
            // 到达：照亮模块
            el.classList.add('module-lit')
            timers.push(
              setTimeout(() => {
                beam.style.opacity = '0'
                timers.push(setTimeout(clearLit, 3400))
              }, 1600),
            )
            return
          }
        } else {
          settled = 0
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      // 安全兜底：4.5 秒后强制结束
      timers.push(
        setTimeout(() => {
          cancelAnimationFrame(raf)
          beam.style.opacity = '0'
          timers.push(setTimeout(clearLit, 3400))
        }, 4500),
      )
    }

    // 事件委托：捕获所有导航链接点击（无需改动 Navbar）
    const onDocClick = (e) => {
      const link = e.target.closest('.navbar__links a[href^="#"], .navbar__brand')
      if (!link) return
      const href = link.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1) {
        fire(href)
      }
    }

    // 兼容自定义事件（如未来其它触发源）
    const onFlashEvent = (e) => fire(e.detail?.target)

    document.addEventListener('click', onDocClick)
    window.addEventListener('flashlight', onFlashEvent)
    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('flashlight', onFlashEvent)
      clearAll()
    }
  }, [])

  return (
    <div ref={beamRef} className="flash-beam" aria-hidden="true">
      <span className="flash-beam__tip" />
    </div>
  )
}