# Vue2 开发规范

## 1. 项目结构规范

### 1.1 目录结构
```
src/
├── api/                # API 接口
├── assets/            # 静态资源
├── components/        # 公共组件
├── filters/           # 过滤器
├── directives/        # 自定义指令
├── mixins/            # 混入
├── router/            # 路由配置
├── store/             # Vuex 状态管理
├── styles/            # 样式文件
├── utils/             # 工具函数
├── views/             # 页面组件
└── main.js            # 入口文件
```

### 1.2 命名规范
- **组件文件**: PascalCase，如 `UserProfile.vue`
- **目录名**: kebab-case，如 `user-profile/`
- **JS/TS 文件**: camelCase，如 `utils.js`

## 2. 组件开发规范

### 2.1 组件结构
```vue
<template>
  <!-- 模板 -->
</template>

<script>
export default {
  name: 'ComponentName',
  
  props: {
    // props 定义
  },
  
  data() {
    return {
      // 响应式数据
    }
  },
  
  computed: {
    // 计算属性
  },
  
  watch: {
    // 监听器
  },
  
  created() {
    // 生命周期钩子
  },
  
  mounted() {
    // 生命周期钩子
  },
  
  methods: {
    // 方法
  }
}
</script>

<style scoped>
/* 样式 */
</style>
```

### 2.2 Props 规范
```javascript
// ✅ 推荐：使用对象语法，定义类型和默认值
props: {
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  list: {
    type: Array,
    default: () => []
  }
}

// ❌ 不推荐：仅定义类型
props: ['title', 'count', 'list']
```

### 2.3 事件命名
```javascript
// ✅ 推荐：使用 kebab-case
this.$emit('user-login', userData)

// ❌ 不推荐：使用 camelCase
this.$emit('userLogin', userData)
```

## 3. Vuex 规范

### 3.1 Store 结构
```javascript
// store/modules/user.js
export default {
  namespaced: true,
  
  state: () => ({
    userInfo: null,
    token: ''
  }),
  
  getters: {
    isLoggedIn: state => !!state.token
  },
  
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  },
  
  actions: {
    async login({ commit }, credentials) {
      const res = await api.login(credentials)
      commit('SET_TOKEN', res.token)
      commit('SET_USER_INFO', res.user)
    }
  }
}
```

### 3.2 使用规范
```javascript
// ✅ 推荐：使用 map 辅助函数
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', ['userInfo', 'token'])
  },
  methods: {
    ...mapActions('user', ['login'])
  }
}

// ❌ 不推荐：直接访问 $store
this.$store.state.user.userInfo
this.$store.dispatch('user/login')
```

## 4. 路由规范

### 4.1 路由配置
```javascript
// router/index.js
const routes = [
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
    },
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/User/Profile.vue')
      }
    ]
  }
]
```

### 4.2 路由守卫
```javascript
// router/guard.js
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title
  
  // 权限验证
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})
```

## 5. 样式规范

### 5.1 使用 Scoped
```vue
<style scoped>
/* ✅ 推荐：使用 scoped 避免样式污染 */
.container {
  padding: 20px;
}
</style>
```

### 5.2 CSS 命名
```css
/* ✅ 推荐：BEM 命名规范 */
.block {}
.block__element {}
.block--modifier {}

/* 示例 */
.card {}
.card__header {}
.card__body {}
.card--primary {}
```

### 5.3 深度选择器
```vue
<style scoped>
/* 修改子组件样式 */
:deep(.child-component-class) {
  color: red;
}
</style>
```

## 6. 异步处理规范

### 6.1 使用 async/await
```javascript
export default {
  methods: {
    async fetchData() {
      try {
        this.loading = true
        const res = await api.getData()
        this.data = res.data
      } catch (error) {
        console.error('获取数据失败:', error)
        this.$message.error('操作失败')
      } finally {
        this.loading = false
      }
    }
  }
}
```

### 6.2 错误处理
```javascript
// 全局错误处理
Vue.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err)
  // 上报错误
  reportError(err, info)
}
```

## 7. 性能优化

### 7.1 路由懒加载
```javascript
const routes = [
  {
    path: '/user',
    component: () => import('@/views/User.vue') // 懒加载
  }
]
```

### 7.2 组件懒加载
```vue
<script>
export default {
  components: {
    LazyComponent: () => import('./LazyComponent.vue')
  }
}
</script>
```

### 7.3 列表优化
```vue
<template>
  <div>
    <!-- ✅ 使用 key -->
    <div v-for="item in list" :key="item.id">
      {{ item.name }}
    </div>
    
    <!-- ✅ 大列表使用虚拟滚动 -->
    <virtual-list :data="largeList" />
  </div>
</template>
```

## 8. 代码质量

### 8.1 ESLint 配置
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```

### 8.2 注释规范
```javascript
/**
 * 获取用户信息
 * @param {string} userId - 用户ID
 * @returns {Promise<Object>} 用户信息对象
 */
async function getUserInfo(userId) {
  // 实现
}
```

## 9. 常见问题

### 9.1 响应式问题
```javascript
// ❌ 问题：直接添加新属性不是响应式的
this.obj.newProperty = value

// ✅ 解决：使用 Vue.set
this.$set(this.obj, 'newProperty', value)

// ✅ 或使用 Object.assign
this.obj = Object.assign({}, this.obj, { newProperty: value })
```

### 9.2 数组更新问题
```javascript
// ❌ 问题：通过索引修改数组不会触发更新
this.list[0] = newValue

// ✅ 解决：使用 splice
this.list.splice(0, 1, newValue)

// ✅ 或使用 Vue.set
this.$set(this.list, 0, newValue)