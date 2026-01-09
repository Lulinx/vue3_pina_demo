import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Demo 2: Todo 列表 Store
 * 演示：数组操作、CRUD（增删改查）操作
 */
export const useTodoStore = defineStore('todo', () => {
  // ============= STATE =============
  const todos = ref([])
  const nextId = ref(1)
  const filter = ref('all') // all, active, completed

  // ============= GETTERS =============
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  const stats = computed(() => ({
    total: todos.value.length,
    active: todos.value.filter(t => !t.completed).length,
    completed: todos.value.filter(t => t.completed).length
  }))

  // ============= ACTIONS =============
  
  // 添加 Todo
  const addTodo = (title) => {
    todos.value.push({
      id: nextId.value++,
      title,
      completed: false,
      createdAt: new Date().toLocaleString()
    })
  }

  // 删除 Todo
  const removeTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  // 切换 Todo 完成状态
  const toggleTodo = (id) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  // 编辑 Todo
  const editTodo = (id, newTitle) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.title = newTitle
    }
  }

  // 清空所有完成项
  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  // 设置过滤器
  const setFilter = (newFilter) => {
    filter.value = newFilter
  }

  // 全选/全不选
  const toggleAll = (completed) => {
    todos.value.forEach(todo => {
      todo.completed = completed
    })
  }

  return {
    todos,
    filter,
    filteredTodos,
    stats,
    addTodo,
    removeTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    setFilter,
    toggleAll
  }
})
