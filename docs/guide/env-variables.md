---
title: 环境变量
---

# 环境变量

本文档介绍如何在项目中使用环境变量。

## 基本概念

环境变量是存储在应用程序运行环境中的动态值，用于配置应用行为而无需修改代码。

## 环境变量文件

### 文件类型

项目支持以下环境变量文件：

| 文件 | 说明 | 加载时机 |
|------|------|---------|
| `.env` | 所有环境都会加载 | 始终 |
| `.env.local` | 本地覆盖配置 | 始终（git 忽略） |
| `.env.development` | 开发环境配置 | 仅开发环境 |
| `.env.development.local` | 开发环境本地覆盖 | 仅开发环境（git 忽略） |
| `.env.production` | 生产环境配置 | 仅生产环境 |
| `.env.production.local` | 生产环境本地覆盖 | 仅生产环境（git 忽略） |

### 加载优先级

```
1. .env.[mode].local
2. .env.[mode]
3. .env.local
4. .env
```

## 命名规范

### 命名规则

```bash
# ✅ 推荐：大写字母 + 下划线
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App
VITE_MAX_RETRY_COUNT=3

# ❌ 不推荐：小写字母
vite_api_base_url=https://api.example.com
apiBaseurl=https://api.example.com

# ❌ 不推荐：使用数字开头
1_API_URL=https://api.example.com

# ❌ 不推荐：使用特殊字符
VITE-API-URL=https://api.example.com
```

### Vite 前缀

Vite 项目中，只有以 `VITE_` 开头的环境变量才能在客户端代码中访问：

```bash
# ✅ 可以在客户端访问
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App

# ❌ 不能在客户端访问（仅服务端可用）
API_SECRET=secret123
DATABASE_URL=postgres://...
```

## 配置示例

### 基础配置

```bash
# .env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=Hx前端规范
VITE_APP_VERSION=1.0.0
```

### 开发环境

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_DEBUG=true
VITE_MOCK_ENABLED=true
```

### 生产环境

```bash
# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_DEBUG=false
VITE_MOCK_ENABLED=false
VITE_CDN_URL=https://cdn.example.com
```

## 在代码中使用

### 基础使用

```javascript
// 访问环境变量
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const appTitle = import.meta.env.VITE_APP_TITLE

console.log('API 地址:', apiBaseUrl)
console.log('应用标题:', appTitle)
```

### TypeScript 支持

```typescript
// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_DEBUG: string
  readonly VITE_MOCK_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { computed } from 'vue'

// 获取环境变量
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const isDebug = import.meta.env.VITE_DEBUG === 'true'

// 使用 computed
const config = computed(() => ({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appTitle: import.meta.env.VITE_APP_TITLE,
  version: import.meta.env.VITE_APP_VERSION
}))
</script>

<template>
  <div>
    <h1>{{ config.appTitle }}</h1>
    <p>API: {{ config.apiBaseUrl }}</p>
    <p v-if="isDebug">调试模式已开启</p>
  </div>
</template>
```

### 配置文件中使用

```javascript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    base: env.VITE_BASE_PATH || '/',
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true
        }
      }
    }
  }
})
```

## 类型安全

### 定义类型

```typescript
// src/types/env.d.ts
interface EnvConfig {
  API_BASE_URL: string
  APP_TITLE: string
  APP_VERSION: string
  DEBUG: boolean
  MOCK_ENABLED: boolean
}

// 获取并转换环境变量
export function getEnvConfig(): EnvConfig {
  return {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    APP_TITLE: import.meta.env.VITE_APP_TITLE,
    APP_VERSION: import.meta.env.VITE_APP_VERSION,
    DEBUG: import.meta.env.VITE_DEBUG === 'true',
    MOCK_ENABLED: import.meta.env.VITE_MOCK_ENABLED === 'true'
  }
}
```

### 使用类型安全的配置

```typescript
import { getEnvConfig } from '@/types/env'

const config = getEnvConfig()

if (config.DEBUG) {
  console.log('调试模式:', config)
}
```

## 默认值处理

```typescript
// 提供默认值
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const maxRetries = Number(import.meta.env.VITE_MAX_RETRY_COUNT) || 3
const isDebug = import.meta.env.VITE_DEBUG === 'true'

// 使用 nullish coalescing
const appTitle = import.meta.env.VITE_APP_TITLE ?? 'Default Title'
```

## 环境判断

```typescript
// 判断当前环境
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
const mode = import.meta.env.MODE

// 内置环境变量
console.log('是否开发环境:', isDev)
console.log('是否生产环境:', isProd)
console.log('当前模式:', mode)
```

## 敏感信息处理

### 前端安全

::: warning 注意
环境变量会被打包到客户端代码中，不要存储敏感信息：
- ❌ 数据库密码
- ❌ API 密钥
- ❌ 私钥
- ❌ 其他机密信息
:::

### 正确做法

```bash
# ✅ 前端可安全使用
VITE_API_BASE_URL=https://api.example.com
VITE_PUBLIC_KEY=pk_xxx

# ❌ 不要在前端暴露
API_SECRET=sk_xxx
DATABASE_PASSWORD=password123
```

### 服务端敏感信息

敏感信息应存储在服务端，通过 API 获取：

```typescript
// 从服务端获取配置
async function getAppConfig() {
  const response = await fetch('/api/config')
  return response.json()
}
```

## 调试环境变量

### 查看所有环境变量

```typescript
// 开发环境查看所有 VITE_ 变量
if (import.meta.env.DEV) {
  console.log('环境变量:', import.meta.env)
}
```

### 调试面板

```vue
<script setup lang="ts">
import { computed } from 'vue'

const envInfo = computed(() => ({
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appTitle: import.meta.env.VITE_APP_TITLE
}))
</script>

<template>
  <div v-if="import.meta.env.DEV" class="env-debug">
    <h3>环境变量调试</h3>
    <pre>{{ envInfo }}</pre>
  </div>
</template>

<style scoped>
.env-debug {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 9999;
}
</style>
```

## 常见问题

### 1. 环境变量未生效

```bash
# 检查变量名是否正确
# 必须以 VITE_ 开头
VITE_API_URL=https://api.example.com  # ✅
API_URL=https://api.example.com       # ❌
```

### 2. 修改环境变量后需要重启

环境变量在构建时被替换，修改后需要重启开发服务器：

```bash
# 停止服务器（Ctrl+C）
# 重新启动
pnpm run dev
```

### 3. 生产环境变量未生效

检查 `.env.production` 文件是否正确配置：

```bash
# 构建时指定模式
pnpm run build --mode production

# 预览时加载生产环境变量
pnpm run preview
```

### 4. TypeScript 类型错误

添加类型声明文件：

```typescript
// src/env.d.ts
/// <reference types="vite/client" />
```

## 最佳实践

1. **使用有意义的命名**：变量名应清晰表达用途
2. **提供默认值**：为可选变量提供合理的默认值
3. **类型安全**：使用 TypeScript 定义环境变量类型
4. **文档化**：在 README 中说明环境变量的用途
5. **版本控制**：提交 `.env.example` 作为参考模板

## .env.example 模板

```bash
# .env.example
# 复制此文件为 .env 并填写实际值

# API 配置
VITE_API_BASE_URL=http://localhost:3000/api

# 应用配置
VITE_APP_TITLE=Hx前端规范
VITE_APP_VERSION=1.0.0

# 调试配置
VITE_DEBUG=true
VITE_MOCK_ENABLED=true

# 可选配置
# VITE_CDN_URL=
# VITE_BASE_PATH=/
```

## 相关资源

- [Vite 环境变量文档](https://vitejs.dev/guide/env-and-mode.html)
- [dotenv 文档](https://github.com/motdotla/dotenv)