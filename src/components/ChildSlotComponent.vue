<template>
  <div class="child-slot-component">
    <div class="slot-header">
      <slot name="header">
        <h4>📌 默认头部</h4>
      </slot>
    </div>

    <div class="slot-content">
      <h4>内容区域</h4>
      <slot>
        <p>这是默认内容。如果没有传入插槽内容，就显示这个</p>
      </slot>
    </div>

    <div class="slot-footer">
      <slot name="footer">
        <p>🔹 默认页脚</p>
      </slot>
    </div>

    <div class="slot-scoped">
      <h4>作用域插槽</h4>
      <slot name="scoped" :message="scopedMessage" :items="items">
        <p>默认：{{ scopedMessage }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scopedMessage = ref('来自子组件的作用域插槽消息')
const items = ref(['项目1', '项目2', '项目3'])
</script>

<style scoped>
.child-slot-component {
  padding: 15px;
  background: #e8eaf6;
  border-radius: 6px;
  border: 2px solid #3f51b5;
}

.slot-header {
  padding: 10px;
  background: #c5cae9;
  border-radius: 4px;
  margin-bottom: 10px;
  border-left: 3px solid #3f51b5;
}

.slot-header h4 {
  color: #3f51b5;
  margin: 0;
}

.slot-content {
  padding: 10px;
  background: white;
  border-radius: 4px;
  margin-bottom: 10px;
  border-left: 3px solid #3f51b5;
}

.slot-content h4 {
  color: #3f51b5;
  margin: 0 0 10px 0;
}

.slot-footer {
  padding: 10px;
  background: #c5cae9;
  border-radius: 4px;
  margin-bottom: 10px;
  border-left: 3px solid #3f51b5;
}

.slot-footer p {
  color: #3f51b5;
  margin: 0;
}

.slot-scoped {
  padding: 10px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #3f51b5;
}

.slot-scoped h4 {
  color: #3f51b5;
  margin: 0 0 10px 0;
}
</style>
