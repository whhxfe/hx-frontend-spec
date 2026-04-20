---
title: 工具链
---

# 工具链

本页面提供了前端开发所需的工具配置和推荐设置。

## 配置文档

### 代码格式化

- [Prettier 配置](./prettier.md) - 代码格式化工具配置，包含 Vue2 和 Vue3+TS 两套方案

### 代码质量

- [ESLint 配置](./eslint.md) - 代码静态分析工具配置，检测潜在问题

### Git 工具

- [Git Hooks 配置](./git-hooks.md) - 使用 Husky、lint-staged、commitlint 管理 Git 钩子

### 编辑器

- [VS Code 配置](./vscode.md) - VS Code 扩展推荐和编辑器设置

## 快速开始

### 1. 安装依赖

```bash
# 代码格式化
npm install --save-dev prettier

# 代码检查
npm install --save-dev eslint eslint-plugin-vue

# Git Hooks
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional
```

### 2. 创建配置文件

根据项目类型选择对应的配置：

**Vue2 + JavaScript 项目：**
- 下载 [prettier-vue2.json](./prettier-vue2.json) 保存为 `.prettierrc`
- 参考 [ESLint 配置](./eslint.md) 创建 `.eslintrc.js`

**Vue3 + TypeScript 项目：**
- 下载 [prettier-vue3-ts.json](./prettier-vue3-ts.json) 保存为 `.prettierrc`
- 参考 [ESLint 配置](./eslint.md) 创建 `.eslintrc.cjs`

### 3. 配置 Git Hooks

参考 [Git Hooks 配置](./git-hooks.md) 配置代码提交检查。

### 4. 配置编辑器

参考 [VS Code 配置](./vscode.md) 安装推荐扩展和配置。

## 推荐的 package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
    "format": "prettier --write \"src/**/*.{js,ts,vue,json,css,scss,md}\"",
    "lint:check": "eslint . --ext .vue,.js,.ts,.jsx,.tsx",
    "format:check": "prettier --check \"src/**/*.{js,ts,vue,json,css,scss,md}\"",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

## 相关资源

- [Prettier 官方文档](https://prettier.io/)
- [ESLint 官方文档](https://eslint.org/)
- [Vue ESLint 插件](https://eslint.vuejs.org/)
- [Husky 官方文档](https://typicode.github.io/husky/)
- [VS Code 官方文档](https://code.visualstudio.com/)