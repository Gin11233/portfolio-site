import { siteData } from '../data/site.js'

export default function Footer() {
  const { footer } = siteData
  return (
    <footer className="footer">
      <div className="container">
        <p>{footer.text}</p>
        <p className="footer__sub">
          Powered by React + Vite · 托管于 GitHub Pages ·{' '}
          <a href="#home">回到顶部 ↑</a>
        </p>
      </div>
    </footer>
  )
}
