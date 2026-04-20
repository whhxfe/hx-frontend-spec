---
title: 快速开始
---

# 快速开始

本指南将帮助您快速上手项目开发。

## 前置条件

在开始之前，请确保您已经完成以下准备工作：

- [x] 已安装 Node.js（推荐 18+ LTS）
- [x] 已安装 pnpm 包管理器
- [x] 已安装 VS Code 及相关扩展
- [x] 已配置 Git

如果还未完成，请先阅读 [环境搭建](./environment)。

## 项目初始化

### 1. 克隆项目

```bash
# 克隆代码到本地
git clone <repository-url>

# 进入项目目录
cd <project-name>
```

### 2. 切换 Node 版本

```bash
# 使用项目指定的 Node 版本
nvm use

# 如果没有该版本，先安装再切换
nvm install
```

### 3. 安装依赖

```bash
# 使用 pnpm 安装依赖（推荐）
pnpm install

# 或使用 npm
npm install
```

### 4. 启动开发服务器

```bash
# 启动开发服务器
pnpm run dev
```

开发服务器启动后，在浏览器中打开终端显示的地址（通常是 `http://localhost:5173`）查看项目。

## 项目结构概览

```
project/
├── src/                # 源代码目录
│   ├── api/           # API 接口
│   ├── components/    # 公共组件
│   ├── views/         # 页面组件
│   ├── router/        # 路由配置
│   ├── stores/        # 状态管理
│   ├── styles/        # 样式文件
│   ├── utils/         # 工具函数
│   └── main.js        # 入口文件
├── public/            # 静态资源
├── index.html         # HTML 入口
├── package.json       # 项目配置
└── vite.config.js     # Vite 配置
```

## 开发工作流

### 1. 创建功能分支

```bash
# 拉取最新代码
git pull origin main

# 创建并切换到新分支
git checkout -b feature/your-feature-name
```

### 2. 开发与调试

- 编写代码
- 使用浏览器开发者工具调试
- 确保代码通过 ESLint 检查

### 3. 代码检查与格式化

```bash
# 检查代码规范
pnpm run lint

# 格式化代码
pnpm run format
```

### 4. 提交代码

```bash
# 添加修改的文件
git add .

# 提交代码（遵循 Git 提交规范）
git commit -m "feat: 添加新功能"

# 推送到远程仓库
git push origin feature/your-feature-name
```

### 5. 创建 Pull Request

在 GitHub/GitLab 上创建 Pull Request，等待 Code Review 通过后合并到主分支。

## 验证环境

运行以下命令验证环境是否正确配置：

```bash
# 检查 Node 版本
node --version

# 检查 pnpm 版本
pnpm --version

# 检查依赖是否安装成功
pnpm list

# 运行开发服务器
pnpm run dev
```

如果一切正常，您应该能够成功启动项目并在浏览器中访问。

## 下一步

- 阅读 [开发流程](./development) 了解详细的开发规范
- 查看 [常用命令](./commands) 了解可用的 npm scripts
- 了解 [环境变量](./env-variables) 配置

## 获取帮助

如果在项目初始化过程中遇到问题：

1. 查看 [常见问题](./faq) 章节
2. 确认 Node 版本是否正确
3. 清除缓存重新安装依赖
4. 联系团队成员寻求帮助