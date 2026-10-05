# 数字公务员 - 融媒体资讯移动端 (Screen of Report Small)

本项目基于 **Vue 3 + Vite + Pinia + Vue Router + Element Plus** 构建，专注于政务与融媒体资讯的多维度展示、搜索、阅读列表与详情交互。

---

## 📁 规范化项目目录层级结构

经过层级重构与工程化优化后，项目遵循现代前端标准化组织规范：

```text
screen-of-report-small/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages 自动构建与部署工作流
├── public/                       # 静态资源公开目录（支持 /image/... 直链访问）
│   └── image/                    # 页面与组件引用的图标、插画与报刊Logo
├── src/                          # 核心源码目录
│   ├── api/                      # API 接口定义层
│   │   └── index.js
│   ├── assets/                   # 本地资产与多媒体
│   │   └── image/
│   ├── components/               # 全局可复用组件
│   │   └── loading.vue           # 局部/全局加载动画组件
│   ├── composition/              # Vue 组合式函数与 EventBus
│   │   └── event.js              # 全局轻量事件总线
│   ├── mock/                     # 真实结构离线/本地开发模拟数据
│   │   ├── article/              # 文章分页列表与分类标签
│   │   └── type/                 # 报刊分类与媒体层级字典
│   ├── pages/                    # 页面级视图组件 (Pages)
│   │   ├── index.vue             # 融媒体首页（媒体分类、轮播与最新报道）
│   │   ├── search.vue            # 新闻全文与关键词搜索页
│   │   ├── detail.vue            # 新闻详情、情感判定与阅读列表/收藏操作
│   │   ├── read-list.vue         # 今日阅读清单页
│   │   └── not-found.vue         # 404 兜底路由页
│   ├── pages.json                # 页面导航栏与全局样式元数据配置
│   ├── request/                  # 网络请求层封装
│   │   └── index.js              # Axios 实例与请求/响应拦截器
│   ├── router/                   # 路由导航与页面路由表
│   │   └── index.js
│   ├── stores/                   # Pinia 状态管理层
│   │   └── userStore.js          # 用户身份与登录态 Store
│   ├── App.vue                   # 根组件
│   ├── main.js                   # 应用入口与插件装配中心
│   ├── index.scss                # 全局 SCSS 混入与设计系统主题变量
│   └── sb.css                    # 完整视图样式表（布局与 uni 组件适配）
├── index.html                    # SPA 入口 HTML（移动端视口适配）
├── vite.config.js                # Vite 现代化配置（base相对路径、Mock中间件、AutoImport）
├── package.json                  # 依赖清单与启动构建指令
├── .gitignore                    # Git 忽略配置
└── README.md                     # 项目使用与架构说明
```

---

## 🛠️ 安装与运行指南

### 1. 安装依赖

```bash
npm install
```

### 2. 启动本地开发服务

```bash
npm run dev
```

本地服务默认启动在：`http://localhost:3000`

### 3. 生产环境构建

```bash
npm run build
```

打包构建产物将输出至 `dist/` 目录（已配置 `base: './'`，支持任何二级目录或离线静态部署）。

### 4. 预览生产构建

```bash
npm run preview
```

---

## 🚀 GitHub Pages 自动化部署说明

本项目已内置 GitHub Actions 自动化部署流水线：

1. 将代码推送到 GitHub 仓库的 `main` 分支。
2. 打开 GitHub 仓库设置：`Settings` ➔ `Pages`。
3. 在 **Build and deployment** 下的 **Source** 选择：**GitHub Actions**。
4. 随后推送到 `main` 分支的代码将全自动打包并上线至：
   `https://huangjunGGY.github.io/screen-of-report-small/`
