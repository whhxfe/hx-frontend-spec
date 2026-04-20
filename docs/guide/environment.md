---
title: 环境搭建
---

# 环境搭建

本指南将帮助您搭建前端开发环境。

## Node.js 版本管理

::: tip 推荐使用 nvm
强烈推荐使用 [nvm](https://github.com/nvm-sh/nvm)（Node Version Manager）管理 Node.js 版本，它可以让你在同一台机器上安装和切换多个 Node.js 版本。
:::

### 安装 nvm

**Windows 用户：**

下载并安装 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

```bash
# 下载 nvm-setup.exe 并运行安装程序
```

**Mac/Linux 用户：**

```bash
# 使用 curl 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 或使用 wget 安装
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载配置
source ~/.bashrc  # Linux
source ~/.zshrc   # Mac (zsh)
```

### 使用 nvm

```bash
# 查看可安装的 Node.js 版本
nvm list-remote

# 安装 Node.js 18 LTS（推荐）
nvm install 18

# 安装 Node.js 20 LTS（最新）
nvm install 20

# 查看已安装的版本
nvm list

# 切换版本
nvm use 18

# 设置默认版本
nvm alias default 18

# 查看当前使用的版本
node --version
npm --version
```

### 项目 Node 版本锁定

在项目根目录创建 `.nvmrc` 文件：

```bash
# .nvmrc
18
```

团队成员可以使用以下命令快速切换到项目指定的 Node 版本：

```bash
# 切换到项目指定的版本
nvm use

# 如果未安装该版本，先安装再切换
nvm install && nvm use
```

## 包管理器

推荐使用 `pnpm` 作为包管理器，它比 npm 和 yarn 更快、更节省磁盘空间。

### 安装 pnpm

```bash
# 使用 npm 全局安装
npm install -g pnpm

# 或使用 npx
npx pnpm add -g pnpm

# 查看版本
pnpm --version
```

### pnpm 常用命令

```bash
# 安装依赖
pnpm install

# 添加依赖
pnpm add <package>

# 添加开发依赖
pnpm add -D <package>

# 移除依赖
pnpm remove <package>

# 运行脚本
pnpm run <script>

# 更新依赖
pnpm update
```

## IDE 配置

推荐使用 **VS Code**，需要安装以下扩展：

| 扩展名 | 说明 | 必要性 |
|--------|------|--------|
| **Volar** | Vue3 语言支持 | 必装 |
| **ESLint** | 代码检查 | 必装 |
| **Prettier** | 代码格式化 | 必装 |
| **GitLens** | Git 增强 | 推荐 |
| **Auto Rename Tag** | 自动重命名标签 | 推荐 |
| **Path Intellisense** | 路径自动补全 | 推荐 |

::: warning 注意
如果你在使用 Vue2 项目，请安装 **Vetur** 而不是 **Volar**，两者不要同时启用。
:::

详细配置请参考 [VS Code 配置](/tools/vscode)

## 相关资源

- [Node.js 官方文档](https://nodejs.org/)
- [nvm 文档](https://github.com/nvm-sh/nvm)
- [pnpm 文档](https://pnpm.io/)