# Vue3 + Pinia 完整学习指南

## 📚 目录
1. [项目结构](#项目结构)
2. [快速开始](#快速开始)
3. [Pinia 核心概念](#pinia-核心概念)
4. [详细示例说明](#详细示例说明)
5. [常见问题](#常见问题)
6. [最佳实践](#最佳实践)

---

## 项目结构

```
vue3_pina_demo/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── CounterDemo.vue  # Demo 1: 基础计数器
│   │   ├── TodoDemo.vue     # Demo 2: Todo 列表
│   │   ├── UserDemo.vue     # Demo 3: 用户管理
│   │   └── CartDemo.vue     # Demo 4: 购物车
│   ├── stores/              # Pinia Store
│   │   ├── counterStore.js  # 计数器 Store
│   │   ├── todoStore.js     # Todo Store
│   │   ├── userStore.js     # 用户 Store
│   │   └── cartStore.js     # 购物车 Store
│   ├── App.vue              # 主应用组件
│   └── main.js              # 应用入口
├── index.html               # HTML 入口
├── vite.config.js           # Vite 配置
├── package.json             # 项目依赖
└── README.md                # 本文件
```

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

浏览器会自动打开 `http://localhost:5173`

### 3. 构建生产版本

```bash
npm run build
```

---

## Pinia 核心概念

### 什么是 Pinia？

Pinia 是 Vue3 官方推荐的状态管理库。它的特点：

- ✅ 极简的 API，比 Vuex 更简洁
- ✅ 完整的 TypeScript 支持
- ✅ 开箱即用的 DevTools 支持
- ✅ 每个 Store 都是独立的
- ✅ 支持热更新（HMR）

### 核心概念

#### 1. **State（状态）**

存储应用的响应式数据。使用 `ref()` 创建。

```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State: 用 ref() 创建响应式状态
  const count = ref(0)
  
  return { count }
})
```

**在组件中访问 State：**

```javascript
import { useCounterStore } from '@/stores/counterStore'

export default {
  setup() {
    const store = useCounterStore()
    
    // 直接访问
    console.log(store.count)  // 0
    
    // 修改（不推荐直接修改）
    store.count = 10
    
    return { store }
  }
}
```

#### 2. **Getters（派生状态）**

类似 Vue 的 `computed`，用于计算派生状态。基于 State 计算，并被缓存。

```javascript
import { computed } from 'vue'

const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  // Getter: 计算派生状态
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  
  return { count, doubleCount, isEven }
})
```

**使用 Getter：**

```javascript
const store = useCounterStore()

console.log(store.count)       // 5
console.log(store.doubleCount) // 10（计算结果）
console.log(store.isEven)      // false
```

**Getter 间可以相互引用：**

```javascript
const doubleCount = computed(() => count.value * 2)
const quadrupleCount = computed(() => doubleCount.value * 2)
```

#### 3. **Actions（修改状态的方法）**

修改 State 的方法。支持同步和异步操作。

```javascript
const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  // Actions: 修改状态的方法
  const increment = () => {
    count.value++
  }
  
  const addAmount = (amount) => {
    count.value += amount
  }
  
  // 异步 Action
  const fetchCount = async () => {
    const response = await fetch('/api/count')
    const data = await response.json()
    count.value = data.count
  }
  
  return { count, increment, addAmount, fetchCount }
})
```

**使用 Action：**

```javascript
const store = useCounterStore()

// 同步 Action
store.increment()           // count = 1
store.addAmount(5)          // count = 6

// 异步 Action
await store.fetchCount()    // 从服务器获取
```

#### 4. **Store（整体容器）**

Store 是 State、Getters、Actions 的组合体。

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义 Store
export const useMyStore = defineStore('my', () => {
  // State
  const data = ref([])
  
  // Getters
  const dataCount = computed(() => data.value.length)
  
  // Actions
  const addItem = (item) => {
    data.value.push(item)
  }
  
  // 返回所有内容
  return { 
    data, 
    dataCount, 
    addItem 
  }
})
```

---

## 详细示例说明

### Demo 1: 基础计数器 (CounterDemo.vue)

**目的：** 学习最基础的 Pinia 使用方式

**涵盖内容：**
- ✅ State 的创建和访问
- ✅ Getters 的使用
- ✅ Actions 的基本操作
- ✅ 操作历史记录

**核心代码：**

```javascript
// counterStore.js
export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const history = ref([])
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  
  // Actions
  const increment = () => {
    count.value++
    history.value.push(`+1 -> ${count.value}`)
  }
  
  return { count, history, doubleCount, isEven, increment, ... }
})
```

**学习点：**
- 如何在 Store 中定义和暴露 State、Getters、Actions
- 如何在组件中使用 Store 的所有功能

---

### Demo 2: Todo 列表 (TodoDemo.vue)

**目的：** 学习数组操作和 CRUD（增删改查）

**涵盖内容：**
- ✅ 数组操作（添加、删除、修改）
- ✅ 复杂的 Getter（过滤、统计）
- ✅ 状态管理（filter 状态）
- ✅ 批量操作

**核心代码：**

```javascript
// todoStore.js
export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const filter = ref('all')
  
  // 过滤 Getter
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(t => !t.completed)
      case 'completed':
        return todos.value.filter(t => t.completed)
      default:
        return todos.value
    }
  })
  
  // CRUD Actions
  const addTodo = (title) => {
    todos.value.push({ id: nextId.value++, title, completed: false })
  }
  
  const removeTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }
  
  const toggleTodo = (id) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) todo.completed = !todo.completed
  }
  
  return { todos, filter, filteredTodos, addTodo, removeTodo, toggleTodo, ... }
})
```

**学习点：**
- 复杂的 Getter 实现（switch、filter）
- 数组的增删改操作
- 关联状态管理（filter 影响 filteredTodos）

---

### Demo 3: 用户信息 (UserDemo.vue)

**目的：** 学习异步 Actions 和复杂状态管理

**涵盖内容：**
- ✅ 异步 Action（async/await）
- ✅ 加载状态（loading、error）
- ✅ 对象状态管理
- ✅ 时间计算的 Getter

**核心代码：**

```javascript
// userStore.js
export const useUserStore = defineStore('user', () => {
  // State
  const user = ref({ id: null, name: '', email: '', role: '' })
  const loading = ref(false)
  const error = ref(null)
  
  // Getter
  const isLoggedIn = computed(() => !!user.value.id)
  
  // 异步 Action
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email && password) {
        user.value = {
          id: Math.random(),
          name: '张三',
          email,
          role: email.includes('admin') ? 'admin' : 'user'
        }
        return true
      } else {
        throw new Error('邮箱或密码不能为空')
      }
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      loading.value = false
    }
  }
  
  return { user, loading, error, isLoggedIn, login, ... }
})
```

**学习点：**
- 如何处理异步操作（API 请求）
- 如何管理 loading 和 error 状态
- 在异步 Action 中更新 State

**在组件中使用：**

```javascript
const handleLogin = async () => {
  const success = await userStore.login(email.value, password.value)
  if (success) {
    console.log('登录成功')
  } else {
    console.log('登录失败:', userStore.error)
  }
}
```

---

### Demo 4: 购物车 (CartDemo.vue)

**目的：** 学习多个 Store 的创建和相互调用

**涵盖内容：**
- ✅ 创建多个 Store（productStore、cartStore）
- ✅ Store 间的相互调用和依赖
- ✅ 复杂的计算逻辑（总价、折扣等）
- ✅ 综合应用前面的所有知识

**核心代码：**

```javascript
// cartStore.js
import { useCounterStore } from './counterStore'
import { useProductStore } from './productStore'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const shippingFee = ref(10)
  const discountPercent = ref(0)
  
  // 复杂 Getter
  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  })
  
  const discount = computed(() => {
    return Math.floor(subtotal.value * (discountPercent.value / 100))
  })
  
  const total = computed(() => {
    return subtotal.value - discount.value + shippingFee.value
  })
  
  // Actions
  const addItem = (product, quantity) => {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }
  
  // 调用其他 Store 的 Action
  const checkout = () => {
    const counterStore = useCounterStore()
    const productStore = useProductStore()
    
    counterStore.addAmount(items.value.length)
    items.value.forEach(item => {
      productStore.updateStock(item.id, item.quantity)
    })
  }
  
  return { items, addItem, checkout, ... }
})
```

**学习点：**
- 如何创建多个独立的 Store
- 如何在一个 Store 中调用另一个 Store 的方法
- 复杂的计算逻辑（reduce、链式计算）

---

## 常见问题

### Q1: 如何监听 State 的变化？

使用 Vue 的 `watch`：

```javascript
import { watch } from 'vue'
import { useCounterStore } from '@/stores/counterStore'

export default {
  setup() {
    const store = useCounterStore()
    
    // 监听单个 State
    watch(() => store.count, (newValue, oldValue) => {
      console.log(`count 从 ${oldValue} 变为 ${newValue}`)
    })
    
    return { store }
  }
}
```

### Q2: 如何重置 Store？

```javascript
// 方法 1: 使用 $reset()
const store = useCounterStore()
store.$reset()

// 方法 2: 在 Store 中定义 reset action
export const useMyStore = defineStore('my', () => {
  const reset = () => {
    count.value = 0
    name.value = ''
  }
  
  return { reset }
})
```

### Q3: 如何持久化 Store（保存到 localStorage）？

在 `main.js` 中使用 Pinia 插件：

```javascript
import { createPinia } from 'pinia'

// 创建持久化插件
const pinia = createPinia()

pinia.use(({ store }) => {
  // 从 localStorage 恢复
  const saved = localStorage.getItem(`store_${store.$id}`)
  if (saved) {
    store.$patch(JSON.parse(saved))
  }
  
  // 保存到 localStorage
  store.$subscribe((mutation, state) => {
    localStorage.setItem(`store_${store.$id}`, JSON.stringify(state))
  })
})

app.use(pinia)
```

### Q4: 如何调试 Store？

安装并使用 Vue DevTools：

```bash
# Pinia 会自动与 Vue DevTools 集成
# 可以看到所有的状态变化和时间旅行调试
```

### Q5: Store 中应该放什么，组件中应该放什么？

**Store 中放：** 
- 应用全局共享的数据
- 多个组件需要使用的数据
- 业务逻辑（Actions）

**组件中放：**
- 组件本地的 UI 状态（input value、modal visible 等）
- 组件私有数据

---

## 最佳实践

### 1. Store 命名规范

```javascript
// ✅ 好的做法
export const useUserStore = defineStore('user', () => { ... })
export const useTodoStore = defineStore('todo', () => { ... })

// ❌ 不好的做法
export const store = defineStore('store', () => { ... })
export const userStore = defineStore('user', () => { ... })  // use 前缀
```

### 2. 分文件管理 Store

```
src/
  stores/
    index.js          # 统一导出所有 Store
    user.js
    todo.js
    product.js
```

**stores/index.js:**

```javascript
export { useUserStore } from './user'
export { useTodoStore } from './todo'
export { useProductStore } from './product'
```

**在组件中使用：**

```javascript
import { useUserStore, useTodoStore } from '@/stores'
```

### 3. 避免直接修改 State

```javascript
// ❌ 不好的做法
const store = useUserStore()
store.user.name = 'Tom'

// ✅ 好的做法 - 使用 Action
const store = useUserStore()
store.updateUser({ name: 'Tom' })
```

### 4. Action 应该处理业务逻辑

```javascript
// ❌ 在组件中处理逻辑
const handleAdd = () => {
  if (newItem.value.trim()) {
    store.items.push({
      id: Math.random(),
      text: newItem.value
    })
    newItem.value = ''
  }
}

// ✅ Action 中处理逻辑
const addItem = (text) => {
  if (text.trim()) {
    items.value.push({
      id: Math.random(),
      text
    })
  }
}
```

### 5. 使用 TypeScript（可选）

```typescript
// counterStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CounterState {
  count: number
  history: string[]
}

export const useCounterStore = defineStore('counter', () => {
  const count = ref<number>(0)
  const history = ref<string[]>([])
  
  const doubleCount = computed<number>(() => count.value * 2)
  
  const increment = (): void => {
    count.value++
  }
  
  return { count, history, doubleCount, increment }
})
```

### 6. 组织 Action 和 Getter

```javascript
export const useStore = defineStore('main', () => {
  // ========== State ==========
  const items = ref([])
  const filter = ref('all')
  
  // ========== Getters ==========
  const filteredItems = computed(() => {
    // 过滤逻辑
  })
  
  const itemCount = computed(() => {
    // 计数逻辑
  })
  
  // ========== Actions ==========
  const addItem = (item) => {
    // 添加逻辑
  }
  
  const removeItem = (id) => {
    // 删除逻辑
  }
  
  // ========== Return ==========
  return {
    // State
    items,
    filter,
    // Getters
    filteredItems,
    itemCount,
    // Actions
    addItem,
    removeItem
  }
})
```

---

## 总结

通过这 4 个 Demo，你已经学会了 Pinia 的核心概念：

| Demo | 重点 | 学习内容 |
|------|------|----------|
| Counter | 基础 | State、Getters、Actions |
| Todo | CRUD | 数组操作、复杂 Getter |
| User | 异步 | 异步 Action、loading/error |
| Cart | 多 Store | Store 间调用、复杂计算 |

**下一步：**
- 🚀 尝试修改代码，添加新功能
- 📖 查看 [Pinia 官方文档](https://pinia.vuejs.org/)
- 🔍 使用 Vue DevTools 调试
- 💾 实现 Store 持久化

**相关资源：**
- Vue3 官方文档：https://vuejs.org/
- Pinia 官方文档：https://pinia.vuejs.org/
- Vite 官方文档：https://vitejs.dev/

---

**祝你学习愉快！** 🎉
