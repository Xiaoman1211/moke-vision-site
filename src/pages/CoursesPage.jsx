import { useState, useEffect } from 'react'
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Film,
  GraduationCap,
  Layers,
  Star,
  Users,
  X,
} from 'lucide-react'
import { courses } from '../content'

const levelColors = {
  '入门→进阶': 'lime',
  '入门': 'lime',
  '进阶': 'blue',
}

function CourseCard({ course, onOpen }) {
  return (
    <article
      className="course-card"
      onClick={() => onOpen(course)}
      role="button"
      tabIndex={0}
      aria-label={`查看课程: ${course.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(course)
      }}
    >
      <div className="course-card-top">
        <div className="course-card-icon">
          <BookOpen size={24} aria-hidden="true" />
        </div>
        <span className={`course-card-tag tone-${levelColors[course.level] || 'lime'}`}>
          {course.tag}
        </span>
      </div>
      <div className="course-card-info">
        <strong>{course.title}</strong>
        <small>{course.subtitle}</small>
        <p>{course.text}</p>
        <div className="course-card-meta">
          <span>
            <Clock size={13} aria-hidden="true" /> {course.duration}
          </span>
          <span>
            <GraduationCap size={13} aria-hidden="true" /> {course.level}
          </span>
        </div>
      </div>
      <div className="course-card-footer">
        <span className="course-price">{course.price}</span>
        <button className="course-cta" type="button" tabIndex={-1}>
          查看详情
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  )
}

function CourseDetail({ course, onClose }) {
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const tabs = [
    { key: 'overview', label: '课程概述' },
    { key: 'modules', label: '课程大纲' },
    { key: 'outcomes', label: '学习收获' },
  ]

  return (
    <div
      className="course-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`课程详情: ${course.title}`}
    >
      <div className="course-detail">
        <button
          className="case-close"
          type="button"
          onClick={onClose}
          aria-label="关闭详情"
        >
          <X size={22} />
        </button>

        {/* 课程头部 */}
        <div className="course-detail-hero">
          <span className={`course-card-tag tone-${levelColors[course.level] || 'lime'}`}>
            {course.tag}
          </span>
          <h1>{course.title}</h1>
          <p className="course-detail-subtitle">{course.subtitle}</p>
          <div className="course-detail-quick">
            <span><Clock size={14} aria-hidden="true" /> {course.duration}</span>
            <span><GraduationCap size={14} aria-hidden="true" /> {course.level}</span>
            <span><Film size={14} aria-hidden="true" /> {course.format}</span>
          </div>
          <div className="course-detail-actions">
            <button className="tool-action primary" type="button">
              <BookOpen size={15} /> 立即报名 {course.price}
            </button>
          </div>
        </div>

        {/* 标签页导航 */}
        <nav className="course-tab-bar" aria-label="课程标签">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`course-tab ${tab === t.key ? 'is-active' : ''}`}
              type="button"
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* 标签内容 */}
        <div className="course-tab-content">
          {tab === 'overview' && (
            <div className="course-overview">
              <div className="course-overview-left">
                <h3>适合人群</h3>
                <p>{course.audience}</p>

                <h3>课程描述</h3>
                <p>{course.text}</p>
              </div>
              <div className="course-overview-right">
                <div className="course-highlights">
                  <h3>课程亮点</h3>
                  <ul>
                    <li><Star size={14} aria-hidden="true" /> 真实项目驱动教学</li>
                    <li><Layers size={14} aria-hidden="true" /> 模板 + 提示词 + 交付清单</li>
                    <li><Users size={14} aria-hidden="true" /> 社群 + 直播答疑</li>
                    <li><CheckCircle size={14} aria-hidden="true" /> 学完即可独立接单</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === 'modules' && (
            <div className="course-modules">
              <div className="module-list">
                {course.modules.map((mod, i) => (
                  <div className="module-item" key={mod.title}>
                    <div className="module-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="module-content">
                      <strong>{mod.title}</strong>
                      <p>{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'outcomes' && (
            <div className="course-outcomes">
              <h3>完成本课程后，你将能够：</h3>
              <ul className="outcome-list">
                {course.outcomes.map((o) => (
                  <li key={o}>
                    <CheckCircle size={18} aria-hidden="true" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function CoursesPage() {
  const [detail, setDetail] = useState(null)

  return (
    <section className="courses-page">
      <div className="courses-hero">
        <p className="eyebrow">教学板块</p>
        <h1>
          课程<em>体系</em>
        </h1>
        <p className="page-text">
          从零基础到独立导演。每一门课都经过真实项目验证。
        </p>
      </div>

      {/* 学习路径可视化 */}
      <div className="learning-path">
        <div className="path-track">
          <div className="path-node tone-lime">
            <div className="path-dot" />
            <span>系统课</span>
            <strong>AI视频全流程</strong>
            <small>入门→进阶 · 48课时</small>
          </div>
          <div className="path-connector tone-lime" />
          <div className="path-node tone-blue">
            <div className="path-dot" />
            <span>进阶课</span>
            <strong>AI视频导演课</strong>
            <small>进阶 · 32课时</small>
          </div>
          <div className="path-connector tone-blue" />
          <div className="path-node tone-copper">
            <div className="path-dot" />
            <span>会员课</span>
            <strong>学员变现闭环</strong>
            <small>进阶 · 16课时</small>
          </div>
        </div>
        <div className="path-branch tone-copper">
          <div className="path-node tone-copper">
            <div className="path-dot" />
            <span>实战课</span>
            <strong>商业短视频模板</strong>
            <small>入门 · 18课时</small>
          </div>
        </div>
      </div>

      {/* 课程卡片 */}
      <div className="course-card-grid">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onOpen={setDetail}
          />
        ))}
      </div>

      {detail && (
        <CourseDetail course={detail} onClose={() => setDetail(null)} />
      )}
    </section>
  )
}
