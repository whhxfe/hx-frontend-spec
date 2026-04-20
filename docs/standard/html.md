# HTML 编写规范

本文档提供 HTML 编写的最佳实践和规范要求。

## 基本原则

1. **语义化**：使用语义化标签，提高代码可读性和 SEO
2. **可访问性**：确保页面对所有用户都可访问
3. **性能优先**：减少不必要的嵌套和冗余代码
4. **一致性**：保持代码风格统一

## 文档结构

### DOCTYPE 声明

```html
<!DOCTYPE html>
```

必须在 HTML 文档的第一行声明 DOCTYPE。

### HTML 属性顺序

建议按照以下顺序排列 HTML 属性：

```html
<!-- ✅ 推荐 -->
<a class="link" id="home" href="/" data-toggle="modal" title="首页">
  首页
</a>

<!-- ❌ 不推荐 -->
<a href="/" title="首页" data-toggle="modal" id="home" class="link">
  首页
</a>
```

属性顺序说明：
1. `class` - 样式类名
2. `id` - 唯一标识
3. `name` - 表单元素名称
4. `data-*` - 数据属性
5. `src`, `for`, `type` - 引用或类型
6. `title`, `alt` - 提示信息
7. `role`, `aria-*` - 无障碍属性

## 标签规范

### 标签闭合

```html
<!-- ✅ 自闭合标签 -->
<img src="image.jpg" alt="图片" />
<input type="text" name="username" />
<br />
<hr />

<!-- ❌ 不规范 -->
<img src="image.jpg" alt="图片">
<input type="text" name="username">
<br>
```

### 标签嵌套规则

```html
<!-- ✅ 正确嵌套 -->
<p><strong>加粗文本</strong></p>

<!-- ❌ 错误嵌套 -->
<strong><p>加粗文本</p></strong>
```

### 列表标签

```html
<!-- ✅ 使用语义化列表 -->
<ul>
  <li>无序列表项</li>
  <li>无序列表项</li>
</ul>

<ol>
  <li>有序列表项</li>
  <li>有序列表项</li>
</ol>

<!-- 导航菜单 -->
<nav>
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>
```

## 图片规范

### img 标签

```html
<!-- ✅ 必须包含 alt 属性 -->
<img src="logo.png" alt="公司Logo" />

<!-- ✅ 装饰性图片使用空 alt -->
<img src="decorative.png" alt="" />

<!-- ❌ 缺少 alt 属性 -->
<img src="logo.png" />
```

### 图片格式选择

| 格式 | 使用场景 |
|------|---------|
| JPG | 照片、复杂图像 |
| PNG | 需要透明背景的图像 |
| GIF | 简单动画 |
| SVG | 图标、Logo、简单图形 |
| WebP | 现代浏览器优先选择 |

### 响应式图片

```html
<!-- 使用 srcset -->
<img 
  srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 900px) 768px, 1200px"
  src="medium.jpg"
  alt="响应式图片"
/>

<!-- 使用 picture -->
<picture>
  <source media="(min-width: 768px)" srcset="large.jpg">
  <source media="(min-width: 480px)" srcset="medium.jpg">
  <img src="small.jpg" alt="响应式图片">
</picture>
```

## 表单规范

### 表单结构

```html
<form action="/submit" method="post">
  <fieldset>
    <legend>用户信息</legend>
    
    <div class="form-group">
      <label for="username">用户名：</label>
      <input 
        type="text" 
        id="username" 
        name="username" 
        required
        autocomplete="username"
      />
    </div>
    
    <div class="form-group">
      <label for="email">邮箱：</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        required
        autocomplete="email"
      />
    </div>
    
    <button type="submit">提交</button>
  </fieldset>
</form>
```

### input 类型

```html
<!-- 使用正确的 input 类型 -->
<input type="text" />     <!-- 文本 -->
<input type="email" />    <!-- 邮箱 -->
<input type="tel" />      <!-- 电话 -->
<input type="number" />   <!-- 数字 -->
<input type="date" />     <!-- 日期 -->
<input type="password" /> <!-- 密码 -->
<input type="search" />   <!-- 搜索 -->
<input type="url" />      <!-- URL -->
```

### label 关联

```html
<!-- ✅ 使用 for 属性关联 -->
<label for="name">姓名：</label>
<input type="text" id="name" />

<!-- ✅ 使用嵌套关联 -->
<label>
  <input type="checkbox" />
  同意协议
</label>

<!-- ❌ 无关联 -->
<label>姓名：</label>
<input type="text" />
```

## 语义化标签

### 结构化标签

```html
<!-- 页面结构 -->
<header>
  <nav>导航</nav>
</header>

<main>
  <article>
    <section>
      <h1>标题</h1>
      <p>内容</p>
    </section>
  </article>
  
  <aside>侧边栏</aside>
</main>

<footer>页脚</footer>
```

### 文本标签

```html
<!-- 标题层级 -->
<h1>主标题（每页只用一个）</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>

<!-- 强调文本 -->
<strong>重要内容（加粗）</strong>
<em>强调内容（斜体）</em>

<!-- 引用 -->
<blockquote cite="来源URL">
  <p>引用内容</p>
</blockquote>

<q>短引用</q>

<!-- 代码 -->
<code>行内代码</code>
<pre><code>代码块</code></pre>

<!-- 删除和插入 -->
<del>删除的内容</del>
<ins>插入的内容</ins>
```

## 可访问性

### ARIA 属性

```html
<!-- 角色定义 -->
<div role="button" tabindex="0">按钮</div>
<div role="alert">警告信息</div>

<!-- 状态属性 -->
<button aria-pressed="true">开关按钮</button>
<div aria-expanded="false">展开状态</div>
<div aria-hidden="true">隐藏内容</div>

<!-- 标签关联 -->
<button aria-label="关闭">X</button>
<input aria-describedby="help-text" />
<span id="help-text">帮助文本</span>
```

### 键盘导航

```html
<!-- Tab 索引 -->
<a href="/" tabindex="0">可聚焦链接</a>
<div tabindex="-1">不可 Tab 聚焦</div>
<button tabindex="1">优先聚焦</button>

<!-- 快捷键 -->
<a href="/" accesskey="h">首页 (Alt+H)</a>
```

## Meta 标签

### 基本 Meta

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  
  <title>页面标题</title>
  <meta name="description" content="页面描述" />
  <meta name="keywords" content="关键词1, 关键词2" />
  <meta name="author" content="作者" />
</head>
```

### SEO 相关

```html
<!-- Open Graph -->
<meta property="og:title" content="标题" />
<meta property="og:description" content="描述" />
<meta property="og:image" content="图片URL" />
<meta property="og:url" content="页面URL" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="标题" />
<meta name="twitter:description" content="描述" />
<meta name="twitter:image" content="图片URL" />
```

### 移动端

```html
<!-- 移动端适配 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
<meta name="format-detection" content="telephone=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

## 代码格式

### 缩进与换行

```html
<!-- ✅ 推荐：2个空格缩进 -->
<div class="container">
  <header>
    <h1>标题</h1>
  </header>
  <main>
    <p>内容</p>
  </main>
</div>

<!-- ✅ 长属性换行 -->
<img 
  src="image.jpg" 
  alt="这是一个很长的图片描述文本"
  class="img-responsive"
/>
```

### 注释

```html
<!-- 页面头部 -->
<header>
  <!-- 导航区域 -->
  <nav>...</nav>
</header>

<!-- 
  复杂组件说明：
  这是一个轮播组件
  包含自动播放功能
-->
<div class="carousel">...</div>
```

## 性能优化

### 资源加载

```html
<!-- CSS 放在 head -->
<head>
  <link rel="stylesheet" href="styles.css" />
</head>

<!-- JS 放在 body 底部 -->
<body>
  <!-- 页面内容 -->
  <script src="script.js"></script>
</body>

<!-- 异步加载 JS -->
<script src="analytics.js" async></script>
<script src="defer.js" defer></script>

<!-- 预加载关键资源 -->
<link rel="preload" href="font.woff2" as="font" crossorigin />
<link rel="preload" href="hero.jpg" as="image" />

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//example.com" />
<link rel="preconnect" href="https://example.com" />
```

### 懒加载

```html
<!-- 图片懒加载 -->
<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" />

<!-- iframe 懒加载 -->
<iframe src="about:blank" data-src="content.html" loading="lazy"></iframe>
```

## 常见错误

### 避免的做法

```html
<!-- ❌ 内联样式 -->
<div style="color: red; font-size: 14px;">文本</div>

<!-- ❌ 内联脚本 -->
<button onclick="alert('点击')">按钮</button>

<!-- ❌ 过度嵌套 -->
<div>
  <div>
    <div>
      <div>内容</div>
    </div>
  </div>
</div>

<!-- ❌ 无语义的 div -->
<div class="header">
  <div class="title">标题</div>
</div>

<!-- ✅ 使用语义标签 -->
<header>
  <h1>标题</h1>
</header>
```

## 工具推荐

- **HTML Validator** - W3C HTML 验证器
- **Lighthouse** - 页面质量检测
- **axe** - 可访问性检测
- **HTMLHint** - HTML 代码检查工具