<template>
  <div class="main-layout">
    <!-- 左侧目录 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <h2>📚 知识文档</h2>
        <button class="toggle-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          {{ sidebarCollapsed ? '▶' : '◀' }}
        </button>
      </div>
      <SidebarNav :active-key="activeKey" :collapsed="sidebarCollapsed" @navigate="handleNavigate" />
    </aside>

    <!-- 右侧内容 -->
    <main class="content-area">
      <ContentArea :active-key="activeKey" />
    </main>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import SidebarNav from './SidebarNav.vue';
import ContentArea from './ContentArea.vue';

const activeKey = ref('home');
const sidebarCollapsed = ref(false);

const handleNavigate = (key) => {
  activeKey.value = key;
};

provide('activeKey', activeKey);
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  background: #2c3e50;
  color: white;
  transition: width 0.3s ease;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background: #2c3e50;
  z-index: 10;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar.collapsed .sidebar-header h2 {
  display: none;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.content-area {
  flex: 1;
  overflow-y: auto;
  background: #f5f7fa;
}

/* 滚动条样式 */
.sidebar::-webkit-scrollbar,
.content-area::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track,
.content-area::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar::-webkit-scrollbar-thumb,
.content-area::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover,
.content-area::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    transform: translateX(0);
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
  }

  .content-area {
    margin-left: 0;
  }
}
</style>