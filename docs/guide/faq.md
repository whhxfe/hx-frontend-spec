---
title: 常见问题
---

# 常见问题

本文档整理了开发过程中常见的问题和解决方案。

## 环境相关

### Node 版本问题

**问题**：项目运行时报错，提示 Node 版本不兼容

```
error: The engine "node" is incompatible with this module
```

**解决方案**：

```bash
# 1. 检查当前 Node 版本
node --version

# 2. 使用 nvm 切换到项目要求的版本
nvm use 18

# 3. 如果没有该版本，先安装
nvm install 18

# 4. 设置为默认版本
nvm alias default 18
```

### npm/pnpm 安装失败

**问题**：依赖安装失败

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**解决方案**：

```bash
# 方案 1：清除缓存重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 方案 2：清除 pnpm 缓存
pnpm store prune
pnpm install

# 方案 3：使用 --force 强制安装（谨慎使用）
pnpm install --force
```

### 端口被占用

**问题**：启动开发服务器时报端口占用错误

```
Error: listen EADDRINUSE: address already in use :::5173
```

**解决方案**：

```bash
# 方案 1：使用其他端口
pnpm run dev -- --port 3000

# 方案 2：查找并结束占用端口的进程

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5173
kill -9 <PID>
```

### 环境变量未生效

**问题**：修改了 .env 文件但环境变量未生效

**解决方案**：

1. 检查变量名是否以 `VITE_` 开头
2. 重启开发服务器（修改环境变量后必须重启）

```bash
# 停止服务器（Ctrl+C）
# 重新启动
pnpm run dev
```

## 代码相关

### ESLint 报错

**问题**：代码检查不通过

```
error: 'xxx' is defined but never used
error: Expected '===' and instead saw '=='
```

**解决方案**：

```bash
# 自动修复
pnpm run lint

# 如果还有错误，手动修复
```

常见错误及修复：

```javascript
// ❌ 未使用的变量
const unused = 'test'

// ✅ 删除或使用
const used = 'test'
console.log(used)

// ❌ 使用 ==
if (x == '5') {}

// ✅ 使用 ===
if (x === 5) {}

// ❌ 未定义的变量
console.log(undefinedVar)

// ✅ 先定义再使用
const definedVar = 'value'
console.log(definedVar)
```

### TypeScript 类型错误

**问题**：类型检查报错

```
Type 'string' is not assignable to type 'number'
```

**解决方案**：

```typescript
// ❌ 类型不匹配
const num: number = '123'

// ✅ 正确的类型
const num: number = 123
const str: string = '123'

// ✅ 类型转换
const num: number = Number('123')
const num: number = parseInt('123', 10)
```

### Vue 组件报错

**问题**：组件无法正常渲染

```
[Vue warn]: Component is missing template or render function
```

**解决方案**：

```vue
<!-- ✅ 确保有 template 或 render 函数 -->
<template>
  <div>内容</div>
</template>

<script setup>
// 组件逻辑
</script>
```

### 路由跳转不生效

**问题**：点击链接页面不跳转

**解决方案**：

```vue
<!-- ❌ 使用 a 标签（会刷新页面） -->
<a href="/about">关于</a>

<!-- ✅ 使用 router-link -->
<router-link to="/about">关于</router-link>

<!-- ✅ 或使用编程式导航 -->
<button @click="$router.push('/about')">关于</button>
```

## 构建相关

### 构建失败

**问题**：`pnpm run build` 报错

**解决方案**：

```bash
# 1. 检查 TypeScript 错误
pnpm run type-check

# 2. 检查 ESLint 错误
pnpm run lint

# 3. 清除缓存重新构建
rm -rf dist
pnpm run build
```

### 构建产物过大

**问题**：打包后的文件太大

**解决方案**：

1. **代码分割**

```javascript
// 路由懒加载
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
```

2. **按需导入**

```javascript
// ❌ 全量导入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// ✅ 按需导入
import { ElButton, ElInput } from 'element-plus'
```

3. **分析打包体积**

```bash
# 安装分析工具
pnpm add -D rollup-plugin-visualizer

# 配置分析
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true
    })
  ]
})
```

## Git 相关

### 提交被拒绝

**问题**：`git commit` 被 Husky 拒绝

```
husky - pre-commit hook exited with code 1
```

**解决方案**：

```bash
# 1. 修复代码问题
pnpm run lint

# 2. 重新提交
git add .
git commit -m "feat: 你的提交信息"

# 3. 临时跳过检查（不推荐）
git commit --no-verify -m "feat: 你的提交信息"
```

### 提交信息格式错误

**问题**：commitlint 拒绝提交

```
⧗   input: update code
✖   subject may not be empty [subject-empty]
```

**解决方案**：

```bash
# ✅ 使用正确的格式
git commit -m "feat: 添加新功能"
git commit -m "fix: 修复登录问题"
git commit -m "docs: 更新文档"
```

### 代码冲突

**问题**：合并代码时出现冲突

**解决方案**：

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 查看冲突文件
git status

# 3. 手动编辑冲突文件
# 找到冲突标记 <<<<<<< HEAD 和 >>>>>>> main
# 选择保留的代码，删除冲突标记

# 4. 添加解决后的文件
git add .

# 5. 继续合并
git commit
```

## 网络相关

### API 请求失败

**问题**：请求接口返回错误

```
Error: Network Error
```

**解决方案**：

1. **检查网络连接**
2. **检查 API 地址是否正确**
3. **检查代理配置**

```javascript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

### 跨域问题

**问题**：浏览器报 CORS 错误

```
Access to XMLHttpRequest at 'http://api.example.com' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**解决方案**：

1. **开发环境：配置代理**

```javascript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

2. **生产环境：后端配置 CORS 或使用 Nginx 代理**

## IDE 相关

### VS Code 不识别 Vue 文件

**问题**：Vue 文件没有语法高亮和智能提示

**解决方案**：

1. 安装 Volar 扩展
2. 禁用 Vetur 扩展（如果已安装）
3. 重启 VS Code

### ESLint 不生效

**问题**：保存时没有自动修复

**解决方案**：

1. 确保安装了 ESLint 扩展
2. 检查 VS Code 设置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Prettier 不生效

**问题**：保存时没有自动格式化

**解决方案**：

1. 确保安装了 Prettier 扩展
2. 检查设置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 性能相关

### 页面加载慢

**问题**：首次加载时间过长

**解决方案**：

1. **路由懒加载**

```javascript
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  }
]
```

2. **图片优化**

```html
<img loading="lazy" src="image.jpg" alt="图片">
```

3. **启用 Gzip 压缩**

```nginx
# Nginx 配置
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 内存泄漏

**问题**：页面长时间运行后变卡

**解决方案**：

```vue
<script setup>
import { onUnmounted } from 'vue'

// 清理定时器
const timer = setInterval(() => {}, 1000)
onUnmounted(() => {
  clearInterval(timer)
})

// 清理事件监听器
const handler = () => {}
onMounted(() => {
  window.addEventListener('resize', handler)
})
onUnmounted(() => {
  window.removeEventListener('resize', handler)
})
</script>
```

## 部署相关

### 部署后页面空白

**问题**：部署后访问页面是空白的

**解决方案**：

1. **检查 base 配置**

```javascript
// vite.config.ts
export default defineConfig({
  base: '/'  // 确保与部署路径一致
})
```

2. **检查路由配置**

```javascript
// 如果部署在子目录
const router = createRouter({
  history: createWebHistory('/subpath/'),
  routes
})
```

### 资源 404

**问题**：部署后静态资源加载失败

**解决方案**：

1. 检查资源路径
2. 确认 CDN 配置正确
3. 检查 Nginx 配置

```nginx
location / {
  try_files $uri $uri/ /index.html;
}

location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

## 获取帮助

如果以上方案都无法解决你的问题：

1. **查看错误日志**：仔细阅读终端或浏览器控制台的错误信息
2. **搜索错误信息**：将错误信息复制到搜索引擎
3. **查看官方文档**：
   - [Vue.js 文档](https://vuejs.org/)
   - [Vite 文档](https://vitejs.dev/)
   - [ESLint 文档](https://eslint.org/)
4. **联系团队成员**：寻求帮助

## 相关资源

- [Node.js 文档](https://nodejs.org/)
- [Git 文档](https://git-scm.com/doc)
- [VS Code 文档](https://code.visualstudio.com/docs)