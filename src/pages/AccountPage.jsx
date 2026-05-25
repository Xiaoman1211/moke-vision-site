import { useState } from 'react'
import {
  ArrowRight,
  Clock,
  LogIn,
  Mail,
  Shield,
  Sparkles,
  User,
  Zap,
} from 'lucide-react'

function LoginForm({ onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-icon">
          <LogIn size={22} aria-hidden="true" />
        </div>
        <h2>登录 MOKE Vision</h2>
        <p>登录后可使用创作工具、查看课程进度和积分余额</p>
      </div>

      <form
        className="auth-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="auth-field">
          <span>邮箱</span>
          <div className="auth-input-wrap">
            <Mail size={16} aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com…"
              autoComplete="email"
              name="email"
              spellCheck={false}
            />
          </div>
        </label>

        <label className="auth-field">
          <span>密码</span>
          <div className="auth-input-wrap">
            <Shield size={16} aria-hidden="true" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入密码…"
              autoComplete="current-password"
              name="password"
              spellCheck={false}
            />
          </div>
        </label>

        <button className="tool-action primary full" type="submit">
          <LogIn size={15} /> 登录
        </button>

        <div className="auth-divider">
          <span>还没有账号？</span>
          <button className="auth-switch" type="button" onClick={onRegister}>
            立即注册 <ArrowRight size={13} />
          </button>
        </div>
      </form>
    </div>
  )
}

function RegisterForm({ onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-icon">
          <User size={22} aria-hidden="true" />
        </div>
        <h2>注册 MOKE Vision</h2>
        <p>成为创作者，解锁全部课程和工具</p>
      </div>

      <form
        className="auth-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="auth-field">
          <span>邮箱</span>
          <div className="auth-input-wrap">
            <Mail size={16} aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com…"
              autoComplete="email"
              name="email"
              spellCheck={false}
            />
          </div>
        </label>

        <label className="auth-field">
          <span>密码</span>
          <div className="auth-input-wrap">
            <Shield size={16} aria-hidden="true" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="至少6位…"
              autoComplete="new-password"
              name="new-password"
              spellCheck={false}
            />
          </div>
        </label>

        <button className="tool-action primary full" type="submit">
          <User size={15} /> 创建账号
        </button>

        <div className="auth-divider">
          <span>已有账号？</span>
          <button className="auth-switch" type="button" onClick={onBack}>
            返回登录 <ArrowRight size={13} />
          </button>
        </div>
      </form>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="account-dashboard">
      {/* 用户信息 */}
      <div className="user-profile">
        <div className="user-avatar">
          <User size={26} aria-hidden="true" />
        </div>
        <div className="user-info">
          <strong>MOKE 创作者</strong>
          <span>member@mokevision.com</span>
          <small>会员 · 已加入 3 个月</small>
        </div>
      </div>

      {/* 积分卡片 */}
      <div className="points-card">
        <div className="points-main">
          <Sparkles size={24} aria-hidden="true" />
          <strong>1,280</strong>
          <span>可用积分</span>
        </div>
        <div className="points-detail">
          <div>
            <span>本月已用</span>
            <strong>320</strong>
          </div>
          <div>
            <span>本月获得</span>
            <strong>200</strong>
          </div>
          <div>
            <span>课程权益</span>
            <strong>2门</strong>
          </div>
        </div>
      </div>

      {/* 我的课程 */}
      <div className="section-block">
        <h3>我的课程</h3>
        <div className="enrolled-courses">
          <div className="enrolled-item">
            <div className="enrolled-progress">
              <span>AI视频全流程</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }} />
              </div>
              <small>进度 65%</small>
            </div>
            <button className="text-action" type="button">继续学习</button>
          </div>
          <div className="enrolled-item">
            <div className="enrolled-progress">
              <span>商业短视频模板</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '28%' }} />
              </div>
              <small>进度 28%</small>
            </div>
            <button className="text-action" type="button">继续学习</button>
          </div>
        </div>
      </div>

      {/* 快速入口 */}
      <div className="quick-grid">
        <button className="quick-entry" type="button">
          <Zap size={18} aria-hidden="true" />
          <span>创作历史</span>
          <small>12 个项目</small>
        </button>
        <button className="quick-entry" type="button">
          <Clock size={18} aria-hidden="true" />
          <span>消耗记录</span>
          <small>30 天内</small>
        </button>
        <button className="quick-entry" type="button">
          <Shield size={18} aria-hidden="true" />
          <span>账户设置</span>
          <small>资料与安全</small>
        </button>
      </div>
    </div>
  )
}

export function AccountPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <section className="account-page">
      <div className="account-hero">
        <p className="eyebrow">账户系统</p>
        <h1>
          用户<em>中心</em>
        </h1>
        <p className="page-text">
          管理你的账户、积分、课程权益和创作历史。登录后解锁完整功能。
        </p>
      </div>

      <div className="account-content">
        {loggedIn ? (
          <>
            <Dashboard />
            <div className="account-footer-action">
              <button
                className="tool-action ghost"
                type="button"
                onClick={() => setLoggedIn(false)}
              >
                退出登录
              </button>
            </div>
          </>
        ) : showRegister ? (
          <RegisterForm onBack={() => setShowRegister(false)} />
        ) : (
          <LoginForm onRegister={() => setShowRegister(true)} />
        )}

        {!loggedIn && (
          <button
            className="demo-toggle"
            type="button"
            onClick={() => setLoggedIn(true)}
          >
            预览登录后的仪表盘 →
          </button>
        )}
      </div>
    </section>
  )
}
