# 📝 网站内容编辑指南（写给非程序员）

> 你的网站所有文字内容都在 **`src/data/site.js`** 这一个文件里。
> 改完保存 → 推送 GitHub → 约 1 分钟自动上线，无需任何手动操作。

## 一、各字段对应页面哪里

```
siteData
├── meta          → 浏览器标签页标题 / 搜索摘要
├── nav           → 顶部导航菜单项（一般不用改）
├── hero          → 首屏：名字、身份轮播、简介、按钮
├── about         → "关于我"板块
├── skills        → "技能"板块
├── projects      → "作品"板块（卡片列表）
├── experience    → "经历"板块（时间线）
├── contact       → "联系"板块（邮箱/微信/社交）
└── footer        → 页脚文字
```

## 二、常用修改示例

### 1. 改名字 / 简介（首屏）

```js
hero: {
  greeting: '你好，我是',
  name: '张三',                      // ← 改成你的名字
  roles: ['前端工程师', '产品设计师'], // ← 轮播身份
  tagline: '一句话介绍你自己。',       // ← 副标题
  avatar: '/avatar.svg',             // ← 头像文件
}
```

### 2. 加一个作品卡片

在 `projects: [...]` 数组里，照着现有卡片格式加一项：

```js
{
  title: '我的新项目',
  description: '这个项目是做什么的，解决了什么问题……',
  tags: ['React', 'CSS'],      // 技术标签
  emoji: '🚀',                 // 卡片上的图标
  gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', // 卡片封面颜色
  demo: 'https://你的在线地址',  // "在线演示"链接
  code: 'https://github.com/你/项目', // "源码"链接
},
```

### 3. 改技能

```js
skills: [
  { category: '前端', items: ['React', 'Vue', 'TypeScript'] },  // 改/加/删都行
]
```

### 4. 加一段经历

```js
experience: [
  {
    period: '2024 - 至今',
    role: '前端开发工程师',
    company: '某某公司',
    description: '在这里做了什么……',
  },
]
```

### 5. 改联系方式

```js
contact: {
  email: 'you@example.com',     // ← 你的邮箱（导航"联系我"按钮直接发信）
  wechat: 'your-wechat',        // ← 微信号
  location: '中国 · 城市',
  socials: [
    { label: 'GitHub', icon: 'github', url: 'https://github.com/你' },
    { label: '博客', icon: 'blog', url: 'https://你的博客' },
  ],
}
```

### 6. 换头像 / 图标

把照片放进 `public/` 目录（例如 `photo.jpg`），再把 `hero.avatar` 改成 `/photo.jpg`。
浏览器标签页小图标：替换 `public/favicon.svg`。

## 三、改完怎么上线？

```bash
cd 项目目录
git add .
git commit -m "更新内容"
git push
```

推送后 GitHub Actions 自动构建部署，**约 1 分钟后刷新网站即可看到新内容**。

## 四、想添加一个全新的板块（如"博客""荣誉"）？

需要新建组件 + 样式 + 导航项，比改文字复杂。把你想要的内容（标题、要点、链接等）发给我，我帮你加好并上线。