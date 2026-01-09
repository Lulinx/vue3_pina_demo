<template>
  <div class="counter-demo">
    <div class="state-display">
      <div class="state-item">
        <span class="label">当前计数</span>
        <span class="value">{{ counterStore.count }}</span>
      </div>
      <div class="state-item">
        <span class="label">双倍值</span>
        <span class="value">{{ counterStore.doubleCount }}</span>
      </div>
      <div class="state-item">
        <span class="label">是否偶数</span>
        <span class="badge" :class="counterStore.isEven ? 'success' : 'error'">
          {{ counterStore.isEven ? "是" : "否" }}
        </span>
      </div>
    </div>

    <div class="actions">
      <button @click="counterStore.decrement" class="btn btn-primary">
        -1
      </button>
      <button @click="counterStore.increment" class="btn btn-primary">
        +1
      </button>
      <button @click="() => counterStore.addAmount(5)" class="btn btn-primary">
        +5
      </button>
      <button @click="counterStore.reset" class="btn btn-danger">重置</button>
    </div>

    <div v-if="counterStore.history.length > 0" class="history">
      <h4>📜 操作历史</h4>
      <div class="history-list">
        <p
          v-for="(item, idx) in counterStore.history"
          :key="idx"
          class="history-item"
        >
          {{ item }}
        </p>
      </div>
    </div>

    <div class="code-example">
      <h4>💻 代码示例</h4>
      <pre v-pre><code>// 在组件中使用 Store
import { useCounterStore } from '@/stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()
    
    // 直接访问 state
    console.log(counterStore.count)
    
    // 调用 actions
    counterStore.increment()
    
    // 使用 getters（计算属性）
    console.log(counterStore.doubleCount)
    
    return { counterStore }
  }
}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counterStore";

const counterStore = useCounterStore();
</script>

<style scoped>
.counter-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.state-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.state-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 8px;
}

.value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.badge.success {
  background: #10b981;
  color: white;
}

.badge.error {
  background: #ef4444;
  color: white;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.history {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}

.history h4 {
  margin-bottom: 10px;
  color: #333;
}

.history-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.history-item {
  background: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  border-left: 3px solid #667eea;
}

.code-example {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.85rem;
  overflow-x: auto;
}

.code-example h4 {
  color: #f8f8f2;
  margin-bottom: 10px;
}

pre {
  margin: 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

@media (max-width: 768px) {
  .state-display {
    grid-template-columns: 1fr;
  }
}
</style>
