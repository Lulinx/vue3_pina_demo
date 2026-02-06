<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>🎓 前端知识文档网站</h1>
      <p class="subtitle">Vue3、Pinia、Taro、NUXT.JS、Flutter 完整学习指南</p>
    </div>

    <div class="content-grid">
      <div class="category-card" @click="navigateTo?.('typescript')">
        <div class="card-icon">🟦</div>
        <h3>TypeScript</h3>
        <p>从“类型基础”到“工程最佳实践”，一次性打通 TS 核心</p>
        <ul class="card-list">
          <li>type vs interface</li>
          <li>联合类型与类型缩小</li>
          <li>泛型与工具类型</li>
          <li>Vue3 + TS 实战写法</li>
          <li>tsconfig 关键配置</li>
        </ul>
      </div>

      <div class="category-card" @click="navigateTo?.('pinia-counter')">
        <div class="card-icon">📘</div>
        <h3>Vue3 + Pinia</h3>
        <p>深入理解状态管理的核心概念，从基础到高级应用</p>
        <ul class="card-list">
          <li>基础计数器</li>
          <li>Todo列表管理</li>
          <li>用户信息管理</li>
          <li>购物车（多Store）</li>
          <li>高级Pinia功能</li>
          <li>组件通信指南</li>
        </ul>
      </div>

      <div class="category-card" @click="navigateTo?.('taro')">
        <div class="card-icon">📱</div>
        <h3>Taro 框架</h3>
        <p>跨平台小程序开发框架，一套代码多端运行</p>
        <ul class="card-list">
          <li>基础语法和组件</li>
          <li>生命周期和路由</li>
          <li>常用API使用</li>
          <li>样式处理和状态管理</li>
          <li>最佳实践</li>
        </ul>
      </div>

      <div class="category-card" @click="navigateTo?.('nuxt')">
        <div class="card-icon">🚀</div>
        <h3>NUXT.JS</h3>
        <p>基于Vue.js的通用应用框架，服务端渲染和静态站点生成</p>
        <ul class="card-list">
          <li>项目结构和配置</li>
          <li>路由和页面</li>
          <li>数据获取和状态管理</li>
          <li>中间件和插件</li>
          <li>部署和优化</li>
        </ul>
      </div>

      <div class="category-card" @click="navigateTo?.('flutter')">
        <div class="card-icon">🦋</div>
        <h3>Flutter</h3>
        <p>Google 跨平台 UI 框架，用一套 Dart 代码构建多端应用</p>
        <ul class="card-list">
          <li>Dart 语法速通</li>
          <li>Widget 思维与布局</li>
          <li>状态管理与路由</li>
          <li>异步、网络与存储</li>
          <li>调试、性能与发布</li>
        </ul>
      </div>
    </div>

    <div class="features-section">
      <h2>✨ 特色功能</h2>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">📖</div>
          <h4>详细文档</h4>
          <p>每个知识点都有详细的讲解和代码示例</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">💻</div>
          <h4>实战演示</h4>
          <p>提供可运行的代码示例，边学边练</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <h4>系统学习</h4>
          <p>从基础到高级，循序渐进的学习路径</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🔍</div>
          <h4>快速查找</h4>
          <p>左侧目录导航，快速定位知识点</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 首页组件
import { inject } from 'vue';

const navigateTo = inject('navigateTo', null);
</script>

<style scoped>
.home-page {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-section .subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.category-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.category-card h3 {
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.category-card > p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-list li {
  padding: 8px 0;
  color: #555;
  border-bottom: 1px solid #f0f0f0;
}

.card-list li:last-child {
  border-bottom: none;
}

.card-list li::before {
  content: '✓ ';
  color: #667eea;
  font-weight: bold;
  margin-right: 8px;
}

.features-section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.features-section h2 {
  color: #667eea;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-item {
  text-align: center;
  padding: 20px;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-item h4 {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.feature-item p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .home-page {
    padding: 15px;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>