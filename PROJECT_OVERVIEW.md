# 📊 Vue3 + Pinia 项目概览

## 项目简介

这是一个完整的 **Vue3 + Pinia 学习项目**，包含 4 个循序渐进的 Demo，帮助你从零开始掌握 Pinia 状态管理。

### 🎯 项目目标

✅ **理解 Pinia 的核心概念** - State、Getters、Actions  
✅ **掌握基础 CRUD 操作** - 增删改查  
✅ **学会异步操作处理** - async/await、loading、error  
✅ **实现多 Store 协作** - Store 间相互调用  
✅ **掌握最佳实践** - 代码规范、项目结构  

---

## 📁 项目结构

```
vue3_pina_demo/
│
├── src/
│   ├── components/
│   │   ├── CounterDemo.vue        ⭐ Demo 1: 基础计数器
│   │   ├── TodoDemo.vue           ⭐ Demo 2: Todo 列表
│   │   ├── UserDemo.vue           ⭐ Demo 3: 用户管理
│   │   └── CartDemo.vue           ⭐ Demo 4: 购物车
│   │
│   ├── stores/
│   │   ├── counterStore.js        Store 1: 计数器
│   │   ├── todoStore.js           Store 2: Todo
│   │   ├── userStore.js           Store 3: 用户
│   │   └── cartStore.js           Store 4: 购物车 + 产品
│   │
│   ├── App.vue                    主应用组件
│   └── main.js                    应用入口
│
├── index.html                     HTML 模板
├── vite.config.js                 Vite 配置
├── package.json                   项目配置
│
├── README.md                       📘 完整学习文档
├── QUICKSTART.md                  🚀 快速开始指南
└── .gitignore                     Git 忽略文件
```

---

## 🎓 4 个 Demo 详解

### Demo 1️⃣: 计数器 (最简单)

**文件：** `src/components/CounterDemo.vue` + `src/stores/counterStore.js`

**核心概念：**
- State（状态）- `count`
- Getters（派生状态）- `doubleCount`、`isEven`
- Actions（修改方法）- `increment()`、`decrement()`

**功能：**
- 点击按钮修改计数
- 查看双倍值和是否为偶数
- 操作历史记录

**代码量：** 最少（⭐ 最适合入门）

```javascript
// 最核心的 3 行代码
const count = ref(0)                        // State
const doubleCount = computed(() => count.value * 2)  // Getter
const increment = () => { count.value++ }   // Action
```

---

### Demo 2️⃣: Todo 列表 (中等难度)

**文件：** `src/components/TodoDemo.vue` + `src/stores/todoStore.js`

**核心概念：**
- 数组 State - `todos`
- 复杂 Getter - `filteredTodos`、`stats`
- CRUD Actions - 增删改查

**功能：**
- 添加/删除 Todo
- 标记完成状态
- 按状态过滤（全部、未完成、已完成）
- 显示统计信息

**代码量：** 中等（⭐⭐ 实用功能）

```javascript
// 关键操作
const addTodo = (title) => {                // 添加
  todos.value.push({...})
}
const removeTodo = (id) => {                // 删除
  todos.value = todos.value.filter(t => t.id !== id)
}
const toggleTodo = (id) => {                // 修改
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
```

---

### Demo 3️⃣: 用户管理 (较难)

**文件：** `src/components/UserDemo.vue` + `src/stores/userStore.js`

**核心概念：**
- 对象 State - `user`
- 异步 Action - `async login()`
- 状态标志 - `loading`、`error`
- 计算时长 - `sessionDuration` Getter

**功能：**
- 异步登录（模拟 API 调用）
- 错误处理
- 显示用户信息
- 编辑个人资料
- 显示在线时长

**代码量：** 较多（⭐⭐⭐ 高级用法）

```javascript
// 关键的异步操作
const login = async (email, password) => {
  loading.value = true
  try {
    await new Promise(...)  // 模拟 API
    user.value = {...}      // 更新状态
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
```

---

### Demo 4️⃣: 购物车 (最复杂)

**文件：** `src/components/CartDemo.vue` + `src/stores/cartStore.js`

**核心概念：**
- 多个 Store - `productStore`、`cartStore`
- Store 间调用 - 在一个 Store 中使用另一个
- 复杂计算 - 使用 `reduce` 计算总价
- 链式计算 - Getter 依赖其他 Getter

**功能：**
- 产品列表展示
- 添加/删除购物车项目
- 修改数量
- 应用优惠码
- 计算总价（小计、折扣、运费、合计）
- 结账（调用其他 Store）

**代码量：** 最多（⭐⭐⭐⭐ 综合应用）

```javascript
// 关键的多 Store 协作
const checkout = () => {
  // 获取其他 Store
  const counterStore = useCounterStore()
  const productStore = useProductStore()
  
  // 调用其他 Store 的 Actions
  counterStore.addAmount(itemCount.value)
  productStore.updateStock(id, quantity)
}

// 关键的复杂计算
const subtotal = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})
```

---

## 🚀 快速开始

### 1️⃣ 安装依赖
```bash
npm install
```

### 2️⃣ 启动开发服务器
```bash
npm run dev
```

### 3️⃣ 打开浏览器
访问 `http://localhost:5173`

### 4️⃣ 查看 Demo
- 从 Demo 1 开始（最简单）
- 逐步学习 Demo 2、3、4
- 每个 Demo 都有代码示例和说明

---

## 📖 学习路径

### Day 1️⃣: 基础概念
- [ ] 阅读 README.md 的核心概念部分
- [ ] 运行 Demo 1，理解 State/Getters/Actions
- [ ] 修改 Demo 1 代码，添加新功能

### Day 2️⃣: 数组操作
- [ ] 阅读 README.md 的 Demo 2 部分
- [ ] 理解 filteredTodos 的实现
- [ ] 在 Demo 2 中添加"标签"功能

### Day 3️⃣: 异步操作
- [ ] 阅读 README.md 的 Demo 3 部分
- [ ] 理解 async/await 和错误处理
- [ ] 修改 Demo 3，添加真实的 API 调用

### Day 4️⃣: 多 Store
- [ ] 阅读 README.md 的 Demo 4 部分
- [ ] 理解 Store 间的调用方式
- [ ] 创建新的 Store 并与现有 Store 交互

### Day 5️⃣: 实战项目
- [ ] 创建自己的 Store
- [ ] 实现一个完整功能
- [ ] 使用 Vue DevTools 调试

---

## 💡 关键要点速记

| 概念 | 说明 | 示例 |
|------|------|------|
| **State** | 响应式数据 | `const count = ref(0)` |
| **Getter** | 计算属性 | `computed(() => count * 2)` |
| **Action** | 修改方法 | `const add = () => count++` |
| **Store** | 容器 | `defineStore('name', ...)` |
| **多Store** | Store 间调用 | `useOtherStore()` |
| **异步** | API 调用 | `async/await` + `try/catch` |

---

## 🛠️ 开发工具推荐

### VS Code 扩展
- **Vue - Official** - Vue3 官方扩展
- **Volar** - 更好的 Vue 支持
- **Vue DevTools** - 调试工具
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

### 浏览器插件
- **Vue DevTools** - 查看和调试 Vue 应用
- **React DevTools** - 观察 Pinia 状态变化

---

## 📚 完整文档

- **README.md** - 详细的教学文档（推荐先读）
- **QUICKSTART.md** - 快速启动指南（第一次用读这个）
- 各组件和 Store 文件的注释 - 代码级别的说明

---

## 🎯 学习成果

完成本项目后，你将能够：

✅ 创建和使用 Pinia Store  
✅ 管理复杂的应用状态  
✅ 处理异步操作和错误  
✅ 实现多 Store 协作  
✅ 编写可维护的代码  
✅ 使用开发者工具调试  

---

## 🐛 遇到问题？

### 问题 1: 浏览器显示空白页
- 检查浏览器控制台（F12）是否有错误
- 尝试硬刷新（Ctrl+Shift+R）
- 检查 main.js 是否正确配置

### 问题 2: Store 中的数据不更新
- 确保用 ref() 或 reactive() 声明状态
- 确保在 return 中暴露了状态
- 检查 Action 是否正确修改了状态

### 问题 3: 组件中看不到 Store 的变化
- 检查是否正确导入了 Store
- 检查是否调用了 useXxxStore()
- 打开 Vue DevTools 查看状态

---

## 🌟 下一步

### 进阶主题
- [ ] Pinia 插件开发
- [ ] Store 模块化和分包
- [ ] 状态持久化（localStorage）
- [ ] 状态同步（多标签页）

### 实战项目
- [ ] 构建自己的博客系统
- [ ] 开发在线购物应用
- [ ] 创建任务管理工具

### 组合框架
- [ ] Vue3 + Pinia + TypeScript
- [ ] Vue3 + Pinia + Element Plus
- [ ] Vue3 + Pinia + Vite + Tailwind CSS

---

## 📞 获取帮助

1. **查看代码注释** - 所有代码都有详细中文注释
2. **阅读 README.md** - 有完整的理论说明
3. **修改代码实验** - 最好的学习方式
4. **查看 Vue DevTools** - 可视化查看状态变化

---

**祝你学习愉快！** 🎉

记住：最好的学习方式就是 **动手修改代码** 并观察结果！
