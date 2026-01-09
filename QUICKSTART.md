# 🚀 快速启动指南

## 第一步：安装依赖

在项目目录下运行：

```bash
npm install
```

这会安装以下依赖：
- **Vue3** - 前端框架
- **Pinia** - 状态管理库
- **Vite** - 构建工具
- **@vitejs/plugin-vue** - Vue3 的 Vite 插件

## 第二步：启动开发服务器

```bash
npm run dev
```

你会看到类似的输出：

```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

**浏览器会自动打开** `http://localhost:5173`

## 第三步：探索 Demo

打开浏览器后，你会看到 4 个 Demo，从上到下分别是：

### 📍 Demo 1: 基础计数器
- **文件位置** `src/components/CounterDemo.vue`、`src/stores/counterStore.js`
- **学习目标** 学习 State、Getters、Actions 基础
- **可以做的操作** 点击按钮改变计数，查看历史记录

### 📍 Demo 2: Todo 列表
- **文件位置** `src/components/TodoDemo.vue`、`src/stores/todoStore.js`
- **学习目标** 学习数组操作、CRUD、复杂 Getter
- **可以做的操作** 添加/删除 Todo、切换完成状态、过滤列表

### 📍 Demo 3: 用户信息
- **文件位置** `src/components/UserDemo.vue`、`src/stores/userStore.js`
- **学习目标** 学习异步 Action、错误处理、加载状态
- **可以做的操作** 登录/登出、编辑用户信息

### 📍 Demo 4: 购物车
- **文件位置** `src/components/CartDemo.vue`、`src/stores/cartStore.js`
- **学习目标** 学习多个 Store 的创建和相互调用
- **可以做的操作** 添加商品、应用优惠码、结账

## 第四步：修改代码

### 修改 Demo 1（计数器）

打开 `src/components/CounterDemo.vue`，尝试：

1. **添加新的 Getter**
   
   编辑 `src/stores/counterStore.js`：
   ```javascript
   // 新增这个 getter
   const isNegative = computed(() => count.value < 0)
   
   // 别忘了在 return 中加入
   return { 
     // ... 其他
     isNegative
   }
   ```

2. **添加新的 Action**
   ```javascript
   const multiply = (factor) => {
     count.value *= factor
   }
   ```

3. **在组件中使用**
   ```vue
   <button @click="() => counterStore.multiply(2)">×2</button>
   ```

### 热更新测试

修改代码后，浏览器会自动刷新！这就是 Vite 的热更新（HMR）功能。

## 第五步：理解项目结构

```
src/
├── main.js              # 应用入口，创建 Pinia 实例
├── App.vue              # 主应用组件，导入各个 Demo
├── components/          # 所有 Demo 组件
│   ├── CounterDemo.vue
│   ├── TodoDemo.vue
│   ├── UserDemo.vue
│   └── CartDemo.vue
└── stores/              # 所有 Store（状态管理）
    ├── counterStore.js
    ├── todoStore.js
    ├── userStore.js
    └── cartStore.js
```

## 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 安装新依赖
npm install package-name

# 删除 node_modules 并重新安装
rm -rf node_modules && npm install
```

## 常见问题

### Q: 启动时出现 "port 5173 is already in use"

**解决方案：**
```bash
# 方案 1：使用另一个端口
npm run dev -- --port 3000

# 方案 2：杀死占用 5173 的进程
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

### Q: "Cannot find module 'pinia'"

**解决方案：**
```bash
npm install
```

### Q: 修改代码后浏览器没有自动刷新

**解决方案：**
1. 检查是否保存了文件（Ctrl+S）
2. 手动刷新浏览器（F5 或 Cmd+R）
3. 重启开发服务器

### Q: 如何调试状态？

1. 打开浏览器开发者工具（F12）
2. 找到 Vue DevTools 标签
3. 选择 "Pinia" 标签
4. 可以查看所有 Store 的状态和操作历史

## 学习路线

### 第一天：理解基础概念
1. 阅读 README.md 中的 "Pinia 核心概念"
2. 运行 Demo 1（计数器）并尝试修改
3. 尝试添加新的 State 和 Action

### 第二天：掌握 CRUD 操作
1. 研究 Demo 2（Todo 列表）
2. 修改过滤器，添加新的分类方式
3. 尝试添加"已标记"功能

### 第三天：异步操作和错误处理
1. 研究 Demo 3（用户管理）
2. 修改登录逻辑，添加真实的验证
3. 实现"记住我"功能

### 第四天：多 Store 协作
1. 研究 Demo 4（购物车）
2. 在结账时添加订单确认
3. 实现订单历史记录 Store

### 第五天：实践项目
1. 创建你自己的 Store
2. 实现一个完整的功能模块
3. 使用 Vue DevTools 进行调试

## 下一步

### 推荐学习资源

- 📘 [Vue3 官方文档](https://vuejs.org/)
- 📗 [Pinia 官方文档](https://pinia.vuejs.org/)
- 📙 [Vite 官方文档](https://vitejs.dev/)

### 实战项目想法

1. **博客系统** - 用户管理 + 文章管理 + 评论管理
2. **在线商城** - 产品列表 + 购物车 + 订单管理
3. **任务管理** - 项目管理 + 团队协作 + 任务进度
4. **社交应用** - 用户信息 + 帖子管理 + 评论系统

## 需要帮助？

1. **查看代码注释** - 每个文件都有详细的中文注释
2. **查看示例代码** - 点击 Demo 中的"💻 代码示例"部分
3. **查看完整文档** - 阅读 README.md
4. **修改并实验** - 最好的学习方式就是动手修改代码

---

**祝你学习愉快！** 🎉

有任何问题，都可以通过修改代码并观察结果来学习。不要害怕出错——出错是学习的最好方式！
