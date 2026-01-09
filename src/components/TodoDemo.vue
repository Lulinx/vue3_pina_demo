<template>
  <div class="todo-demo">
    <!-- 统计信息 -->
    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">总数</span>
        <span class="stat-value">{{ todoStore.stats.total }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">未完成</span>
        <span class="stat-value">{{ todoStore.stats.active }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">已完成</span>
        <span class="stat-value">{{ todoStore.stats.completed }}</span>
      </div>
    </div>

    <!-- 新增 Todo 输入 -->
    <div class="input-group">
      <input
        v-model="newTodoTitle"
        type="text"
        placeholder="输入新的任务..."
        @keyup.enter="addNewTodo"
        class="input"
      >
      <button @click="addNewTodo" class="btn btn-primary">添加</button>
    </div>

    <!-- 过滤器 -->
    <div class="filters">
      <button
        v-for="f in ['all', 'active', 'completed']"
        :key="f"
        @click="todoStore.setFilter(f)"
        :class="['filter-btn', { active: todoStore.filter === f }]"
      >
        {{ filterLabels[f] }}
      </button>
      <button v-if="todoStore.stats.completed > 0" @click="todoStore.clearCompleted" class="btn btn-danger">
        清空已完成
      </button>
    </div>

    <!-- Todo 列表 -->
    <div class="todo-list">
      <div v-if="todoStore.filteredTodos.length === 0" class="empty-state">
        <p>✨ 暂无任务</p>
      </div>
      
      <div v-for="todo in todoStore.filteredTodos" :key="todo.id" class="todo-item" :class="{ completed: todo.completed }">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="todoStore.toggleTodo(todo.id)"
          class="checkbox"
        >
        <div class="todo-content">
          <span class="todo-title">{{ todo.title }}</span>
          <span class="todo-time">{{ todo.createdAt }}</span>
        </div>
        <button @click="todoStore.removeTodo(todo.id)" class="btn-delete">🗑️</button>
      </div>
    </div>

    <!-- 代码示例 -->
    <div class="code-example">
      <h4>💻 关键代码示例</h4>
      <pre v-pre><code>// 1. 添加 Todo
const addTodo = (title) => {
  todos.value.push({
    id: nextId.value++,
    title,
    completed: false
  })
}

// 2. 切换完成状态
const toggleTodo = (id) => {
  const todo = todos.value.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

// 3. 使用 getter 过滤数据
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todoStore'

const todoStore = useTodoStore()
const newTodoTitle = ref('')

const filterLabels = {
  all: '全部',
  active: '未完成',
  completed: '已完成'
}

const addNewTodo = () => {
  if (newTodoTitle.value.trim()) {
    todoStore.addTodo(newTodoTitle.value)
    newTodoTitle.value = ''
  }
}
</script>

<style scoped>
.todo-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-item {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 8px;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}

.input-group {
  display: flex;
  gap: 10px;
}

.input {
  flex: 1;
  padding: 10px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 1.1rem;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f9fafb;
  border-radius: 6px;
  border-left: 4px solid #667eea;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #f3f4f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  opacity: 0.6;
  border-left-color: #10b981;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #999;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.todo-title {
  font-weight: 500;
  color: #111;
}

.todo-time {
  font-size: 0.8rem;
  color: #999;
}

.btn-delete {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px 8px;
  transition: transform 0.3s;
}

.btn-delete:hover {
  transform: scale(1.2);
}

.code-example {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.8rem;
  overflow-x: auto;
}

.code-example h4 {
  color: #f8f8f2;
  margin-bottom: 10px;
}

pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .input-group {
    flex-direction: column;
  }
}
</style>
