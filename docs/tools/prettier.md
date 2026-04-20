# Prettier 配置

Prettier 是一个代码格式化工具，可以自动格式化代码，保持团队代码风格一致。

## 安装

```bash
npm install --save-dev prettier
```

## Vue2 项目配置

适用于 Vue2 + JavaScript 项目。

### 配置文件

创建 `.prettierrc` 文件：

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto"
}
```

下载配置文件：[prettier-vue2.json](./prettier-vue2.json)

### 配置说明

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `printWidth` | 100 | 每行最大字符数 |
| `tabWidth` | 2 | 缩进空格数 |
| `useTabs` | false | 使用空格而非 Tab |
| `semi` | true | 语句末尾添加分号 |
| `singleQuote` | true | 使用单引号 |
| `quoteProps` | as-needed | 仅在需要时给对象属性加引号 |
| `trailingComma` | es5 | ES5 允许的尾逗号 |
| `bracketSpacing` | true | 对象括号内加空格 |
| `arrowParens` | avoid | 箭头函数单参数省略括号 |
| `endOfLine` | lf | 使用 LF 换行符 |

## Vue3 + TypeScript 项目配置

适用于 Vue3 + TypeScript 项目。

### 配置文件

创建 `.prettierrc` 文件：

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false
}
```

下载配置文件：[prettier-vue3-ts.json](./prettier-vue3-ts.json)

### 与 Vue2 配置的主要区别

| 配置项 | Vue2 | Vue3+TS | 说明 |
|--------|------|---------|------|
| `trailingComma` | `"es5"` | `"all"` | 支持所有位置的尾逗号（包括函数参数） |

## 使用方式

### 格式化所有文件

```bash
npx prettier --write .
```

### 检查格式（不修改文件）

```bash
npx prettier --check .
```

### 格式化特定文件

```bash
npx prettier --write src/App.vue
```

### 格式化特定目录

```bash
npx prettier --write "src/**/*.{js,ts,vue,json,css,scss,md}"
```

## 忽略文件

创建 `.prettierignore` 文件：

```
# 构建产物
dist
build
*.min.js

# 依赖
node_modules

# 其他
*.log
.git
```

## 与 ESLint 配合使用

推荐使用 `eslint-config-prettier` 避免冲突：

```bash
npm install --save-dev eslint-config-prettier
```

在 `.eslintrc` 中添加：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
    "prettier"
  ]
}