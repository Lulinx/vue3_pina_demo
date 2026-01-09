import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * Demo 1: 计数器 Store
 * 这是最基础的Pinia使用示例
 * 演示：state 和 actions 的基本用法
 */
export const useCounterStore = defineStore('counter', () => {
  // ============= STATE（状态）=============
  // 用 ref() 创建响应式状态
  const count = ref(0);
  const history = ref([]);

  // ============= GETTERS（派生状态）=============
  // 用 computed() 创建计算属性
  const isEven = computed(() => count.value % 2 === 0);
  const doubleCount = computed(() => count.value * 2);

  // ============= ACTIONS（修改状态的方法）=============
  // increment: 增加计数
  const increment = () => {
    count.value++;
    history.value.push(`+1 -> ${count.value}`);
  };

  // decrement: 减少计数
  const decrement = () => {
    count.value--;
    history.value.push(`-1 -> ${count.value}`);
  };

  // reset: 重置计数
  const $reset = () => {
    count.value = 0;
    history.value = [];
  };

  // addAmount: 增加指定数量
  const addAmount = amount => {
    count.value += amount;
    history.value.push(`+${amount} -> ${count.value}`);
  };

  // 返回所有 state、getters、actions
  return {
    count,
    history,
    isEven,
    doubleCount,
    increment,
    decrement,
    $reset,
    addAmount,
  };
});
