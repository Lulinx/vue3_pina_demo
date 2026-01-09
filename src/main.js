import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

// 创建 Pinia 实例
const pinia = createPinia();

// 使用 Pinia 插件
app.use(pinia);

app.mount('#app');
