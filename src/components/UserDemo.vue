<template>
  <div class="user-demo">
    <!-- 登录/用户信息状态 -->
    <div v-if="!userStore.isLoggedIn" class="login-section">
      <h3>登录账户</h3>
      <div class="login-form">
        <input
          v-model="email"
          type="email"
          placeholder="输入邮箱 (如: admin@example.com)"
          class="input"
        />
        <input
          v-model="password"
          type="password"
          placeholder="输入密码"
          @keyup.enter="handleLogin"
          class="input"
        />
        <button @click="handleLogin" :disabled="userStore.loading" class="btn btn-primary">
          {{ userStore.loading ? '登录中...' : '登录' }}
        </button>
        <p v-if="userStore.error" class="error-msg">❌ {{ userStore.error }}</p>
        <p class="tips">💡 提示：邮箱包含 "admin" 时角色为管理员</p>
      </div>
    </div>

    <!-- 用户已登录 -->
    <div v-else class="user-section">
      <!-- 用户卡片 -->
      <div class="user-card">
        <img :src="userStore.user.avatar" :alt="userStore.user.name" class="avatar" />
        <div class="user-info">
          <h3>{{ userStore.user.name }}</h3>
          <p class="email">{{ userStore.user.email }}</p>
          <div class="user-meta">
            <span class="badge" :class="userStore.userInfo.isAdmin ? 'admin' : 'user'">
              {{ userStore.userInfo.isAdmin ? '管理员' : '普通用户' }}
            </span>
            <span class="badge">年龄: {{ userStore.user.age }}岁</span>
            <span class="badge">登录: {{ userStore.sessionDuration }}</span>
          </div>
        </div>
        <button @click="userStore.logout" class="btn btn-danger">登出</button>
      </div>

      <!-- 用户统计 -->
      <div class="stats">
        <div class="stat-card">
          <span class="stat-label">用户ID</span>
          <span class="stat-value">{{ userStore.user.id.toFixed(4) }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">账户角色</span>
          <span class="stat-value">{{ userStore.user.role }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">会话时长</span>
          <span class="stat-value">{{ userStore.sessionDuration }}</span>
        </div>
      </div>

      <!-- 修改用户信息 -->
      <div class="edit-section">
        <h4>编辑个人信息</h4>
        <div class="edit-form">
          <input v-model="editForm.name" type="text" placeholder="姓名" class="input" />
          <input v-model="editForm.age" type="number" placeholder="年龄" class="input" />
          <button @click="saveUserInfo" class="btn btn-primary">保存信息</button>
        </div>
      </div>
    </div>

    <!-- 代码示例 -->
    <div class="code-example">
      <h4>💻 异步 Action 示例</h4>
      <pre v-pre><code>// 异步 Action（支持 async/await）
const login = async (email, password) => {
  loading.value = true
  error.value = null
  
  try {
    // 模拟 API 调用
    await new Promise(resolve => 
      setTimeout(resolve, 1000)
    )
    
    // 更新用户数据
    user.value = {
      id: Math.random(),
      name: '张三',
      email,
      role: email.includes('admin') ? 'admin' : 'user'
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 在组件中使用
const handleLogin = async () => {
  const success = await userStore.login(email, password)
  if (success) {
    console.log('登录成功')
  }
}</code></pre>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { useUserStore } from '@/stores/userStore';

  const userStore = useUserStore();
  const email = ref('');
  const password = ref('');
  const editForm = reactive({
    name: '',
    age: '',
  });

  const handleLogin = async () => {
    await userStore.login(email.value, password.value);
  };

  const saveUserInfo = () => {
    userStore.updateUser({
      name: editForm.name || userStore.user.name,
      age: editForm.age || userStore.user.age,
    });
    editForm.name = '';
    editForm.age = '';
  };
</script>

<style scoped>
  .user-demo {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }

  .login-section,
  .user-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .login-section h3 {
    color: #667eea;
    font-size: 1.3rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .input {
    padding: 12px 15px;
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
    padding: 12px 20px;
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

  .btn-primary:hover:not(:disabled) {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-danger {
    background: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }

  .error-msg {
    color: #ef4444;
    font-weight: 600;
    text-align: center;
  }

  .tips {
    color: #667eea;
    font-size: 0.9rem;
    text-align: center;
  }

  .user-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 20px;
    align-items: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid white;
  }

  .user-info h3 {
    margin-bottom: 5px;
    font-size: 1.3rem;
  }

  .email {
    opacity: 0.9;
    margin-bottom: 12px;
    font-size: 0.95rem;
  }

  .user-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  .badge.admin {
    background: #fbbf24;
    color: #78350f;
  }

  .badge.user {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  .stat-card {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stat-label {
    color: #999;
    font-size: 0.9rem;
  }

  .stat-value {
    color: #111;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .edit-section {
    background: #f9fafb;
    padding: 20px;
    border-radius: 8px;
  }

  .edit-section h4 {
    color: #667eea;
    margin-bottom: 15px;
  }

  .edit-form {
    display: flex;
    gap: 10px;
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
    .user-card {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .stats {
      grid-template-columns: 1fr;
    }

    .edit-form {
      flex-direction: column;
    }
  }
</style>
