<template>
  <div class="questions-section">
    <h2>💚 Vue.js 面试题</h2>
    <p class="section-desc">包含Vue2/Vue3、组件、状态管理、性能优化等Vue全家桶面试题</p>

    <div class="questions-grid">
      <div
        class="question-card"
        v-for="(question, index) in questions"
        :key="question.id"
      >
        <div class="question-header">
          <h3 class="question-title">{{ question.title }}</h3>
          <div class="question-meta">
            <span class="difficulty" :class="question.difficulty">{{ question.difficulty }}</span>
            <span class="frequency">{{ question.frequency }}</span>
            <span class="company" v-if="question.company">{{ question.company }}</span>
          </div>
        </div>

        <div class="question-content" v-html="question.content"></div>

        <details class="answer-section" v-if="question.detailedAnswer">
          <summary>📖 详细解答</summary>
          <div class="answer-content" v-html="question.detailedAnswer"></div>
        </details>

        <div class="tags" v-if="question.tags">
          <span class="tag" v-for="tag in question.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const questions = [
  {
    id: 1,
    title: 'Q1: Vue的生命周期详解',
    difficulty: 'medium',
    frequency: '★★★★★',
    company: '字节跳动',
    tags: ['生命周期', 'Vue2', 'Vue3'],
    content: `
      <h5>Vue2生命周期:</h5>
      <ul>
        <li><strong>beforeCreate:</strong>实例初始化前，data和methods未初始化</li>
        <li><strong>created:</strong>实例创建完成，data和methods已初始化</li>
        <li><strong>beforeMount:</strong>挂载前，模板编译完成</li>
        <li><strong>mounted:</strong>挂载完成，DOM已生成</li>
        <li><strong>beforeUpdate:</strong>数据更新前</li>
        <li><strong>updated:</strong>数据更新完成，DOM已更新</li>
        <li><strong>beforeDestroy:</strong>销毁前</li>
        <li><strong>destroyed:</strong>销毁完成</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Vue3生命周期对比:</h5>
      <table class="comparison-table">
        <tr><th>Vue2</th><th>Vue3</th><th>说明</th></tr>
        <tr><td>beforeCreate</td><td>setup()</td><td>组件初始化前</td></tr>
        <tr><td>created</td><td>setup()</td><td>组件创建后</td></tr>
        <tr><td>beforeMount</td><td>onBeforeMount</td><td>挂载前</td></tr>
        <tr><td>mounted</td><td>onMounted</td><td>挂载后</td></tr>
        <tr><td>beforeUpdate</td><td>onBeforeUpdate</td><td>更新前</td></tr>
        <tr><td>updated</td><td>onUpdated</td><td>更新后</td></tr>
        <tr><td>beforeDestroy</td><td>onBeforeUnmount</td><td>卸载前</td></tr>
        <tr><td>destroyed</td><td>onUnmounted</td><td>卸载后</td></tr>
      </table>

      <h5>生命周期执行顺序:</h5>
      <div class="code-block"><pre>&lt;template&gt;
  &lt;div&gt;{{ message }}&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return { message: 'Hello' }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
    this.message = 'Hello Vue'
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  }
}
&lt;/script&gt;</pre></div>

      <h5>父子组件生命周期:</h5>
      <div class="code-block"><pre>父组件: beforeCreate → created → beforeMount
子组件: beforeCreate → created → beforeMount → mounted
父组件: mounted

// 更新时
父组件: beforeUpdate
子组件: beforeUpdate → updated
父组件: updated

// 销毁时
父组件: beforeDestroy
子组件: beforeDestroy → destroyed
父组件: destroyed</pre></div>
    `
  },
  {
    id: 2,
    title: 'Q2: Vue的响应式原理是什么？',
    difficulty: 'hard',
    frequency: '★★★★★',
    company: '腾讯',
    tags: ['响应式', 'Object.defineProperty', 'Proxy'],
    content: `
      <h5>Vue2响应式原理:</h5>
      <p>通过Object.defineProperty劫持数据getter/setter，实现数据变化检测。</p>

      <h5>Vue3响应式原理:</h5>
      <p>使用Proxy代理整个对象，实现更完整的响应式支持。</p>
    `,
    detailedAnswer: `
      <h5>Vue2响应式实现:</h5>
      <div class="code-block"><pre>function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 收集依赖
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      // 通知更新
      dep.notify()
    }
  })
}

function observe(obj) {
  if (!obj || typeof obj !== 'object') return
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}</pre></div>

      <h5>Vue3响应式实现:</h5>
      <div class="code-block"><pre>function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)
      const res = Reflect.get(target, key, receiver)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      // 触发更新
      if (oldValue !== value) {
        trigger(target, key)
      }
      return result
    }
  })
}</pre></div>

      <h5>Vue2 vs Vue3对比:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>Vue2</th><th>Vue3</th></tr>
        <tr><td>API</td><td>Object.defineProperty</td><td>Proxy</td></tr>
        <tr><td>数组检测</td><td>重写数组方法</td><td>Proxy原生支持</td></tr>
        <tr><td>新增属性</td><td>Vue.set</td><td>原生支持</td></tr>
        <tr><td>删除属性</td><td>Vue.delete</td><td>原生支持</td></tr>
        <tr><td>性能</td><td>较慢</td><td>更快</td></tr>
      </table>

      <h5>依赖收集机制:</h5>
      <div class="code-block"><pre>class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    remove(this.subs, sub)
  }

  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}</pre></div>
    `
  },
  {
    id: 3,
    title: 'Q3: computed和watch的区别是什么？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '美团',
    tags: ['computed', 'watch', '响应式'],
    content: `
      <h5>computed:</h5>
      <ul>
        <li>计算属性，依赖其他数据</li>
        <li>具有缓存，只有依赖改变时才重新计算</li>
        <li>不支持异步操作</li>
      </ul>

      <h5>watch:</h5>
      <ul>
        <li>监听器，监听数据变化</li>
        <li>每次数据变化都会执行</li>
        <li>支持异步操作</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>computed使用示例:</h5>
      <div class="code-block"><pre>export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName() {
      console.log('computed执行')
      return this.firstName + ' ' + this.lastName
    }
  }
}

// 模板中使用
&lt;template&gt;
  &lt;div&gt;{{ fullName }}&lt;/div&gt; &lt;!-- 只有依赖改变时才重新计算 --&gt;
&lt;/template&gt;</pre></div>

      <h5>watch使用示例:</h5>
      <div class="code-block"><pre>export default {
  data() {
    return {
      name: 'John',
      age: 25
    }
  },
  watch: {
    // 监听单个属性
    name(newVal, oldVal) {
      console.log('name changed:', newVal, oldVal)
    },

    // 深度监听
    obj: {
      handler(newVal) {
        console.log('obj changed')
      },
      deep: true
    },

    // 监听多个属性
    'user.name': function(newVal) {
      console.log('user name changed')
    }
  }
}</pre></div>

      <h5>性能对比:</h5>
      <ul>
        <li><strong>computed:</strong>缓存机制，性能更好，适用于计算复杂数据</li>
        <li><strong>watch:</strong>每次都执行，适用于监听异步操作或复杂逻辑</li>
      </ul>

      <h5>Vue3组合式API:</h5>
      <div class="code-block"><pre>import { computed, watch } from 'vue'

export default {
  setup() {
    const firstName = ref('John')
    const lastName = ref('Doe')

    // computed
    const fullName = computed(() => {
      return firstName.value + ' ' + lastName.value
    })

    // watch
    watch(fullName, (newVal, oldVal) => {
      console.log('fullName changed:', newVal)
    })

    return {
      firstName,
      lastName,
      fullName
    }
  }
}</pre></div>
    `
  },
  {
    id: 4,
    title: 'Q4: Vue组件通信方式有哪些？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '京东',
    tags: ['组件通信', 'props', 'emit', 'provide/inject'],
    content: `
      <h5>父子组件通信:</h5>
      <ul>
        <li><strong>props:</strong>父传子</li>
        <li><strong>$emit:</strong>子传父</li>
        <li><strong>$refs:</strong>父访问子实例</li>
        <li><strong>$children:</strong>父访问子组件</li>
      </ul>

      <h5>兄弟组件通信:</h5>
      <ul>
        <li><strong>EventBus:</strong>事件总线</li>
        <li><strong>Vuex/Pinia:</strong>状态管理</li>
        <li><strong>provide/inject:</strong>依赖注入</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>props通信:</h5>
      <div class="code-block"><pre>&lt;!-- 父组件 --&gt;
&lt;Child :message="parentMessage" :user="userData" /&gt;

&lt;!-- 子组件 --&gt;
&lt;template&gt;
  &lt;div&gt;{{ message }}&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      default: () => ({})
    }
  }
}
&lt;/script&gt;</pre></div>

      <h5>$emit通信:</h5>
      <div class="code-block"><pre>&lt;!-- 子组件 --&gt;
&lt;template&gt;
  &lt;button @click="handleClick"&gt;点击&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  methods: {
    handleClick() {
      this.$emit('custom-event', '传递的数据')
    }
  }
}
&lt;/script&gt;

&lt;!-- 父组件 --&gt;
&lt;template&gt;
  &lt;Child @custom-event="handleEvent" /&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  methods: {
    handleEvent(data) {
      console.log('收到数据:', data)
    }
  }
}
&lt;/script&gt;</pre></div>

      <h5>provide/inject:</h5>
      <div class="code-block"><pre>&lt;!-- 祖先组件 --&gt;
&lt;script&gt;
export default {
  provide() {
    return {
      theme: this.theme,
      changeTheme: this.changeTheme
    }
  },
  data() {
    return {
      theme: 'light'
    }
  },
  methods: {
    changeTheme(theme) {
      this.theme = theme
    }
  }
}
&lt;/script&gt;

&lt;!-- 后代组件 --&gt;
&lt;script&gt;
export default {
  inject: ['theme', 'changeTheme'],
  methods: {
    toggleTheme() {
      this.changeTheme(this.theme === 'light' ? 'dark' : 'light')
    }
  }
}
&lt;/script&gt;</pre></div>

      <h5>EventBus实现:</h5>
      <div class="code-block"><pre>// eventBus.js
class EventBus {
  constructor() {
    this.events = {}
  }

  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args))
    }
  }

  $off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback)
    }
  }
}

export default new EventBus()

// 使用
import bus from './eventBus'

// 发送
bus.$emit('message', data)

// 接收
bus.$on('message', (data) => {
  console.log(data)
})</pre></div>
    `
  },
  {
    id: 5,
    title: 'Q5: Vue3的Composition API是什么？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '字节跳动',
    tags: ['Composition API', 'Vue3', '组合式API'],
    content: `
      <h5>Composition API是什么:</h5>
      <p>Vue3的新API设计模式，将组件的逻辑组织在setup函数中，提高代码复用性。</p>

      <h5>主要特性:</h5>
      <ul>
        <li><strong>setup函数:</strong>组件的入口函数</li>
        <li><strong>ref/reactive:</strong>响应式数据</li>
        <li><strong>computed/watch:</strong>计算属性和监听器</li>
        <li><strong>生命周期钩子:</strong>onMounted等</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>基本使用:</h5>
      <div class="code-block"><pre>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: {{ count }}&lt;/p&gt;
    &lt;button @click="increment"&gt;+1&lt;/button&gt;
    &lt;p&gt;Double: {{ doubleCount }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)

    // 计算属性
    const doubleCount = computed(() => count.value * 2)

    // 方法
    const increment = () => {
      count.value++
    }

    // 生命周期
    onMounted(() => {
      console.log('组件挂载')
    })

    // 返回要在模板中使用的内容
    return {
      count,
      doubleCount,
      increment
    }
  }
}
&lt;/script&gt;</pre></div>

      <h5>ref vs reactive:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>ref</th><th>reactive</th></tr>
        <tr><td>适用类型</td><td>基本类型/对象</td><td>对象/数组</td></tr>
        <tr><td>访问方式</td><td>.value</td><td>直接访问</td></tr>
        <tr><td>解构</td><td>失去响应式</td><td>失去响应式</td></tr>
        <tr><td>性能</td><td>较轻量</td><td>更灵活</td></tr>
      </table>

      <h5>组合式函数:</h5>
      <div class="code-block"><pre>// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

// 在组件中使用
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, increment } = useCounter(10)
    return { count, increment }
  }
}</pre></div>

      <h5>生命周期钩子:</h5>
      <div class="code-block"><pre>import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件挂载')
    })

    onBeforeUnmount(() => {
      console.log('组件卸载前')
    })
  }
}</pre></div>
    `
  },
  {
    id: 6,
    title: 'Q6: Vue性能优化有哪些方法？',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '小米',
    tags: ['性能优化', 'Vue', '渲染优化'],
    content: `
      <h5>代码层面优化:</h5>
      <ul>
        <li><strong>合理使用key:</strong>v-for中必须使用key</li>
        <li><strong>computed缓存:</strong>避免在模板中写复杂表达式</li>
        <li><strong>事件销毁:</strong>及时移除事件监听</li>
        <li><strong>异步组件:</strong>路由懒加载</li>
      </ul>

      <h5>打包优化:</h5>
      <ul>
        <li><strong>代码分割:</strong>按需加载</li>
        <li><strong>Tree Shaking:</strong>移除未使用代码</li>
        <li><strong>压缩混淆:</strong>减小包体积</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>渲染优化:</h5>
      <div class="code-block"><pre>&lt;!-- 1. 使用key优化v-for --&gt;
&lt;ul&gt;
  &lt;li v-for="item in items" :key="item.id"&gt;
    {{ item.name }}
  &lt;/li&gt;
&lt;/ul&gt;

&lt;!-- 2. computed避免重复计算 --&gt;
&lt;template&gt;
  &lt;p&gt;{{ expensiveComputed }}&lt;/p&gt; &lt;!-- 推荐 --&gt;
  &lt;p&gt;{{ items.reduce((sum, item) => sum + item.price, 0) }}&lt;/p&gt; &lt;!-- 不推荐 --&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  computed: {
    expensiveComputed() {
      return this.items.reduce((sum, item) => sum + item.price, 0)
    }
  }
}
&lt;/script&gt;</pre></div>

      <h5>组件优化:</h5>
      <div class="code-block"><pre>// 1. 函数式组件（Vue2）
Vue.component('my-component', {
  functional: true,
  render(h, context) {
    return h('div', context.props.message)
  }
})

// 2. 异步组件
const AsyncComponent = () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
})

// 3. keep-alive缓存组件
&lt;keep-alive include="a,b"&gt;
  &lt;component :is="currentTab"&gt;&lt;/component&gt;
&lt;/keep-alive&gt;</pre></div>

      <h5>打包优化:</h5>
      <div class="code-block"><pre>// vue.config.js
module.exports = {
  chainWebpack: config => {
    // 代码分割
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        }
      }
    })

    // 压缩
    config.optimization.minimize(true)
  },

  // CDN引入第三方库
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter'
  }
}</pre></div>

      <h5>Vue3性能优化:</h5>
      <ul>
        <li><strong>组合式API:</strong>更好的Tree Shaking</li>
        <li><strong>Fragment:</strong>减少DOM节点</li>
        <li><strong>Proxy响应式:</strong>更高效的依赖收集</li>
        <li><strong>Teleport:</strong>更好的组件挂载控制</li>
      </ul>
    `
  },
  {
    id: 7,
    title: 'Q7: Vuex和Pinia的区别是什么？',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '华为',
    tags: ['Vuex', 'Pinia', '状态管理'],
    content: `
      <h5>Vuex特点:</h5>
      <ul>
        <li>Vue官方状态管理库</li>
        <li>TypeScript支持较弱</li>
        <li>概念较多(state/mutations/actions)</li>
        <li>需要辅助函数commit/dispatch</li>
      </ul>

      <h5>Pinia特点:</h5>
      <ul>
        <li>Vue3官方推荐状态管理</li>
        <li>更好的TypeScript支持</li>
        <li>API更简洁，使用Composition API</li>
        <li>支持插件和DevTools</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Vuex基本使用:</h5>
      <div class="code-block"><pre>// store.js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  getters: {
    doubleCount: state => state.count * 2
  }
})

// 使用
this.$store.commit('increment')
this.$store.dispatch('asyncIncrement')
computed: {
  count() { return this.$store.state.count },
  doubleCount() { return this.$store.getters.doubleCount }
}</pre></div>

      <h5>Pinia基本使用:</h5>
      <div class="code-block"><pre>// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  const increment = () => {
    count.value++
  }

  const asyncIncrement = () => {
    setTimeout(() => {
      count.value++
    }, 1000)
  }

  return {
    count,
    doubleCount,
    increment,
    asyncIncrement
  }
})

// 使用
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counterStore = useCounterStore()

    return {
      count: counterStore.count,
      doubleCount: counterStore.doubleCount,
      increment: counterStore.increment
    }
  }
}</pre></div>

      <h5>主要区别:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>Vuex</th><th>Pinia</th></tr>
        <tr><td>Vue版本</td><td>Vue2</td><td>Vue3</td></tr>
        <tr><td>API风格</td><td>Options API</td><td>Composition API</td></tr>
        <tr><td>TypeScript</td><td>一般</td><td>优秀</td></tr>
        <tr><td>概念复杂度</td><td>较高</td><td>较低</td></tr>
        <tr><td>插件支持</td><td>有</td><td>更好</td></tr>
        <tr><td>DevTools</td><td>有</td><td>更好</td></tr>
      </table>

      <h5>迁移指南:</h5>
      <div class="code-block"><pre>// Vuex -> Pinia
// store/index.js
export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    name: 'Eduardo'
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
    doubleCounterPlusOne() {
      return this.doubleCounter + 1
    }
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})</pre></div>
    `
  },
  {
    id: 8,
    title: 'Q8: v-if和v-show的区别',
    difficulty: 'easy',
    frequency: '★★★★★',
    company: '字节跳动',
    tags: ['v-if', 'v-show', '指令'],
    content: `
      <h5>区别:</h5>
      <ul>
        <li><strong>v-if:</strong>条件渲染，切换时销毁/重建DOM</li>
        <li><strong>v-show:</strong>切换display，DOM始终存在</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>使用场景:</h5>
      <ul>
        <li>频繁切换用v-show</li>
        <li>初始不渲染用v-if</li>
      </ul>
    `
  },
  {
    id: 9,
    title: 'Q9: Vue的nextTick原理',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '腾讯',
    tags: ['nextTick', '异步', 'DOM'],
    content: `
      <h5>nextTick作用:</h5>
      <p>在DOM更新完成后执行回调，获取更新后的DOM。</p>
    `,
    detailedAnswer: `
      <h5>实现原理:</h5>
      <p>优先使用Promise.then，降级到setTimeout，将回调放入微任务队列。</p>
    `
  },
  {
    id: 10,
    title: 'Q10: Vue的虚拟DOM和diff算法',
    difficulty: 'hard',
    frequency: '★★★★☆',
    company: '美团',
    tags: ['虚拟DOM', 'diff', '渲染'],
    content: `
      <h5>虚拟DOM:</h5>
      <p>用JS对象描述真实DOM，通过diff比较变化，最小化DOM操作。</p>
    `,
    detailedAnswer: `
      <h5>diff策略:</h5>
      <ul>
        <li>同层比较，不跨层级</li>
        <li>key优化列表diff</li>
        <li>双端比较算法</li>
      </ul>
    `
  },
  {
    id: 11,
    title: 'Q11: Vue Router的导航守卫',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '京东',
    tags: ['Vue Router', '守卫', '权限'],
    content: `
      <h5>守卫类型:</h5>
      <ul>
        <li>全局守卫: beforeEach、beforeResolve、afterEach</li>
        <li>路由独享: beforeEnter</li>
        <li>组件内: beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>执行顺序:</h5>
      <p>全局beforeEach → 路由beforeEnter → 组件beforeRouteEnter → beforeResolve → afterEach</p>
    `
  },
  {
    id: 12,
    title: 'Q12: Vue的slot插槽',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '小米',
    tags: ['slot', '插槽', '组件'],
    content: `
      <h5>插槽类型:</h5>
      <ul>
        <li>默认插槽</li>
        <li>具名插槽</li>
        <li>作用域插槽(带数据)</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Vue3语法:</h5>
      <div class="code-block"><pre>&lt;!-- 父组件 --&gt;
&lt;template v-slot:header="slotProps"&gt;
  {{ slotProps.user.name }}
&lt;/template&gt;

&lt;!-- 简写 --&gt;
&lt;template #default&gt;内容&lt;/template&gt;</pre></div>
    `
  },
  {
    id: 13,
    title: 'Q13: Vue3的Teleport',
    difficulty: 'easy',
    frequency: '★★★☆☆',
    company: '华为',
    tags: ['Teleport', 'Vue3', '传送'],
    content: `
      <h5>Teleport作用:</h5>
      <p>将组件内容渲染到DOM中的其他位置，如弹窗挂载到body。</p>
    `,
    detailedAnswer: `
      <div class="code-block"><pre>&lt;Teleport to="body"&gt;
  &lt;div class="modal"&gt;弹窗内容&lt;/div&gt;
&lt;/Teleport&gt;</pre></div>
    `
  },
  {
    id: 14,
    title: 'Q14: Vue的key的作用',
    difficulty: 'medium',
    frequency: '★★★★★',
    company: '字节跳动',
    tags: ['key', 'diff', 'v-for'],
    content: `
      <h5>key的作用:</h5>
      <p>帮助Vue识别节点身份，优化diff算法，避免错误的就地复用。</p>
    `,
    detailedAnswer: `
      <h5>注意:</h5>
      <ul>
        <li>不要用index作为key(列表会重排时)</li>
        <li>key应唯一且稳定</li>
      </ul>
    `
  },
  {
    id: 15,
    title: 'Q15: Vue的$set和$delete',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '阿里',
    tags: ['$set', '响应式', 'Vue2'],
    content: `
      <h5>Vue2场景:</h5>
      <p>对象新增属性、数组索引赋值，Vue2无法检测，需用Vue.set或this.$set。</p>
    `,
    detailedAnswer: `
      <h5>Vue3:</h5>
      <p>Proxy原生支持，无需$set。直接赋值即可响应式。</p>
    `
  },
  {
    id: 16,
    title: 'Q16: Vue的指令实现原理',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '腾讯',
    tags: ['指令', 'directive', '原理'],
    content: `
      <h5>自定义指令:</h5>
      <div class="code-block"><pre>app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})</pre></div>
    `,
    detailedAnswer: `
      <h5>钩子:</h5>
      <p>created、beforeMount、mounted、beforeUpdate、updated、beforeUnmount、unmounted</p>
    `
  },
  {
    id: 17,
    title: 'Q17: Vue的mixins和组合式函数',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '美团',
    tags: ['mixins', '组合式', '复用'],
    content: `
      <h5>mixins问题:</h5>
      <ul>
        <li>命名冲突</li>
        <li>来源不清晰</li>
        <li>多mixin时难以维护</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>组合式函数:</h5>
      <p>Vue3推荐使用composables(如useCounter)代替mixins，逻辑更清晰。</p>
    `
  },
  {
    id: 18,
    title: 'Q18: Vue3的defineComponent',
    difficulty: 'easy',
    frequency: '★★☆☆☆',
    company: '京东',
    tags: ['defineComponent', 'TypeScript', 'Vue3'],
    content: `
      <h5>作用:</h5>
      <p>为组件定义提供更好的TypeScript类型推断支持。</p>
    `,
    detailedAnswer: `
      <div class="code-block"><pre>import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    msg: String
  },
  setup(props) {
    return {}
  }
})</pre></div>
    `
  },
  {
    id: 19,
    title: 'Q19: Vue的异步组件',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '小米',
    tags: ['异步组件', 'defineAsyncComponent', '懒加载'],
    content: `
      <h5>Vue3用法:</h5>
      <div class="code-block"><pre>const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)</pre></div>
    `,
    detailedAnswer: `
      <h5>高级用法:</h5>
      <div class="code-block"><pre>defineAsyncComponent({
  loader: () => import('./Foo.vue'),
  loadingComponent: LoadingComponent,
  delay: 200,
  timeout: 3000
})</pre></div>
    `
  },
  {
    id: 20,
    title: 'Q20: Vue的v-model原理',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '华为',
    tags: ['v-model', '双向绑定', '语法糖'],
    content: `
      <h5>本质:</h5>
      <p>value属性 + input事件的语法糖。</p>
    `,
    detailedAnswer: `
      <h5>自定义组件:</h5>
      <div class="code-block"><pre>// Vue3 支持多个v-model
&lt;MyComponent v-model:title="title" v-model:content="content" /&gt;

// 子组件
emit('update:title', newValue)</pre></div>
    `
  },
  {
    id: 21,
    title: 'Q21: Vue的SSR原理',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '字节跳动',
    tags: ['SSR', '服务端渲染', 'Nuxt'],
    content: `
      <h5>SSR流程:</h5>
      <ol>
        <li>服务器运行Vue应用生成HTML</li>
        <li>将HTML发送给客户端</li>
        <li>客户端激活(hydration)使交互生效</li>
      </ol>
    `,
    detailedAnswer: `
      <h5>注意点:</h5>
      <p>生命周期只执行beforeCreate和created，避免依赖浏览器API，注意跨请求状态污染。</p>
    `
  },
  {
    id: 22,
    title: 'Q22: Vue的transition动画',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '百度',
    tags: ['transition', '动画', '过渡'],
    content: `
      <h5>过渡类名:</h5>
      <ul>
        <li>v-enter-from / v-enter-active / v-enter-to</li>
        <li>v-leave-from / v-leave-active / v-leave-to</li>
      </ul>
    `,
    detailedAnswer: `
      <div class="code-block"><pre>&lt;transition name="fade"&gt;
  &lt;p v-if="show"&gt;hello&lt;/p&gt;
&lt;/transition&gt;</pre></div>
    `
  },
  {
    id: 23,
    title: 'Q23: Vue的provide/inject响应式',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '阿里',
    tags: ['provide', 'inject', '响应式'],
    content: `
      <h5>Vue3:</h5>
      <p>provide传ref/reactive可保持响应式，inject获取的也是响应式的。</p>
    `,
    detailedAnswer: `
      <div class="code-block"><pre>// 祖先
provide('theme', ref('dark'))

// 后代
const theme = inject('theme')
theme.value = 'light'</pre></div>
    `
  },
  {
    id: 24,
    title: 'Q24: Vue的scoped样式原理',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '腾讯',
    tags: ['scoped', '样式隔离', 'CSS'],
    content: `
      <h5>实现:</h5>
      <p>给元素添加data-v-xxx属性，选择器加上属性选择器实现隔离。</p>
    `,
    detailedAnswer: `
      <h5>深度选择器:</h5>
      <div class="code-block"><pre>/* Vue2 */
::v-deep .child {}
/* Vue3 */
:deep(.child) {}</pre></div>
    `
  }
]
</script>

<style scoped>
.questions-section {
  padding: 20px;
}

.section-desc {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.questions-grid {
  display: grid;
  gap: 20px;
}

.question-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.question-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

.question-header {
  margin-bottom: 16px;
}

.question-title {
  color: #2c3e50;
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
}

.question-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.difficulty {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.difficulty.easy { background: #d4edda; color: #155724; }
.difficulty.medium { background: #fff3cd; color: #856404; }
.difficulty.hard { background: #f8d7da; color: #721c24; }

.frequency {
  color: #6c757d;
  font-weight: bold;
}

.company {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.question-content {
  line-height: 1.7;
  margin-bottom: 16px;
}

.question-content h5 {
  color: #495057;
  margin: 20px 0 10px 0;
  font-size: 16px;
  font-weight: 600;
}

.question-content h6 {
  color: #6c757d;
  margin: 16px 0 8px 0;
  font-size: 14px;
  font-weight: 600;
}

.question-content p {
  margin: 12px 0;
}

.question-content ul, .question-content ol {
  margin: 12px 0;
  padding-left: 24px;
}

.question-content li {
  margin: 6px 0;
}

.answer-section {
  margin-top: 20px;
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
}

.answer-section summary {
  cursor: pointer;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 12px;
}

.answer-section summary:hover {
  color: #0056b3;
}

.answer-content {
  line-height: 1.7;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 16px;
  margin: 12px 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
  line-height: 1.5;
}

.tags {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.comparison-table th, .comparison-table td {
  border: 1px solid #dee2e6;
  padding: 8px 12px;
  text-align: left;
}

.comparison-table th {
  background: #f8f9fa;
  font-weight: bold;
}
</style>