import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Demo 3: 用户信息 Store
 * 演示：复杂状态、异步 Action、派生状态
 */
export const useUserStore = defineStore('user', () => {
  // ============= STATE =============
  const user = ref({
    id: null,
    name: '',
    email: '',
    age: null,
    role: '',
    avatar: ''
  })

  const loading = ref(false)
  const error = ref(null)
  const loginTime = ref(null)

  // ============= GETTERS =============
  const isLoggedIn = computed(() => !!user.value.id)

  const userInfo = computed(() => ({
    ...user.value,
    isAdmin: user.value.role === 'admin',
    isVIP: user.value.role === 'vip'
  }))

  const sessionDuration = computed(() => {
    if (!loginTime.value) return '未登录'
    const now = new Date()
    const duration = Math.floor((now - loginTime.value) / 1000)
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    return `${hours}h ${minutes}m`
  })

  // ============= ACTIONS =============

  // 模拟登录（异步 Action）
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      // 模拟 API 调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录逻辑
      if (email && password) {
        user.value = {
          id: Math.random(),
          name: '张三',
          email,
          age: 25,
          role: email.includes('admin') ? 'admin' : 'user',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
        }
        loginTime.value = new Date()
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

  // 登出
  const logout = () => {
    user.value = {
      id: null,
      name: '',
      email: '',
      age: null,
      role: '',
      avatar: ''
    }
    loginTime.value = null
  }

  // 更新用户信息
  const updateUser = (newData) => {
    user.value = { ...user.value, ...newData }
  }

  // 获取用户信息（模拟异步获取）
  const fetchUserInfo = async (userId) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      user.value = {
        id: userId,
        name: '李四',
        email: 'lisi@example.com',
        age: 28,
        role: 'vip',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi'
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    isLoggedIn,
    userInfo,
    sessionDuration,
    login,
    logout,
    updateUser,
    fetchUserInfo
  }
})
