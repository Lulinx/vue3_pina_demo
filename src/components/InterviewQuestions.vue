<template>
  <div class="interview-guide">
    <div class="guide-header">
      <h1>🎯 前端120道面试题详解</h1>
      <p class="subtitle">JS/HTML/CSS/Vue/React/Node/Webpack/Vite 等前端全栈技术面试题 + 大厂真题</p>
    </div>

    <div class="guide-content">
      <!-- 导航菜单 -->
      <div class="nav-menu">
        <button
          v-for="category in categories"
          :key="category.key"
          :class="['nav-btn', { active: activeCategory === category.key }]"
          @click="switchCategory(category.key)"
        >
          {{ category.icon }} {{ category.label }}
          <span class="question-count">{{ category.count }}</span>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <Suspense>
          <component :is="currentComponent" />
          <template #fallback>
            <div class="loading">
              <div class="loading-spinner"></div>
              <p>正在加载面试题...</p>
            </div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, defineAsyncComponent } from 'vue'

// 导航菜单配置
const categories = [
  { key: 'js', label: 'JavaScript', icon: '🟨', count: 10 },
  { key: 'html-css', label: 'HTML/CSS', icon: '🎨', count: 8 },
  { key: 'vue', label: 'Vue.js', icon: '💚', count: 7 },
  { key: 'react', label: 'React', icon: '⚛️', count: 7 },
  { key: 'build-tools', label: '构建工具', icon: '🔧', count: 7 }
]

const activeCategory = ref('js')
const currentComponent = shallowRef(null)

// 组件映射
const componentMap = {
  js: defineAsyncComponent(() => import('./questions/JavaScriptQuestions.vue')),
  'html-css': defineAsyncComponent(() => import('./questions/HTMLCSSQuestions.vue')),
  vue: defineAsyncComponent(() => import('./questions/VueQuestions.vue')),
  react: defineAsyncComponent(() => import('./questions/ReactQuestions.vue')),
  'build-tools': defineAsyncComponent(() => import('./questions/BuildToolsQuestions.vue'))
}

// 切换分类
const switchCategory = (categoryKey) => {
  activeCategory.value = categoryKey
  currentComponent.value = componentMap[categoryKey]
}

// 初始化默认组件
switchCategory('js')
</script>

<style scoped>
.interview-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.guide-header {
  text-align: center;
  margin-bottom: 30px;
}

.guide-header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 16px;
}

.nav-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.nav-btn {
  position: relative;
  padding: 10px 15px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.question-count {
  background: #007bff;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  margin-left: 5px;
}

.nav-btn:hover {
  border-color: #007bff;
}

.nav-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.content-wrapper {
  min-height: 600px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  color: #6c757d;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.guide-section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.content-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.question-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.question-title {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 18px;
}

.question-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 14px;
}

.difficulty, .frequency {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.difficulty {
  background: #fff3cd;
  color: #856404;
}

.frequency {
  background: #d1ecf1;
  color: #0c5460;
}

.question-content {
  line-height: 1.6;
}

.question-content h5 {
  color: #495057;
  margin: 20px 0 10px 0;
  font-size: 16px;
}

.question-content p {
  margin: 10px 0;
}

.question-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.question-content li {
  margin: 5px 0;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 15px;
  margin: 10px 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
}
</style>