# 📚 完整项目功能文档

## 项目概述

这是一个**Vue3 + Pinia 完整学习项目**，涵盖了从基础到高级的所有核心概念和最佳实践。

## 项目结构

```
src/
├── components/              # Vue 组件
│   ├── CounterDemo.vue          # Demo 1: 基础计数器
│   ├── TodoDemo.vue             # Demo 2: Todo 列表管理
│   ├── UserDemo.vue             # Demo 3: 用户信息管理
│   ├── CartDemo.vue             # Demo 4: 购物车（多Store）
│   ├── AdvancedPiniaDemo.vue    # Demo 5: 高级 Pinia 功能
│   └── CommunicationGuide.vue   # Demo 6: 组件通信指南
├── stores/                  # Pinia Store
│   ├── counterStore.js          # 计数器 Store
│   ├── todoStore.js             # Todo Store
│   ├── userStore.js             # 用户 Store
│   ├── cartStore.js             # 购物车 Store
│   └── advancedStore.js         # 高级功能 Store
├── App.vue                  # 主应用组件
└── main.js                  # 应用入口
```

---

## 🎯 六大演示模块

### 1️⃣ **Demo 1: 基础计数器** `CounterDemo.vue`

**学习内容：**
- Pinia Store 的基本结构
- State（状态）定义
- Getters（计算属性）
- Actions（方法）
- 组件中使用 Store

**核心概念：**
```javascript
// 定义 Store
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  const increment = () => count.value++
  const doubleCount = computed(() => count.value * 2)
  
  return { count, increment, doubleCount }
})

// 在组件中使用
const store = useCounterStore()
store.increment()
console.log(store.count)
```

**功能演示：**
- 增加/减少计数
- 显示计数历史
- 计数统计（最大值、最小值、总和）
- Getter 演示（倍数计算）

---

### 2️⃣ **Demo 2: Todo 列表管理** `TodoDemo.vue`

**学习内容：**
- CRUD 操作
- 列表状态管理
- 复杂的 Getters（统计、过滤）
- 响应式更新

**核心操作：**
- 添加 Todo
- 标记完成/未完成
- 删除 Todo
- 批量操作（全选、反选、清空）

**高级 Getters：**
```javascript
// 未完成的 Todo 数量
const uncompletedCount = computed(() => 
  todos.value.filter(t => !t.completed).length
)

// 完成率
const completionRate = computed(() => {
  const total = todos.value.length
  const completed = todos.value.filter(t => t.completed).length
  return total === 0 ? 0 : Math.round((completed / total) * 100)
})
```

---

### 3️⃣ **Demo 3: 用户信息管理** `UserDemo.vue`

**学习内容：**
- 异步 Actions（模拟 API 调用）
- Loading 状态管理
- 错误处理
- 表单数据绑定

**核心功能：**
- 用户登录（异步操作）
- 用户信息展示
- 编辑用户信息
- 登出功能

**异步 Action 示例：**
```javascript
const login = async (username, password) => {
  loading.value = true
  error.value = null
  
  try {
    // 模拟 API 调用
    const response = await mockApiCall(username, password)
    currentUser.value = response.data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
```

---

### 4️⃣ **Demo 4: 购物车（多Store）** `CartDemo.vue`

**学习内容：**
- 多个 Store 之间的协作
- Store 间的依赖和调用
- 复杂的计算逻辑
- 购物场景模拟

**涉及的 Store：**
- `useProductStore()` - 产品信息
- `useCartStore()` - 购物车状态

**高级操作：**
```javascript
// 购物车 Store 中调用产品 Store
const addToCart = (productId) => {
  const productStore = useProductStore()
  const product = productStore.getProduct(productId)
  
  cart.value.push({
    ...product,
    quantity: 1,
    addedAt: new Date()
  })
}
```

**主要功能：**
- 商品列表展示
- 添加/删除购物车商品
- 数量调整
- 价格计算（小计、总价、税费等）
- 优惠券应用

---

### 5️⃣ **Demo 5: 高级 Pinia 功能** `AdvancedPiniaDemo.vue`

**学习内容：**
- 复杂的 Getters（多层依赖）
- 异步订单处理
- Store 的 $patch 方法
- Store 的 $reset 方法
- Store 的 $subscribe 订阅
- Store 的 $state 直接访问

**10 个高级特性：**

#### 1. **Getter 间的相互引用**
```javascript
// selectedProductsSubtotal 是基础 getter
const selectedProductsSubtotal = computed(() => {
  return selectedProducts.value.reduce((sum, p) => sum + p.price, 0)
})

// selectedProductsTotal 依赖上面的 getter
const selectedProductsTotal = computed(() => {
  return selectedProductsSubtotal.value * (1 - discountRate.value)
})
```

#### 2. **$patch 批量修改状态**
```javascript
// 单个修改
discountRate.value = 0.1

// 批量修改（$patch 方式）
store.$patch({
  discountRate: 0.1,
  selectedProductIds: [1, 2, 3]
})
```

#### 3. **$subscribe 订阅状态变化**
```javascript
store.$subscribe((mutation, state) => {
  console.log('状态已改变:', mutation.type, mutation.payload)
  // 可以用于日志记录、自动持久化等
})
```

#### 4. **$reset 重置状态**
```javascript
// 重置到初始状态
store.$reset()
```

#### 5. **$state 直接访问**
```javascript
// 访问完整的状态对象
const stateSnapshot = store.$state
// 或直接修改
store.$state = { ...initialState }
```

#### 6. **异步 Action 的验证和错误处理**
```javascript
const createOrder = async () => {
  // 验证
  if (selectedProductIds.value.length === 0) {
    throw new Error('请先选择商品')
  }

  // 异步操作
  try {
    const order = await api.createOrder(...)
    orders.value.push(order)
    return order
  } catch (error) {
    throw new Error(`订单创建失败: ${error.message}`)
  }
}
```

#### 7. **复杂的统计 Getters**
```javascript
const productStats = computed(() => ({
  total: products.value.length,
  inStock: products.value.filter(p => p.inventory > 0).length,
  outOfStock: products.value.filter(p => p.inventory === 0).length,
  averagePrice: products.value.reduce((sum, p) => sum + p.price, 0) / products.value.length
}))
```

#### 8. **订单管理（CRUD + 状态变更）**
```javascript
// 创建
const createOrder = async () => { /* ... */ }

// 取消（改变状态而非删除）
const cancelOrder = (orderId) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) order.status = 'cancelled'
}

// 查询
const searchProducts = (keyword) => {
  return products.value.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  )
}
```

#### 9. **选择和库存管理**
```javascript
const toggleProductSelection = (productId) => {
  const index = selectedProductIds.value.indexOf(productId)
  if (index > -1) {
    selectedProductIds.value.splice(index, 1)
  } else {
    selectedProductIds.value.push(productId)
  }
}

const updateProductInventory = (productId, newInventory) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    product.inventory = Math.max(0, newInventory)
  }
}
```

#### 10. **状态持久化思路**
```javascript
// 监听状态变化，自动保存
store.$subscribe((mutation, state) => {
  // 保存到 localStorage
  localStorage.setItem('store-state', JSON.stringify(state))
})

// 初始化时恢复
const savedState = localStorage.getItem('store-state')
if (savedState) {
  store.$state = JSON.parse(savedState)
}
```

---

### 6️⃣ **Demo 6: 组件通信指南** `CommunicationGuide.vue`

**学习内容：**
- 8 种组件通信方式
- 各种方式的优缺点和适用场景
- 最佳实践

#### **8 种通信方式详解：**

##### **① Props（父 → 子）**
```javascript
// 子组件接收
const props = defineProps({
  message: String,
  count: Number,
  user: Object
})

// 父组件传递
<ChildComponent :message="msg" :count="42" :user="userData" />
```
- ✅ 简单直观
- ✅ 单向数据流，易于理解
- ❌ 多级嵌套时繁琐
- **适用：** 简单的数据传递

---

##### **② Emit（子 → 父）**
```javascript
const emit = defineEmits(['child-event'])

const sendMessage = (msg) => {
  emit('child-event', msg)
}

// 父组件监听
<ChildComponent @child-event="handleEvent" />
```
- ✅ 事件驱动，解耦性强
- ✅ 支持多个事件
- ❌ 需要手动处理事件
- **适用：** 子组件需要通知父组件

---

##### **③ v-model（双向绑定）**
```javascript
// 子组件
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const updateValue = (newValue) => {
  emit('update:modelValue', newValue)
}

// 父组件
<ChildComponent v-model="title" />
```
- ✅ 简化双向绑定
- ✅ 支持多个 v-model
- ❌ 只适合双向数据
- **适用：** 表单输入、数据编辑

---

##### **④ Provide/Inject（跨级传递）**
```javascript
// 祖先组件
const theme = ref('dark')
provide('theme', theme)

// 后代组件
const theme = inject('theme', 'light')
```
- ✅ 避免 Prop Drilling
- ✅ 支持响应式
- ❌ 隐式依赖，不易追踪
- **适用：** 配置、主题、国际化等全局设置

---

##### **⑤ Ref/Expose（直接访问）**
```javascript
// 子组件暴露方法
defineExpose({
  count,
  increment,
  reset
})

// 父组件访问
const childRef = ref(null)
childRef.value.increment()
```
- ✅ 直接访问子组件
- ✅ 最灵活
- ❌ 破坏封装，难以维护
- **适用：** 特殊场景，谨慎使用

---

##### **⑥ Slots（内容分发）**
```javascript
// 子组件定义插槽
<slot></slot> <!-- 默认插槽 -->
<slot name="header"></slot> <!-- 命名插槽 -->
<slot name="item" v-for="item in items" :item="item"></slot> <!-- 作用域插槽 -->

// 父组件使用
<ChildComponent>
  <template #header>
    <h2>Header</h2>
  </template>
  
  <template #item="{ item }">
    <span>{{ item.name }}</span>
  </template>
</ChildComponent>
```
- ✅ 灵活的内容组合
- ✅ 强大的作用域插槽
- ❌ 需要定义多个插槽
- **适用：** UI 组件、布局组件

---

##### **⑦ $attrs（属性透传）**
```javascript
// 子组件
<template>
  <div class="wrapper">
    <input v-bind="$attrs" />
  </div>
</template>

// 父组件
<ChildComponent placeholder="输入内容" maxlength="50" data-test="input" />
```
- ✅ 自动透传未显式定义的属性
- ✅ 减少代码重复
- ❌ 隐式依赖
- **适用：** 包装原生 HTML 元素

---

##### **⑧ Store（全局状态）**
```javascript
// 创建 Store
export const useGlobalStore = defineStore('global', () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
})

// 任何组件使用
const store = useGlobalStore()
store.increment()
```
- ✅ 跨组件、跨页面共享
- ✅ 集中管理状态
- ❌ 可能过度使用
- **适用：** 全局状态、跨页面数据

---

## 🚀 高级特性演示

### Store Subscribe（状态订阅）
```javascript
// 监听所有状态变化
store.$subscribe((mutation, state) => {
  console.log('mutation type:', mutation.type)
  console.log('mutation payload:', mutation.payload)
  console.log('new state:', state)
})

// 用途：
// - 日志记录
// - 自动持久化
// - 状态验证
// - 触发副作用
```

### 批量修改 ($patch)
```javascript
// 对象形式
store.$patch({
  count: 10,
  name: 'new name',
  nested: { key: 'value' }
})

// 函数形式（推荐）
store.$patch(state => {
  state.count = 10
  state.name = 'new name'
  state.items.push({ id: 1 })
})
```

### 状态快照
```javascript
// 获取状态快照
const snapshot = store.$state

// 重置状态
store.$reset()

// 替换整个状态
store.$state = {
  count: 0,
  name: '',
  items: []
}
```

---

## 📋 最佳实践总结

### 1. **组件通信选择指南**

| 场景 | 推荐方案 |
|------|--------|
| 简单数据传递 | Props |
| 用户交互反馈 | Emit |
| 表单双向绑定 | v-model |
| 跨级配置传递 | Provide/Inject |
| 全局状态管理 | Store（Pinia） |
| UI 内容自定义 | Slots |
| 访问子组件方法 | Ref/Expose（谨慎） |
| 属性透传 | $attrs |

### 2. **Store 使用规范**

```javascript
// ✅ 好的实践
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoading = ref(false)
  
  // 公开的 getters
  const displayName = computed(() => user.value?.name ?? 'Guest')
  
  // 公开的 actions
  const login = async (username, password) => {
    isLoading.value = true
    try {
      user.value = await api.login(username, password)
    } finally {
      isLoading.value = false
    }
  }
  
  return { user, displayName, login }
})

// ❌ 避免
// - 过度使用 Store 存储组件内部状态
// - Store 中存储大量临时数据
// - 直接修改 Store 而不通过 Actions
// - 循环引用（Store A 依赖 Store B，Store B 依赖 Store A）
```

### 3. **异步 Actions 最佳实践**

```javascript
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const fetchUser = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await api.getUser(id)
      user.value = response.data
      return response.data
    } catch (err) {
      error.value = err.message
      throw err // 让组件能够捕获错误
    } finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, error, fetchUser }
})
```

### 4. **响应式 Getters**

```javascript
// ✅ 使用 computed 确保响应性
const filteredTodos = computed(() => {
  return todos.value.filter(t => t.completed === filterStatus.value)
})

// ❌ 普通函数可能不够高效
const getFilteredTodos = () => {
  return todos.value.filter(t => t.completed === filterStatus.value)
}
```

---

## 🔧 配置和运行

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 生产构建
```bash
npm run build
```

### 预览构建
```bash
npm run preview
```

---

## 📚 学习路线

1. **入门阶段**（1-2 天）
   - 学习 Demo 1: 基础计数器
   - 理解 State、Getters、Actions

2. **进阶阶段**（3-5 天）
   - 学习 Demo 2: Todo 列表（复杂 Getters）
   - 学习 Demo 3: 用户管理（异步 Actions）

3. **实战阶段**（1 周）
   - 学习 Demo 4: 购物车（多 Store 协作）
   - 学习 Demo 5: 高级功能

4. **深度理解**（1-2 周）
   - 学习 Demo 6: 组件通信
   - 结合实际项目应用

---

## 🎓 总结

这个项目通过 6 个递进式的演示，涵盖了：
- ✅ Pinia 的所有核心概念
- ✅ 8 种组件通信方式
- ✅ 10+ 个高级特性
- ✅ 最佳实践和常见误区
- ✅ 实际应用场景

通过学习和实践这个项目，你将能够：
- 深入理解 Vue3 响应式系统
- 掌握 Pinia 状态管理的精髓
- 选择合适的通信方式解决实际问题
- 编写高质量、可维护的 Vue3 应用

---

**祝你学习愉快！** 🚀
