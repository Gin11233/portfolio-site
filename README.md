# 🎨 我的作品集网站

一个现代、响应式的个人作品集网站模板，使用 **React + Vite** 构建，免费部署在 **GitHub Pages** 上，任何人通过链接即可访问。

## ✨ 功能特性

- 🧊 **液态玻璃设计**：毛玻璃卡片 + 极光流动背景 + 折射高光，质感通透
- 🎯 **巧思动效**：作品卡片 3D 倾斜跟随鼠标、磁吸按钮、光标聚光灯、玻璃球头像、名字流光、滚动进度条
- 🌙 现代深色主题 + 渐变点缀，支持移动端 / 平板 / 桌面自适应
- 🎬 滚动模糊浮现动画（尊重系统「减少动态效果」设置）
- 📦 内容全部集中在 `src/data/site.js`，改一个文件即可更新整站
- 🚀 推送代码到 GitHub 即自动构建部署（GitHub Actions），无需手动操作

## 📁 项目结构

```
portfolio-site/
├── .github/workflows/deploy.yml   # 自动部署配置
├── public/
│   ├── avatar.svg                 # 头像（换成你自己的照片）
│   └── favicon.svg                # 网站图标
├── src/
│   ├── components/                # 各板块组件
│   ├── data/site.js               # ⭐ 网站内容（改这里！）
│   ├── App.jsx                    # 页面组装
│   ├── index.css                  # 全局样式
│   └── main.jsx                   # 入口
├── index.html
└── vite.config.js                 # 已配置 base: './' 支持子路径部署
```

## 🚀 本地开发

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（浏览器打开提示的地址）
npm run build      # 构建生产版本（输出到 dist/）
npm run preview    # 本地预览构建产物
```

## ☁️ 部署到 GitHub Pages（三步上线）

> 前提：已安装 [Git](https://git-scm.com/downloads) 并注册 [GitHub 账号](https://github.com/signup)。

### 1. 在 GitHub 上创建仓库

打开 <https://github.com/new>，仓库名建议填 `portfolio-site`（或你的用户名 + `.github.io`，如 `zhangsan.github.io`，这样访问地址不带子路径），选择 **Public**（公开），**不要**勾选 "Add a README file"。

### 2. 推送代码

在项目目录执行（把下面的 `用户名` 换成你的 GitHub 用户名）：

```bash
git init
git add .
git commit -m "feat: 初始化作品集网站"
git branch -M main
git remote add origin https://github.com/用户名/portfolio-site.git
git push -u origin main
```

### 3. 开启 GitHub Pages

1. 打开仓库页面 → **Settings** → 左侧 **Pages**
2. **Build and deployment** 的 Source 选择 **GitHub Actions**（不是 Branch！）
3. 等待几分钟，Actions 自动构建完成后，你的网站就上线了 🎉

**访问地址**：
- 仓库名是 `portfolio-site`：`https://用户名.github.io/portfolio-site/`
- 仓库名是 `用户名.github.io`：`https://用户名.github.io/`

之后每次 `git push`，网站都会自动更新。

## ✏️ 修改内容

所有文字内容都在 **`src/data/site.js`** 中：

| 要改什么 | 改哪里 |
| --- | --- |
| 姓名 / 标题 / 简介 | `hero` |
| 关于我的文字 | `about` |
| 技能列表 | `skills` |
| 作品卡片 | `projects`（替换 `#` 为真实链接） |
| 工作经历 | `experience` |
| 邮箱 / 微信 / 社交链接 | `contact` |

想换头像？把照片放到 `public/` 目录（如 `photo.jpg`），然后把 `hero.avatar` 改成 `/photo.jpg`。

## 📄 License

MIT
