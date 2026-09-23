import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Plans from './pages/Plans'
import Download from './pages/Download'
import './app.css'

const PORTAL_URL = 'https://portal-three-rho.vercel.app/auth'

const NAV_ITEMS = [
  { label: 'Platform', to: '/#platform' },
  { label: 'Developers', to: '/#developers' },
  { label: 'Research', to: '/#research' },
  { label: 'Thoth One', to: '/product' },
  { label: 'Plans', to: '/plans' },
]

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target exists after route render
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, hash])
  return null
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header className={`site-header ${scrolled || menuOpen ? 'is-solid' : ''}`}>
      <Link className="brand" to="/" aria-label="Thothcraft home">
        <span className="brand-mark" aria-hidden="true">T</span>
        <span className="brand-word">Thoth</span>
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <Link key={item.label} to={item.to}>{item.label}</Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="install-link" to="/download">Install</Link>
        <a className="portal-link" href={PORTAL_URL} target="_blank" rel="noopener">Portal</a>
        <button
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
          <Link to="/download" onClick={() => setMenuOpen(false)}>Install</Link>
          <a href={PORTAL_URL} target="_blank" rel="noopener">Portal ↗</a>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="brand" to="/" aria-label="Thothcraft home">
            <span className="brand-mark" aria-hidden="true">T</span>
            <span className="brand-word">Thoth</span>
          </Link>
          <p className="footer-tag">The context layer between the physical world and intelligent software.</p>
        </div>
        <nav aria-label="Footer — platform">
          <p className="footer-head">Platform</p>
          <Link to="/#platform">Overview</Link>
          <Link to="/#stack">The stack</Link>
          <Link to="/#developers">Developers</Link>
          <Link to="/#research">Research</Link>
        </nav>
        <nav aria-label="Footer — product">
          <p className="footer-head">Product</p>
          <Link to="/product">Thoth One</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/download">Install</Link>
        </nav>
        <nav aria-label="Footer — company">
          <p className="footer-head">Access</p>
          <a href={PORTAL_URL} target="_blank" rel="noopener">Portal ↗</a>
          <a href="mailto:hello@thothcraft.com">hello@thothcraft.com</a>
        </nav>
      </div>
      <div className="footer-base">
        <span>© 2026 Thothcraft</span>
        <span>Whispy · Thoth · Brain</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/download" element={<Download />} />
          <Route path="/shop" element={<Navigate to="/product" replace />} />
          <Route path="/features" element={<Navigate to="/" replace />} />
          <Route path="/thothcraft/download" element={<Navigate to="/download" replace />} />
          <Route path="/projects" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
