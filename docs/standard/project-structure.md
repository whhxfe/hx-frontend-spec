# 项目结构规范

本文档提供前端项目的目录结构和文件组织规范。

## 目录结构

### 标准项目结构

```
project/
├── public/                    # 静态资源目录（不经过构建工具处理）
│   ├── favicon.ico
│   ├── robots.txt
│   └── static/
│       └── images/
├── src/                       # 源代码目录
│   ├── api/                   # API 接口
│   │   ├── modules/           # 按模块划分
│   │   │   ├── user.js
│   │   │   └── order.js
│   │   ├── index.js           # API 入口
│   │   └── http.js            # HTTP 封装
│   ├── assets/                # 静态资源（经过构建工具处理）
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── styles/
│   ├── components/            # 公共组件
│   │   ├── base/              # 基础组件
│   │   │   ├── Button/
│   │   │   │   ├── index.vue
│   │   │   │   └── README.md
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   ├── business/          # 业务组件
│   │   │   ├── UserCard/
│   │   │   └── OrderList/
│   │   └── layout/            # 布局组件
│   │       ├── Header/
│   │       ├── Sidebar/
│   │       └── Footer/
│   ├── composables/           # 组合式函数（Vue3）
│   │   ├── useUser.js
│   │   ├── useAuth.js
│   │   └── index.js
│   ├── directives/            # 自定义指令
│   │   ├── permission.js
│   │   └── index.js
│   ├── filters/               # 过滤器（Vue2）
│   │   ├── date.js
│   │   └── index.js
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useAuth.js
│   │   └── useRequest.js
│   ├── layouts/               # 页面布局
│   │   ├── DefaultLayout.vue
│   │   ├── BlankLayout.vue
│   │   └── index.vue
│   ├── mixins/                # 混入（Vue2）
│   │   ├── pagination.js
│   │   └── index.js
│   ├── mock/                  # Mock 数据
│   │   ├── modules/
│   │   └── index.js
│   ├── plugins/               # 插件
│   │   ├── axios.js
│   │   └── index.js
│   ├── router/                # 路由配置
│   │   ├── modules/           # 路由模块
│   │   │   ├── user.js
│   │   │   └── order.js
│   │   ├── guard.js           # 路由守卫
│   │   └── index.js           # 路由入口
│   ├── stores/                # 状态管理（Pinia/Vuex）
│   │   ├── modules/
│   │   │   ├── user.js
│   │   │   └── app.js
│   │   └── index.js
│   ├── styles/                # 全局样式
│   │   ├── variables.scss     # 变量
│   │   ├── mixins.scss        # 混合
│   │   ├── global.scss        # 全局样式
│   │   └── reset.scss         # 重置样式
│   ├── types/                 # TypeScript 类型定义
│   │   ├── api.d.ts
│   │   ├── components.d.ts
│   │   └── index.d.ts
│   ├── utils/                 # 工具函数
│   │   ├── auth.js
│   │   ├── storage.js
│   │   ├── validate.js
│   │   └── index.js
│   ├── views/                 # 页面组件
│   │   ├── Home/
│   │   │   ├── index.vue
│   │   │   └── components/
│   │   ├── User/
│   │   │   ├── Profile.vue
│   │   │   ├── Settings.vue
│   │   │   └── components/
│   │   └── Error/
│   │       ├── 404.vue
│   │       └── 500.vue
│   ├── App.vue                # 根组件
│   └── main.js                # 入口文件
├── tests/                     # 测试文件
│   ├── unit/                  # 单元测试
│   ├── integration/           # 集成测试
│   └── e2e/                   # 端到端测试
├── .env                       # 环境变量
├── .env.development           # 开发环境变量
├── .env.production            # 生产环境变量
├── .eslintrc.js               # ESLint 配置
├── .prettierrc                # Prettier 配置
├── .gitignore                 # Git 忽略文件
├── index.html                 # HTML 入口
├── package.json               # 项目配置
├── README.md                  # 项目说明
├── tsconfig.json              # TypeScript 配置
├── vite.config.js             # Vite 配置
└── webpack.config.js          # Webpack 配置（如果使用）
```

## 命名规范

### 文件命名

```bash
# ✅ 组件文件：PascalCase
UserProfile.vue
UserCard.vue
OrderList.vue

# ✅ 工具文件：camelCase
auth.js
storage.js
validate.js

# ✅ 样式文件：kebab-case 或 camelCase
global-styles.scss
userStyles.scss

# ✅ 测试文件：与源文件同名 + .test/.spec
UserCard.test.js
UserCard.spec.js

# ❌ 避免使用
user-card.vue        # 不推荐使用 kebab-case
user_card.vue        # 不推荐使用下划线
USER.js              # 不推荐全大写（常量文件除外）
```

### 目录命名

```bash
# ✅ 目录：kebab-case
user-profile/
order-list/
shared-components/

# ✅ 特殊目录
api/
assets/
components/
utils/

# ❌ 避免使用
UserProfile/         # 目录不推荐 PascalCase
user_profile/        # 不推荐下划线
```

### 变量命名

```javascript
// ✅ 组件：PascalCase
const UserProfile = defineComponent({...})
const Button = defineComponent({...})

// ✅ 变量和函数：camelCase
const userName = 'John'
const getUserInfo = () => {}

// ✅ 常量：UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3

// ✅ 布尔变量：使用 is/has/can 前缀
const isActive = true
const hasPermission = false
const canEdit = true
```

## 组件组织

### 组件目录结构

```
components/
├── Button/
│   ├── index.vue           # 主组件
│   ├── ButtonGroup.vue     # 子组件
│   ├── props.js            # Props 定义
│   ├── constants.js        # 常量
│   └── README.md           # 组件文档
├── Table/
│   ├── index.vue
│   ├── TableColumn.vue
│   ├── TableHeader.vue
│   ├── props.js
│   └── README.md
└── Form/
    ├── index.vue
    ├── FormItem.vue
    ├── FormInput.vue
    └── README.md
```

### 组件文件结构

```vue
<!-- ✅ 推荐的组件结构 -->
<template>
  <!-- 模板 -->
</template>

<script>
// 1. 导入依赖
import { ref, computed } from 'vue'
import { useUser } from '@/composables/useUser'

// 2. 定义 Props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

// 3. 定义 Emits
const emit = defineEmits(['update', 'close'])

// 4. 响应式数据
const count = ref(0)

// 5. 计算属性
const doubleCount = computed(() => count.value * 2)

// 6. 方法
const increment = () => {
  count.value++
  emit('update', count.value)
}

// 7. 生命周期
onMounted(() => {
  // 初始化
})
</script>

<style scoped>
/* 样式 */
</style>
```

## API 组织

### API 目录结构

```
api/
├── modules/
│   ├── user.js             # 用户相关 API
│   ├── order.js            # 订单相关 API
│   ├── product.js          # 产品相关 API
│   └── auth.js             # 认证相关 API
├── http.js                 # HTTP 封装
├── interceptors.js         # 拦截器
└── index.js                # API 入口
```

### API 文件示例

```javascript
// api/modules/user.js
import http from '../http'

// 用户 API
export const userApi = {
  // 获取用户信息
  getUserInfo(id) {
    return http.get(`/users/${id}`)
  },
  
  // 更新用户信息
  updateUserInfo(id, data) {
    return http.put(`/users/${id}`, data)
  },
  
  // 获取用户列表
  getUserList(params) {
    return http.get('/users', { params })
  },
  
  // 删除用户
  deleteUser(id) {
    return http.delete(`/users/${id}`)
  }
}

export default userApi
```

### HTTP 封装示例

```javascript
// api/http.js
import axios from 'axios'
import { useAuth } from '@/composables/useAuth'
import { showMessage } from '@/utils/message'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const { token } = useAuth()
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          showMessage('未授权，请重新登录', 'error')
          break
        case 403:
          showMessage('拒绝访问', 'error')
          break
        case 404:
          showMessage('请求地址不存在', 'error')
          break
        case 500:
          showMessage('服务器内部错误', 'error')
          break
        default:
          showMessage(data.message || '请求失败', 'error')
      }
    }
    return Promise.reject(error)
  }
)

export default http
```

## 路由组织

### 路由目录结构

```
router/
├── modules/
│   ├── user.js             # 用户路由
│   ├── order.js            # 订单路由
│   └── product.js          # 产品路由
├── guard.js                # 路由守卫
├── constants.js            # 路由常量
└── index.js                # 路由入口
```

### 路由配置示例

```javascript
// router/modules/user.js
export default [
  {
    path: '/user',
    name: 'User',
    component: () => import('@/layouts/UserLayout.vue'),
    meta: {
      title: '用户中心',
      requiresAuth: true
    },
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/User/Profile.vue'),
        meta: {
          title: '个人资料'
        }
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: () => import('@/views/User/Settings.vue'),
        meta: {
          title: '账号设置'
        }
      }
    ]
  }
]

// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { setupRouterGuard } from './guard'
import userRoutes from './modules/user'
import orderRoutes from './modules/order'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
  },
  ...userRoutes,
  ...orderRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

setupRouterGuard(router)

export default router
```

## 状态管理

### Store 目录结构

```
stores/
├── modules/
│   ├── user.js             # 用户状态
│   ├── app.js              # 应用状态
│   └── permission.js       # 权限状态
├── plugins/                # Store 插件
│   └── persist.js          # 持久化插件
└── index.js                # Store 入口
```

### Store 示例（Pinia）

```javascript
// stores/modules/user.js
import { defineStore } from 'pinia'
import { userApi } from '@/api/modules/user'

export const useUserStore = defineStore('user', () => {
  // State
  const userInfo = ref(null)
  const token = ref('')
  
  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.name || '')
  
  // Actions
  async function login(credentials) {
    const res = await userApi.login(credentials)
    token.value = res.token
    userInfo.value = res.user
    return res
  }
  
  async function getUserInfo() {
    const res = await userApi.getUserInfo()
    userInfo.value = res
    return res
  }
  
  function logout() {
    userInfo.value = null
    token.value = ''
  }
  
  return {
    userInfo,
    token,
    isLoggedIn,
    userName,
    login,
    getUserInfo,
    logout
  }
})
```

## 工具函数

### 工具目录结构

```
utils/
├── auth.js                 # 认证相关
├── storage.js              # 存储相关
├── validate.js             # 验证相关
├── format.js               # 格式化相关
├── date.js                 # 日期相关
├── url.js                  # URL 相关
├── device.js               # 设备检测
└── index.js                # 工具入口
```

### 工具函数示例

```javascript
// utils/storage.js
export const storage = {
  // localStorage
  local: {
    get(key) {
      const value = localStorage.getItem(key)
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    },
    
    set(key, value) {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      localStorage.setItem(key, value)
    },
    
    remove(key) {
      localStorage.removeItem(key)
    },
    
    clear() {
      localStorage.clear()
    }
  },
  
  // sessionStorage
  session: {
    get(key) {
      const value = sessionStorage.getItem(key)
      try {
        return JSON.parse(value)
      } catch {
        return value
      }
    },
    
    set(key, value) {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      sessionStorage.setItem(key, value)
    },
    
    remove(key) {
      sessionStorage.removeItem(key)
    },
    
    clear() {
      sessionStorage.clear()
    }
  }
}

export default storage
```

```javascript
// utils/validate.js
export const validate = {
  // 邮箱验证
  isEmail(value) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  },
  
  // 手机号验证（中国大陆）
  isPhone(value) {
    return /^1[3-9]\d{9}$/.test(value)
  },
  
  // URL 验证
  isUrl(value) {
    return /^https?:\/\/.+/.test(value)
  },
  
  // 身份证验证（中国大陆）
  isIdCard(value) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  },
  
  // 数字验证
  isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  },
  
  // 整数验证
  isInteger(value) {
    return Number.isInteger(Number(value))
  },
  
  // 空值验证
  isEmpty(value) {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim() === ''
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
  }
}

export default validate
```

## 样式组织

### 样式目录结构

```
styles/
├── variables.scss          # SCSS 变量
├── mixins.scss             # SCSS 混合
├── functions.scss          # SCSS 函数
├── reset.scss              # CSS 重置
├── global.scss             # 全局样式
├── typography.scss         # 排版样式
├── animations.scss         # 动画
└── themes/                 # 主题
    ├── light.scss
    └── dark.scss
```

### 样式变量示例

```scss
// styles/variables.scss
// 颜色
$color-primary: #007bff;
$color-secondary: #6c757d;
$color-success: #28a745;
$color-danger: #dc3545;
$color-warning: #ffc107;
$color-info: #17a2b8;

// 字体
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-size-base: 16px;
$font-size-sm: 14px;
$font-size-lg: 18px;

// 间距
$spacing-unit: 8px;
$spacing-xs: $spacing-unit * 0.5;  // 4px
$spacing-sm: $spacing-unit;         // 8px
$spacing-md: $spacing-unit * 2;     // 16px
$spacing-lg: $spacing-unit * 3;     // 24px
$spacing-xl: $spacing-unit * 4;     // 32px

// 断点
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1200px;

// 圆角
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 16px;
$border-radius-full: 9999px;

// 阴影
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

// 动画
$transition-fast: 150ms ease;
$transition-base: 300ms ease;
$transition-slow: 500ms ease;
```

## 最佳实践

### 文件组织原则

1. **按功能组织**：将相关文件放在一起
2. **层级清晰**：保持目录结构扁平，避免过深嵌套
3. **职责单一**：每个文件只负责一个功能
4. **易于查找**：使用清晰的命名，方便快速定位

### 代码分离原则

```javascript
// ❌ 不推荐：所有代码在一个文件
// components/UserCard.vue
<template>
  <div>
    <!-- 1000行模板 -->
  </div>
</template>

<script>
// 500行逻辑
</script>

<style>
// 300行样式
</style>

// ✅ 推荐：分离关注点
// components/UserCard/
//   ├── index.vue           # 主组件
//   ├── UserInfo.vue        # 用户信息子组件
//   ├── UserActions.vue     # 用户操作子组件
//   ├── useUserCard.js      # 业务逻辑
//   └── UserCard.module.scss # 样式
```

### 导入顺序

```javascript
// 1. 第三方库
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// 2. 项目内的公共模块
import { formatDate } from '@/utils/date'
import { userApi } from '@/api/modules/user'

// 3. 当前模块的组件
import UserAvatar from './UserAvatar.vue'
import UserStatus from './UserStatus.vue'

// 4. 当前模块的工具函数
import { getInitials } from './utils'
```

## 工具推荐

- **path** - Node.js 路径处理
- **glob** - 文件匹配
- **fs-extra** - 文件系统增强
- **chalk** - 终端颜色