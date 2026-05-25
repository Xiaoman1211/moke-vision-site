import { useState, useCallback, useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Clock,
  Film,
  Layers,
  Tag,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react'
import { longCaseStudies, caseTypeFilters } from '../content'

function CaseCard({ item, onOpen, index }) {
  return (
    <article
      className="case-card"
      style={{ '--delay': `${index * 80}ms` }}
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      aria-label={`查看案例: ${item.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(item)
      }}
    >
      <div className="case-card-media">
        <img
          src={item.cover}
          alt={item.name}
          width={640}
          height={360}
          loading={index > 1 ? 'lazy' : 'eager'}
        />
        <span className="case-card-type">{item.type}</span>
      </div>
      <div className="case-card-body">
        <strong>{item.name}</strong>
        <small>{item.subtitle}</small>
        <p>{item.summary}</p>
        <button className="case-card-cta" type="button" tabIndex={-1}>
          查看详情
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  )
}

function MetricItem({ label, value }) {
  return (
    <div className="metric-item">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

function TimelineStep({ step, index, isLast }) {
  return (
    <div className="timeline-step" style={{ '--delay': `${index * 120}ms` }}>
      <div className="timeline-node">
        <span>{String(index + 1).padStart(2, '0')}</span>
        {!isLast && <div className="timeline-line" />}
      </div>
      <div className="timeline-content">
        <strong>{step.title}</strong>
        <p>{step.desc}</p>
      </div>
    </div>
  )
}

function CaseDetail({ item, onClose }) {
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

  return (
    <div
      className="case-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`案例详情: ${item.name}`}
    >
      <div className="case-detail">
        <button
          className="case-close"
          type="button"
          onClick={onClose}
          aria-label="关闭详情"
        >
          <X size={22} />
        </button>

        {/* 头部封面 */}
        <div className="case-detail-header">
          <img src={item.cover} alt={item.name} width={1280} height={720} />
          <div className="case-detail-header-info">
            <span className="eyebrow">{item.type}</span>
            <h1>{item.name}</h1>
            <p>{item.subtitle}</p>
          </div>
        </div>

        {/* 指标栏 */}
        <div className="case-detail-metrics">
          {item.metrics.map(([label, value]) => (
            <MetricItem key={label} label={label} value={value} />
          ))}
        </div>

        {/* 描述 + 标签 */}
        <div className="case-detail-body">
          <div className="case-detail-desc">
            <h3>项目概述</h3>
            <p>{item.description}</p>
          </div>

          <div className="case-detail-tags">
            <h3>
              <Tag size={16} /> 关键词
            </h3>
            <div className="tag-list">
              {item.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="case-detail-tech">
            <h3>
              <WandSparkles size={16} /> 技术栈
            </h3>
            <div className="tag-list">
              {item.techStack.map((tech) => (
                <span className="tag tech" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 生产流程时间线 */}
          <div className="case-detail-process">
            <h3>
              <Layers size={16} /> 生产流程
            </h3>
            <div className="timeline">
              {item.processSteps.map((step, i) => (
                <TimelineStep
                  key={step.title}
                  step={step}
                  index={i}
                  isLast={i === item.processSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CasesPage() {
  const [filter, setFilter] = useState('all')
  const [detailOpen, setDetailOpen] = useState(null)

  const filtered =
    filter === 'all'
      ? longCaseStudies
      : longCaseStudies.filter((c) => c.typeKey === filter)

  const handleOpen = useCallback((item) => setDetailOpen(item), [])
  const handleClose = useCallback(() => setDetailOpen(null), [])

  return (
    <section className="cases-page">
      {/* 页面头部 */}
      <div className="cases-hero">
        <div className="cases-hero-info">
          <p className="eyebrow">案例板块</p>
          <h1>
            <span>精品案例</span>
            <em>&</em>商业交付
          </h1>
          <p className="page-text">
            每一个案例都是完整的生产链路验证——从需求到交付，沉淀为可复用的方法论。
          </p>
        </div>
        <div className="cases-hero-stats">
          <div className="hero-stat">
            <Film size={20} />
            <strong>3+</strong>
            <span>案例类型</span>
          </div>
          <div className="hero-stat">
            <Clock size={20} />
            <strong>500+</strong>
            <span>生产小时</span>
          </div>
          <div className="hero-stat">
            <Zap size={20} />
            <strong>47+</strong>
            <span>提示词迭代版</span>
          </div>
        </div>
      </div>

      {/* 分类筛选 */}
      <nav className="case-filter-bar" aria-label="案例分类筛选">
        {caseTypeFilters.map((f) => (
          <button
            key={f.key}
            className={filter === f.key ? 'filter-btn is-active' : 'filter-btn'}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
          >
            {f.label}
            {f.key !== 'all' && (
              <ChevronDown size={12} aria-hidden="true" />
            )}
          </button>
        ))}
      </nav>

      {/* 案例网格 */}
      <div className="case-card-grid">
        {filtered.map((item, i) => (
          <CaseCard
            key={item.id}
            item={item}
            index={i}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {/* 详情覆盖层 */}
      {detailOpen && (
        <CaseDetail item={detailOpen} onClose={handleClose} />
      )}
    </section>
  )
}
