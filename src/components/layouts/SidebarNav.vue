<template>
  <nav class="sidebar-nav" :class="{ collapsed: collapsed }">
    <div class="nav-section" v-for="section in navItems" :key="section.title">
      <div class="section-title" v-if="!collapsed">
        {{ section.title }}
      </div>
      <ul class="nav-list">
        <li
          v-for="item in section.items"
          :key="item.key"
          :class="['nav-item', { active: activeKey === item.key }]"
          @click="$emit('navigate', item.key)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  activeKey: {
    type: String,
    default: 'home'
  },
  collapsed: {
    type: Boolean,
    default: false
  }
});

defineEmits(['navigate']);

const navItems = [
  {
    title: '🏠 首页',
    items: [
      { key: 'home', label: '首页概览', icon: '🏠' }
    ]
  },
  {
    title: '🧩 语言与工程',
    items: [{ key: 'typescript', label: 'TypeScript 重点详解', icon: '🟦' }]
  },
  {
    title: '📘 Vue3 + Pinia',
    items: [
      { key: 'pinia-counter', label: '基础计数器', icon: '🔢' },
      { key: 'pinia-todo', label: 'Todo列表管理', icon: '✅' },
      { key: 'pinia-user', label: '用户信息管理', icon: '👤' },
      { key: 'pinia-cart', label: '购物车（多Store）', icon: '🛒' },
      { key: 'pinia-advanced', label: '高级Pinia功能', icon: '⚡' },
      { key: 'pinia-communication', label: '组件通信指南', icon: '💬' }
    ]
  },
  {
    title: '📱 框架知识',
    items: [
      { key: 'taro', label: 'Taro 基础知识', icon: '📱' },
      { key: 'nuxt', label: 'NUXT.JS 基础知识', icon: '🚀' },
      { key: 'flutter', label: 'Flutter 基础知识', icon: '🦋' },
      { key: 'webgl', label: 'WebGL 基础知识', icon: '🎨' }
    ]
  },
  {
    title: '🎯 面试与进阶',
    items: [
      { key: 'interview', label: '各大厂面试题', icon: '🎯' }
    ]
  }
];
</script>

<style scoped>
.sidebar-nav {
  padding: 10px 0;
}

.nav-section {
  margin-bottom: 20px;
}

.section-title {
  padding: 10px 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(102, 126, 234, 0.2);
  color: white;
  border-left-color: #667eea;
  font-weight: 600;
}

.nav-icon {
  margin-right: 12px;
  font-size: 1.1rem;
  min-width: 20px;
  text-align: center;
}

.nav-text {
  flex: 1;
  white-space: nowrap;
}

/* 折叠状态 */
.sidebar-nav.collapsed .section-title,
.sidebar-nav.collapsed .nav-text {
  display: none;
}

.sidebar-nav.collapsed .nav-item {
  justify-content: center;
  padding: 12px;
}

.sidebar-nav.collapsed .nav-icon {
  margin-right: 0;
}
</style>