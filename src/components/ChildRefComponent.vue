<template>
  <div class="child-ref-component">
    <h4>🔗 ref 和 expose 演示</h4>
    <div class="state-display">
      <p>内部状态值：{{ internalValue }}</p>
      <button @click="increment" class="btn btn-primary">+1</button>
      <button @click="reset" class="btn btn-secondary">重置</button>
    </div>
    <p class="tip">父组件可以通过 ref 调用这些暴露的方法</p>
  </div>
</template>

<script setup>
import { ref, expose } from 'vue'

const internalValue = ref(0)

// 定义可以被父组件调用的方法
const increment = () => {
  internalValue.value++
}

const reset = () => {
  internalValue.value = 0
}

const doSomething = () => {
  const result = `✅ 子组件执行了操作，当前值是 ${internalValue.value}`
  return result
}

const getValue = () => {
  return internalValue.value
}

const setValue = (value) => {
  internalValue.value = value
}

// 通过 expose 暴露方法和属性给父组件
expose({
  internalValue,
  increment,
  reset,
  doSomething,
  getValue,
  setValue
})
</script>

<style scoped>
.child-ref-component {
  padding: 15px;
  background: #fce4ec;
  border-radius: 6px;
  border: 2px solid #e91e63;
}

.child-ref-component h4 {
  color: #e91e63;
  margin-bottom: 12px;
}

.state-display {
  padding: 12px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #e91e63;
  margin-bottom: 10px;
}

.state-display p {
  color: #880e4f;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  margin-right: 8px;
  font-size: 0.85rem;
}

.btn-primary {
  background: #e91e63;
  color: white;
}

.btn-primary:hover {
  background: #c2185b;
}

.btn-secondary {
  background: #f8bbd0;
  color: #c2185b;
}

.btn-secondary:hover {
  background: #f48fb1;
}

.tip {
  color: #880e4f;
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.8;
}
</style>
