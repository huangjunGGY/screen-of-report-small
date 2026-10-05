# 数字公务员 - 融媒体资讯移动端 (Screen of Report Small)

本项目基于 **Vue 3 + Vite + Pinia + Vue Router + Element Plus** 构建，专注于政务与融媒体资讯的多维度展示、搜索、阅读列表与详情交互。

---

## 📁 规范化项目目录层级结构

经过层级重构与工程化优化后，项目遵循现代前端标准化组织规范：

```text
screen-of-report-small/
├── public/                       # 静态资源根目录（直链访问）
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
│   ├── request/                  # 网络请求层封装
│   │   └── index.js              # Axios 实例与请求/响应拦截器
│   ├── router/                   # 路由导航与页面路由表
│   │   └── index.js
│   ├── stores/                   # Pinia 状态管理层
│   │   └── userStore.js          # 用户身份与登录态 Store
│   ├── views/                    # 页面级视图组件
│   │   ├── index.vue             # 融媒体首页（媒体分类、轮播与最新报道）
│   │   ├── search.vue            # 新闻全文与关键词搜索页
│   │   ├── detail.vue            # 新闻详情、情感判定与阅读列表/收藏操作
│   │   ├── read-list.vue         # 今日阅读清单页
│   │   └── not-found.vue         # 404 兜底路由页
│   ├── App.vue                   # 根组件
│   ├── main.js                   # 应用入口与插件装配中心
│   ├── index.scss                # 全局 SCSS 混入与设计系统主题变量
│   └── sb.css                    # 完整视图样式表（布局与 uni 组件适配）
├── index.html                    # SPA 入口 HTML（移动端视口适配）
├── vite.config.js                # Vite 现代化配置（路径别名、Mock中间件、标签解析）
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

打包构建产物将输出至 `dist/` 目录。

### 4. 预览生产构建

```bash
npm run preview
```

---

## ✨ 核心优化与功能保障

1. **工程化结构归位**：
   - 彻底将裸露在根目录的平铺源码分类归纳至 `src/` 标准子目录中，消除杂乱无章的根目录污染。
2. **零副作用与依赖闭环**：
   - 补充缺失的 `src/stores/userStore.js`，避免运行时模块缺失崩溃。
   - 引入 `unplugin-auto-import`，自动注入 Vue 3 核心 Composition API（`ref`, `reactive`, `watch`, `computed`, `inject`, `onMounted`, `useRoute`, `useRouter`），无需手工在每个组件里补充繁冗的导入。
3. **Uni-app 标签兼容与无告警渲染**：
   - 在 Vite 编译层配置 `isCustomElement: (tag) => tag.startsWith('uni-')`，既完美保留原生 H5 自定义元素语义与已有的 `sb.css` 选择器样式，又彻底消除控制台大量 `Failed to resolve component: uni-view` 告警。
4. **双轨资源解析支持**：
   - 统一配置 `public/image` 和路径别名 `/image`，支持模板绝对路径和 JS `import` 引用无缝兼容。
5. **开箱即用内置 Mock**：
   - 内置 Vite 本地轻量中间件模拟后台接口，开箱即可完整体验：媒体类别切换、新闻分页、详情阅读、搜索过滤、阅读列表存储等全部功能闭环。
