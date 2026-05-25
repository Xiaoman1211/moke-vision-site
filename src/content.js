export const heroFrames = [
  {
    type: 'AI短片',
    title: '剧情短片生产链',
    image: '/assets/film-production.jpg',
  },
  {
    type: '商业视频',
    title: '品牌宣传片交付',
    image: '/assets/camera-studio.jpg',
  },
  {
    type: '课程内容',
    title: '从复盘到课程',
    image: '/assets/cinema-camera.jpg',
  },
]

export const sectionLinks = [
  {
    slug: 'courses',
    label: '教学板块',
    title: '课程体系与学习中心',
    text: '系统课、实战课、进阶课、直播答疑、模板包和复盘内容。',
    tone: 'lime',
  },
  {
    slug: 'tools',
    label: '视频生成板块',
    title: '从剧本到视频提示词的创作台',
    text: '脚本、分镜、图片提示词、视频提示词、资产库和积分系统。',
    tone: 'blue',
  },
  {
    slug: 'cases',
    label: '案例板块',
    title: '精品案例与商业交付',
    text: 'AI短片、商业视频、教学拆解、本地商家与文旅案例。',
    tone: 'copper',
  },
]

export const featuredCases = [
  {
    title: 'AI剧情短片',
    text: '从剧本、导演决策、视觉风格到 Seedance 视频提示词。',
    meta: 'P-009 / 90s',
  },
  {
    title: '商家宣传片',
    text: '本地商家、文旅、课程推广和企业服务的快速交付结构。',
    meta: 'Local / TVC',
  },
  {
    title: '教学拆解片',
    text: '把失败样片、抽帧分析和提示词修正沉淀成课程。',
    meta: 'Course / Review',
  },
]

export const workflow = [
  ['选题', '定位平台、用户和商业目标'],
  ['剧本', '把创意拆成可生产事件链'],
  ['分镜', '锁定镜头、动作和连续性'],
  ['图像', '生成角色、场景和参考帧'],
  ['提示词', '适配 Seedance / Kling / Runway'],
  ['交付', '成片、课程、模板和复盘'],
]

export const courses = [
  {
    id: 'full-workflow',
    tag: '系统课',
    title: 'AI视频全流程',
    subtitle: '从创意到成片',
    text: '面向零基础到独立制片人。覆盖选题、剧本、分镜、资产生成、提示词工程和最终交付。',
    cover: '/assets/course-full.jpg',
    audience: '想系统掌握 AI 视频生产全流程的创作者',
    level: '入门→进阶',
    duration: '12章 · 48课时',
    format: '录播 + 直播答疑 + 社群',
    price: '¥699',
    modules: [
      { title: 'AI视频行业全景', desc: '工具链、平台对比、生产范式变革' },
      { title: '选题与故事结构', desc: '短片类型学、Save the Cat 节拍表' },
      { title: '剧本拆解方法', desc: '从创意到可生产事件链的转换' },
      { title: '视觉风格系统', desc: '双色调、质感标准、参考影片体系' },
      { title: '角色与场景资产', desc: 'AI 角色一致性、定妆照、场景库管理' },
      { title: '分镜工作流', desc: '镜头规划、连续性检查、节奏控制' },
      { title: '图片提示词工程', desc: '结构化提示词、风格母板、迭代策略' },
      { title: '视频提示词工程', desc: 'Seedance/Kling/Runway 生产级提示词' },
      { title: '素材管理与合成', desc: '素材组织、剪辑流程、音效配乐' },
      { title: '商业交付标准', desc: '成片规范、客户沟通、交付包制作' },
      { title: '案例复盘方法论', desc: '失败分析、抽帧诊断、提示词修正' },
      { title: '个人品牌与变现', desc: 'portfolio 建设、接单流程、定价策略' },
    ],
    outcomes: ['独立完成 3-5 分钟 AI 短片', '掌握 Seedance/Kling/Runway 全平台操作', '建立个人资产库与风格体系', '具备商业接单能力'],
  },
  {
    id: 'commercial',
    tag: '实战课',
    title: '商业短视频模板',
    subtitle: '标准化商业交付',
    text: '面向门店、文旅、教培、企业服务四类场景。每类场景配备模板、提示词和交付清单。',
    cover: '/assets/course-commercial.jpg',
    audience: '本地商家服务商、广告从业者',
    level: '入门',
    duration: '6章 · 18课时',
    format: '录播 + 模板包 + 答疑',
    price: '¥399',
    modules: [
      { title: '商业视频市场定位', desc: '四类场景分析、客户画像、定价模型' },
      { title: '标准化需求采集', desc: '问卷设计、30分钟锁定需求的方法' },
      { title: '模板化生产流程', desc: '12套场景模板的原理与使用' },
      { title: '素材替换与品牌适配', desc: '品牌色、Logo、产品图一键适配' },
      { title: '批量生成与质检', desc: '预置提示词模板、批量生成、质量把控' },
      { title: '交付与客户管理', desc: '交付包结构、客户复购、长期合作建立' },
    ],
    outcomes: ['2小时完成单次商业交付', '掌握4类商业场景全流程', '拥有可复用的12套模板', '建立标准化接单→交付→复购体系'],
  },
  {
    id: 'director',
    tag: '进阶课',
    title: 'AI视频导演课',
    subtitle: '镜头判断与风格锁定',
    text: '聚焦导演决策能力。在 AI 不可控性中建立镜头选择、风格统一和叙事节奏的判断力。',
    cover: '/assets/course-director.jpg',
    audience: '已完成全流程课程、有生产经验的创作者',
    level: '进阶',
    duration: '8章 · 32课时',
    format: '录播 + 工作坊 + 1v1 点评',
    price: '¥1,299',
    modules: [
      { title: '导演思维框架', desc: '叙事张力、视觉叙事、节奏与留白' },
      { title: '大镜头关系', desc: '景别衔接、180度法则、视线匹配' },
      { title: '风格系统深度', desc: '双色调扩展、质感分级、光影六配方' },
      { title: '运镜设计', desc: '固定/手持/轨道/摇臂的AI实现策略' },
      { title: '表演控制', desc: '角色姿态、表情节拍、视线精确控制' },
      { title: 'AI局限性驾驭', desc: '穿帮预防、崩坏修复、迭代效率提升' },
      { title: '成片评审体系', desc: '37项检查清单、观众测试、迭代记录' },
      { title: '导演 Portfolio', desc: '作品集构建、行业展示、创作声明' },
    ],
    outcomes: ['建立导演级审美判断力', '能独立承担10分钟以内AI短片导演', '掌握37项成片评审标准', '形成个人导演方法论'],
  },
  {
    id: 'monetize',
    tag: '会员课',
    title: '学员变现闭环',
    subtitle: '从创作到变现',
    text: '帮助学员建立可持续的 AI 视频变现模式。个人IP打造、接单流程、客户管理到平台分成。',
    cover: '/assets/course-monetize.jpg',
    audience: '已有作品集、想要商业化变现的创作者',
    level: '进阶',
    duration: '4章 · 16课时',
    format: '录播 + 社群 + 资源对接',
    price: '会员专享',
    modules: [
      { title: '变现模式拆解', desc: '课程/模板/代工/分成/咨询五种模式的优劣' },
      { title: '个人品牌建设', desc: '作品集策略、社交媒体运营、行业定位' },
      { title: '接单与定价体系', desc: '案例定价、客户筛选、合同与版权' },
      { title: '平台与工具生态', desc: '工具链、积分系统、平台抽成与合作' },
    ],
    outcomes: ['建立个人AI视频品牌', '掌握五种变现路径', '具备月入过万的商业能力', '加入创作者社群获得持续支持'],
  },
]

export const tools = [
  ['剧本生成', '选题、结构、短剧脚本和口播文案。'],
  ['分镜工作台', '镜头拆解、事件边界和连续性检查。'],
  ['图片提示词', '角色、场景、道具和风格母板。'],
  ['视频提示词', 'Seedance / Kling / Runway 生产级提示词。'],
  ['项目资产库', '参考图、角色、场景和提示词留痕。'],
  ['积分账户', '登录、余额、消耗记录和课程权益。'],
]

export const toolSteps = [
  '生成剧情分镜',
  '锁定角色资产',
  '输出视频提示词',
  '沉淀项目模板',
]

export const longCaseStudies = [
  {
    id: 'danggui',
    name: '当归',
    subtitle: 'AI剧情短片',
    type: 'AI短片',
    typeKey: 'short-film',
    slug: 'danggui',
    cover: '/assets/case-danggui.jpg',
    summary: '完整验证从剧本、导演决策、风格、资产、分镜到视频提示词的生产链。',
    value: '适合做系统课和高级案例展示。',
    description:
      '「当归」是 MOKE Vision 首个完整 AI 短片生产链验证项目。从原创剧本出发，经历风格锁定、角色资产生成、分镜拆解、视频提示词工程，最终产出 90 秒成片。全程使用 Seedance 2.0 作为核心生成引擎，验证了「一人制片」模式的可行性。',
    tags: ['Seedance 2.0', '多角色一致性', '剧情叙事', '分镜拆解', '视觉风格锁定'],
    metrics: [
      ['时长', '90s'],
      ['镜头数', '12'],
      ['角色数', '3'],
      ['生产周期', '4天'],
      ['提示词迭代', '47版'],
    ],
    techStack: ['Seedance 2.0', 'Kling 1.6', 'Runway Gen-3', 'ComfyUI'],
    processSteps: [
      { title: '选题定位', desc: '确定短片主题、情感基调、目标平台和受众画像。' },
      { title: '剧本创作', desc: 'Save the Cat 节拍表驱动，拆解为 12 个可生产事件。' },
      { title: '视觉风格', desc: '双色调系统（深棕+琥珀），参考王家卫光影哲学，锁定质感标准。' },
      { title: '角色资产', desc: '生成 3 个角色定妆照级资产，确保多镜头下形象一致。' },
      { title: '分镜拆解', desc: '12 镜完整分镜脚本，含镜头规格、动作描述、情绪弧线。' },
      { title: '提示词工程', desc: '五步结构法输出生产级提示词，47 版迭代锁定最佳效果。' },
    ],
  },
  {
    id: 'local-biz',
    name: '本地商家套餐',
    subtitle: '商业短视频服务',
    type: '商业服务',
    typeKey: 'commercial',
    slug: 'local-business',
    cover: '/assets/case-local.jpg',
    summary: '面向门店、文旅、教育培训、企业活动的低沟通交付结构。',
    value: '适合做标准化模板和交付包。',
    description:
      '为本地商家打造的 AI 短视频交付标准包。覆盖茶饮门店、文旅景区、教培机构、企业活动四类场景。每个场景配备标准化模板 + 可替换素材结构 + 一键生成提示词，将单次交付周期压缩至 2 小时内。',
    tags: ['本地商家', '标准化模板', '低沟通交付', '多场景适配', '商业变现'],
    metrics: [
      ['覆盖场景', '4类'],
      ['单次交付', '≤2h'],
      ['模板数量', '12套'],
      ['客户复购', '73%'],
    ],
    techStack: ['Seedance 2.0', '剪映专业版', 'Canva', '自研模板系统'],
    processSteps: [
      { title: '需求采集', desc: '标准化问卷代替沟通，30 分钟锁定客户需求。' },
      { title: '模板匹配', desc: '12 套场景模板按行业自动匹配最优方案。' },
      { title: '素材替换', desc: '品牌色、Logo、产品图一键替换，保持视觉统一。' },
      { title: 'AI 生成', desc: '预置提示词模板 + 客户素材组合，批量生成视频素材。' },
      { title: '剪辑精修', desc: '剪映模板化剪辑，音效 + 字幕 + 转场自动化。' },
      { title: '交付复盘', desc: '成片 + 源文件 + 复用指南，建立客户长期合作关系。' },
    ],
  },
  {
    id: 'teaching',
    name: '教学拆解',
    subtitle: '从失败到课程的内容产品',
    type: '课程内容',
    typeKey: 'education',
    slug: 'teaching-breakdown',
    cover: '/assets/case-teaching.jpg',
    summary: '把失败样片、修正过程和素材管理做成可教、可卖、可复用的课。',
    value: '适合做会员内容和直播答疑素材。',
    description:
      '将 AI 视频生产中真实遇到的失败案例（风格偏移、角色崩坏、运镜穿帮）系统拆解为教学素材。每个案例包含「问题样片 → 抽帧分析 → 根因定位 → 提示词修正 → 效果对比」五步教学闭环，形成可复用的课程资产。',
    tags: ['抽帧分析', '提示词修正', '复盘方法论', '课程化', '直播素材'],
    metrics: [
      ['拆解案例', '28个'],
      ['修正成功率', '89%'],
      ['课程化率', '64%'],
      ['学员反馈', '4.8/5'],
    ],
    techStack: ['Seedance 2.0', '达芬奇', 'Notion', 'OBS'],
    processSteps: [
      { title: '问题收集', desc: '从生产日志中提取风格偏移、角色崩坏、运镜穿帮等典型问题。' },
      { title: '抽帧分析', desc: '逐帧标注问题点，对比预期 vs 实际，定位根因层级。' },
      { title: '根因定位', desc: '归类为提示词问题/模型限制/流程缺陷三类，建立诊断框架。' },
      { title: '修正方案', desc: '对症输出修正提示词，记录改前改后效果对比。' },
      { title: '课程包装', desc: '将诊断过程转化为可讲授的教学案例，配套作业和检查点。' },
      { title: '直播复用', desc: '筛选高价值案例用于直播答疑，建立「问题库→答案库」知识资产。' },
    ],
  },
]

export const caseTypeFilters = [
  { key: 'all', label: '全部' },
  { key: 'short-film', label: 'AI 短片' },
  { key: 'commercial', label: '商业服务' },
  { key: 'education', label: '课程内容' },
]
