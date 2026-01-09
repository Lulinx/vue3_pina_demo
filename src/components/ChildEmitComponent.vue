<template>
  <div class="child-emit-component">
    <h4>📤 子组件发送事件</h4>
    <div class="input-group">
      <input v-model="message" type="text" placeholder="输入消息..." class="input" />
      <button @click="sendMessage" class="btn btn-primary">发送消息到父组件</button>
    </div>
    <div class="predefined-messages">
      <button
        v-for="msg in predefinedMessages"
        :key="msg"
        @click="sendMessage(msg)"
        class="btn btn-secondary"
      >
        {{ msg }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['childMessage'])

const message = ref('这是来自子组件的消息')
const predefinedMessages = ['👋 问候', '😊 微笑', '🚀 加油', '❤️ 喜欢']

const sendMessage = (msg = null) => {
  const sendMsg = msg || message.value
  emit('childMessage', sendMsg)
  if (!msg) {
    message.value = ''
  }
}
</script>

<style scoped>
.child-emit-component {
  padding: 15px;
  background: #fff3e0;
  border-radius: 6px;
  border: 2px solid #ff9800;
}

.child-emit-component h4 {
  color: #ff9800;
  margin-bottom: 12px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ff9800;
  border-radius: 4px;
  font-size: 0.9rem;
}

.input:focus {
  outline: none;
  border-color: #e65100;
  box-shadow: 0 0 8px rgba(255, 152, 0, 0.3);
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: #ff9800;
  color: white;
}

.btn-primary:hover {
  background: #e65100;
  transform: translateY(-2px);
}

.predefined-messages {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-secondary {
  background: #ffe0b2;
  color: #e65100;
  font-size: 0.85rem;
}

.btn-secondary:hover {
  background: #ffcc80;
}
</style>
