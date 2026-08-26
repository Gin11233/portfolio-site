// 3D 倾斜卡片：跟随鼠标旋转 + 光标聚光灯
export default function TiltCard({ children, className = '', max = 7 }) {
  const onMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }

  const onLeave = (e) => {
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="tilt__glare" aria-hidden="true" />
      {children}
    </div>
  )
}
