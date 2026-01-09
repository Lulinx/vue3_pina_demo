<template>
  <div class="app-container">
    <header class="app-header">
      <h1>🎓 Vue3 + Pinia 完整学习指南</h1>
      <p>深入理解状态管理的核心概念</p>
    </header>

    <main class="demos-grid">
      <!-- Demo 1: 基础计数器 -->
      <section class="demo-card">
        <h2>📍 Demo 1: 基础计数器</h2>
        <p class="subtitle">最简单的Pinia使用方式</p>
        <CounterDemo />
      </section>

      <!-- Demo 2: Todo列表 -->
      <section class="demo-card">
        <h2>📍 Demo 2: Todo列表管理</h2>
        <p class="subtitle">展示Pinia的增删改查操作</p>
        <TodoDemo />
      </section>

      <!-- Demo 3: 用户信息 -->
      <section class="demo-card">
        <h2>📍 Demo 3: 用户信息管理</h2>
        <p class="subtitle">展示getters和复杂状态</p>
        <UserDemo />
      </section>

      <!-- Demo 4: 购物车 -->
      <section class="demo-card">
        <h2>📍 Demo 4: 购物车（多Store）</h2>
        <p class="subtitle">展示多个Store之间的协作</p>
        <CartDemo />
      </section>
    </main>

    <!-- Demo 5: 高级Pinia功能 -->
    <div class="advanced-section">
      <AdvancedPiniaDemo />
    </div>

    <!-- Demo 6: 组件通信指南 -->
    <div class="communication-section">
      <CommunicationGuide />
    </div>

    <footer class="app-footer">
      <h3>💡 Pinia 核心概念总结</h3>
      <ul class="concepts-list">
        <li><strong>State:</strong> 存储应用的响应式状态数据</li>
        <li><strong>Getters:</strong> 类似computed，用于计算派生状态</li>
        <li><strong>Actions:</strong> 修改状态的方法，可以是同步或异步</li>
        <li><strong>Store:</strong> 组合State、Getters、Actions的容器</li>
        <li><strong>多Store:</strong> 可创建多个Store，彼此独立或相互调用</li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
  import CounterDemo from './components/CounterDemo.vue';
  import TodoDemo from './components/TodoDemo.vue';
  import UserDemo from './components/UserDemo.vue';
  import CartDemo from './components/CartDemo.vue';
  import AdvancedPiniaDemo from './components/AdvancedPiniaDemo.vue';
  import CommunicationGuide from './components/CommunicationGuide.vue';
</script>

<style scoped>
  .app-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 40px 20px;
  }

  .app-header {
    text-align: center;
    color: white;
    margin-bottom: 50px;
    animation: slideDown 0.6s ease;
  }

  .app-header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .app-header p {
    font-size: 1.1rem;
    opacity: 0.9;
  }

  .demos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }

  .demo-card {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: fadeInUp 0.6s ease;
  }

  .demo-card h2 {
    color: #667eea;
    margin-bottom: 8px;
    font-size: 1.5rem;
  }

  .subtitle {
    color: #999;
    font-size: 0.95rem;
    margin-bottom: 20px;
  }

  .advanced-section {
    margin-bottom: 40px;
  }

  .communication-section {
    margin-bottom: 40px;
  }

  .app-footer {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 40px;
    max-width: 1400px;
    margin: 0 auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .app-footer h3 {
    color: #667eea;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }

  .concepts-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .concepts-list li {
    background: #f5f5f5;
    padding: 15px;
    border-left: 4px solid #667eea;
    border-radius: 4px;
    line-height: 1.6;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .demos-grid {
      grid-template-columns: 1fr;
    }

    .app-header h1 {
      font-size: 1.8rem;
    }

    .concepts-list {
      grid-template-columns: 1fr;
    }
  }
</style>
