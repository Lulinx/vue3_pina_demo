<template>
  <div class="child-component">
    <div class="props-display">
      <h4>📥 接收的 Props：</h4>
      <div class="prop-item">
        <span class="label">message:</span>
        <span class="value">{{ message }}</span>
      </div>
      <div class="prop-item">
        <span class="label">count:</span>
        <span class="value">{{ count }}</span>
      </div>
      <div class="prop-item">
        <span class="label">user.name:</span>
        <span class="value">{{ user.name }}</span>
      </div>
      <div class="prop-item">
        <span class="label">user.role:</span>
        <span class="value">{{ user.role }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  // 定义 Props
  defineProps({
    message: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  });
</script>

<style scoped>
  .child-component {
    padding: 15px;
    background: #f0f4ff;
    border-radius: 6px;
    border: 2px solid #667eea;
  }

  .child-component h4 {
    color: #667eea;
    margin-bottom: 12px;
  }

  .prop-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    margin: 5px 0;
    background: white;
    border-radius: 4px;
    border-left: 3px solid #667eea;
  }

  .label {
    font-weight: 600;
    color: #333;
  }

  .value {
    color: #667eea;
    font-weight: 600;
  }
</style>
