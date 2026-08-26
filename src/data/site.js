// ============================================================
// 🎨 网站内容配置 —— 只需修改这一个文件，即可更新整个网站
// 修改后运行 `npm run dev` 在本地预览，或直接推送 GitHub 自动部署
// ============================================================

export const siteData = {
  // ---------- 浏览器标签页与搜索引擎信息 ----------
  meta: {
    title: '我的作品集 | My Portfolio',
    description: '个人作品集网站 —— 展示我的项目、技能与经历。',
    author: '你的名字',
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
    name: '你的名字',
    roles: ['前端开发工程师', 'UI 设计师', '创意开发者'],
    tagline: '用代码和设计，把想法变成触手可及的产品。',
    ctaPrimary: { label: '查看我的作品', href: '#projects' },
    ctaSecondary: { label: '联系我', href: '#contact' },
    // 头像图片（放在 public/ 目录下），也可以换成你的照片
    avatar: '/avatar.svg',
  },

  // ---------- 关于我 ----------
  about: {
    heading: '关于我',
    lead: '这里写一句简短的自我介绍，比如：热爱创造、专注细节的开发者。',
    paragraphs: [
      '第一段：详细介绍一下你自己 —— 你的背景、你热爱的事情、你的职业方向。',
      '第二段：介绍你的工作方式、你擅长解决的问题，或者你最近在做什么有趣的事。',
    ],
    highlights: [
      { icon: '🎯', label: '专注', text: '对细节和品质有执念' },
      { icon: '🚀', label: '行动', text: '快速把想法落地成产品' },
      { icon: '🌱', label: '成长', text: '持续学习新技术' },
      { icon: '🤝', label: '协作', text: '乐于沟通与团队合作' },
    ],
  },

  // ---------- 技能 ----------
  skills: [
    { category: '前端', items: ['React', 'Vue', 'TypeScript', 'HTML / CSS', 'Vite', 'Tailwind CSS'] },
    { category: '后端', items: ['Node.js', 'Express', 'Python', 'MySQL', 'MongoDB'] },
    { category: '设计', items: ['Figma', 'Photoshop', 'Illustrator', 'UI / UX 设计'] },
    { category: '工具', items: ['Git', 'Docker', 'GitHub Actions', 'Linux'] },
  ],

  // ---------- 作品展示 ----------
  projects: [
    {
      title: '作品展示平台',
      description: '一个简洁优雅的作品展示平台，支持响应式布局与暗色模式，帮助创作者轻松展示自己的作品。',
      tags: ['React', 'Vite', 'CSS'],
      emoji: '🖼️',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      demo: '#',
      code: '#',
    },
    {
      title: '数据可视化看板',
      description: '实时数据监控看板，通过图表直观呈现业务数据，支持多维度筛选与导出。',
      tags: ['Vue', 'ECharts', 'Node.js'],
      emoji: '📊',
      gradient: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
      demo: '#',
      code: '#',
    },
    {
      title: '移动端购物应用',
      description: '一款移动端优先的购物应用，包含商品浏览、购物车、订单管理等完整流程。',
      tags: ['React', 'Redux', 'Sass'],
      emoji: '🛍️',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      demo: '#',
      code: '#',
    },
    {
      title: '开源组件库',
      description: '一套轻量、可定制的 UI 组件库，包含 20+ 常用组件，已发布到 npm 供社区使用。',
      tags: ['TypeScript', 'Vite', 'npm'],
      emoji: '🧩',
      gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
      demo: '#',
      code: '#',
    },
    {
      title: '团队协作工具',
      description: '面向小团队的轻量协作工具，支持任务看板、实时评论与文件共享。',
      tags: ['React', 'WebSocket', 'MongoDB'],
      emoji: '🤝',
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      demo: '#',
      code: '#',
    },
    {
      title: '个人博客系统',
      description: '基于 Markdown 的个人博客，支持标签归档、全文搜索与暗色模式。',
      tags: ['Next.js', 'Markdown', 'Tailwind'],
      emoji: '✍️',
      gradient: 'linear-gradient(135deg, #f97316, #f59e0b)',
      demo: '#',
      code: '#',
    },
  ],

  // ---------- 经历 ----------
  experience: [
    {
      period: '2023 - 至今',
      role: '前端开发工程师',
      company: '某某科技有限公司',
      description: '负责公司核心产品的前端架构与开发，主导多个大型项目的技术选型与性能优化。',
    },
    {
      period: '2021 - 2023',
      role: 'Web 开发实习生',
      company: '某某设计工作室',
      description: '参与响应式网站与交互页面的开发，积累了扎实的工程实践经验。',
    },
    {
      period: '2017 - 2021',
      role: '计算机科学与技术 · 本科',
      company: '某某大学',
      description: '主修计算机科学，参与多个课程项目与开源社区活动。',
    },
  ],

  // ---------- 联系方式 ----------
  contact: {
    heading: '联系我',
    lead: '如果你对我的作品感兴趣，或者想聊聊合作机会，欢迎随时联系我！',
    email: 'yourname@example.com',
    location: '中国 · 上海',
    wechat: 'your-wechat-id',
    // 社交链接：icon 可选 github / blog / zhihu / email / wechat / twitter
    socials: [
      { label: 'GitHub', icon: 'github', url: 'https://github.com/yourname' },
      { label: '博客', icon: 'blog', url: '#' },
      { label: '知乎', icon: 'zhihu', url: '#' },
    ],
  },

  // ---------- 页脚 ----------
  footer: {
    text: '© 2025 你的名字 · 用 ❤️ 与 React 构建',
  },
}
