import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, UserRound, X } from 'lucide-react'

const navItems = [
  ['/courses', '课程'],
  ['/cases', '案例'],
  ['/tools', '工具台'],
]

export function PageLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="page-layout">
      <header className="topbar-v2">
        <Link className="brand-v2" to="/" aria-label="MOKE Vision 首页">
          <span className="brand-mark-v2">MV</span>
        </Link>

        <nav className={open ? 'nav-v2 is-open' : 'nav-v2'} aria-label="主导航">
          {navItems.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions-v2">
          <Link className="login-btn-v2" to="/account">
            <UserRound size={15} /> 登录
          </Link>
          <button
            className="menu-btn-v2"
            type="button"
            aria-label="打开导航"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main className="page-main">
        <Outlet />
      </main>
    </div>
  )
}
