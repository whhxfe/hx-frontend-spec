# 安全规范

本文档提供前端开发的安全规范和最佳实践。

## 基本原则

1. **防御性编程**：假设所有输入都是不可信的
2. **最小权限**：只请求必要的权限
3. **纵深防御**：多层安全防护
4. **安全默认**：默认配置应该是安全的

## XSS 防护

### 输入验证

```javascript
// ✅ 对用户输入进行验证
function validateInput(input) {
  // 1. 类型检查
  if (typeof input !== 'string') {
    throw new Error('输入必须是字符串')
  }
  
  // 2. 长度限制
  if (input.length > 1000) {
    throw new Error('输入过长')
  }
  
  // 3. 移除危险字符
  const dangerous = /<script|javascript:|on\w+=/i
  if (dangerous.test(input)) {
    throw new Error('输入包含危险内容')
  }
  
  return input
}
```

### 输出编码

```javascript
// ✅ HTML 编码
function escapeHtml(str) {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

// ✅ 使用 DOMPurify 库
import DOMPurify from 'dompurify'

const clean = DOMPurify.sanitize(userInput)

// ✅ URL 编码
const encoded = encodeURIComponent(userInput)

// ✅ JavaScript 编码
function escapeJs(str) {
  return str.replace(/[\\'"\n\r\t]/g, (char) => {
    return '\\' + char
  })
}
```

### Vue 中的防护

```vue
<!-- ✅ Vue 自动转义 -->
<template>
  <div>{{ userInput }}</div>  <!-- 自动转义 -->
</template>

<!-- ✅ 使用 v-text 代替 v-html -->
<template>
  <div v-text="userInput"></div>  <!-- 安全 -->
  <div v-html="userInput"></div>  <!-- ⚠️ 危险 -->
</template>

<!-- ✅ 危险内容需要清洗 -->
<template>
  <div v-html="sanitizedContent"></div>
</template>

<script setup>
import DOMPurify from 'dompurify'

const sanitizedContent = computed(() => {
  return DOMPurify.sanitize(rawContent.value)
})
</script>
```

### CSP 策略

```html
<!-- ✅ 设置 Content-Security-Policy -->
<meta 
  http-equiv="Content-Security-Policy" 
  content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self';
    connect-src 'self' https://api.example.com;
  "
>
```

```nginx
# Nginx 配置
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
" always;
```

## CSRF 防护

### Token 验证

```javascript
// ✅ 在请求中添加 CSRF Token
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content

fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
```

```javascript
// ✅ Axios 拦截器添加 Token
axios.interceptors.request.use((config) => {
  const token = getCsrfToken()
  if (token) {
    config.headers['X-CSRF-Token'] = token
  }
  return config
})
```

### SameSite Cookie

```javascript
// ✅ 设置 SameSite 属性
document.cookie = 'session=abc123; SameSite=Strict; Secure; HttpOnly'

// ✅ 服务端设置（Express）
app.use(session({
  cookie: {
    sameSite: 'strict',
    secure: true,
    httpOnly: true
  }
}))
```

### Origin 验证

```javascript
// ✅ 验证请求来源
function validateOrigin(request) {
  const allowedOrigins = [
    'https://example.com',
    'https://www.example.com'
  ]
  
  const origin = request.headers.origin || request.headers.referer
  
  if (!origin) {
    return false
  }
  
  return allowedOrigins.some(allowed => 
    origin.startsWith(allowed)
  )
}
```

## 敏感信息保护

### 密码处理

```javascript
// ✅ 密码强度验证
function validatePassword(password) {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*]/.test(password)
  
  const errors = []
  
  if (password.length < minLength) {
    errors.push(`密码至少需要 ${minLength} 个字符`)
  }
  if (!hasUpperCase) {
    errors.push('需要包含大写字母')
  }
  if (!hasLowerCase) {
    errors.push('需要包含小写字母')
  }
  if (!hasNumbers) {
    errors.push('需要包含数字')
  }
  if (!hasSpecialChar) {
    errors.push('需要包含特殊字符')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// ✅ 密码不应在前端存储
// ❌ 不要这样做
localStorage.setItem('password', password)

// ✅ 使用 HTTPS 传输，服务端哈希存储
```

### Token 管理

```javascript
// ✅ Token 存储在 HttpOnly Cookie 中（服务端设置）
// ✅ 或存储在 sessionStorage（关闭浏览器后清除）
sessionStorage.setItem('token', token)

// ❌ 不要存储在 localStorage（持久化）
localStorage.setItem('token', token)

// ✅ Token 自动过期
const tokenExpiresAt = Date.now() + (24 * 60 * 60 * 1000) // 24小时

function isTokenExpired() {
  return Date.now() > tokenExpiresAt
}

// ✅ Token 刷新
async function refreshToken() {
  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      credentials: 'include'  // 发送 cookie
    })
    
    if (response.ok) {
      const { token } = await response.json()
      sessionStorage.setItem('token', token)
      return true
    }
    
    return false
  } catch (error) {
    console.error('Token 刷新失败:', error)
    return false
  }
}
```

### 敏感数据处理

```javascript
// ✅ 敏感数据脱敏
function maskPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

function maskEmail(email) {
  const [name, domain] = email.split('@')
  const maskedName = name.charAt(0) + '***' + name.charAt(name.length - 1)
  return `${maskedName}@${domain}`
}

function maskIdCard(idCard) {
  return idCard.replace(/(\d{4})\d{10}(\d{4})/, '$1**********$2')
}

// ✅ 日志中不记录敏感信息
function log(message, data) {
  const sanitized = { ...data }
  delete sanitized.password
  delete sanitized.token
  delete sanitized.creditCard
  console.log(message, sanitized)
}
```

## 通信安全

### HTTPS

```javascript
// ✅ 强制使用 HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`)
}

// ✅ API 请求使用 HTTPS
const API_BASE = 'https://api.example.com'

// ✅ 检查混合内容
// Chrome DevTools -> Console -> 查看 Mixed Content 警告
```

### 请求安全

```javascript
// ✅ 设置请求超时
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 10000)

fetch(url, {
  signal: controller.signal
}).finally(() => {
  clearTimeout(timeoutId)
})

// ✅ 防止重放攻击 - 使用 nonce
function generateNonce() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const nonce = generateNonce()
fetch('/api/data', {
  headers: {
    'X-Nonce': nonce
  }
})

// ✅ 请求签名
async function signRequest(data, secret) {
  const message = JSON.stringify(data) + Date.now()
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  )
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}
```

## 第三方库安全

### 依赖管理

```bash
# ✅ 定期检查依赖漏洞
npm audit

# ✅ 自动修复
npm audit fix

# ✅ 强制检查
npm audit --audit-level=high

# ✅ 使用 Snyk
npx snyk test
```

```json
// package.json - 锁定版本
{
  "dependencies": {
    "vue": "3.4.0",
    "axios": "1.6.0"
  }
}
```

### CDN 安全

```html
<!-- ✅ 使用 SRI (Subresource Integrity) -->
<script 
  src="https://cdn.jsdelivr.net/npm/vue@3.4.0/dist/vue.global.min.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>

<!-- ✅ 生成 SRI 哈希 -->
<!-- npx sri-toolbox --save generate script.js -->
```

### 沙箱执行

```javascript
// ✅ 使用 iframe 沙箱
const iframe = document.createElement('iframe')
iframe.sandbox = 'allow-scripts allow-same-origin'
iframe.src = 'https://third-party.com/widget'
document.body.appendChild(iframe)

// ✅ 使用 Web Worker 沙箱
const worker = new Worker('sandboxed-worker.js')
worker.postMessage({ code: userCode })
```

## 权限控制

### 认证

```javascript
// ✅ JWT Token 验证
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

// ✅ 检查 Token 有效性
function isTokenValid(token) {
  const payload = parseJwt(token)
  if (!payload) return false
  
  // 检查过期时间
  const now = Math.floor(Date.now() / 1000)
  return payload.exp > now
}
```

### 授权

```javascript
// ✅ 基于角色的权限控制 (RBAC)
const permissions = {
  admin: ['read', 'write', 'delete', 'manage'],
  editor: ['read', 'write'],
  viewer: ['read']
}

function hasPermission(userRole, action) {
  return permissions[userRole]?.includes(action) || false
}

// ✅ 组件级别权限控制
const AuthButton = ({ action, children }) => {
  const { user } = useAuth()
  
  if (!hasPermission(user.role, action)) {
    return null
  }
  
  return <button>{children}</button>
}
```

```vue
<!-- ✅ Vue 权限指令 -->
<template>
  <button v-permission="'write'">编辑</button>
  <button v-permission="'delete'">删除</button>
</template>

<script setup>
// 自定义权限指令
const vPermission = {
  mounted(el, binding) {
    const { user } = useAuth()
    const action = binding.value
    
    if (!hasPermission(user.role, action)) {
      el.parentNode?.removeChild(el)
    }
  }
}
</script>
```

## 文件上传安全

```javascript
// ✅ 文件类型验证
function validateFileType(file, allowedTypes) {
  const fileType = file.type
  const fileName = file.name
  const fileExtension = fileName.split('.').pop().toLowerCase()
  
  // 检查 MIME 类型
  if (!allowedTypes.mime.includes(fileType)) {
    return false
  }
  
  // 检查文件扩展名
  if (!allowedTypes.extensions.includes(fileExtension)) {
    return false
  }
  
  return true
}

// ✅ 文件大小限制
function validateFileSize(file, maxSize) {
  return file.size <= maxSize
}

// ✅ 完整的文件验证
function validateFile(file) {
  const allowedTypes = {
    mime: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'pdf']
  }
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  if (!validateFileType(file, allowedTypes)) {
    throw new Error('不支持的文件类型')
  }
  
  if (!validateFileSize(file, maxSize)) {
    throw new Error('文件大小超过限制')
  }
  
  return true
}

// ✅ 文件名处理
function sanitizeFileName(fileName) {
  // 移除路径遍历字符
  let name = fileName.replace(/\.\./g, '')
  // 移除特殊字符
  name = name.replace(/[^a-zA-Z0-9._-]/g, '_')
  // 限制长度
  if (name.length > 100) {
    const ext = name.split('.').pop()
    name = name.substring(0, 96) + '.' + ext
  }
  return name
}
```

## 日志与监控

### 安全日志

```javascript
// ✅ 记录安全事件
function logSecurityEvent(event, details) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details: sanitizeLogData(details),
    userAgent: navigator.userAgent,
    ip: getClientIp()  // 需要服务端支持
  }
  
  // 发送到服务端
  fetch('/api/security-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logEntry)
  })
}

// ✅ 清理日志数据
function sanitizeLogData(data) {
  const sanitized = { ...data }
  delete sanitized.password
  delete sanitized.token
  delete sanitized.creditCard
  return sanitized
}

// ✅ 监控异常登录
function checkSuspiciousLogin() {
  const attempts = getLoginAttempts()
  const recentAttempts = attempts.filter(
    a => Date.now() - a.timestamp < 15 * 60 * 1000  // 15分钟
  )
  
  if (recentAttempts.length > 5) {
    logSecurityEvent('suspicious_login', {
      attempts: recentAttempts.length
    })
    return true
  }
  
  return false
}
```

### 错误处理

```javascript
// ✅ 全局错误处理
window.addEventListener('error', (event) => {
  logSecurityEvent('client_error', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  })
})

// ✅ Promise 错误处理
window.addEventListener('unhandledrejection', (event) => {
  logSecurityEvent('promise_rejection', {
    reason: event.reason?.message || event.reason
  })
})

// ✅ 不暴露内部错误信息
function handleError(error) {
  // 记录详细错误（服务端）
  logError(error)
  
  // 返回通用错误信息给用户
  return {
    success: false,
    message: '操作失败，请稍后重试'
  }
}
```

## 安全检查清单

### 开发阶段

- [ ] 输入验证和输出编码
- [ ] 使用 HTTPS
- [ ] 设置 CSP 策略
- [ ] CSRF Token 验证
- [ ] 敏感数据脱敏
- [ ] 密码强度验证
- [ ] Token 安全存储
- [ ] 权限检查
- [ ] 文件上传验证
- [ ] 错误信息不暴露内部细节

### 部署阶段

- [ ] HTTPS 强制跳转
- [ ] 安全头部配置
- [ ] 依赖漏洞检查
- [ ] SRI 哈希验证
- [ ] 日志监控
- [ ] 定期安全审计

### 安全头部配置

```nginx
# Nginx 安全头部
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

## 工具推荐

- **DOMPurify** - HTML 清洗库
- **helmet** - Express 安全中间件
- **csurf** - CSRF 防护中间件
- **OWASP ZAP** - 安全测试工具
- **Snyk** - 依赖漏洞扫描
- **npm audit** - npm 安全审计