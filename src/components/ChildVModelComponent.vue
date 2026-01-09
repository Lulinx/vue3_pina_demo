<template>
  <div class="child-vmodel-component">
    <h4>🔄 v-model 双向绑定</h4>
    <div class="form-group">
      <label>标题：</label>
      <input
        :value="title"
        @input="$emit('update:title', $event.target.value)"
        type="text"
        class="input"
      />
    </div>
    <div class="form-group">
      <label>内容：</label>
      <textarea
        :value="content"
        @input="$emit('update:content', $event.target.value)"
        class="textarea"
      ></textarea>
    </div>
    <div class="info">
      <p>标题长度：{{ title.length }} 字符</p>
      <p>内容长度：{{ content.length }} 字符</p>
    </div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  defineProps({
    title: String,
    content: String,
  });

  defineEmits(['update:title', 'update:content']);
</script>

<style scoped>
  .child-vmodel-component {
    padding: 15px;
    background: #f3e5f5;
    border-radius: 6px;
    border: 2px solid #9c27b0;
  }

  .child-vmodel-component h4 {
    color: #9c27b0;
    margin-bottom: 12px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #7b1fa2;
    font-weight: 600;
  }

  .input,
  .textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #9c27b0;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.9rem;
  }

  .input:focus,
  .textarea:focus {
    outline: none;
    border-color: #7b1fa2;
    box-shadow: 0 0 8px rgba(156, 39, 176, 0.3);
  }

  .textarea {
    resize: vertical;
    min-height: 80px;
  }

  .info {
    padding: 10px;
    background: white;
    border-radius: 4px;
    border-left: 3px solid #9c27b0;
  }

  .info p {
    margin: 5px 0;
    color: #7b1fa2;
    font-size: 0.9rem;
  }
</style>
