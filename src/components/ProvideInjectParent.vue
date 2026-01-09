<template>
  <div class="provide-inject-parent">
    <h4>👨‍👩‍👧‍👦 Provide/Inject 父组件</h4>
    <p>提供的数据通过 provide() 传递给所有后代组件</p>
    <ProvideInjectChild level="1" />
    <ProvideInjectChild level="2" />
  </div>
</template>

<script setup>
import ProvideInjectChild from './ProvideInjectChild.vue'
</script>

<style scoped>
.provide-inject-parent {
  padding: 15px;
  background: #e0f2f1;
  border-radius: 6px;
  border: 2px solid #009688;
}

.provide-inject-parent h4 {
  color: #009688;
  margin-bottom: 12px;
}

.provide-inject-parent p {
  color: #00796b;
  margin-bottom: 15px;
  font-size: 0.9rem;
}
</style>
