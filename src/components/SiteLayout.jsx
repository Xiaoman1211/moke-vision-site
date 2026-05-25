import { Menu, UserRound, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  ['/', '首页'],
  ['/courses', '课程'],
  ['/tools', '工具'],
  ['/cases', '案例'],
]

export function SiteLayout({ mobileOpen, onToggleMenu, onCloseMenu, children }) {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="MOKE Vision">
          <span className="brand-mark">MV</span>
          <span>
            <strong>MOKE Vision</strong>
            <small>AI Video Studio & Academy</small>
          </span>
        </Link>

        <nav className={mobileOpen ? 'nav-links is-open' : 'nav-links'} aria-label="主导航">
          {navItems.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              onClick={onCloseMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          <Link className="login-link" to="/account">
            <UserRound size={16} />
            登录
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-label="打开导航"
            onClick={onToggleMenu}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
