<template>
  <div class="content-area-wrapper">
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import HomePage from '../pages/HomePage.vue';
import CounterDemo from '../CounterDemo.vue';
import TodoDemo from '../TodoDemo.vue';
import UserDemo from '../UserDemo.vue';
import CartDemo from '../CartDemo.vue';
import AdvancedPiniaDemo from '../AdvancedPiniaDemo.vue';
import CommunicationGuide from '../CommunicationGuide.vue';
import TaroGuide from '../TaroGuide.vue';
import NuxtGuide from '../NuxtGuide.vue';
import FlutterGuide from '../FlutterGuide.vue';
import TypeScriptGuide from '../TypeScriptGuide.vue';

const props = defineProps({
  activeKey: {
    type: String,
    default: 'home'
  }
});

const componentMap = {
  'home': HomePage,
  'typescript': TypeScriptGuide,
  'pinia-counter': CounterDemo,
  'pinia-todo': TodoDemo,
  'pinia-user': UserDemo,
  'pinia-cart': CartDemo,
  'pinia-advanced': AdvancedPiniaDemo,
  'pinia-communication': CommunicationGuide,
  'taro': TaroGuide,
  'nuxt': NuxtGuide,
  'flutter': FlutterGuide
};

const currentComponent = computed(() => {
  return componentMap[props.activeKey] || HomePage;
});
</script>

<style scoped>
.content-area-wrapper {
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>