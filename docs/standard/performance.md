# 性能优化规范

本文档提供前端性能优化的最佳实践和规范要求。

## 基本原则

1. **性能优先**：在开发阶段就要考虑性能影响
2. **量化指标**：使用 Lighthouse 等工具监控性能指标
3. **持续优化**：定期审查和优化性能瓶颈
4. **平衡取舍**：在功能和性能之间找到平衡

## 性能指标

### Core Web Vitals

| 指标 | 说明 | 目标值 |
|------|------|--------|
| **LCP** | Largest Contentful Paint（最大内容绘制） | < 2.5s |
| **FID** | First Input Delay（首次输入延迟） | < 100ms |
| **CLS** | Cumulative Layout Shift（累积布局偏移） | < 0.1 |

### 其他重要指标

| 指标 | 说明 | 目标值 |
|------|------|--------|
| **FCP** | First Contentful Paint（首次内容绘制） | < 1.8s |
| **TTI** | Time to Interactive（可交互时间） | < 3.8s |
| **TBT** | Total Blocking Time（总阻塞时间） | < 200ms |
| **SI** | Speed Index（速度指数） | < 3.4s |

### 测量工具

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://example.com --view

# Chrome DevTools
# Performance 面板
# Lighthouse 面板

# Web Vitals 库
npm install web-vitals
```

```javascript
// web-vitals 使用示例
import { onCLS, onFID, onLCP } from 'web-vitals'

onCLS(console.log)
onFID(console.log)
onLCP(console.log)
```

## 资源优化

### 图片优化

#### 格式选择

```html
<!-- ✅ 根据场景选择格式 -->
<!-- 照片类图片：WebP > JPEG -->
<picture>
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="照片">
</picture>

<!-- 需要透明：WebP > PNG -->
<picture>
  <source srcset="logo.webp" type="image/webp">
  <img src="logo.png" alt="Logo">
</picture>

<!-- 简单动画：WebP > GIF -->
<picture>
  <source srcset="animation.webp" type="image/webp">
  <img src="animation.gif" alt="动画">
</picture>

<!-- 矢量图形：SVG -->
<img src="icon.svg" alt="图标">
```

#### 响应式图片

```html
<!-- ✅ 使用 srcset 提供多种分辨率 -->
<img 
  srcset="
    image-320w.jpg 320w,
    image-640w.jpg 640w,
    image-1024w.jpg 1024w,
    image-1920w.jpg 1920w
  "
  sizes="
    (max-width: 320px) 280px,
    (max-width: 640px) 600px,
    (max-width: 1024px) 1000px,
    1800px
  "
  src="image-640w.jpg"
  alt="响应式图片"
/>

<!-- ✅ 使用 picture 进行艺术指导 -->
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="hero-desktop.jpg"
  >
  <source 
    media="(min-width: 768px)" 
    srcset="hero-tablet.jpg"
  >
  <img 
    src="hero-mobile.jpg" 
    alt="艺术指导图片"
  >
</picture>
```

#### 懒加载

```html
<!-- ✅ 原生懒加载 -->
<img 
  src="image.jpg" 
  loading="lazy" 
  alt="懒加载图片"
/>

<!-- ✅ 优先加载首屏图片 -->
<img 
  src="hero.jpg" 
  loading="eager" 
  alt="首屏图片"
/>

<!-- ✅ 使用 Intersection Observer -->
<img 
  data-src="image.jpg" 
  class="lazyload"
  alt="懒加载图片"
/>
```

```javascript
// Intersection Observer 实现
const lazyImages = document.querySelectorAll('.lazyload')

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove('lazyload')
      observer.unobserve(img)
    }
  })
})

lazyImages.forEach(img => imageObserver.observe(img))
```

#### 图片压缩

```javascript
// build 配置示例（Vite）
// vite.config.js
import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      webp: { quality: 80 }
    })
  ]
})
```

### 字体优化

```css
/* ✅ 使用 font-display */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;  /* 优先显示系统字体 */
}

/* ✅ 预加载关键字体 */
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />

/* ✅ 使用系统字体栈 */
:root {
  --font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                 'Helvetica Neue', Arial, sans-serif;
}
```

```html
<!-- ✅ 字体预加载 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/secondary.woff2" as="font" type="font/woff2" crossorigin>
```

### JavaScript 优化

#### 代码分割

```javascript
// ✅ 路由懒加载
const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/user',
    component: () => import('./views/User.vue')
  }
]

// ✅ 动态导入
const module = await import('./heavy-module.js')

// ✅ Webpack 魔法注释
const component = () => import(
  /* webpackChunkName: "user-profile" */
  /* webpackPrefetch: true */
  './UserProfile.vue'
)
```

#### Tree Shaking

```javascript
// ✅ 使用 ES6 模块语法
import { specific } from 'library'

// ❌ 避免整个导入
import * as library from 'library'

// ✅ 使用具名导出
export function functionA() {}
export function functionB() {}

// ✅ 标记无副作用
// package.json
{
  "sideEffects": false
}
```

#### 减少主线程阻塞

```javascript
// ✅ 使用 Web Workers 处理复杂计算
const worker = new Worker('worker.js')
worker.postMessage({ data: largeData })
worker.onmessage = (e) => {
  console.log(e.data)
}

// ✅ 使用 requestIdleCallback
requestIdleCallback(() => {
  // 低优先级任务
})

// ✅ 使用 requestAnimationFrame
requestAnimationFrame(() => {
  // 动画更新
})

// ✅ 分批处理大任务
async function processLargeArray(array) {
  const batchSize = 100
  
  for (let i = 0; i < array.length; i += batchSize) {
    const batch = array.slice(i, i + batchSize)
    await processBatch(batch)
    
    // 让出主线程
    await new Promise(resolve => setTimeout(resolve, 0))
  }
}
```

### CSS 优化

#### 减少重绘重排

```css
/* ✅ 使用 transform 代替位置属性 */
.element {
  transform: translateX(100px);
  /* 代替 left: 100px */
}

/* ✅ 使用 opacity 代替 visibility */
.element {
  opacity: 0;
  /* 代替 visibility: hidden */
}

/* ✅ 启用硬件加速 */
.hardware-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* ✅ 避免过度使用 will-change */
.optimized {
  will-change: transform, opacity;
}
```

#### 关键 CSS 内联

```html
<!-- ✅ 内联关键 CSS -->
<style>
  /* 首屏关键样式 */
  .hero { /* ... */ }
  .header { /* ... */ }
</style>

<!-- ✅ 异步加载非关键 CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

#### CSS 代码拆分

```javascript
// ✅ 动态加载 CSS
const loadStyles = async () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/styles/optional.css'
  document.head.appendChild(link)
}

// ✅ 按路由加载 CSS
const routes = {
  '/dashboard': () => import('./styles/dashboard.css'),
  '/profile': () => import('./styles/profile.css')
}
```

## 网络优化

### HTTP 优化

#### HTTP/2

```nginx
# Nginx 配置
server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # 启用 HTTP/2
    http2_push_preload on;
}
```

#### 资源提示

```html
<!-- ✅ DNS 预解析 -->
<link rel="dns-prefetch" href="//api.example.com">
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- ✅ 预连接 -->
<link rel="preconnect" href="https://api.example.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

<!-- ✅ 预加载关键资源 -->
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/js/main.js" as="script">

<!-- ✅ 预获取下一页 -->
<link rel="prefetch" href="/next-page.html">
```

#### 缓存策略

```nginx
# Nginx 缓存配置
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}

# Service Worker 缓存
location /sw.js {
    expires 0;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### CDN 使用

```html
<!-- ✅ 使用 CDN 加载公共资源 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.min.js"></script>

<!-- ✅ 配置 fallback -->
<script>
  if (!window.Vue) {
    document.write('<script src="/js/vue.min.js"><\/script>')
  }
</script>
```

```javascript
// ✅ Webpack 外部化配置
// webpack.config.js
module.exports = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter'
  }
}
```

## 构建优化

### Webpack 优化

```javascript
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  
  optimization: {
    // 代码分割
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: true
        }
      }
    },
    
    // 压缩
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  
  // 持久化缓存
  cache: {
    type: 'filesystem'
  }
}
```

### Vite 优化

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['lodash-es', 'dayjs']
        }
      }
    },
    
    // 压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // CSS 代码分割
    cssCodeSplit: true,
    
    // 生成 manifest
    manifest: true
  },
  
  // 预构建优化
  optimizeDeps: {
    include: ['vue', 'vue-router']
  }
})
```

## 运行时优化

### 虚拟列表

```vue
<!-- ✅ 大列表使用虚拟滚动 -->
<template>
  <RecycleScroller
    :items="items"
    :item-size="50"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="item">{{ item.name }}</div>
  </RecycleScroller>
</template>

<script setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`
}))
</script>
```

### 防抖节流

```javascript
// ✅ 防抖函数
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// ✅ 节流函数
function throttle(fn, interval) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

// 使用示例
const handleSearch = debounce((query) => {
  // 搜索逻辑
}, 300)

const handleScroll = throttle(() => {
  // 滚动逻辑
}, 100)
```

### 组件优化

```vue
<!-- ✅ 使用 keep-alive 缓存组件 -->
<template>
  <keep-alive :include="cachedViews">
    <router-view />
  </keep-alive>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const cachedViews = computed(() => {
  // 缓存的路由名称
  return ['Home', 'UserProfile']
})
</script>
```

```javascript
// ✅ 使用 shallowRef 大对象
import { shallowRef } from 'vue'

const largeObject = shallowRef({
  // 大量数据
})

// ✅ 使用 computed 缓存计算结果
const expensiveList = computed(() => {
  return list.value.filter(item => item.active).map(item => item.name)
})

// ✅ 使用 v-once 静态内容
// <div v-once>静态内容</div>

// ✅ 使用 v-memo 优化列表（Vue 3.2+）
// <div v-for="item in list" :key="item.id" v-memo="[item.id]">
//   {{ item.name }}
// </div>
```

## 监控与分析

### 性能监控

```javascript
// ✅ Performance API
const perfData = performance.getEntriesByType('navigation')[0]
console.log('DNS 查询时间:', perfData.domainLookupEnd - perfData.domainLookupStart)
console.log('TCP 连接时间:', perfData.connectEnd - perfData.connectStart)
console.log('DOM 解析时间:', perfData.domComplete - perfData.domInteractive)

// ✅ 自定义性能标记
performance.mark('start-task')
// 执行任务
performance.mark('end-task')
const duration = performance.measure('task', 'start-task', 'end-task')
console.log('任务耗时:', duration.duration)

// ✅ 错误监控
window.addEventListener('error', (event) => {
  console.error('资源加载错误:', event.target.src || event.target.href)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 错误:', event.reason)
})
```

### 性能预算

```javascript
// performance-budget.json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "10kb",
      "maximumError": "20kb"
    }
  ]
}
```

## 最佳实践

### 开发阶段

1. **使用 Chrome DevTools** 分析性能
2. **启用 Lighthouse CI** 持续监控
3. **设置性能预算** 防止退化
4. **使用 Bundle Analyzer** 分析包大小

### 部署阶段

1. **启用 Gzip/Brotli 压缩**
2. **配置 CDN 加速**
3. **设置合理的缓存策略**
4. **启用 HTTP/2**

### 持续优化

1. **定期审计性能**（每月）
2. **分析用户真实数据**
3. **优化瓶颈环节**
4. **更新优化策略**

## 工具推荐

- **Lighthouse** - 性能审计
- **WebPageTest** - 网页性能测试
- **Bundle Analyzer** - 包大小分析
- **Chrome DevTools** - 开发者工具
- **Web Vitals** - 性能指标库