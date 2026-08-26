// ============================================================
// 🎨 网站内容配置 —— 只需修改这一个文件，即可更新整个网站
// 修改后运行 `npm run dev` 在本地预览，或直接推送 GitHub 自动部署
// ============================================================

export const siteData = {
  // ---------- 浏览器标签页与搜索引擎信息 ----------
  meta: {
    title: '岳镜 | 平面设计 · 广告设计 · 视频剪辑',
    description: '岳镜的个人作品集 —— 环境设计专业在读，专注平面设计、广告设计与视频剪辑。',
    author: '岳镜',
  },

  // ---------- 顶部导航 ----------
  nav: [
    { label: '首页', href: '#home' },
    { label: '关于我', href: '#about' },
    { label: '技能', href: '#skills' },
    { label: '作品', href: '#projects' },
    { label: '经历', href: '#experience' },
    { label: '联系', href: '#contact' },
  ],

  // ---------- 首屏（Hero） ----------
  hero: {
    greeting: '你好，我是',
    name: '岳镜',
    roles: ['平面设计师', '广告设计师', '视频剪辑师'],
    tagline: '用设计、影像与创意，把想法变成打动人心的作品。',
    ctaPrimary: { label: '查看我的作品', href: '#projects' },
    ctaSecondary: { label: '联系我', href: '#contact' },
    // 头像图片（放在 public/ 目录下），也可以换成你的照片
    avatar: '/avatar.svg',
  },

  // ---------- 关于我 ----------
  about: {
    heading: '关于我',
    lead: '环境设计专业在读，专注于平面设计、广告设计与视频剪辑。',
    paragraphs: [
      '我是岳镜，北方民族大学环境设计专业本科在读。熟悉从需求分析、方案构思、视觉呈现到落地交付的完整设计流程，持续参与创新创业项目与设计竞赛。',
      '曾在银川北斗壹蜂传媒担任设计实习生，独立负责海报、展板、公众号配图等宣传物料设计，并完成短视频剪辑与后期处理；在银川天地嘉豪装饰参与家装施工图绘制。作品曾获 2025 全国大学生创新创业大赛铜奖。',
    ],
    highlights: [
      { icon: '🎨', label: '视觉设计', text: '海报 / 展板 / 公众号配图' },
      { icon: '🎬', label: '视频剪辑', text: '剪映 / Premiere Pro' },
      { icon: '🧩', label: '设计思维', text: '以用户为中心的设计方案' },
      { icon: '🏆', label: '创新实践', text: '全国大学生创新创业大赛铜奖' },
    ],
  },

  // ---------- 技能 ----------
  skills: [
    { category: '设计软件', items: ['Photoshop', 'Illustrator', 'InDesign', 'AutoCAD', 'SketchUp'] },
    { category: '视频剪辑', items: ['剪映', 'Premiere Pro'] },
    { category: '平面设计', items: ['海报设计', '展板设计', '公众号配图', '版式设计'] },
    { category: '办公软件', items: ['Word', 'Excel', 'PowerPoint'] },
  ],

  // ---------- 作品展示 ----------
  projects: [
    {
      title: '活动宣传视觉设计',
      description: '为传媒公司活动设计海报、展板与公众号配图，覆盖需求沟通、创意构思、版式输出到修改交付的全流程。',
      tags: ['Photoshop', 'Illustrator', '版式设计'],
      emoji: '🎨',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      demo: '#',
      code: '#',
    },
    {
      title: '短视频剪辑与后期',
      description: '根据脚本完成素材筛选、节奏剪辑、字幕与转场处理，产出活动宣传短视频。',
      tags: ['剪映', 'Premiere Pro'],
      emoji: '🎬',
      gradient: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
      demo: '#',
      code: '#',
    },
    {
      title: '家装施工图设计',
      description: '配合主设计师完成家装 / 工装平面布局、天花与立面施工图绘制，使用 CAD 修正尺寸、标注材料并整理全套图纸。',
      tags: ['AutoCAD', 'SketchUp', '施工图'],
      emoji: '📐',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      demo: '#',
      code: '#',
    },
    {
      title: '创新创业大赛项目',
      description: '以用户为中心的设计解决方案，独立参与从市场调研、方案设计到落地验证的完整环节，获 2025 全国大学生创新创业大赛铜奖。',
      tags: ['设计思维', '市场调研', '落地验证'],
      emoji: '🏆',
      gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
      demo: '#',
      code: '#',
    },
  ],

  // ---------- 经历 ----------
  experience: [
    {
      period: '2023.09 - 至今',
      role: '环境设计 · 本科在读',
      company: '北方民族大学',
      description: '主修数字化环境设计、城市景观设计、建筑及周边环境设计等课程，持续参与创新创业项目与设计竞赛。',
    },
    {
      period: '2025',
      role: '全国大学生创新创业大赛 · 铜奖',
      company: '创新创业项目',
      description: '项目聚焦以用户为中心的设计解决方案，独立参与从市场调研、方案设计到落地验证的完整环节。',
    },
    {
      period: '实习期间',
      role: '设计实习生',
      company: '银川北斗壹蜂传媒',
      description: '负责海报、展板、公众号配图等宣传物料设计，并完成短视频剪辑与后期处理（剪映 / Premiere Pro）。',
    },
    {
      period: '实习期间',
      role: '设计实习生',
      company: '银川天地嘉豪装饰',
      description: '配合主设计师完成家装 / 工装平面布局与施工图绘制，使用 CAD 修正尺寸、标注材料并整理全套图纸。',
    },
  ],

  // ---------- 联系方式 ----------
  contact: {
    heading: '联系我',
    lead: '如果你对我的作品感兴趣，或者想聊聊设计合作，欢迎随时联系我！',
    email: 'jing56829@gmail.com',
    phone: '18209619670',
    location: '中国 · 银川',
    // 社交链接：icon 可选 github / blog / zhihu / email / wechat / twitter
    socials: [
      { label: '站酷', icon: 'blog', url: '#' },
      { label: '小红书', icon: 'blog', url: '#' },
    ],
  },

  // ---------- 页脚 ----------
  footer: {
    text: '© 2025 岳镜 · 用 ❤️ 与 React 构建',
  },
}