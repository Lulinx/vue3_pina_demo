<template>
  <div class="child-attrs-component" v-bind="$attrs">
    <h4>📋 $attrs 属性穿透演示</h4>
    <div class="attrs-display">
      <p><strong>子组件接收到的 $attrs：</strong></p>
      <pre>{{ JSON.stringify($attrs, null, 2) }}</pre>
    </div>
    <div class="explanation">
      <p>所有未被 defineProps 声明的属性都会被放入 $attrs</p>
      <p>这在创建通用包装组件时很有用</p>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  // 只声明特定的 props，其他属性会被放入 $attrs
  defineProps({
    // 这里可以声明一些 props
  });
</script>

<style scoped>
  .child-attrs-component {
    padding: 15px;
    background: #f1f8e9;
    border-radius: 6px;
    border: 2px solid #8bc34a;
  }

  .child-attrs-component h4 {
    color: #8bc34a;
    margin: 0 0 12px 0;
  }

  .attrs-display {
    padding: 12px;
    background: white;
    border-radius: 4px;
    border-left: 3px solid #8bc34a;
    margin-bottom: 10px;
  }

  .attrs-display p {
    color: #558b2f;
    font-weight: 600;
    margin: 0 0 10px 0;
  }

  .attrs-display pre {
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0;
    font-size: 0.8rem;
    color: #333;
  }

  .explanation {
    padding: 10px;
    background: #fffde7;
    border-radius: 4px;
    border-left: 3px solid #fbc02d;
  }

  .explanation p {
    color: #f57f17;
    margin: 5px 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .explanation p:first-child {
    margin-top: 0;
  }

  .explanation p:last-child {
    margin-bottom: 0;
  }
</style>
