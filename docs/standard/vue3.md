# Vue3 开发规范

## 1. 项目结构规范

### 1.1 目录结构
```
src/
├── api/                # API 接口
├── assets/            # 静态资源
├── components/        # 公共组件
├── composables/       # 组合式函数
├── directives/        # 自定义指令
├── layouts/           # 布局组件
├── router/            # 路由配置
├── stores/            # Pinia 状态管理
├── styles/            # 样式文件
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
├── views/             # 页面组件
├── App.vue            # 根组件
└── main.ts            # 入口文件
```

### 1.2 命名规范
- **组件文件**: PascalCase，如 `UserProfile.vue`
- **目录名**: kebab-case，如 `user-profile/`
- **Composables**: use 前缀，如 `useUser.ts`
- **TS 文件**: camelCase，如 `utils.ts`

## 2. 组合式 API 规范

### 2.1 setup 语法糖
```vue
<script setup lang="ts">
// ✅ 推荐：使用 <script setup> 语法糖
import { ref, computed, onMounted } from 'vue'
import type { User } from '@/types/user'

// Props
const props = defineProps<{
  title: string
  count?: number
}>()

// Emits
const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'submit', data: FormData): void
}>()

// 响应式数据
const count = ref(0)
const user = ref<User | null>(null)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
  emit('update', String(count.value))
}

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

### 2.2 组合式函数
```typescript
// composables/useUser.ts
import { ref, computed } from 'vue'
import type { User } from '@/types/user'

export function useUser() {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)
  
  async function fetchUser(userId: string) {
    try {
      const res = await api.getUser(userId)
      user.value = res.data
    } catch (error) {
      console.error('获取用户失败:', error)
      throw error
    }
  }
  
  function logout() {
    user.value = null
  }
  
  return {
    user,
    isLoggedIn,
    fetchUser,
    logout
  }
}
```

### 2.3 组合式函数使用
```vue
<script setup lang="ts">
import { useUser } from '@/composables/useUser'

const { user, isLoggedIn, fetchUser, logout } = useUser()

// 可以与其他组合式函数组合使用
const { theme, toggleTheme } = useTheme()
</script>
```

## 3. 状态管理 (Pinia)

### 3.1 Store 定义
```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string>('')
  
  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => user.value?.name || '')
  
  // Actions
  async function login(credentials: LoginCredentials) {
    try {
      const res = await api.login(credentials)
      token.value = res.token
      user.value = res.user
      return true
    } catch (error) {
      console.error('登录失败:', error)
      return false
    }
  }
  
  function logout() {
    user.value = null
    token.value = ''
  }
  
  return {
    user,
    token,
    isLoggedIn,
    userName,
    login,
    logout
  }
})
```

### 3.2 Store 使用
```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 直接访问状态
console.log(userStore.userName)

// 调用 action
async function handleLogin() {
  await userStore.login({ username, password })
}

// 使用 storeToRefs 保持响应性
import { storeToRefs } from 'pinia'
const { user, isLoggedIn } = storeToRefs(userStore)
</script>
```

## 4. TypeScript 规范

### 4.1 类型定义
```typescript
// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface ApiResponse<T> {
  code: number
  data: T
  message: string
}
```

### 4.2 Props 类型定义
```vue
<script setup lang="ts">
// ✅ 推荐：使用类型声明
const props = defineProps<{
  title: string
  items: string[]
  callback: (id: number) => void
}>()

// ✅ 带默认值
const props = withDefaults(defineProps<{
  title?: string
  count?: number
}>(), {
  title: '默认标题',
  count: 0
})

// ✅ 带验证器
const props = defineProps({
  type: {
    type: String as () => 'primary' | 'secondary' | 'danger',
    default: 'primary'
  }
})
</script>
```

### 4.3 Emits 类型定义
```vue
<script setup lang="ts">
// ✅ 推荐：使用类型声明
const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'submit', data: FormData): void
  (e: 'close'): void
}>()

// 使用
function handleSubmit(data: FormData) {
  emit('submit', data)
}
</script>
```

## 5. 组件开发规范

### 5.1 组件结构
```vue
<template>
  <div class="user-profile">
    <slot name="header" />
    <div class="profile-content">
      {{ user?.name }}
    </div>
    <slot :user="user" />
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

// Props
const props = defineProps<{
  user: User
}>()

// Emits
const emit = defineEmits<{
  (e: 'edit', user: User): void
}>()

// Refs
const containerRef = ref<HTMLElement | null>(null)

// 方法
function handleEdit() {
  emit('edit', props.user)
}

// 暴露方法给父组件
defineExpose({
  handleEdit
})
</script>

<style scoped>
.user-profile {
  padding: 20px;
}
</style>
```

### 5.2 组件命名
```vue
<script setup lang="ts">
// ✅ 在 <script setup> 中不需要手动定义 name
// 文件名即组件名：UserProfile.vue -> UserProfile

// ✅ 如需定义，使用 defineOptions
defineOptions({
  name: 'UserProfile'
})
</script>
```

## 6. 路由规范

### 6.1 路由配置
```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/User/index.vue'),
    meta: {
      title: '用户中心',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 6.2 路由守卫
```typescript
// router/guard.ts
import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'

export function setupRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 设置标题
    document.title = to.meta.title as string
    
    // 权限验证
    const userStore = useUserStore()
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  })
}
```

## 7. 样式规范

### 7.1 Scoped 样式
```vue
<style scoped>
/* ✅ 推荐：使用 scoped */
.container {
  padding: 20px;
}
</style>
```

### 7.2 CSS Modules
```vue
<template>
  <div :class="$style.container">
    <div :class="[$style.item, $style.active]">
      内容
    </div>
  </div>
</template>

<style module>
.container {
  padding: 20px;
}

.item {
  color: #333;
}

.active {
  color: #409eff;
}
</style>
```

### 7.3 深度选择器
```vue
<style scoped>
/* 修改子组件样式 */
:deep(.child-class) {
  color: red;
}

/* 全局样式 */
:global(.global-class) {
  margin: 0;
}
</style>
```

## 8. 性能优化

### 8.1 异步组件
```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// ✅ 懒加载组件
const HeavyComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)

// ✅ 带加载状态
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./AsyncComponent.vue'),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 200,
  timeout: 3000
})
</script>
```

### 8.2 计算属性缓存
```typescript
// ✅ 推荐：使用 computed 自动缓存
const filteredList = computed(() => {
  return list.value.filter(item => item.active)
})

// ❌ 不推荐：每次调用都重新计算
function getFilteredList() {
  return list.value.filter(item => item.active)
}
```

### 8.3 侦听器优化
```typescript
import { watch, watchEffect } from 'vue'

// ✅ 指定依赖
watch(
  () => props.id,
  (newId) => {
    fetchData(newId)
  }
)

// ✅ 深度监听
watch(
  data,
  (newVal) => {
    console.log('数据变化:', newVal)
  },
  { deep: true }
)

// ✅ 立即执行
watchEffect(() => {
  console.log('count:', count.value)
})
```

## 9. 错误处理

### 9.1 全局错误处理
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue Error:', err)
  console.error('组件实例:', instance)
  console.error('错误信息:', info)
  // 上报错误
  reportError(err, info)
}

app.mount('#app')
```

### 9.2 异步错误处理
```typescript
// composables/useApi.ts
export function useApi<T>(apiCall: () => Promise<T>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  
  async function execute() {
    loading.value = true
    error.value = null
    
    try {
      data.value = await apiCall()
    } catch (e) {
      error.value = e as Error
      console.error('API调用失败:', e)
    } finally {
      loading.value = false
    }
  }
  
  return { data, error, loading, execute }
}
```

## 10. 代码质量

### 10.1 ESLint 配置
```javascript
// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
```

### 10.2 注释规范
```typescript
/**
 * 获取用户信息
 * @param userId - 用户ID
 * @returns 用户信息对象
 * @example
 * ```ts
 * const user = await getUserInfo('123')
 * ```
 */
async function getUserInfo(userId: string): Promise<User> {
  const res = await api.get<User>(`/users/${userId}`)
  return res.data
}
```

## 11. 最佳实践

### 11.1 保持响应性
```typescript
// ✅ 使用 ref/reactive
const count = ref(0)
const state = reactive({ name: 'Vue' })

// ✅ 解构时使用 toRefs
const { name } = toRefs(state)

// ❌ 解构会丢失响应性
const { name } = state
```

### 11.2 避免不必要的响应性
```typescript
// ✅ 使用 shallowRef/shallowReactive
const list = shallowRef(largeList)
const state = shallowReactive({ ... })

// ✅ 使用 markRaw
const nonReactiveObj = markRaw({ ... })
```

### 11.3 性能优化技巧
```vue
<script setup lang="ts">
// ✅ 使用 v-memo (Vue 3.2+)
// 只有当 item.id 变化时才重新渲染
</script>

<template>
  <div v-for="item in list" :key="item.id" v-memo="[item.id]">
    {{ item.name }}
  </div>
</template>