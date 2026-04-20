# VS Code 配置

推荐的 VS Code 扩展和设置，提升开发效率。

## 通用插件推荐

以下插件适用于所有前端项目：

### 代码质量

| 扩展名 | 说明 |
|--------|------|
| **ESLint** | 代码检查 |
| **Prettier** | 代码格式化 |
| **Stylelint** | CSS/SCSS 检查 |

### 开发效率

| 扩展名 | 说明 |
|--------|------|
| **GitLens** | Git 增强 |
| **Auto Rename Tag** | 自动重命名标签 |
| **Path Intellisense** | 路径自动补全 |
| **Bracket Pair Color** | 括号配对着色 |
| **Error Lens** | 行内错误提示 |
| **indent-rainbow** | 缩进可视化 |
| **Code Spell Checker** | 拼写检查 |

### 主题推荐

| 扩展名 | 类型 |
|--------|------|
| **One Dark Pro** | 深色主题 |
| **Material Theme** | 深色主题 |
| **GitHub Theme** | 浅色/深色 |
| **Dracula Official** | 深色主题 |

## Vue2 专用插件

适用于 Vue2 + JavaScript 项目：

| 扩展名 | 说明 | 必要性 |
|--------|------|--------|
| **Vetur** | Vue2 语言支持 | 必装 |
| **Vue 2 Snippets** | Vue2 代码片段 | 推荐 |
| **JavaScript (ES6) snippets** | ES6 代码片段 | 推荐 |

::: warning 注意
Vue2 项目请使用 Vetur，不要使用 Volar，避免冲突。
:::

### Vue2 推荐扩展列表

在 `.vscode/extensions.json` 中添加：

```json
{
  "recommendations": [
    "octref.vetur",
    "hollowtree.vue-snippets",
    "xabikos.javascriptsnippets",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Vue2 编辑器设置

在 `.vscode/settings.json` 中添加：

```json
{
  // Vetur 设置
  "vetur.validation.template": true,
  "vetur.validation.script": true,
  "vetur.validation.style": true,
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  
  // 文件关联
  "files.associations": {
    "*.vue": "vue"
  }
}
```

## Vue3 + TypeScript 专用插件

适用于 Vue3 + TypeScript 项目：

| 扩展名 | 说明 | 必要性 |
|--------|------|--------|
| **Vue - Official** | Vue3 官方支持 | 必装 |
| **UnoCSS** | 原子化 CSS 框架 | 推荐 |
| **Iconify IntelliSense** | 图标智能提示 | 推荐 |
| **TypeScript Import Sorter** | TS 导入排序 | 推荐 |
| **Vue VSCode Snippets** | Vue3 代码片段 | 推荐 |

::: tip UnoCSS 推荐
UnoCSS 是一个高性能的原子化 CSS 框架，比 Tailwind CSS 更快，推荐在 Vue3 + TS 项目中使用。
:::

### Vue3 推荐扩展列表

在 `.vscode/extensions.json` 中添加：

```json
{
  "recommendations": [
    "vue.volar",
    "antfu.unocss",
    "lokalise.i18n-ally",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "sdras.vue-vscode-snippets",
    "simonsiefke.svg-preview",
    "mikestead.dotenv"
  ]
}
```

### Vue3 编辑器设置

在 `.vscode/settings.json` 中添加：

```json
{
  // Volar 设置
  "vue.autoInsert.dotValue": true,
  "vue.inlayHints.missingProps": true,
  "vue.inlayHints.inlineHandlerLeading": true,
  "vue.inlayHints.optionsWrapper": true,
  
  // UnoCSS 设置
  "unocss.root": ".",
  
  // TypeScript 设置
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  
  // 文件关联
  "files.associations": {
    "*.vue": "vue"
  }
}
```

### UnoCSS 配置

在项目根目录创建 `uno.config.ts`：

```typescript
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  shortcuts: {
    'btn': 'px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600',
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between'
  },
  rules: [
    [/^text-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })]
  ]
})
```

安装依赖：

```bash
npm install -D unocss
```

在 `main.ts` 中引入：

```typescript
import 'virtual:uno.css'
```

## 通用编辑器设置

### 创建 .vscode/settings.json

完整配置（根据项目类型选择对应的配置）：

```json
{
  // 格式化设置
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  
  // 代码提示
  "editor.suggestSelection": "first",
  "editor.snippetSuggestions": "top",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.linkedEditing": true,
  "editor.bracketPairColorization.enabled": true,
  
  // 排除文件
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/dist": true
  },
  
  // Vue 设置
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  
  // TypeScript 设置
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  
  // JavaScript 设置
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  
  // JSON 设置
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  // CSS 设置
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  // ESLint 设置
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "eslint.alwaysShowStatus": true,
  
  // Emmet 设置
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
  },
  "emmet.triggerExpansionOnTab": true
}
```

### 创建 .vscode/launch.json

调试配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### 创建 .vscode/snippets/vue.json

#### Vue2 代码片段

```json
{
  "Vue2 Component": {
    "prefix": "v2comp",
    "body": [
      "<template>",
      "  <div class=\"${1:component-name}\">",
      "    $2",
      "  </div>",
      "</template>",
      "",
      "<script>",
      "export default {",
      "  name: '${3:ComponentName}',",
      "  data() {",
      "    return {",
      "      $4",
      "    }",
      "  },",
      "  methods: {",
      "    $5",
      "  }",
      "}",
      "</script>",
      "",
      "<style scoped>",
      ".$1 {",
      "  $6",
      "}",
      "</style>"
    ],
    "description": "Vue2 组件模板"
  }
}
```

#### Vue3 代码片段

```json
{
  "Vue3 Setup Component": {
    "prefix": "v3setup",
    "body": [
      "<template>",
      "  <div class=\"${1:component-name}\">",
      "    $2",
      "  </div>",
      "</template>",
      "",
      "<script setup lang=\"ts\">",
      "import { ref } from 'vue'",
      "",
      "$3",
      "</script>",
      "",
      "<style scoped>",
      ".$1 {",
      "  $4",
      "}",
      "</style>"
    ],
    "description": "Vue3 Setup 组件模板"
  },
  "Vue3 Composition API": {
    "prefix": "v3comp",
    "body": [
      "<script setup lang=\"ts\">",
      "import { ref, computed, onMounted } from 'vue'",
      "",
      "interface Props {",
      "  $1",
      "}",
      "",
      "const props = defineProps<Props>()",
      "const emit = defineEmits<{",
      "  (e: '$2', value: $3): void",
      "}>()",
      "",
      "const $4 = ref($5)",
      "",
      "$6",
      "</script>",
      "",
      "<template>",
      "  <div>$7</div>",
      "</template>",
      "",
      "<style scoped>",
      "</style>"
    ],
    "description": "Vue3 组合式 API 模板"
  }
}
```

## 快捷键推荐

### 常用快捷键

| 功能 | Windows/Linux | Mac |
|------|---------------|-----|
| 格式化文档 | Shift + Alt + F | Shift + Option + F |
| 保存并格式化 | Ctrl + S | Cmd + S |
| 打开命令面板 | Ctrl + Shift + P | Cmd + Shift + P |
| 快速打开文件 | Ctrl + P | Cmd + P |
| 切换终端 | Ctrl + ` | Cmd + ` |
| 注释行 | Ctrl + / | Cmd + / |
| 多光标选择 | Alt + Click | Option + Click |
| 重构符号 | F2 | F2 |
| 转到定义 | F12 | F12 |
| 查看引用 | Shift + F12 | Shift + F12 |

### 自定义快捷键

在 `.vscode/keybindings.json` 中添加：

```json
[
  {
    "key": "ctrl+shift+f",
    "command": "editor.action.formatDocument",
    "when": "editorHasDocumentFormattingProvider && editorTextFocus"
  },
  {
    "key": "ctrl+shift+s",
    "command": "workbench.action.files.saveFiles"
  }
]
```

## 工作区配置

### 推荐的文件结构

```
project/
├── .vscode/
│   ├── settings.json      # 编辑器设置
│   ├── extensions.json    # 推荐扩展
│   ├── launch.json        # 调试配置
│   └── snippets/          # 代码片段
│       └── vue.json
├── src/
├── public/
└── package.json
```

### 团队协作建议

1. **提交 .vscode 配置**：将 `.vscode` 目录加入版本控制
2. **统一扩展**：使用 `extensions.json` 推荐统一扩展
3. **共享设置**：保持团队编辑器设置一致
4. **代码片段**：共享常用代码片段

## 插件选择指南

### 如何选择？

| 项目类型 | 推荐插件组合 |
|---------|-------------|
| Vue2 + JavaScript | Vetur + Vue 2 Snippets + JavaScript snippets |
| Vue3 + TypeScript | Vue - Official + UnoCSS + TypeScript Import Sorter |
| 混合项目 | Vue - Official + 通用插件 |

### 冲突处理

::: warning 注意
- Vue2 项目：使用 **Vetur**，禁用 Volar
- Vue3 项目：使用 **Volar**，禁用 Vetur
- 不要同时启用 Vetur 和 Volar
:::

## 故障排除

### ESLint 不生效

1. 确认已安装 ESLint 扩展
2. 检查 `.eslintrc` 配置是否正确
3. 在 VS Code 中打开输出面板查看错误信息

### Prettier 不生效

1. 确认已安装 Prettier 扩展
2. 检查 `settings.json` 中 `defaultFormatter` 设置
3. 确认 `.prettierrc` 配置正确

### Volar 不生效

1. 禁用 Vetur 扩展
2. 确认 `vue.autoInsert.dotValue` 设置
3. 重启 VS Code

### UnoCSS 不生效

1. 确认已安装 UnoCSS 扩展
2. 检查 `uno.config.ts` 配置
3. 确认在 `main.ts` 中引入了 `virtual:uno.css`