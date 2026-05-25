import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Clock, GraduationCap, Play, Star, Menu, UserRound, X,
  Layers, Palette, TrendingUp, Sparkles, Zap, Shield,
} from 'lucide-react'
import { FlowSymbol } from '../components/FlowSymbol'
import { courses } from '../content'

const tagMap = { '系统课':'moke-tag-lime','实战课':'moke-tag-blue','进阶课':'moke-tag-copper','会员课':'moke-tag-gold' }

/* 滚动数字动画 */
function AnimatedNumber({ value, suffix }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let start = 0; const dur = 1600; const step = 30
      const inc = Math.ceil(value / (dur / step))
      const t = setInterval(() => { start += inc; setN(start >= value ? value : start); if (start >= value) clearInterval(t) }, step)
      obs.unobserve(el)
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])
  return <strong ref={ref}>{n}<em>{suffix}</em></strong>
}

export function HomePage() {
  const [mob, setMob] = useState(false)
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 300); return () => clearTimeout(t) }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.moke-sr').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="moke-home">

      {/* ======== NAV ======== */}
      <header className="moke-nav">
        <Link className="moke-brand" to="/" aria-label="MOKE Vision"><span className="moke-brand-mark">MV</span></Link>
        <nav className={mob ? 'moke-nav-links is-open' : 'moke-nav-links'}>
          {[['/courses','课程'],['/cases','案例'],['/tools','工具台']].map(([to,lb]) => <Link key={to} to={to} onClick={() => setMob(false)}>{lb}</Link>)}
        </nav>
        <div className="moke-nav-actions">
          <Link className="moke-login-btn" to="/account"><UserRound size={15}/> 登录</Link>
          <button className="moke-menu-btn" type="button" aria-label="菜单" onClick={() => setMob(v => !v)}>{mob ? <X size={18}/> : <Menu size={18}/>}</button>
        </div>
      </header>

      {/* ================================================================
          S1 — HERO
         ================================================================ */}
      <section className="moke-hero">
        <div className="moke-hero-bg" aria-hidden="true"><img src="/assets/hero-bg.jpg" alt="" /></div>
        <div className="moke-canvas" aria-hidden="true"><FlowSymbol /></div>
        <div className="moke-ring" aria-hidden="true"><img src="/assets/hero-symbol-ring.jpg" alt="" /></div>
        <div className={`moke-hero-text ${show ? 'moke-fade-up' : ''}`}>
          <p className="moke-hero-label" style={{'--i':0}}>AI FILM STUDIO · ACADEMY</p>
          <h1 style={{'--i':1}}><span className="moke-hero-m">M</span><span className="moke-hero-v">V</span></h1>
          <p className="moke-hero-desc" style={{'--i':2}}>把 AI 视频从灵感变成可教学、可交付、可变现的系统</p>
          <div className="moke-hero-cta" style={{'--i':3}}>
            <Link className="moke-btn-primary" to="/courses">探索课程 <ArrowRight size={15}/></Link>
            <Link className="moke-btn-ghost" to="/cases">查看案例</Link>
          </div>
        </div>
        <div className="moke-scroll-hint" aria-hidden="true"><span/></div>
      </section>

      {/* ================================================================
          S2 — 精品课程
         ================================================================ */}
      <section className="moke-section moke-sr">
        <div className="moke-shead">
          <p className="moke-eyebrow">Featured Courses</p>
          <h2>精品课程</h2>
          <p className="moke-sub">系统化的 AI 视频创作学习路径，从零到精通</p>
        </div>
        <div className="moke-fc-grid">
          {courses.map((c, i) => (
            <Link className="moke-fc-card" to="/courses" key={c.id} style={{'--ii':i}}>
              <div className="moke-fc-img">
                <img src={c.cover} alt={c.title} width={600} height={340} loading={i>1?'lazy':'eager'}/>
                <span className={`moke-fc-tag ${tagMap[c.tag]}`}>{c.tag}</span>
                {i===0 && <span className="moke-fc-hot">HOT</span>}
                <div className="moke-fc-play" aria-hidden="true"><Play size={16} fill="#fff"/></div>
              </div>
              <div className="moke-fc-body">
                <strong>{c.title}</strong>
                <p>{c.subtitle}</p>
                <div className="moke-fc-meta"><span><Clock size={11}/> {c.duration}</span><span><GraduationCap size={11}/> {c.level}</span></div>
                <span className="moke-fc-price">{c.price}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link className="moke-more" to="/courses">查看全部课程 <ArrowRight size={14}/></Link>
      </section>

      {/* ================================================================
          S3 — 为谁而做
         ================================================================ */}
      <section className="moke-section moke-alt moke-sr">
        <div className="moke-shead">
          <p className="moke-eyebrow">Who Is It For</p>
          <h2>无论什么岗位，AIGC 都是你的加速器</h2>
        </div>
        <div className="moke-who-grid">
          {[
            { icon:Palette, color:'moke-who-copper', label:'技能型岗位', t:'AI 转型', d:'掌握 AIGC 工具提升不可替代性，实现收入翻倍增长', tags:['设计师','剪辑师','动画师'] },
            { icon:TrendingUp, color:'moke-who-blue', label:'创意策划岗', t:'横向拓展', d:'拓展创意边界，将 AIGC 融入现有创意工作流程', tags:['品牌策划','内容规划','创意总监'] },
            { icon:Shield, color:'moke-who-lime', label:'管理岗位', t:'向下兼容', d:'建立 AI 落地可行性评估框架，带领团队全面提效', tags:['产品经理','品牌主理','团队 Leader'] },
          ].map(w => { const I = w.icon; return (
            <div className={`moke-who-card ${w.color}`} key={w.t}>
              <div className="moke-who-icon"><I size={24}/></div>
              <span className="moke-who-label">{w.label}</span>
              <strong>{w.t}</strong>
              <p>{w.d}</p>
              <div className="moke-who-tags">{w.tags.map(tg => <small key={tg}>{tg}</small>)}</div>
            </div>
          )})}
        </div>
      </section>

      {/* ================================================================
          S4 — 为什么选择
         ================================================================ */}
      <section className="moke-section moke-sr">
        <div className="moke-shead">
          <p className="moke-eyebrow">Why MOKE Vision</p>
          <h2>不只是课程，是一套生产系统</h2>
          <p className="moke-sub">我们交付可复用的方法论、模板和工具链</p>
        </div>
        <div className="moke-why-grid">
          {[
            { icon:Layers, t:'系统化课程体系', d:'从零基础到独立导演的完整学习路径，每门课都经过真实项目验证' },
            { icon:Sparkles, t:'AI 原生工作流', d:'深度适配 Seedance / Kling / Runway，从提示词到成片一键串联' },
            { icon:Zap, t:'学完即可交付', d:'每门课配套模板 + 提示词库 + 交付清单，学完就能独立接单变现' },
          ].map(a => { const I = a.icon; return (
            <div className="moke-why-card" key={a.t}><div className="moke-why-icon"><I size={22}/></div><strong>{a.t}</strong><p>{a.d}</p></div>
          )})}
        </div>
      </section>

      {/* ================================================================
          S5 — 你将是谁
         ================================================================ */}
      <section className="moke-section moke-alt moke-sr">
        <div className="moke-shead">
          <p className="moke-eyebrow">Who You'll Become</p>
          <h2>AI 视觉规划师</h2>
          <p className="moke-sub">融合策略、视觉设计与营销的新一代品牌构建者</p>
        </div>
        <div className="moke-become-grid">
          <div className="moke-become-ring">
            <div className="moke-become-ring-inner">
              <img src="/assets/hero-symbol-ring.jpg" alt="" />
              <span>MOKE<br/>VISION</span>
            </div>
            <div className="moke-become-ring-outer" aria-hidden="true"/>
          </div>
          <div className="moke-become-skills">
            <h3>核心能力</h3>
            {[
              { icon:Layers, t:'策略思维', d:'用策略思维设计底层视觉体系' },
              { icon:Palette, t:'跨界创作', d:'用 AI 打破二维/三维/视频边界' },
              { icon:TrendingUp, t:'营销洞察', d:'理解传播本质，用营销驱动视觉迭代' },
              { icon:Star, t:'持续进化', d:'更强的学习力，敢于打破常规' },
            ].map(s => { const SI = s.icon; return (
              <div className="moke-skill-item" key={s.t}><div className="moke-skill-icon"><SI size={16}/></div><div><strong>{s.t}</strong><span>{s.d}</span></div></div>
            )})}
          </div>
        </div>
      </section>

      {/* ================================================================
          S6 — 数字见证
         ================================================================ */}
      <section className="moke-section moke-sr">
        <div className="moke-stats-row">
          {[[4,'门','精品课程'],[32,'章','系统内容'],[120,'+','课时教学'],[3,'大','平台适配']].map(([v,s,lb]) => (
            <div className="moke-stat" key={lb}><AnimatedNumber value={v} suffix={s}/><span>{lb}</span></div>
          ))}
        </div>
      </section>

      {/* ================================================================
          S7 — CTA
         ================================================================ */}
      <section className="moke-section moke-sr">
        <div className="moke-cta-card">
          <Sparkles size={28}/>
          <h2>准备好开始你的 AI 电影之旅了吗？</h2>
          <p>加入 MOKE Vision，把 AI 视频从灵感变成可交付的作品</p>
          <Link className="moke-btn-primary large" to="/courses">免费开始学习 <ArrowRight size={16}/></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="moke-footer"><span>MOKE VISION</span><small>© 2026 AI Film Studio & Academy</small></footer>
    </div>
  )
}
