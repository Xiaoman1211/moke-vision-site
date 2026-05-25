import { useState, useCallback } from 'react'
import {
  Brain,
  Check,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Copy,
  FileText,
  FolderOpen,
  Image,
  Layers,
  LayoutPanelTop,
  PanelRight,
  Play,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Video,
  WandSparkles,
  X,
} from 'lucide-react'

/* ===================== 数据 ===================== */

const toolTabs = [
  { id: 'script', label: '剧本生成', icon: FileText, color: 'lime' },
  { id: 'storyboard', label: '分镜工作台', icon: LayoutPanelTop, color: 'blue' },
  { id: 'image-prompt', label: '图片提示词', icon: Image, color: 'copper' },
  { id: 'video-prompt', label: '视频提示词', icon: Video, color: 'lime' },
  { id: 'assets', label: '项目资产库', icon: FolderOpen, color: 'blue' },
  { id: 'credits', label: '积分账户', icon: Sparkles, color: 'copper' },
]

const sampleScript = `【场景1 · 茶室 · 黄昏】
中景。窗外斜阳透过竹帘，光斑落在老木桌上。阿婆的手缓缓推过一杯茶。

【场景2 · 街道 · 夜】
广角。霓虹灯牌依次亮起。少女站在十字路口，抬头看天。

【场景3 · 天台 · 黎明】
特写。手指划过栏杆上的刻痕。"2003.7.14"。

【场景4 · 茶室 · 午后】
近景。两杯茶，两个茶杯，两个人。画面渐暗。`

const sampleShots = [
  { id: 'LS-01', lens: '中景 35mm', action: '阿婆推茶', duration: '8s', status: 'draft', desc: '固定机位，竹帘光斑作为前景层次' },
  { id: 'LS-02', lens: '广角 24mm', action: '霓虹灯牌依次亮起', duration: '6s', status: 'draft', desc: '低角度仰拍，灯光渐次亮起形成视觉节奏' },
  { id: 'LS-03', lens: '特写 50mm', action: '手指划过刻痕', duration: '5s', status: 'ready', desc: '跟拍手部动作，刻痕数字逐渐清晰' },
  { id: 'LS-04', lens: '中近景 50mm', action: '阿婆倒茶', duration: '4s', status: 'draft', desc: '侧面过肩镜头，茶水注入过程的升格慢镜' },
  { id: 'LS-05', lens: '全景 24mm', action: '天台夕阳', duration: '7s', status: 'draft', desc: '黄金时刻逆光剪影，城市天际线作为背景层次' },
]

const imagePromptTemplates = [
  { label: '角色', prefix: '一个[年龄][性别]角色，[发型][服饰]，站在[场景]中，[光线]从[方向]照射，[情绪]表情，[风格]风格' },
  { label: '场景', prefix: '[时间][地点]的空镜，[光线条件]，[色调]为主，[构图方式]，[细节描述]，电影质感' },
  { label: '道具', prefix: '[道具名称]的特写，放置在[表面]上，[光线]照射，[材质质感]，浅景深，产品摄影风格' },
]

const sampleAssets = [
  { type: '角色', name: '阿婆 / 老年女性', tags: ['定妆照', '多角度'], color: 'lime' },
  { type: '角色', name: '少女 / 青年女性', tags: ['定妆照', '三视图'], color: 'lime' },
  { type: '场景', name: '茶室 / 日景', tags: ['主场景'], color: 'blue' },
  { type: '场景', name: '天台 / 黄昏', tags: ['关键场景', '黄昏'], color: 'blue' },
  { type: '场景', name: '街道 / 夜景', tags: ['霓虹', '雨天'], color: 'blue' },
  { type: '道具', name: '茶杯 / 青花瓷', tags: ['关键道具'], color: 'copper' },
  { type: '参考', name: '王家卫色调板', tags: ['风格参考'], color: 'copper' },
  { type: '参考', name: '竹帘光斑参考', tags: ['光影参考'], color: 'copper' },
]

/* ===================== 子组件 ===================== */

function TabButton({ tab, isActive, onClick }) {
  const Icon = tab.icon
  return (
    <button
      className={`tool-tab ${isActive ? 'is-active' : ''} tone-${tab.color}`}
      type="button"
      onClick={() => onClick(tab.id)}
      aria-pressed={isActive}
    >
      <Icon size={17} aria-hidden="true" />
      <span>{tab.label}</span>
    </button>
  )
}

function ScriptTool() {
  const [text, setText] = useState('')
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    setGenerated(true)
  }

  return (
    <div className="tool-workspace">
      <div className="tool-workspace-header">
        <div>
          <h2>剧本生成</h2>
          <p>输入创意构思，AI 拆解为可生产的场景事件链</p>
        </div>
        <button className="tool-action primary" type="button" onClick={handleGenerate}>
          <Sparkles size={15} /> 生成分镜脚本
        </button>
      </div>

      <textarea
        className="script-input"
        placeholder="描述你的创意构思…&#10;&#10;例如：一个关于「等待」的短片 — 茶室里，阿婆每天都在同一个位置泡两杯茶。街对面的少女以为阿婆在等一个人。最后发现，另一杯茶是给已故老伴的。"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        aria-label="创意构思输入"
        spellCheck={false}
      />

      {generated && (
        <div className="script-output" aria-live="polite">
          <div className="script-output-header">
            <span>生成结果</span>
            <div className="script-output-actions">
              <button className="tool-action ghost" type="button" aria-label="复制">
                <Copy size={14} /> 复制
              </button>
              <button className="tool-action ghost" type="button" aria-label="重新生成">
                <RefreshCw size={14} /> 重新生成
              </button>
            </div>
          </div>
          <pre className="script-code">{sampleScript}</pre>
        </div>
      )}
    </div>
  )
}

function StoryboardTool() {
  const [shots, setShots] = useState(sampleShots)
  const [expandedShot, setExpandedShot] = useState(null)

  const toggleShot = (id) => {
    setExpandedShot((prev) => (prev === id ? null : id))
  }

  const addShot = () => {
    const num = shots.length + 1
    setShots([
      ...shots,
      {
        id: `LS-${String(num).padStart(2, '0')}`,
        lens: '中景 35mm',
        action: '新镜头',
        duration: '5s',
        status: 'draft',
        desc: '输入镜头描述…',
      },
    ])
  }

  return (
    <div className="tool-workspace">
      <div className="tool-workspace-header">
        <div>
          <h2>分镜工作台</h2>
          <p>拆解剧本为可生产的镜头序列，确保连续性和叙事节奏</p>
        </div>
        <button className="tool-action primary" type="button" onClick={addShot}>
          <Plus size={15} /> 添加镜头
        </button>
      </div>

      <div className="shot-summary">
        <span>{shots.length} 个镜头</span>
        <span>总时长 ~{shots.reduce((t, s) => t + parseInt(s.duration) || 0, 0)}s</span>
      </div>

      <div className="shot-list">
        {shots.map((shot) => (
          <div
            key={shot.id}
            className={`shot-item ${expandedShot === shot.id ? 'is-expanded' : ''} status-${shot.status}`}
          >
            <button
              className="shot-header"
              type="button"
              onClick={() => toggleShot(shot.id)}
              aria-expanded={expandedShot === shot.id}
            >
              <span className="shot-id">{shot.id}</span>
              <span className="shot-lens">{shot.lens}</span>
              <span className="shot-action">{shot.action}</span>
              <span className="shot-duration">{shot.duration}</span>
              <span className={`shot-badge ${shot.status}`}>
                {shot.status === 'ready' ? '就绪' : '草稿'}
              </span>
              <ChevronDown
                size={14}
                className={`shot-chevron ${expandedShot === shot.id ? 'rotated' : ''}`}
                aria-hidden="true"
              />
            </button>
            {expandedShot === shot.id && (
              <div className="shot-body">
                <textarea
                  className="shot-desc"
                  value={shot.desc}
                  onChange={() => {}}
                  rows={2}
                  placeholder="镜头描述…"
                  spellCheck={false}
                  aria-label={`${shot.id} 镜头描述`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ImagePromptTool() {
  const [template, setTemplate] = useState(imagePromptTemplates[0])
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('cinematic')
  const [copied, setCopied] = useState(false)

  const buildPrompt = () => {
    const styleMod = style === 'cinematic' ? '电影质感，35mm胶片颗粒，浅景深' :
      style === 'anime' ? '动漫风格，吉卜力工作室，柔和色彩' :
      '真实摄影，自然光线，高细节'
    setPrompt(`${template.prefix}，${styleMod}，8K分辨率`)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="tool-workspace">
      <div className="tool-workspace-header">
        <div>
          <h2>图片提示词</h2>
          <p>结构化构建角色、场景、道具的提示词，确保风格一致性</p>
        </div>
      </div>

      <div className="prompt-builder">
        <div className="prompt-controls">
          <label className="prompt-label">模板类型</label>
          <div className="template-pills">
            {imagePromptTemplates.map((t) => (
              <button
                key={t.label}
                className={`template-pill ${template.label === t.label ? 'is-active' : ''}`}
                type="button"
                onClick={() => setTemplate(t)}
              >
                <Image size={14} aria-hidden="true" />
                {t.label}
              </button>
            ))}
          </div>

          <label className="prompt-label">风格基调</label>
          <div className="style-pills">
            {[
              { id: 'cinematic', label: '电影质感' },
              { id: 'anime', label: '动漫风格' },
              { id: 'photo', label: '真实摄影' },
            ].map((s) => (
              <button
                key={s.id}
                className={`style-pill ${style === s.id ? 'is-active' : ''}`}
                type="button"
                onClick={() => setStyle(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button className="tool-action primary full" type="button" onClick={buildPrompt}>
            <WandSparkles size={15} /> 生成提示词
          </button>
        </div>

        {prompt && (
          <div className="prompt-output">
            <div className="prompt-output-header">
              <span>生成的提示词</span>
              <button
                className="tool-action ghost"
                type="button"
                onClick={handleCopy}
                aria-label="复制提示词"
              >
                {copied ? <><Check size={14} aria-hidden="true" /> <span aria-live="polite">已复制</span></> : <><Copy size={14} aria-hidden="true" /> 复制</>}
              </button>
            </div>
            <div className="prompt-text">{prompt}</div>
          </div>
        )}
      </div>
    </div>
  )
}

function VideoPromptTool() {
  const [step, setStep] = useState(1)
  const [fields, setFields] = useState({
    subject: '',
    action: '',
    camera: '',
    lighting: '',
    mood: '',
  })
  const [prompt, setPrompt] = useState('')

  const steps = ['主体+动作', '运镜+构图', '光影+氛围']

  const generatePrompt = () => {
    const base = fields.subject ? `${fields.subject}，${fields.action || '自然动作'}` : '请先填写主体和动作'
    const camera = fields.camera ? `，${fields.camera}` : ''
    const lighting = fields.lighting ? `，${fields.lighting}` : ''
    const mood = fields.mood ? `，${fields.mood}` : ''
    setPrompt(`[Seedance 视频提示词]\n\n${base}${camera}${lighting}${mood}。\n\n电影质感，8K分辨率，稳定画面，无闪烁。`)
  }

  const update = (key, value) => setFields((f) => ({ ...f, [key]: value }))

  const fieldDefs = {
    subject: { label: '拍摄主体', placeholder: '一位穿着旗袍的女性，站在雨中的街道上…', hint: '描述角色的外貌、服装、位置' },
    action: { label: '动作描述', placeholder: '缓缓转身，看向镜头，眼神中带着期待…', hint: '描述角色的动作、表情变化' },
    camera: { label: '运镜方式', placeholder: '中景固定镜头，推近至特写，焦点从背景移到人物面部…', hint: '镜头运动 + 景别 + 焦点变化' },
    lighting: { label: '光影设计', placeholder: '暖黄街灯从左侧45度角照射，雨滴反光形成散景…', hint: '光源方向 + 色温 + 特效元素' },
    mood: { label: '氛围基调', placeholder: '忧郁而温暖的氛围，慢节奏，有回忆的质感…', hint: '情绪基调 + 节奏感 + 质地描述' },
  }

  return (
    <div className="tool-workspace">
      <div className="tool-workspace-header">
        <div>
          <h2>视频提示词</h2>
          <p>五步结构法逐步构建生产级 Seedance 视频提示词</p>
        </div>
      </div>

      {/* 步骤导航 */}
      <div className="step-nav">
        {steps.map((s, i) => (
          <button
            key={s}
            className={`step-dot ${i + 1 <= step ? 'is-active' : ''}`}
            type="button"
            onClick={() => setStep(i + 1)}
            aria-pressed={i + 1 === step}
          >
            <span className="step-num">{i + 1}</span>
            {s}
          </button>
        ))}
      </div>

      {/* 输入区 */}
      {(step === 1 || step === 2) ? (
        <div className="prompt-fields">
          {(step === 1 ? ['subject', 'action'] : ['camera', 'lighting']).map((key) => {
            const def = fieldDefs[key]
            return (
              <label key={key} className="prompt-field">
                <span>{def.label}</span>
                <small>{def.hint}</small>
                <textarea
                  value={fields[key]}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={def.placeholder}
                  rows={3}
                  spellCheck={false}
                />
              </label>
            )
          })}
          <button className="tool-action primary" type="button" onClick={() => setStep(3)}>
            <ChevronRight size={15} /> 下一步
          </button>
        </div>
      ) : (
        <div className="prompt-fields">
          <label className="prompt-field">
            <span>{fieldDefs.mood.label}</span>
            <small>{fieldDefs.mood.hint}</small>
            <textarea
              value={fields.mood}
              onChange={(e) => update('mood', e.target.value)}
              placeholder={fieldDefs.mood.placeholder}
              rows={3}
              spellCheck={false}
            />
          </label>
          <button className="tool-action primary" type="button" onClick={generatePrompt}>
            <WandSparkles size={15} /> 生成视频提示词
          </button>
        </div>
      )}

      {/* 输出 */}
      {prompt && (
        <div className="prompt-output" aria-live="polite">
          <div className="prompt-output-header">
            <span>Seedance 视频提示词</span>
            <button
              className="tool-action ghost"
              type="button"
              onClick={() => navigator.clipboard.writeText(prompt)}
              aria-label="复制提示词"
            >
              <Clipboard size={14} /> 复制
            </button>
          </div>
          <pre className="prompt-text">{prompt}</pre>
        </div>
      )}
    </div>
  )
}

function AssetTool() {
  const [filter, setFilter] = useState('all')
  const types = ['all', '角色', '场景', '道具', '参考']

  const filtered = filter === 'all' ? sampleAssets : sampleAssets.filter((a) => a.type === filter)

  return (
    <div className="tool-workspace">
      <div className="tool-workspace-header">
        <div>
          <h2>项目资产库</h2>
          <p>集中管理角色定妆照、场景参考、道具图和风格板</p>
        </div>
        <button className="tool-action ghost" type="button">
          <Plus size={15} /> 上传资产
        </button>
      </div>

      <div className="asset-filters">
        {types.map((t) => (
          <button
            key={t}
            className={`filter-btn small ${filter === t ? 'is-active' : ''}`}
            type="button"
            onClick={() => setFilter(t)}
            aria-pressed={filter === t}
          >
            {t === 'all' ? '全部' : t}
          </button>
        ))}
      </div>

      <div className="asset-grid">
        {filtered.map((asset) => (
          <div key={asset.name} className={`asset-card tone-${asset.color}`}>
            <div className="asset-thumb">
              <Image size={24} aria-hidden="true" />
            </div>
            <div className="asset-info">
              <span className="asset-type">{asset.type}</span>
              <strong>{asset.name}</strong>
              <div className="asset-tags">
                {asset.tags.map((t) => (
                  <small key={t}>{t}</small>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CreditsTool() {
  return (
    <div className="tool-workspace">
      <div className="tool-workspace-header">
        <div>
          <h2>积分账户</h2>
          <p>查看积分余额、消耗记录和课程权益</p>
        </div>
      </div>

      <div className="credits-dashboard">
        <div className="credits-balance">
          <Sparkles size={28} aria-hidden="true" />
          <strong>1,280</strong>
          <span>可用积分</span>
        </div>

        <div className="credits-history">
          <h3>最近消耗</h3>
          <div className="credits-row">
            <span>视频提示词生成</span>
            <span>-40</span>
          </div>
          <div className="credits-row">
            <span>图片提示词生成 x3</span>
            <span>-15</span>
          </div>
          <div className="credits-row">
            <span>剧本拆解</span>
            <span>-30</span>
          </div>
          <div className="credits-row positive">
            <span>课程赠送积分</span>
            <span>+200</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ===================== 主组件 ===================== */

export function ToolsPage() {
  const [activeTool, setActiveTool] = useState('script')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderTool = () => {
    switch (activeTool) {
      case 'script': return <ScriptTool />
      case 'storyboard': return <StoryboardTool />
      case 'image-prompt': return <ImagePromptTool />
      case 'video-prompt': return <VideoPromptTool />
      case 'assets': return <AssetTool />
      case 'credits': return <CreditsTool />
      default: return <ScriptTool />
    }
  }

  return (
    <section className="tools-page">
      <div className="tools-hero">
        <p className="eyebrow">视频生成板块</p>
        <h1>
          创作<em>工作台</em>
        </h1>
        <p className="page-text">
          从创意到视频提示词的生产级工具链。左侧选择工具，右侧进入对应的创作空间。
        </p>
      </div>

      <div className="tools-layout">
        {/* 侧边工具导航 */}
        <aside className={`tools-sidebar ${sidebarOpen ? '' : 'is-collapsed'}`} aria-label="工具导航">
          <button
            className="sidebar-toggle"
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? '收起侧栏' : '展开侧栏'}
          >
            <PanelRight size={16} />
          </button>

          <div className="project-meta">
            <strong>Project / 当归</strong>
            <span className="credits-badge">
              <Sparkles size={12} aria-hidden="true" /> 1,280
            </span>
          </div>

          <nav className="tool-tabs" aria-label="工具列表">
            {toolTabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTool === tab.id}
                onClick={setActiveTool}
              />
            ))}
          </nav>
        </aside>

        {/* 工作区 */}
        <div className="tools-main">
          {renderTool()}
        </div>
      </div>
    </section>
  )
}
