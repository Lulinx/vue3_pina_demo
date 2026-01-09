<template>
  <div class="communication-demo">
    <h2>🔄 组件通信方式完全指南</h2>

    <!-- 1. Props 传值（父传子）-->
    <section class="section">
      <h3>1️⃣ Props 传值（父传子）</h3>
      <div class="example">
        <ChildComponent :message="parentMessage" :count="counter" :user="userData" />
        <div class="explanation">
          <p>父组件向子组件传递数据：message、count、user</p>
          <p>子组件通过 defineProps 接收这些数据</p>
        </div>
      </div>
    </section>

    <!-- 2. Emit 事件（子传父）-->
    <section class="section">
      <h3>2️⃣ Emit 事件（子传父）</h3>
      <div class="example">
        <ChildEmitComponent @child-message="handleChildMessage" />
        <p v-if="childMessage" class="result">📨 子组件发送的消息：{{ childMessage }}</p>
        <div class="explanation">
          <p>子组件使用 emit 向父组件发送事件</p>
          <p>父组件使用 @event-name 监听这些事件</p>
        </div>
      </div>
    </section>

    <!-- 3. v-model 双向绑定 -->
    <section class="section">
      <h3>3️⃣ v-model 双向绑定</h3>
      <div class="example">
        <ChildVModelComponent v-model:title="formData.title" v-model:content="formData.content" />
        <div class="result">
          <p>标题：{{ formData.title }}</p>
          <p>内容：{{ formData.content }}</p>
        </div>
        <div class="explanation">
          <p>使用 v-model:prop 实现双向数据绑定</p>
          <p>子组件接收数据并可以修改，父组件自动更新</p>
        </div>
      </div>
    </section>

    <!-- 4. Store 通信（兄弟组件通信）-->
    <section class="section">
      <h3>4️⃣ Store 通信（全局状态管理）</h3>
      <div class="example">
        <div class="store-info">
          <p>当前 Store 计数：{{ counterStore.count }}</p>
          <button @click="counterStore.increment" class="btn btn-primary">Store +1</button>
          <button @click="counterStore.reset" class="btn btn-secondary">重置</button>
        </div>
        <div class="explanation">
          <p>使用 Pinia Store 管理全局状态</p>
          <p>所有组件都可以访问和修改 Store 中的数据</p>
          <p>特别适合跨越多层级组件的通信</p>
        </div>
      </div>
    </section>

    <!-- 5. Provide/Inject 依赖注入 -->
    <section class="section">
      <h3>5️⃣ Provide/Inject 依赖注入</h3>
      <div class="example">
        <ProvideInjectParent />
        <div class="explanation">
          <p>父组件通过 provide 提供数据</p>
          <p>所有后代组件都可以通过 inject 获取数据</p>
          <p>不需要逐级传递 props</p>
        </div>
      </div>
    </section>

    <!-- 6. Slots 插槽 -->
    <section class="section">
      <h3>6️⃣ Slots 插槽</h3>
      <div class="example">
        <ChildSlotComponent>
          <template #header>
            <h4>📍 自定义头部</h4>
          </template>
          <template #default>
            <p>这是默认插槽的内容</p>
          </template>
          <template #footer>
            <p>⭐ 这是页脚插槽</p>
          </template>
        </ChildSlotComponent>
        <div class="explanation">
          <p>通过插槽传递 HTML 内容而不仅是数据</p>
          <p>支持具名插槽和作用域插槽</p>
          <p>提供更灵活的组件定制</p>
        </div>
      </div>
    </section>

    <!-- 7. ref 和 expose 直接访问 -->
    <section class="section">
      <h3>7️⃣ ref 和 expose 直接访问</h3>
      <div class="example">
        <ChildRefComponent ref="childRef" />
        <button @click="callChildMethod" class="btn btn-primary">调用子组件方法</button>
        <p v-if="childRefResult" class="result">📤 子组件返回：{{ childRefResult }}</p>
        <div class="explanation">
          <p>通过 ref 获取子组件实例</p>
          <p>子组件通过 expose 暴露方法和属性</p>
          <p>父组件可以直接调用子组件的方法</p>
        </div>
      </div>
    </section>

    <!-- 8. $attrs 和 $listeners (Fallthrough Attributes) -->
    <section class="section">
      <h3>8️⃣ $attrs（属性穿透）</h3>
      <div class="example">
        <ChildAttrsComponent data-test="custom" custom-attr="value" class="custom-class" />
        <div class="explanation">
          <p>未被 defineProps 声明的属性会被穿透传递</p>
          <p>在子组件中可以通过 $attrs 访问</p>
          <p>用于创建通用的包装组件</p>
        </div>
      </div>
    </section>

    <!-- 9. 高级：跨 Store 通信 -->
    <section class="section">
      <h3>9️⃣ Store 间的依赖和通信</h3>
      <div class="example">
        <div class="store-cross-communication">
          <p>产品统计：</p>
          <ul>
            <li>总数：{{ advancedStore.productStats.total }}</li>
            <li>有货：{{ advancedStore.productStats.inStock }}</li>
            <li>缺货：{{ advancedStore.productStats.outOfStock }}</li>
            <li>平均价格：¥{{ advancedStore.productStats.averagePrice }}</li>
          </ul>
          <p>订单统计：</p>
          <ul>
            <li>总订单：{{ advancedStore.orderStats.total }}</li>
            <li>总金额：¥{{ advancedStore.orderStats.totalAmount }}</li>
            <li>平均订单值：¥{{ advancedStore.orderStats.averageOrderValue }}</li>
          </ul>
        </div>
        <div class="explanation">
          <p>Store 可以在 getters 中互相引用</p>
          <p>Store 的 actions 可以调用其他 Store 的 actions</p>
          <p>实现复杂的业务逻辑和数据流</p>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="section code-section">
      <h3>💻 通信方式汇总表</h3>
      <table class="communication-table">
        <thead>
          <tr>
            <th>通信方式</th>
            <th>方向</th>
            <th>特点</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Props</td>
            <td>父 → 子</td>
            <td>单向数据流、响应式</td>
            <td>基本数据传递</td>
          </tr>
          <tr>
            <td>Emit</td>
            <td>子 → 父</td>
            <td>事件驱动</td>
            <td>子组件通知父组件</td>
          </tr>
          <tr>
            <td>v-model</td>
            <td>父 ↔ 子</td>
            <td>双向绑定、简洁</td>
            <td>表单输入组件</td>
          </tr>
          <tr>
            <td>Store</td>
            <td>任意 ↔ 任意</td>
            <td>全局状态、响应式</td>
            <td>跨组件状态共享</td>
          </tr>
          <tr>
            <td>Provide/Inject</td>
            <td>祖先 → 后代</td>
            <td>避免props穿透、灵活</td>
            <td>多层级组件通信</td>
          </tr>
          <tr>
            <td>Slots</td>
            <td>父 → 子</td>
            <td>内容分发、灵活</td>
            <td>自定义组件内容</td>
          </tr>
          <tr>
            <td>ref/expose</td>
            <td>父 → 子</td>
            <td>直接访问、命令式</td>
            <td>需要直接调用方法</td>
          </tr>
          <tr>
            <td>$attrs</td>
            <td>父 → 子</td>
            <td>属性穿透</td>
            <td>包装组件、属性转发</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, provide } from 'vue'
import { useCounterStore } from '@/stores/counterStore'
import { useAdvancedStore } from '@/stores/advancedStore'
import ChildComponent from './ChildComponent.vue'
import ChildEmitComponent from './ChildEmitComponent.vue'
import ChildVModelComponent from './ChildVModelComponent.vue'
import ProvideInjectParent from './ProvideInjectParent.vue'
import ChildSlotComponent from './ChildSlotComponent.vue'
import ChildRefComponent from './ChildRefComponent.vue'
import ChildAttrsComponent from './ChildAttrsComponent.vue'

// Store
const counterStore = useCounterStore()
const advancedStore = useAdvancedStore()

// Props 示例数据
const parentMessage = ref('👋 来自父组件的问候')
const counter = ref(42)
const userData = reactive({
  name: '张三',
  email: 'zhangsan@example.com',
  role: 'admin'
})

// Emit 示例
const childMessage = ref('')
const handleChildMessage = (message) => {
  childMessage.value = message
}

// v-model 示例
const formData = reactive({
  title: '编辑这个标题',
  content: '编辑这个内容'
})

// ref 示例
const childRef = ref(null)
const childRefResult = ref('')
const callChildMethod = () => {
  if (childRef.value) {
    childRefResult.value = childRef.value.doSomething()
  }
}

// Provide/Inject 示例
const injectionData = reactive({
  theme: 'dark',
  language: 'zh-CN',
  user: { id: 1, name: '当前用户' }
})
provide('injectionData', injectionData)
</script>

<style scoped>
.communication-demo {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.communication-demo h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section h3 {
  color: #667eea;
  margin-bottom: 15px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.example {
  margin: 20px 0;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.explanation {
  margin-top: 15px;
  padding: 15px;
  background: #fffacd;
  border-radius: 6px;
  border-left: 4px solid #ffa500;
}

.explanation p {
  margin: 8px 0;
  color: #333;
  line-height: 1.6;
}

.result {
  padding: 10px;
  background: #e8f5e9;
  border-radius: 4px;
  color: #2e7d32;
  font-weight: 600;
  margin: 10px 0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  margin-right: 10px;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #e0e7ff;
  color: #667eea;
}

.btn-secondary:hover {
  background: #c7d2fe;
}

.store-info {
  padding: 15px;
  background: #e3f2fd;
  border-radius: 6px;
  border-left: 4px solid #2196f3;
}

.store-info p {
  margin: 10px 0;
  font-weight: 600;
  color: #1976d2;
}

.store-cross-communication {
  padding: 15px;
  background: #f3e5f5;
  border-radius: 6px;
}

.store-cross-communication p {
  font-weight: 600;
  color: #6a1b9a;
  margin-top: 15px;
}

.store-cross-communication ul {
  list-style: none;
  padding-left: 20px;
}

.store-cross-communication li {
  padding: 8px 0;
  color: #6a1b9a;
}

.store-cross-communication li:before {
  content: '✓ ';
  color: #ab47bc;
  font-weight: bold;
}

.code-section {
  background: #1e1e1e;
}

.code-section h3 {
  color: #4ec9b0;
  border-bottom-color: #4ec9b0;
}

.communication-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-size: 0.9rem;
}

.communication-table thead {
  background: #333;
}

.communication-table th {
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #4ec9b0;
}

.communication-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #444;
  color: #bbb;
}

.communication-table tbody tr:hover {
  background: #2a2a2a;
}

@media (max-width: 768px) {
  .section {
    padding: 15px;
  }

  .communication-table {
    font-size: 0.75rem;
  }

  .communication-table th,
  .communication-table td {
    padding: 8px;
  }
}
</style>
