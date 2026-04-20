# ESLint 配置

ESLint 用于代码静态分析，检测潜在问题和代码风格问题。

## 安装

```bash
npm install --save-dev eslint
```

## Vue2 项目配置

### 安装依赖

```bash
npm install --save-dev eslint-plugin-vue@7
```

### 配置文件

创建 `.eslintrc.js` 文件：

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off'
  }
}
```

### 常用规则说明

| 规则 | 说明 | 推荐值 |
|------|------|--------|
| `no-console` | 禁止 console | 生产环境 warn |
| `no-debugger` | 禁止 debugger | 生产环境 warn |
| `vue/multi-word-component-names` | 组件名多词 | off |

## Vue3 + TypeScript 项目配置

### 安装依赖

```bash
npm install --save-dev eslint-plugin-vue@9 @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 配置文件

创建 `.eslintrc.cjs` 文件：

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
}
```

### TypeScript 相关规则

| 规则 | 说明 | 推荐值 |
|------|------|--------|
| `@typescript-eslint/no-explicit-any` | 禁止使用 any | warn |
| `@typescript-eslint/no-unused-vars` | 未使用变量 | error（忽略 _ 开头） |

## 使用方式

### 检查代码

```bash
npx eslint .
```

### 自动修复

```bash
npx eslint . --fix
```

### 检查特定文件

```bash
npx eslint src/App.vue
```

## 忽略文件

创建 `.eslintignore` 文件：

```
# 构建产物
dist
build

# 依赖
node_modules

# 配置文件
*.config.js
*.config.ts
```

## 在 package.json 中配置 scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
    "lint:check": "eslint . --ext .vue,.js,.ts,.jsx,.tsx"
  }
}
```

## 常见问题

### 与 Prettier 冲突

安装 `eslint-config-prettier`：

```bash
npm install --save-dev eslint-config-prettier
```

在配置中添加 prettier：

```javascript
extends: [
  'eslint:recommended',
  'plugin:vue/recommended',
  'prettier'  // 必须放在最后
]
```

### 无法识别 Vue 文件

确保安装了正确的 ESLint 插件：

- Vue2: `eslint-plugin-vue@7`
- Vue3: `eslint-plugin-vue@9`