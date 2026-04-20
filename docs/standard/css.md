# CSS 编写规范

本文档提供 CSS 编写的最佳实践和规范要求。

## 基本原则

1. **可维护性**：代码易于理解和修改
2. **可扩展性**：支持功能扩展而不破坏现有结构
3. **性能优先**：减少重绘和回流，优化渲染性能
4. **一致性**：保持代码风格统一

## 命名规范

### BEM 命名法

推荐使用 BEM（Block-Element-Modifier）命名规范：

```css
/* Block - 块 */
.card {
  background: #fff;
  border-radius: 4px;
}

/* Element - 元素 */
.card__header {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.card__body {
  padding: 16px;
}

.card__footer {
  padding: 16px;
  border-top: 1px solid #eee;
}

/* Modifier - 修饰符 */
.card--primary {
  border-color: #007bff;
}

.card--large {
  padding: 24px;
}
```

### 命名风格

```css
/* ✅ 推荐：小写字母 + 连字符 */
.user-profile {
  /* ... */
}

.nav-menu__item {
  /* ... */
}

/* ❌ 不推荐：驼峰命名 */
.userProfile {
  /* ... */
}

/* ❌ 不推荐：下划线命名 */
.user_profile {
  /* ... */
}
```

### 类名语义化

```css
/* ✅ 语义化命名 */
.header {
  /* ... */
}
.navigation {
  /* ... */
}
.sidebar {
  /* ... */
}

/* ❌ 无语义命名 */
.top-part {
  /* ... */
}
.left-side {
  /* ... */
}
.box1 {
  /* ... */
}
```

## 选择器规范

### 选择器层级

```css
/* ✅ 推荐：尽量扁平，最多3层 */
.nav__item {
  /* ... */
}
.nav__item--active {
  /* ... */
}

/* ❌ 不推荐：层级过深 */
.nav .nav-list .nav-item .nav-link .nav-text {
  /* ... */
}
```

### 选择器优先级

```css
/* 优先级从低到高 */
/* 1. 元素选择器 */
p {
  color: #333;
}

/* 2. 类选择器 */
.text-primary {
  color: #007bff;
}

/* 3. ID 选择器 */
#header {
  background: #fff;
}

/* ❌ 避免使用 !important */
.element {
  color: red !important;
}
```

### 选择器性能

```css
/* ✅ 高效选择器 */
.class {
  /* ... */
}
.nav-item {
  /* ... */
}

/* ❌ 低效选择器 */
* {
  /* ... */
}
div > div > div > p {
  /* ... */
}
```

## 属性规范

### 属性书写顺序

建议按照以下顺序书写 CSS 属性：

```css
.element {
  /* 1. 定位 */
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;

  /* 2. 盒模型 */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 16px;
  border: 1px solid #ddd;

  /* 3. 背景 */
  background-color: #fff;
  background-image: url('bg.png');

  /* 4. 文字 */
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* 5. 其他 */
  opacity: 1;
  transition: all 0.3s ease;
  overflow: hidden;
}
```

### 简写属性

```css
/* ✅ 推荐：使用简写 */
margin: 10px 20px;
padding: 10px 20px;
background: #fff url('bg.png') no-repeat center;
border: 1px solid #ddd;

/* ✅ 需要单独设置时 */
margin-top: 10px;
margin-right: 20px;

/* ❌ 不必要的展开 */
margin-top: 10px;
margin-bottom: 10px;
margin-left: 20px;
margin-right: 20px;
```

### 数值单位

```css
/* ✅ 推荐单位使用 */
font-size: 14px;        /* 字体大小用 px */
line-height: 1.5;       /* 行高用无单位 */
width: 100%;            /* 百分比 */
height: 100vh;          /* 视口单位 */
padding: 1rem;          /* 相对单位 */

/* ❌ 不推荐 */
font-size: 1em;         /* 字体不建议用 em */
line-height: 21px;      /* 行高不建议用 px */
```

## 布局规范

### Flexbox 布局

```css
/* 水平垂直居中 */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 等分布局 */
.row {
  display: flex;
  gap: 16px;
}

.col {
  flex: 1;
}

/* 换行布局 */
.wrap-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
```

### Grid 布局

```css
/* 网格布局 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}

/* 响应式网格 */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* 网格区域 */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

### 定位

```css
/* 相对定位 */
.relative {
  position: relative;
  top: 10px;
  left: 20px;
}

/* 绝对定位 */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

/* 固定定位 */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* 粘性定位 */
.sticky {
  position: sticky;
  top: 0;
}
```

## 响应式设计

### 媒体查询

```css
/* 移动优先 */
.container {
  width: 100%;
  padding: 16px;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* 大屏 */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

### 断点设置

```css
/* 常用断点 */
:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
}
```

### 响应式工具类

```css
/* 显示/隐藏 */
.hidden-xs {
  display: none;
}

@media (min-width: 768px) {
  .hidden-xs {
    display: block;
  }
  
  .hidden-md {
    display: none;
  }
}
```

## 动画与过渡

### 过渡效果

```css
/* ✅ 推荐 */
.element {
  transition: all 0.3s ease;
}

/* ✅ 指定属性 */
.button {
  transition: background-color 0.2s ease, transform 0.2s ease;
}

/* ❌ 避免 */
.element {
  transition: all 0.3s ease;
  /* 不要对所有属性使用过渡 */
}
```

### 动画

```css
/* 定义动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 使用动画 */
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* 性能优化 */
.animated-element {
  will-change: transform, opacity;
}
```

### 性能优化

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

/* ❌ 避免触发重排 */
.element {
  left: 100px;  /* 触发重排 */
  top: 100px;   /* 触发重排 */
}
```

## 颜色规范

### 颜色定义

```css
/* CSS 变量 */
:root {
  /* 主色调 */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;
  
  /* 中性色 */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-100: #f8f9fa;
  --color-gray-200: #e9ecef;
  --color-gray-300: #dee2e6;
  --color-gray-400: #ced4da;
  --color-gray-500: #adb5bd;
  --color-gray-600: #6c757d;
  --color-gray-700: #495057;
  --color-gray-800: #343a40;
  --color-gray-900: #212529;
  
  /* 文字颜色 */
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
}

/* 使用 */
.text-primary {
  color: var(--color-primary);
}

.bg-gray {
  background-color: var(--color-gray-100);
}
```

### 颜色格式

```css
/* ✅ 推荐：使用 CSS 变量 */
color: var(--color-primary);

/* ✅ 使用简写十六进制 */
color: #fff;
color: #333;

/* ✅ 需要透明度时使用 rgba */
color: rgba(0, 0, 0, 0.5);

/* ❌ 不推荐 */
color: rgb(0, 123, 255);
color: hsl(211, 100%, 50%);
```

## 字体规范

### 字体栈

```css
:root {
  /* 系统字体栈 */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  
  /* 等宽字体 */
  --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
  
  /* 中文字体 */
  --font-chinese: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}
```

### 字体大小

```css
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
}
```

### 行高

```css
:root {
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
}
```

## 间距规范

### 间距系统

```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
}
```

## 代码格式

### 缩进与换行

```css
/* ✅ 推荐：2个空格缩进 */
.element {
  color: #333;
  font-size: 14px;
}

/* ✅ 长属性值换行 */
.element {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 100%
  );
}
```

### 注释

```css
/* 组件名称 */
.component {
  /* 基础样式 */
  display: flex;
  padding: 16px;
}

/* 
 * 复杂组件说明：
 * 这是一个卡片组件
 * 支持多种变体
 */
.card {
  /* ... */
}

/* TODO: 需要优化 */
.element {
  /* 临时样式 */
}
```

## 常见问题

### 避免的做法

```css
/* ❌ 过度使用 !important */
.element {
  color: red !important;
}

/* ❌ 使用 ID 选择器 */
#header {
  background: #fff;
}

/* ❌ 过深的嵌套 */
.parent .child .grandchild .great-grandchild {
  /* ... */
}

/* ❌ 使用通配符选择器 */
* {
  margin: 0;
  padding: 0;
}
```

### 最佳实践

```css
/* ✅ 使用 CSS 变量 */
.element {
  color: var(--color-primary);
  padding: var(--spacing-4);
}

/* ✅ 使用类选择器 */
.header {
  background: #fff;
}

/* ✅ 扁平化选择器 */
.header-nav {
  /* ... */
}

/* ✅ 避免魔法数字 */
.element {
  margin-bottom: var(--spacing-4);  /* 16px */
  padding: var(--spacing-6);        /* 24px */
}
```

## 工具推荐

- **Stylelint** - CSS 代码检查
- **PostCSS** - CSS 处理器
- **Autoprefixer** - 自动添加浏览器前缀
- **PurgeCSS** - 移除未使用的 CSS
- **CSSnano** - CSS 压缩