---
title: 开发指南
---

# 开发指南

欢迎阅读 Hx前端技术规范开发指南。本指南将帮助您快速搭建开发环境并开始项目开发。

## 文档导航

### 环境搭建

- [环境搭建](./environment) - Node.js、包管理器、IDE 配置
- [快速开始](./quickstart) - 项目初始化和基本流程

### 开发流程

- [开发流程](./development) - 完整的开发工作流程
- [常用命令](./commands) - 项目管理、代码质量、测试等命令
- [环境变量](./env-variables) - 配置和管理环境变量

### 问题解决

- [常见问题](./faq) - 开发中常见问题和解决方案

## 快速入门

### 1. 环境准备

确保您已经完成以下准备：

- [x] 已安装 Node.js（推荐 18+ LTS）
- [x] 已安装 pnpm 包管理器
- [x] 已安装 VS Code 及相关扩展
- [x] 已配置 Git

详细步骤请参考 [环境搭建](./environment)。

### 2. 项目初始化

```bash
# 克隆项目
git clone <repository-url>
cd <project-name>

# 切换 Node 版本
nvm use

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

详细步骤请参考 [快速开始](./quickstart)。

### 3. 开发与提交

```bash
# 创建功能分支
git checkout -b feature/your-feature-name

# 开发代码...

# 检查代码
pnpm run lint

# 提交代码
git add .
git commit -m "feat: 添加新功能"

# 推送到远程
git push origin feature/your-feature-name
```

详细流程请参考 [开发流程](./development)。

## 核心概念

### 代码规范

项目遵循严格的代码规范，包括：

- **HTML 规范** - 语义化、可访问性
- **CSS 规范** - BEM 命名、性能优化
- **JavaScript 规范** - ES6+、最佳实践
- **Vue 规范** - 组件设计、状态管理

详细规范请参考 [代码规范](/standard/)。

### 工具链

项目使用以下工具保证代码质量：

- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Git Hooks** - 提交前检查
- **VS Code** - 统一开发环境

详细配置请参考 [工具链](/tools/)。

## 学习资源

### 官方文档

- [Vue.js 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/)

### 推荐阅读

- [Vue.js 官方风格指南](https://vuejs.org/style-guide/)
- [JavaScript 最佳实践](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [CSS 最佳实践](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

## 获取帮助

如果在开发过程中遇到问题：

1. 查看 [常见问题](./faq) 章节
2. 搜索相关错误信息
3. 查看官方文档
4. 联系团队成员寻求帮助

## 相关资源

- [代码规范](/standard/) - 编写规范和最佳实践
- [工具链](/tools/) - 开发工具配置
- [首页](/) - 返回文档首页