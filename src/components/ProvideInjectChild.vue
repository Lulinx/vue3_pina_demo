<template>
  <div class="provide-inject-child" :style="{ marginLeft: level * 20 + 'px' }">
    <div class="child-card">
      <h5>🎁 Inject 子组件 (Level {{ level }})</h5>
      <div class="injected-data" v-if="injectionData">
        <p><strong>主题：</strong> {{ injectionData.theme }}</p>
        <p><strong>语言：</strong> {{ injectionData.language }}</p>
        <p><strong>用户：</strong> {{ injectionData.user.name }}</p>
      </div>
      <div class="actions">
        <button @click="changeTheme" class="btn btn-small">切换主题</button>
      </div>
    </div>
    <!-- 多层嵌套演示 -->
    <ProvideInjectChild v-if="level < 3" :level="level + 1" />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import ProvideInjectChild from './ProvideInjectChild.vue'

const props = defineProps({
  level: {
    type: Number,
    default: 1
  }
})

// 注入父组件提供的数据
const injectionData = inject('injectionData')

const changeTheme = () => {
  if (injectionData) {
    injectionData.theme = injectionData.theme === 'dark' ? 'light' : 'dark'
  }
}
</script>

<style scoped>
.provide-inject-child {
  margin-top: 10px;
  padding: 10px;
  background: rgba(0, 150, 136, 0.1);
  border-radius: 6px;
  border-left: 3px solid #009688;
}

.child-card {
  padding: 12px;
  background: white;
  border-radius: 4px;
  border: 1px solid #009688;
}

.child-card h5 {
  color: #009688;
  margin: 0 0 10px 0;
  font-size: 0.95rem;
}

.injected-data {
  padding: 10px;
  background: #f1f8f7;
  border-radius: 4px;
  margin-bottom: 10px;
}

.injected-data p {
  margin: 5px 0;
  font-size: 0.85rem;
  color: #00796b;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 0.85rem;
}

.btn-small {
  background: #009688;
  color: white;
}

.btn-small:hover {
  background: #00796b;
  transform: translateY(-2px);
}
</style>
