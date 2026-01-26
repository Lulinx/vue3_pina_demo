<template>
  <div class="communication-demo">
    <h2>🔄 Vue3 组件通信完全指南</h2>
    <p class="intro">掌握 8 种组件通信方式</p>

    <!-- 通信方式对比表 -->
    <section class="comparison-section">
      <h3>📊 通信方式对比表</h3>
      <div class="table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>通信方式</th>
              <th>方向</th>
              <th>用途</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Props</strong></td>
              <td>父 → 子</td>
              <td>传递数据</td>
              <td>简单的数据传递</td>
            </tr>
            <tr>
              <td><strong>Emit</strong></td>
              <td>子 → 父</td>
              <td>触发事件</td>
              <td>子组件通知父组件</td>
            </tr>
            <tr>
              <td><strong>v-model</strong></td>
              <td>双向</td>
              <td>数据绑定</td>
              <td>表单数据的双向绑定</td>
            </tr>
            <tr>
              <td><strong>Provide/Inject</strong></td>
              <td>父 → 子孙</td>
              <td>依赖注入</td>
              <td>跨级传递（避免 props 层级过深）</td>
            </tr>
            <tr>
              <td><strong>Ref/Expose</strong></td>
              <td>双向</td>
              <td>直接访问</td>
              <td>访问子组件实例方法和属性</td>
            </tr>
            <tr>
              <td><strong>Slots</strong></td>
              <td>父 → 子</td>
              <td>内容分发</td>
              <td>灵活的内容插入</td>
            </tr>
            <tr>
              <td><strong>$attrs</strong></td>
              <td>父 → 子</td>
              <td>透传属性</td>
              <td>多级透传不需要显式定义的属性</td>
            </tr>
            <tr>
              <td><strong>Store</strong></td>
              <td>全局</td>
              <td>全局状态</td>
              <td>跨组件、跨页面的状态共享</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 1. Props 通信 -->
    <section class="demo-section">
      <h3>1️⃣ Props（父 → 子）</h3>
      <div class="description">
        <p><strong>定义：</strong> 用于从父组件向子组件传递数据的方式</p>
        <p><strong>特点：</strong> 单向数据流，子组件可以接收但不能修改</p>
      </div>
      <div class="demo-content">
        <div class="props-demo">
          <input v-model="parentData.message" type="text" placeholder="输入消息" class="input" />
          <input
            v-model.number="parentData.count"
            type="number"
            placeholder="输入数字"
            class="input"
          />
          <div class="object-input">
            <input v-model="parentData.user.name" placeholder="用户名" class="input" />
            <input v-model="parentData.user.email" placeholder="邮箱" class="input" />
          </div>
        </div>
        <div class="child-container">
          <div class="comment">/* 子组件接收 Props */</div>
          <div class="child-demo">
            <p><strong>message:</strong> {{ parentData.message }}</p>
            <p><strong>count:</strong> {{ parentData.count }}</p>
            <p><strong>user:</strong> {{ parentData.user.name }} ({{ parentData.user.email }})</p>
          </div>
        </div>
      </div>
      <pre v-pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;接收到的消息: {{ message }}&lt;/p&gt;
    &lt;p&gt;接收到的计数: {{ count }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
// 定义接收的 Props
defineProps({
  message: String,
  count: Number,
  user: Object
})
&lt;/script&gt;</code></pre>
    </section>

    <!-- 2. Emit 通信 -->
    <section class="demo-section">
      <h3>2️⃣ Emit（子 → 父）</h3>
      <div class="description">
        <p><strong>定义：</strong> 子组件通过触发自定义事件向父组件通信</p>
        <p><strong>特点：</strong> 事件驱动，解耦性强</p>
      </div>
      <div class="demo-content">
        <div class="emit-demo">
          <button @click="handleChildEvent('Hello')" class="btn">子组件：发送 'Hello'</button>
          <button @click="handleChildEvent('Pinia')" class="btn">子组件：发送 'Pinia'</button>
          <button @click="handleChildEvent('Vue3')" class="btn">子组件：发送 'Vue3'</button>
          <p v-if="childMessage" class="received-message">
            👈 父组件收到: <strong>{{ childMessage }}</strong>
          </p>
        </div>
      </div>
      <pre><code>&lt;script setup&gt;
// 定义可以发送的事件
const emit = defineEmits(['child-event'])

const sendMessage = (msg) => {
  // 触发自定义事件，可以附带数据
  emit('child-event', msg)
}
&lt;/script&gt;

&lt;!-- 在父组件中监听事件 --&gt;
&lt;template&gt;
  &lt;ChildComponent @child-event="handleChildEvent" /&gt;
&lt;/template&gt;</code></pre>
    </section>

    <!-- 3. v-model 双向绑定 -->
    <section class="demo-section">
      <h3>3️⃣ v-model（双向绑定）</h3>
      <div class="description">
        <p><strong>定义：</strong> 在组件上实现双向数据绑定</p>
        <p><strong>特点：</strong> 自动处理 Props 和 Emit，简化代码</p>
      </div>
      <div class="demo-content">
        <div class="vmodel-demo">
          <div class="form-group">
            <label>文章标题:</label>
            <input v-model="article.title" type="text" placeholder="输入标题" class="input" />
            <p class="char-count">字数: {{ article.title.length }}/50</p>
          </div>
          <div class="form-group">
            <label>文章内容:</label>
            <textarea v-model="article.content" placeholder="输入内容" class="textarea"></textarea>
            <p class="char-count">字数: {{ article.content.length }}/500</p>
          </div>
          <div class="preview">
            <h4>📝 内容预览</h4>
            <div class="preview-content">
              <h5>{{ article.title || '（标题未输入）' }}</h5>
              <p>{{ article.content || '（内容未输入）' }}</p>
            </div>
          </div>
        </div>
      </div>
      <pre><code>&lt;!-- 子组件中实现 v-model --&gt;
&lt;script setup&gt;
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const updateValue = (newValue) => {
  emit('update:modelValue', newValue)
}
&lt;/script&gt;

&lt;!-- 父组件中使用 --&gt;
&lt;template&gt;
  &lt;ChildComponent v-model="title" /&gt;
  &lt;!-- 等同于 --&gt;
  &lt;ChildComponent :modelValue="title" @update:modelValue="title = $event" /&gt;
&lt;/template&gt;</code></pre>
    </section>

    <!-- 4. Provide/Inject 依赖注入 -->
    <section class="demo-section">
      <h3>4️⃣ Provide/Inject（跨级传递）</h3>
      <div class="description">
        <p><strong>定义：</strong> 祖先组件提供数据，任何后代组件都可以注入</p>
        <p><strong>特点：</strong> 避免 Props 层级过深（Prop Drilling）</p>
      </div>
      <div class="demo-content">
        <div class="provide-demo">
          <div class="provide-box">
            <h4>祖先组件 (Provide)</h4>
            <p>提供数据: <input v-model="provideData.theme" class="input-small" /></p>
            <div class="nested-box" :style="{ backgroundColor: themeColor }">
              <p>第一层孙组件</p>
              <div class="nested-box-2" :style="{ backgroundColor: themeColorLight }">
                <p>第二层孙组件</p>
                <div class="nested-box-3" :style="{ backgroundColor: themeColorLighter }">
                  <p>第三层孙组件 - 直接访问祖先数据</p>
                  <p class="injected-value">
                    ✓ 注入的主题: <strong>{{ provideData.theme }}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pre><code>&lt;!-- 在祖先组件中提供数据 --&gt;
&lt;script setup&gt;
import { provide } from 'vue'

const theme = ref('blue')
provide('theme', theme) // 提供响应式的值
&lt;/script&gt;

&lt;!-- 在任何后代组件中注入 --&gt;
&lt;script setup&gt;
import { inject } from 'vue'

const theme = inject('theme', 'default') // 第二个参数是默认值
&lt;/script&gt;</code></pre>
    </section>

    <!-- 5. Ref/Expose 直接访问 -->
    <section class="demo-section">
      <h3>5️⃣ Ref/Expose（直接访问）</h3>
      <div class="description">
        <p><strong>定义：</strong> 父组件通过 Ref 直接访问子组件的实例</p>
        <p><strong>特点：</strong> 强大但应谨慎使用，容易破坏组件的封装</p>
      </div>
      <div class="demo-content">
        <div class="ref-demo">
          <div class="controls">
            <button @click="callChildMethod('increment')" class="btn">调用子组件递增</button>
            <button @click="callChildMethod('decrement')" class="btn">调用子组件递减</button>
            <button @click="callChildMethod('reset')" class="btn">调用子组件重置</button>
          </div>
          <div class="result">
            <p>
              子组件内部计数: <strong>{{ refDemoCounter }}</strong>
            </p>
            <p class="status">✓ 通过 Ref 直接调用子组件方法</p>
          </div>
        </div>
      </div>
      <pre><code>&lt;!-- 子组件暴露方法 --&gt;
&lt;script setup&gt;
const count = ref(0)

const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0

// 使用 defineExpose 暴露属性和方法
defineExpose({
  count,
  increment,
  decrement,
  reset
})
&lt;/script&gt;

&lt;!-- 父组件中访问 --&gt;
&lt;script setup&gt;
const childRef = ref(null)

const callChildMethod = (method) => {
  if (childRef.value) {
    childRef.value[method]()
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;ChildComponent ref="childRef" /&gt;
&lt;/template&gt;</code></pre>
    </section>

    <!-- 6. Slots 插槽 -->
    <section class="demo-section">
      <h3>6️⃣ Slots（内容分发）</h3>
      <div class="description">
        <p><strong>定义：</strong> 父组件可以向子组件插入任意内容</p>
        <p><strong>特点：</strong> 灵活的内容组合，支持作用域插槽</p>
      </div>
      <div class="demo-content">
        <div class="slots-demo">
          <div class="slot-example">
            <h4>默认插槽</h4>
            <div class="slot-container">
              <div class="slot-box">
                <p>📌 这是子组件的默认插槽内容</p>
              </div>
            </div>
          </div>
          <div class="slot-example">
            <h4>命名插槽</h4>
            <div class="slot-container">
              <div class="slot-box header">
                <strong>Header Slot</strong>
              </div>
              <div class="slot-box body">Body Slot Content</div>
              <div class="slot-box footer">Footer Slot</div>
            </div>
          </div>
          <div class="slot-example">
            <h4>作用域插槽</h4>
            <div class="slot-container">
              <div v-for="item in scopedItems" :key="item.id" class="slot-box scoped">
                <span class="badge">{{ item.category }}</span>
                <span>{{ item.name }}</span>
                <span class="value">¥{{ item.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pre v-pre><code>&lt;!-- 子组件中定义插槽 --&gt;
&lt;template&gt;
  &lt;div&gt;
    &lt;slot&gt;&lt;/slot&gt; &lt;!-- 默认插槽 --&gt;
    &lt;slot name="header"&gt;&lt;/slot&gt; &lt;!-- 命名插槽 --&gt;
    &lt;slot name="item" v-for="item in items" :item="item"&gt;
      &lt;/slot&gt; &lt;!-- 作用域插槽 --&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- 父组件中使用插槽 --&gt;
&lt;template&gt;
  &lt;ChildComponent&gt;
    &lt;!-- 默认插槽内容 --&gt;
    &lt;p&gt;这是默认插槽&lt;/p&gt;

    &lt;template #header&gt;
      &lt;h2&gt;Header Content&lt;/h2&gt;
    &lt;/template&gt;

    &lt;template #item="{ item }"&gt;
      &lt;span&gt;{{ item.name }}&lt;/span&gt;
    &lt;/template&gt;
  &lt;/ChildComponent&gt;
&lt;/template&gt;</code></pre>
    </section>

    <!-- 7. $attrs 透传属性 -->
    <section class="demo-section">
      <h3>7️⃣ $attrs（属性透传）</h3>
      <div class="description">
        <p><strong>定义：</strong> 未被子组件 Props 接收的所有 HTML 属性和事件监听器</p>
        <p><strong>特点：</strong> 用于高阶组件和包装组件</p>
      </div>
      <div class="demo-content">
        <div class="attrs-demo">
          <div class="attrs-info">
            <h4>传递的属性 ($attrs)</h4>
            <div class="attrs-display">
              <p><strong>data-test:</strong> {{ attrsData['data-test'] }}</p>
              <p><strong>placeholder:</strong> {{ attrsData.placeholder }}</p>
              <p><strong>maxlength:</strong> {{ attrsData.maxlength }}</p>
            </div>
          </div>
          <div class="attrs-input">
            <input v-bind="attrsData" type="text" class="attrs-input-field" />
          </div>
        </div>
      </div>
      <pre v-pre><code>&lt;!-- 子组件接收 Props 的同时透传其他属性 --&gt;
&lt;script setup&gt;
defineProps(['title']) // 只接收 title

// $attrs 包含其他所有属性
// 可以通过 v-bind="$attrs" 透传给后代元素
&lt;/script&gt;

&lt;template&gt;
  &lt;div class="wrapper"&gt;
    &lt;h2&gt;{{ title }}&lt;/h2&gt;
    &lt;!-- 透传所有未被显式定义的属性 --&gt;
    &lt;input v-bind="$attrs" /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- 父组件中使用 --&gt;
&lt;ChildComponent
  title="输入框"
  placeholder="输入内容"
  maxlength="50"
  data-test="input-field"
/&gt;</code></pre>
    </section>

    <!-- 8. Store 全局状态 -->
    <section class="demo-section">
      <h3>8️⃣ Store（全局状态）</h3>
      <div class="description">
        <p><strong>定义：</strong> 使用 Pinia 在应用全局范围内共享状态</p>
        <p><strong>特点：</strong> 适合跨多个组件和页面的数据共享</p>
      </div>
      <div class="demo-content">
        <div class="store-demo">
          <div class="store-actions">
            <button @click="incrementStoreCounter" class="btn">增加计数</button>
            <button @click="decrementStoreCounter" class="btn">减少计数</button>
            <button @click="resetStoreCounter" class="btn">重置计数</button>
          </div>
          <div class="store-info">
            <p><strong>全局计数器:</strong> {{ globalCounter }}</p>
            <p><strong>是否为偶数:</strong> {{ isEvenCounter ? '✓ 是' : '✗ 否' }}</p>
            <p class="status">✓ 所有组件都能访问和修改这个状态</p>
          </div>
        </div>
      </div>
      <pre><code>&lt;!-- 创建 Store (stores/counterStore.js) --&gt;
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = 0

  const isEven = computed(() => count.value % 2 === 0)

  return { count, increment, decrement, reset, isEven }
})

&lt;!-- 在任何组件中使用 --&gt;
&lt;script setup&gt;
import { useCounterStore } from '@/stores/counterStore'

const store = useCounterStore()
&lt;/script&gt;

&lt;template&gt;
  &lt;p&gt;&#123;&#123; store.count &#125;&#125;&lt;/p&gt;
  &lt;button @click="store.increment"&gt;增加&lt;/button&gt;
&lt;/template&gt;</code></pre>
    </section>

    <!-- 总结对比 -->
    <section class="summary-section">
      <h3>📌 通信方式选择指南</h3>
      <div class="guidelines">
        <div class="guideline-item">
          <h4>📊 数据层级</h4>
          <ul>
            <li><strong>1-2 级：</strong> 使用 Props ↔️ Emit 或 v-model</li>
            <li><strong>3+ 级：</strong> 使用 Provide/Inject</li>
            <li><strong>跨页面/组件：</strong> 使用 Store</li>
          </ul>
        </div>
        <div class="guideline-item">
          <h4>🎯 使用场景</h4>
          <ul>
            <li><strong>表单输入：</strong> v-model</li>
            <li><strong>事件通知：</strong> emit</li>
            <li><strong>UI 组件：</strong> Slots</li>
            <li><strong>主题配置：</strong> Provide/Inject</li>
            <li><strong>用户认证：</strong> Store</li>
          </ul>
        </div>
        <div class="guideline-item">
          <h4>⚠️ 避免误区</h4>
          <ul>
            <li>❌ 直接修改 Props（改为用 emit 或 v-model）</li>
            <li>❌ 过度使用 $attrs（会降低可读性）</li>
            <li>❌ 滥用 Ref 访问子组件（破坏封装）</li>
            <li>❌ 简单的数据用 Store（增加复杂度）</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref, computed, provide } from 'vue';
  import { useCounterStore } from '@/stores/counterStore';

  // 1. Props 演示数据
  const parentData = ref({
    message: 'Hello Vue3!',
    count: 42,
    user: {
      name: '张三',
      email: 'zhangsan@example.com',
    },
  });

  // 2. Emit 演示数据
  const childMessage = ref('');
  const handleChildEvent = message => {
    childMessage.value = message;
  };

  // 3. v-model 演示数据
  const article = ref({
    title: '深入理解 Vue3 组件通信',
    content: '今天我们学习 Vue3 中的 8 种组件通信方式...',
  });

  // 4. Provide/Inject 演示
  const provideData = ref({
    theme: 'purple',
  });

  const themeColor = computed(() => {
    const colors = {
      purple: '#667eea',
      blue: '#3b82f6',
      red: '#ef4444',
      green: '#10b981',
    };
    return colors[provideData.value.theme] || '#667eea';
  });

  const themeColorLight = computed(() => {
    const theme = provideData.value.theme;
    const colors = {
      purple: '#c5cae9',
      blue: '#bfdbfe',
      red: '#fecaca',
      green: '#a7f3d0',
    };
    return colors[theme] || '#c5cae9';
  });

  const themeColorLighter = computed(() => {
    const theme = provideData.value.theme;
    const colors = {
      purple: '#a7f3d0',
      blue: '#fecaca',
      red: '#bfdbfe',
      green: '#f0fdf4',
    };
    return colors[theme] || '#e8eaf6';
  });

  provide('injectedData', provideData);

  // 5. Ref/Expose 演示
  const refDemoCounter = ref(0);
  const childRef = ref(null);

  const callChildMethod = method => {
    if (method === 'increment') refDemoCounter.value++;
    else if (method === 'decrement') refDemoCounter.value--;
    else if (method === 'reset') refDemoCounter.value = 0;
  };

  // 6. Slots 演示
  const scopedItems = ref([
    { id: 1, name: '笔记本', category: '电子', price: 8999 },
    { id: 2, name: '鼠标', category: '配件', price: 299 },
    { id: 3, name: '键盘', category: '配件', price: 599 },
  ]);

  // 7. $attrs 演示
  const attrsData = ref({
    'data-test': 'demo-input',
    placeholder: '输入你的内容...',
    maxlength: '50',
  });

  // 8. Store 演示
  const store = useCounterStore();
  const globalCounter = computed(() => store.count);
  const isEvenCounter = computed(() => store.count % 2 === 0);

  const incrementStoreCounter = () => store.increment();
  const decrementStoreCounter = () => store.decrement();
  const resetStoreCounter = () => store.$reset();
</script>

<style scoped>
  .communication-demo {
    background: white;
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }

  .communication-demo h2 {
    text-align: center;
    color: #667eea;
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .intro {
    text-align: center;
    color: #999;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }

  /* 对比表 */
  .comparison-section {
    margin-bottom: 40px;
  }

  .comparison-section h3 {
    color: #667eea;
    margin-bottom: 20px;
    border-bottom: 2px solid #667eea;
    padding-bottom: 10px;
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .comparison-table thead {
    background: #667eea;
    color: white;
  }

  .comparison-table th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
  }

  .comparison-table td {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
  }

  .comparison-table tbody tr:hover {
    background: #f9fafb;
  }

  .comparison-table tr:last-child td {
    border-bottom: none;
  }

  /* Demo 部分 */
  .demo-section {
    margin-bottom: 40px;
    padding: 25px;
    background: #f9fafb;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .demo-section h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }

  .description {
    background: white;
    padding: 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    border-left: 4px solid #e8eaf6;
  }

  .description p {
    margin: 8px 0;
    color: #333;
    line-height: 1.6;
  }

  .demo-content {
    background: white;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 20px;
  }

  /* Props 演示 */
  .props-demo {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 20px;
  }

  .object-input {
    display: flex;
    gap: 10px;
  }

  .input {
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-size: 0.9rem;
    flex: 1;
  }

  .input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .input-small {
    padding: 6px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-size: 0.85rem;
    width: 120px;
  }

  .child-container {
    border: 2px dashed #667eea;
    padding: 15px;
    border-radius: 6px;
    background: #f0f4ff;
  }

  .comment {
    color: #999;
    font-size: 0.85rem;
    font-style: italic;
    margin-bottom: 10px;
  }

  .child-demo {
    padding: 10px;
    background: white;
    border-radius: 4px;
  }

  .child-demo p {
    margin: 8px 0;
    font-size: 0.95rem;
  }

  /* Emit 演示 */
  .emit-demo {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .btn {
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
  }

  .btn:hover {
    background: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  .received-message {
    padding: 12px;
    background: #d4edda;
    color: #155724;
    border-left: 4px solid #28a745;
    border-radius: 4px;
  }

  /* v-model 演示 */
  .vmodel-demo {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
  }

  .textarea {
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.95rem;
    min-height: 120px;
    resize: vertical;
  }

  .textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .char-count {
    font-size: 0.85rem;
    color: #999;
    margin-top: 4px;
  }

  .preview {
    padding: 15px;
    background: #f0f4ff;
    border-radius: 6px;
  }

  .preview h4 {
    margin: 0 0 12px 0;
    color: #667eea;
  }

  .preview-content {
    padding: 12px;
    background: white;
    border-radius: 4px;
    border-left: 4px solid #667eea;
  }

  .preview-content h5 {
    margin: 0 0 8px 0;
    color: #333;
  }

  .preview-content p {
    margin: 0;
    color: #666;
    line-height: 1.6;
  }

  /* Provide/Inject 演示 */
  .provide-demo {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .provide-box {
    padding: 20px;
    border: 2px solid #667eea;
    border-radius: 8px;
    background: white;
  }

  .provide-box h4 {
    color: #667eea;
    margin-top: 0;
  }

  .provide-box > p {
    margin: 0 0 15px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nested-box,
  .nested-box-2,
  .nested-box-3 {
    padding: 15px;
    border-radius: 6px;
    margin-top: 10px;
    color: white;
  }

  .nested-box p,
  .nested-box-2 p,
  .nested-box-3 p {
    margin: 8px 0;
    font-weight: 600;
  }

  .injected-value {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  /* Ref/Expose 演示 */
  .ref-demo {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .result {
    padding: 15px;
    background: #e8eaf6;
    border-radius: 6px;
    border-left: 4px solid #667eea;
  }

  .result p {
    margin: 8px 0;
    color: #333;
    font-size: 0.95rem;
  }

  .status {
    color: #667eea;
    font-weight: 600;
  }

  /* Slots 演示 */
  .slots-demo {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .slot-example {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .slot-example h4 {
    color: #667eea;
    margin: 0;
  }

  .slot-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .slot-box {
    padding: 12px;
    background: #f0f4ff;
    border-radius: 4px;
    border-left: 4px solid #667eea;
    color: #333;
  }

  .slot-box.header {
    background: #e8eaf6;
  }

  .slot-box.body {
    background: #f0f4ff;
  }

  .slot-box.footer {
    background: #e8eaf6;
  }

  .slot-box.scoped {
    display: flex;
    align-items: center;
    gap: 10px;
    background: white;
    border: 1px solid #e5e7eb;
  }

  .badge {
    display: inline-block;
    padding: 2px 8px;
    background: #667eea;
    color: white;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .value {
    margin-left: auto;
    color: #667eea;
    font-weight: 600;
  }

  /* $attrs 演示 */
  .attrs-demo {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .attrs-info {
    padding: 15px;
    background: #f0f4ff;
    border-radius: 6px;
  }

  .attrs-info h4 {
    color: #667eea;
    margin: 0 0 12px 0;
  }

  .attrs-display {
    padding: 12px;
    background: white;
    border-radius: 4px;
    border-left: 4px solid #667eea;
  }

  .attrs-display p {
    margin: 6px 0;
    font-size: 0.9rem;
  }

  .attrs-input {
    display: flex;
  }

  .attrs-input-field {
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    width: 100%;
    font-size: 0.95rem;
  }

  /* Store 演示 */
  .store-demo {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .store-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .store-info {
    padding: 15px;
    background: #e8eaf6;
    border-radius: 6px;
    border-left: 4px solid #667eea;
  }

  .store-info p {
    margin: 8px 0;
    color: #333;
    font-size: 0.95rem;
  }

  /* 代码块 */
  pre {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.6;
    margin: 0;
  }

  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }

  /* 总结部分 */
  .summary-section {
    background: #fff3e0;
    padding: 25px;
    border-radius: 8px;
    border-left: 4px solid #ff9800;
    margin-top: 40px;
  }

  .summary-section h3 {
    color: #e65100;
    margin-bottom: 20px;
  }

  .guidelines {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .guideline-item {
    background: white;
    padding: 15px;
    border-radius: 6px;
  }

  .guideline-item h4 {
    color: #e65100;
    margin: 0 0 12px 0;
  }

  .guideline-item ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .guideline-item li {
    padding: 6px 0;
    color: #333;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .communication-demo {
      padding: 20px;
    }

    .communication-demo h2 {
      font-size: 1.5rem;
    }

    .comparison-table th,
    .comparison-table td {
      padding: 8px 4px;
      font-size: 0.85rem;
    }

    .demo-section {
      padding: 15px;
    }

    .object-input {
      flex-direction: column;
    }

    .controls {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }
  }
</style>
