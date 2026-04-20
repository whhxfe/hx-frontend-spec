# Hx前端技术规范文档

基于 VitePress 构建的前端技术规范文档站点。

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式（端口 4300）
pnpm run docs:dev

# 构建
pnpm run docs:build

# 预览（端口 4173）
pnpm run docs:preview
```

## 文档目录

### 开发指南

- [环境搭建](docs/guide/environment.md)
- [快速开始](docs/guide/quickstart.md)
- [开发流程](docs/guide/development.md)
- [常用命令](docs/guide/commands.md)
- [环境变量](docs/guide/env-variables.md)
- [常见问题](docs/guide/faq.md)

### 代码规范

- [HTML 规范](docs/standard/html.md)
- [CSS 规范](docs/standard/css.md)
- [JavaScript 规范](docs/standard/javascript.md)
- [项目结构](docs/standard/project-structure.md)
- [性能优化](docs/standard/performance.md)
- [安全规范](docs/standard/security.md)
- [Git 提交规范](docs/standard/git-commits.md)
- [Vue2 规范](docs/standard/vue2.md)
- [Vue3 规范](docs/standard/vue3.md)

### 工具链

- [Prettier 配置](docs/tools/prettier.md)
- [ESLint 配置](docs/tools/eslint.md)
- [Git Hooks](docs/tools/git-hooks.md)
- [VS Code 配置](docs/tools/vscode.md)

## 部署到 GitHub Pages

本项目已配置自动部署到 GitHub Pages。工作流文件位于 `.github/workflows/deploy.yml`。

### 部署步骤

1. **推送代码到 `main` 分支**
   - 工作流会自动触发，构建 VitePress 文档并部署到 GitHub Pages

2. **启用 GitHub Pages**
   - 进入仓库的 **Settings** > **Pages**
   - 在 **Source** 选项中，选择 **GitHub Actions**

3. **访问文档**
   - 部署完成后，文档将可通过 `https://whhxfe.github.io/hx-frontend-spec/` 访问

### 工作流说明

工作流包含两个主要步骤：
- **构建作业**：安装依赖、构建 VitePress 文档并上传构建产物
- **部署作业**：将构建产物部署到 GitHub Pages

### 手动触发部署

工作流也支持手动触发：
1. 进入仓库的 **Actions** 标签页
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow**

## 项目结构

```
hx-frontend-spec/
├── docs/
│   ├── guide/       # 开发指南
│   ├── standard/    # 代码规范
│   └── tools/       # 工具链配置
├── .vitepress/      # VitePress 配置
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages 部署工作流
├── package.json
└── README.md
```
