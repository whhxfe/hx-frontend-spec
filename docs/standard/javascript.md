# JavaScript 编写规范

本文档提供 JavaScript 编写的最佳实践和规范要求。

## 基本原则

1. **可读性**：代码应该易于阅读和理解
2. **一致性**：保持代码风格统一
3. **简洁性**：避免冗余代码，保持代码简洁
4. **可维护性**：编写易于维护的代码

## 变量与常量

### 声明方式

```javascript
// ✅ 使用 const 声明常量
const API_URL = 'https://api.example.com'
const MAX_RETRY = 3

// ✅ 使用 let 声明变量
let count = 0
let userName = 'John'

// ❌ 避免使用 var
var oldVariable = 'old'
```

### 命名规范

```javascript
// ✅ 变量和函数：驼峰命名法
const userName = 'John'
const getUserInfo = () => {}
const isValid = true

// ✅ 常量：全大写 + 下划线
const API_BASE_URL = 'https://api.example.com'
const MAX_CONNECTIONS = 100

// ✅ 类名：帕斯卡命名法
class UserProfile {
  constructor() {}
}

// ✅ 布尔变量：使用 is/has/can 前缀
const isActive = true
const hasPermission = false
const canEdit = true

// ❌ 避免使用单字符命名（循环变量除外）
const u = 'John'  // 不推荐
const user = 'John'  // 推荐

// ❌ 避免无意义的命名
const data = {}  // 不推荐
const userData = {}  // 推荐
```

### 解构赋值

```javascript
// ✅ 对象解构
const { name, age, email } = user
const { name: userName, age: userAge } = user

// ✅ 数组解构
const [first, second] = arr
const [first, ...rest] = arr

// ✅ 函数参数解构
function createUser({ name, age, email }) {
  return { name, age, email }
}

// ✅ 带默认值
const { name = 'Unknown', age = 0 } = user
```

## 函数

### 函数声明

```javascript
// ✅ 函数声明（有提升）
function add(a, b) {
  return a + b
}

// ✅ 箭头函数（推荐用于回调和简短函数）
const multiply = (a, b) => a * b
const square = x => x * x
const greet = () => console.log('Hello')

// ✅ 箭头函数多行
const processData = (data) => {
  const result = data.map(item => item * 2)
  return result.filter(item => item > 10)
}
```

### 函数参数

```javascript
// ✅ 默认参数
function createUser(name, age = 18, role = 'user') {
  return { name, age, role }
}

// ✅ 剩余参数
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0)
}

// ✅ 解构参数
function processUser({ name, age, email = 'default@example.com' }) {
  console.log(name, age, email)
}

// ❌ 避免修改参数
function increment(value) {
  return value + 1  // ✅ 返回新值
  // value++  // ❌ 修改参数
}
```

### 函数式编程

```javascript
// ✅ 使用数组方法
const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 20 }
]

// map - 转换
const names = users.map(user => user.name)

// filter - 过滤
const adults = users.filter(user => user.age >= 25)

// reduce - 累积
const totalAge = users.reduce((sum, user) => sum + user.age, 0)

// find - 查找
const john = users.find(user => user.name === 'John')

// some/every - 判断
const hasAdult = users.some(user => user.age >= 18)
const allAdults = users.every(user => user.age >= 18)

// ✅ 链式调用
const result = users
  .filter(user => user.age >= 25)
  .map(user => user.name)
  .sort()
```

## 对象

### 对象创建

```javascript
// ✅ 对象字面量
const user = {
  name: 'John',
  age: 25,
  email: 'john@example.com'
}

// ✅ 计算属性名
const key = 'name'
const obj = {
  [key]: 'John',
  [`user_${key}`]: 'John Doe'
}

// ✅ 方法简写
const calculator = {
  add(a, b) {
    return a + b
  },
  subtract(a, b) {
    return a - b
  }
}

// ✅ 展开运算符
const baseUser = { name: 'John', age: 25 }
const extendedUser = {
  ...baseUser,
  email: 'john@example.com',
  role: 'admin'
}
```

### 对象操作

```javascript
// ✅ 可选链操作符
const userName = user?.profile?.name
const userCity = user?.address?.city ?? 'Unknown'

// ✅ 空值合并操作符
const name = user.name ?? 'Anonymous'
const count = items?.length ?? 0

// ✅ 对象方法
Object.keys(user)  // ['name', 'age', 'email']
Object.values(user)  // ['John', 25, 'john@example.com']
Object.entries(user)  // [['name', 'John'], ['age', 25], ['email', 'john@example.com']]

// ✅ 浅拷贝
const copy1 = { ...user }
const copy2 = Object.assign({}, user)

// ✅ 深拷贝
const deepCopy = JSON.parse(JSON.stringify(user))
// 或使用 lodash
// const deepCopy = _.cloneDeep(user)
```

## 数组

### 数组操作

```javascript
// ✅ 创建数组
const arr1 = [1, 2, 3]
const arr2 = new Array(3).fill(0)
const arr3 = Array.from({ length: 5 }, (_, i) => i)

// ✅ 添加/删除元素
const arr = [1, 2, 3]
arr.push(4)        // 末尾添加
arr.unshift(0)     // 开头添加
arr.pop()          // 末尾删除
arr.shift()        // 开头删除

// ✅ 不可变操作
const newArr1 = [...arr, 4]           // 添加
const newArr2 = arr.filter(x => x > 1) // 过滤
const newArr3 = arr.map(x => x * 2)    // 映射

// ✅ 查找
const index = arr.indexOf(2)
const found = arr.find(x => x > 1)
const foundIndex = arr.findIndex(x => x > 1)
const includes = arr.includes(2)

// ✅ 排序
const sorted1 = [...arr].sort((a, b) => a - b)  // 升序
const sorted2 = [...arr].sort((a, b) => b - a)  // 降序

// ✅ 合并数组
const merged = [...arr1, ...arr2]
```

### 数组技巧

```javascript
// ✅ 数组去重
const unique1 = [...new Set(arr)]
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index)

// ✅ 数组扁平化
const nested = [[1, 2], [3, [4, 5]]]
const flat1 = nested.flat(Infinity)
const flat2 = nested.reduce((acc, val) => acc.concat(Array.isArray(val) ? val.flat() : val), [])

// ✅ 数组分组
const groupBy = (arr, key) => {
  return arr.reduce((groups, item) => {
    const group = item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
]
const grouped = groupBy(users, 'role')
```

## 异步编程

### Promise

```javascript
// ✅ 创建 Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'success' })
    }, 1000)
  })
}

// ✅ Promise 链式调用
fetchData()
  .then(data => {
    console.log(data)
    return processData(data)
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.error(error)
  })
  .finally(() => {
    console.log('完成')
  })

// ✅ Promise 并行
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts()
])

// ✅ Promise 竞速
const result = await Promise.race([
  fetchWithTimeout(url, 5000),
  fetchBackup(url)
])
```

### async/await

```javascript
// ✅ async 函数
async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`)
    const user = await response.json()
    return user
  } catch (error) {
    console.error('获取用户失败:', error)
    throw error
  }
}

// ✅ async 箭头函数
const getUser = async (id) => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// ✅ 并行执行
async function getData() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ])
  return { users, posts }
}

// ✅ 顺序执行
async function processData() {
  const users = await fetchUsers()
  const posts = await fetchPosts(users[0].id)
  return { users, posts }
}

// ✅ 错误处理
async function safeFetch(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    return null
  }
}
```

### 错误处理

```javascript
// ✅ 自定义错误类
class AppError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}

// ✅ 错误处理封装
const handleError = (error) => {
  if (error instanceof AppError) {
    // 处理应用错误
    console.error(`App Error [${error.code}]:`, error.message)
  } else if (error instanceof TypeError) {
    // 处理类型错误
    console.error('Type Error:', error.message)
  } else {
    // 处理其他错误
    console.error('Unknown Error:', error)
  }
}

// ✅ 异步错误处理
const asyncHandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      handleError(error)
    }
  }
}
```

## 类与模块

### ES6 类

```javascript
// ✅ 类定义
class User {
  // 静态属性
  static count = 0
  
  // 私有属性
  #password
  
  constructor(name, email) {
    this.name = name
    this.email = email
    this.#password = 'secret'
    User.count++
  }
  
  // Getter
  get displayName() {
    return `${this.name} (${this.email})`
  }
  
  // Setter
  set password(value) {
    this.#password = value
  }
  
  // 方法
  getInfo() {
    return {
      name: this.name,
      email: this.email
    }
  }
  
  // 静态方法
  static getCount() {
    return User.count
  }
}

// ✅ 继承
class Admin extends User {
  constructor(name, email, role) {
    super(name, email)
    this.role = role
  }
  
  getInfo() {
    const baseInfo = super.getInfo()
    return {
      ...baseInfo,
      role: this.role
    }
  }
}
```

### 模块化

```javascript
// ✅ 导出
// utils.js
export const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`
}

export default class Utils {
  // ...
}

// ✅ 导入
import Utils, { formatDate, formatCurrency } from './utils.js'

// ✅ 动态导入
const loadModule = async () => {
  const module = await import('./heavy-module.js')
  return module.default
}

// ✅ 重命名导出
export { formatDate as format_date }
import { format_date } from './utils.js'
```

## ES6+ 特性

### 可选链和空值合并

```javascript
// ✅ 可选链操作符
const user = {
  profile: {
    name: 'John'
  }
}

const name = user?.profile?.name           // 'John'
const age = user?.profile?.age             // undefined
const city = user?.address?.city           // undefined

// ✅ 空值合并操作符
const name = user?.name ?? 'Anonymous'    // 如果为 null/undefined
const count = items?.length ?? 0
const config = options ?? defaultOptions

// ✅ 短路赋值
user.name ||= 'Anonymous'  // 如果为 falsy 值则赋值
user.age ??= 18            // 如果为 null/undefined 则赋值
```

### 其他新特性

```javascript
// ✅ BigInt
const bigNumber = 9007199254740991n
const anotherBig = BigInt('9007199254740991')

// ✅ Symbol
const id = Symbol('id')
const user = {
  [id]: 123,
  name: 'John'
}

// ✅ 迭代器
const map = new Map([['name', 'John'], ['age', 25]])
for (const [key, value] of map) {
  console.log(key, value)
}

// ✅ 生成器
function* numberGenerator() {
  yield 1
  yield 2
  yield 3
}

const gen = numberGenerator()
console.log(gen.next().value)  // 1
console.log(gen.next().value)  // 2

// ✅ Proxy
const handler = {
  get(target, property) {
    console.log(`访问 ${property}`)
    return target[property]
  },
  set(target, property, value) {
    console.log(`设置 ${property} = ${value}`)
    target[property] = value
    return true
  }
}

const proxy = new Proxy({}, handler)
proxy.name = 'John'  // 设置 name = John
console.log(proxy.name)  // 访问 name
```

## 性能优化

### 避免内存泄漏

```javascript
// ✅ 及时清理事件监听器
class Component {
  constructor() {
    this.handleClick = this.handleClick.bind(this)
  }
  
  mount() {
    document.addEventListener('click', this.handleClick)
  }
  
  unmount() {
    document.removeEventListener('click', this.handleClick)
  }
  
  handleClick() {
    // 处理点击
  }
}

// ✅ 使用 WeakMap/WeakSet
const cache = new WeakMap()
const metadata = new WeakSet()

// ✅ 避免闭包导致的内存泄漏
function createHandler() {
  const largeData = new Array(1000000).fill('data')
  
  return function handler() {
    // 只使用需要的数据
    return largeData.length
  }
}
```

### 优化循环

```javascript
// ✅ 缓存数组长度
for (let i = 0, len = arr.length; i < len; i++) {
  // ...
}

// ✅ 使用 for...of
for (const item of arr) {
  console.log(item)
}

// ✅ 使用 forEach
arr.forEach((item, index) => {
  console.log(item, index)
})

// ❌ 避免在循环中创建函数
for (let i = 0; i < arr.length; i++) {
  arr[i].onClick = () => console.log(i)  // 每次循环都创建新函数
}

// ✅ 缓存函数
const createHandler = (value) => () => console.log(value)
for (let i = 0; i < arr.length; i++) {
  arr[i].onClick = createHandler(i)
}
```

## 代码风格

### 格式化

```javascript
// ✅ 使用一致的缩进（2个空格）
function example() {
  if (condition) {
    doSomething()
  }
}

// ✅ 使用分号
const name = 'John'
const age = 25

// ✅ 一致的引号
const str1 = 'single quotes'
const str2 = "double quotes"

// ✅ 一致的括号
if (condition) {
  // ...
} else {
  // ...
}

// ✅ 数组和对象格式
const arr = [
  1,
  2,
  3
]

const obj = {
  name: 'John',
  age: 25,
  email: 'john@example.com'
}
```

### 注释

```javascript
// ✅ 单行注释
// 这是一个单行注释

/* ✅ 多行注释
   这是一个多行注释
   可以跨越多行 */

// ✅ 函数注释
/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 */
function add(a, b) {
  return a + b
}

// ✅ TODO 注释
// TODO: 需要优化性能
// FIXME: 这里有bug需要修复
// HACK: 临时解决方案
```

## 常见错误

### 避免的做法

```javascript
// ❌ 避免使用全局变量
var globalVar = 'global'

// ❌ 避免使用 == 而不是 ===
if (x == '5') {}  // 不推荐
if (x === 5) {}   // 推荐

// ❌ 避免使用 eval
eval('alert("Hello")')  // 危险

// ❌ 避免使用 with
with (obj) {
  // 不推荐
}

// ❌ 避免使用 arguments 对象
function example() {
  console.log(arguments)  // 不推荐
}

// ✅ 使用剩余参数
function example(...args) {
  console.log(args)  // 推荐
}
```

## 工具推荐

- **ESLint** - JavaScript 代码检查
- **Prettier** - 代码格式化
- **Babel** - JavaScript 编译器
- **TypeScript** - 类型检查
- **Jest** - 测试框架