<template>
  <div class="nuxt-guide">
    <div class="guide-header">
      <h1>🚀 NUXT.JS 基础知识完整指南</h1>
      <p class="subtitle">基于 Vue.js 的通用应用框架 - 服务端渲染和静态站点生成</p>
    </div>

    <div class="guide-content">
      <!-- 1. NUXT.JS 简介 -->
      <section class="guide-section">
        <h2>1️⃣ 什么是 NUXT.JS？</h2>
        <div class="content-box">
          <p><strong>NUXT.JS</strong> 是一个基于 Vue.js 的通用应用框架，通过对客户端/服务端基础架构的抽象组织，帮助你快速开发 Web 应用。它主要关注应用的 UI 渲染，同时提供开箱即用的功能，帮助你完成应用开发。</p>
          <ul class="feature-list">
            <li>✅ 服务端渲染 (SSR) - 提升 SEO 和首屏加载速度</li>
            <li>✅ 静态站点生成 (SSG) - 预渲染所有页面</li>
            <li>✅ 自动代码分割 - 优化性能</li>
            <li>✅ 文件系统路由 - 基于文件结构自动生成路由</li>
            <li>✅ 强大的数据获取 - asyncData 和 fetch</li>
            <li>✅ 中间件支持 - 页面渲染前执行逻辑</li>
            <li>✅ 模块化架构 - 丰富的模块生态</li>
          </ul>
        </div>
      </section>

      <!-- 2. 项目结构 -->
      <section class="guide-section">
        <h2>2️⃣ 项目结构</h2>
        <div class="content-box">
          <pre class="code-block"><code>nuxt-project/
├── assets/          # 未编译的资源文件（CSS、图片等）
├── components/     # Vue 组件
├── layouts/        # 布局组件
├── middleware/     # 中间件
├── pages/          # 页面目录（自动生成路由）
│   ├── index.vue   # 对应路由 /
│   ├── about.vue   # 对应路由 /about
│   └── users/
│       ├── index.vue    # 对应路由 /users
│       └── _id.vue      # 对应路由 /users/:id
├── plugins/        # 插件目录
├── static/         # 静态文件（直接访问）
├── store/          # Vuex 状态管理
├── nuxt.config.js  # NUXT 配置文件
└── package.json</code></pre>
        </div>
      </section>

      <!-- 3. 安装和创建项目 -->
      <section class="guide-section">
        <h2>3️⃣ 安装和创建项目</h2>
        <div class="content-box">
          <h3>3.1 使用 create-nuxt-app</h3>
          <pre class="code-block"><code># 使用 npx
npx create-nuxt-app my-project

# 或使用 yarn
yarn create nuxt-app my-project

# 安装过程中会询问：
# - 项目名称
# - 编程语言 (JavaScript/TypeScript)
# - 包管理器 (npm/yarn/pnpm)
# - UI 框架 (None/Tailwind/Bootstrap等)
# - 模块 (Axios/PWA等)
# - 开发工具 (ESLint/Prettier等)
# - 测试框架
# - 渲染模式 (SSR/SSG/SPA)</code></pre>

          <h3>3.2 手动安装</h3>
          <pre class="code-block"><code># 创建项目目录
mkdir my-nuxt-app
cd my-nuxt-app

# 初始化 package.json
npm init -y

# 安装 NUXT
npm install nuxt

# 在 package.json 中添加脚本
{
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  }
}</code></pre>
        </div>
      </section>

      <!-- 4. 路由系统 -->
      <section class="guide-section">
        <h2>4️⃣ 路由系统</h2>
        <div class="content-box">
          <h3>4.1 文件系统路由</h3>
          <p>NUXT 会根据 <code>pages</code> 目录结构自动生成路由：</p>
          <pre class="code-block"><code>pages/
├── index.vue          → /
├── about.vue          → /about
├── users/
│   ├── index.vue      → /users
│   └── _id.vue        → /users/:id
└── blog/
    ├── index.vue      → /blog
    └── [slug].vue     → /blog/:slug</code></pre>

          <h3>4.2 动态路由</h3>
          <pre class="code-block"><code>// pages/users/_id.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;用户详情&lt;/h1&gt;
    &lt;p&gt;用户ID: &#123;&#123; $route.params.id &#125;&#125;&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
// 使用 useRoute 获取路由信息
const route = useRoute()
console.log(route.params.id)
&lt;/script&gt;</code></pre>

          <h3>4.3 嵌套路由</h3>
          <pre class="code-block"><code>// pages/parent.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;父页面&lt;/h1&gt;
    &lt;NuxtChild /&gt;  &lt;!-- 子路由出口 --&gt;
  &lt;/div&gt;
&lt;/template&gt;

// pages/parent/child.vue
&lt;template&gt;
  &lt;div&gt;子页面内容&lt;/div&gt;
&lt;/template&gt;

// 路由结构: /parent → /parent/child</code></pre>

          <h3>4.4 编程式导航</h3>
          <pre class="code-block"><code>&lt;script setup&gt;
// 使用 useRouter
const router = useRouter()

// 导航到指定路由
router.push('/about')
router.push({ path: '/users', query: { page: 1 } })
router.push({ name: 'users-id', params: { id: 123 } })

// 返回上一页
router.back()

// 替换当前路由
router.replace('/login')
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="router.push('/about')"&gt;跳转到关于页&lt;/button&gt;
&lt;/template&gt;</code></pre>
        </div>
      </section>

      <!-- 5. 页面和布局 -->
      <section class="guide-section">
        <h2>5️⃣ 页面和布局</h2>
        <div class="content-box">
          <h3>5.1 页面组件</h3>
          <pre class="code-block"><code>// pages/about.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;关于我们&lt;/h1&gt;
    &lt;p&gt;这是关于页面&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
// 页面元信息
useHead({
  title: '关于我们',
  meta: [
    { name: 'description', content: '关于我们的描述' }
  ]
})
&lt;/script&gt;</code></pre>

          <h3>5.2 布局组件</h3>
          <pre class="code-block"><code>// layouts/default.vue
&lt;template&gt;
  &lt;div class="layout"&gt;
    &lt;header&gt;
      &lt;nav&gt;
        &lt;NuxtLink to="/"&gt;首页&lt;/NuxtLink&gt;
        &lt;NuxtLink to="/about"&gt;关于&lt;/NuxtLink&gt;
      &lt;/nav&gt;
    &lt;/header&gt;
    &lt;main&gt;
      &lt;slot /&gt;  &lt;!-- 页面内容 --&gt;
    &lt;/main&gt;
    &lt;footer&gt;Footer&lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;

// 使用自定义布局
// pages/about.vue
&lt;script setup&gt;
definePageMeta({
  layout: 'custom'  // 使用 layouts/custom.vue
})
&lt;/script&gt;</code></pre>

          <h3>5.3 NuxtLink 组件</h3>
          <pre class="code-block"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- 基础用法 --&gt;
    &lt;NuxtLink to="/about"&gt;关于&lt;/NuxtLink&gt;
    
    &lt;!-- 带参数 --&gt;
    &lt;NuxtLink :to="{ path: '/users', query: { id: 1 } }"&gt;
      用户详情
    &lt;/NuxtLink&gt;
    
    &lt;!-- 外部链接 --&gt;
    &lt;NuxtLink to="https://nuxtjs.org" external&gt;
      NUXT 官网
    &lt;/NuxtLink&gt;
    
    &lt;!-- 预取数据 --&gt;
    &lt;NuxtLink to="/about" prefetch&gt;关于&lt;/NuxtLink&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
        </div>
      </section>

      <!-- 6. 数据获取 -->
      <section class="guide-section">
        <h2>6️⃣ 数据获取</h2>
        <div class="content-box">
          <h3>6.1 useFetch (推荐)</h3>
          <pre class="code-block"><code>&lt;script setup&gt;
// useFetch 会自动处理服务端和客户端的数据获取
const { data, pending, error, refresh } = await useFetch('/api/users')

// 带参数
const { data: user } = await useFetch('/api/user', {
  params: { id: 1 },
  query: { page: 1 }
})

// 响应式数据
const userId = ref(1)
const { data: user } = await useFetch(`/api/user/${userId.value}`, {
  watch: [userId]  // 当 userId 变化时重新获取
})
&lt;/script&gt;

&lt;template&gt;
  &lt;div v-if="pending"&gt;加载中...&lt;/div&gt;
  &lt;div v-else-if="error"&gt;错误: &#123;&#123; error.message &#125;&#125;&lt;/div&gt;
  &lt;div v-else&gt;
    &lt;pre&gt;&#123;&#123; data &#125;&#125;&lt;/pre&gt;
    &lt;button @click="refresh()"&gt;刷新&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>

          <h3>6.2 useAsyncData</h3>
          <pre class="code-block"><code>&lt;script setup&gt;
// 更灵活的数据获取方式
const { data, error, pending } = await useAsyncData('users', () => {
  return $fetch('/api/users')
})

// 使用自定义 key
const { data: posts } = await useAsyncData('posts', async () => {
  const response = await fetch('https://api.example.com/posts')
  return response.json()
})
&lt;/script&gt;</code></pre>

          <h3>6.3 $fetch</h3>
          <pre class="code-block"><code>&lt;script setup&gt;
// 在客户端和服务端都可以使用
const users = await $fetch('/api/users')

// POST 请求
const newUser = await $fetch('/api/users', {
  method: 'POST',
  body: {
    name: 'John',
    email: 'john@example.com'
  }
})
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- 7. 状态管理 -->
      <section class="guide-section">
        <h2>7️⃣ 状态管理</h2>
        <div class="content-box">
          <h3>7.1 使用 Pinia (NUXT 3 推荐)</h3>
          <pre class="code-block"><code>// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(credentials) {
      const user = await $fetch('/api/login', {
        method: 'POST',
        body: credentials
      })
      this.user = user
      this.isAuthenticated = true
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})

// 在组件中使用
&lt;script setup&gt;
const userStore = useUserStore()
await userStore.login({ email, password })
&lt;/script&gt;</code></pre>

          <h3>7.2 使用 useState (组合式 API)</h3>
          <pre class="code-block"><code>&lt;script setup&gt;
// useState 创建跨组件的响应式状态
const counter = useState('counter', () => 0)

// 使用
counter.value++

// 在服务端和客户端之间共享状态
const user = useState('user', () => null)
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- 8. 中间件 -->
      <section class="guide-section">
        <h2>8️⃣ 中间件</h2>
        <div class="content-box">
          <h3>8.1 创建中间件</h3>
          <pre class="code-block"><code>// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  // 检查用户是否登录
  if (!userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

// 在页面中使用
// pages/dashboard.vue
&lt;script setup&gt;
definePageMeta({
  middleware: 'auth'  // 使用 auth 中间件
})
&lt;/script&gt;</code></pre>

          <h3>8.2 全局中间件</h3>
          <pre class="code-block"><code>// middleware/global.js
export default defineNuxtRouteMiddleware((to, from) => {
  // 每个路由都会执行
  console.log('导航到:', to.path)
})

// nuxt.config.js
export default {
  router: {
    middleware: 'global'
  }
}</code></pre>
        </div>
      </section>

      <!-- 9. 插件 -->
      <section class="guide-section">
        <h2>9️⃣ 插件</h2>
        <div class="content-box">
          <h3>9.1 创建插件</h3>
          <pre class="code-block"><code>// plugins/my-plugin.client.js (仅在客户端运行)
export default defineNuxtPlugin((nuxtApp) => {
  // 添加全局属性
  nuxtApp.provide('hello', (name) => `Hello ${name}!`)
  
  // 添加全局方法
  return {
    provide: {
      utils: {
        formatDate: (date) => {
          return new Date(date).toLocaleDateString()
        }
      }
    }
  }
})

// 在组件中使用
&lt;script setup&gt;
const { $hello, $utils } = useNuxtApp()
console.log($hello('World'))
console.log($utils.formatDate(new Date()))
&lt;/script&gt;</code></pre>

          <h3>9.2 第三方库插件</h3>
          <pre class="code-block"><code>// plugins/vue-toastification.client.js
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast)
})</code></pre>
        </div>
      </section>

      <!-- 10. 配置 -->
      <section class="guide-section">
        <h2>🔟 配置文件</h2>
        <div class="content-box">
          <h3>10.1 nuxt.config.js</h3>
          <pre class="code-block"><code>// nuxt.config.js
export default defineNuxtConfig({
  // 应用配置
  app: {
    head: {
      title: 'My NUXT App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // CSS 配置
  css: ['~/assets/css/main.css'],
  
  // 模块
  modules: ['@nuxtjs/axios', '@nuxtjs/tailwindcss'],
  
  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅在服务端可用）
    apiSecret: process.env.API_SECRET,
    
    // 公共配置（客户端和服务端都可用）
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000'
    }
  },
  
  // 开发服务器配置
  devServer: {
    port: 3000,
    host: 'localhost'
  }
})</code></pre>

          <h3>10.2 环境变量</h3>
          <pre class="code-block"><code>// .env
API_SECRET=my-secret-key
API_BASE_URL=https://api.example.com

// .env.local (本地开发，不提交到 Git)
API_SECRET=local-secret

// 使用环境变量
// nuxt.config.js
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.API_SECRET,
    public: {
      apiBase: process.env.API_BASE_URL
    }
  }
})

// 在代码中使用
const config = useRuntimeConfig()
console.log(config.public.apiBase)</code></pre>
        </div>
      </section>

      <!-- 11. 组件 -->
      <section class="guide-section">
        <h2>1️⃣1️⃣ 组件系统</h2>
        <div class="content-box">
          <h3>11.1 自动导入组件</h3>
          <pre class="code-block"><code>// components/Button.vue
&lt;template&gt;
  &lt;button :class="variant"&gt;
    &lt;slot /&gt;
  &lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
&lt;/script&gt;

// 在任何页面中直接使用，无需导入
&lt;template&gt;
  &lt;Button variant="primary"&gt;点击我&lt;/Button&gt;
&lt;/template&gt;</code></pre>

          <h3>11.2 组件命名</h3>
          <pre class="code-block"><code>// components/base/Button.vue → &lt;BaseButton /&gt;
// components/ui/Input.vue → &lt;UiInput /&gt;
// components/UserCard.vue → &lt;UserCard /&gt;

// 禁用自动导入前缀
// nuxt.config.js
export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      pathPrefix: false  // 不使用前缀
    }
  ]
})</code></pre>
        </div>
      </section>

      <!-- 12. 部署 -->
      <section class="guide-section">
        <h2>1️⃣2️⃣ 部署</h2>
        <div class="content-box">
          <h3>12.1 构建命令</h3>
          <pre class="code-block"><code># 开发模式
npm run dev

# 构建生产版本 (SSR)
npm run build
npm run start

# 生成静态站点 (SSG)
npm run generate

# 预览构建结果
npm run preview</code></pre>

          <h3>12.2 部署到 Vercel</h3>
          <pre class="code-block"><code># 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 或通过 GitHub 集成自动部署</code></pre>

          <h3>12.3 部署到服务器</h3>
          <pre class="code-block"><code># 1. 构建项目
npm run build

# 2. 启动生产服务器
npm run start

# 或使用 PM2
pm2 start npm --name "nuxt-app" -- start

# 3. 使用 Nginx 反向代理
# /etc/nginx/sites-available/nuxt
server {
  listen 80;
  server_name example.com;
  
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}</code></pre>
        </div>
      </section>

      <!-- 13. 最佳实践 -->
      <section class="guide-section">
        <h2>1️⃣3️⃣ 最佳实践</h2>
        <div class="content-box">
          <ul class="practice-list">
            <li>
              <strong>1. 使用 useFetch 和 useAsyncData：</strong>充分利用 NUXT 的数据获取能力，自动处理 SSR
            </li>
            <li>
              <strong>2. 合理使用中间件：</strong>处理认证、权限等通用逻辑
            </li>
            <li>
              <strong>3. 组件自动导入：</strong>利用 NUXT 的自动导入功能，减少样板代码
            </li>
            <li>
              <strong>4. 优化图片：</strong>使用 NuxtImage 组件优化图片加载
            </li>
            <li>
              <strong>5. SEO 优化：</strong>使用 useHead 和 useSeoMeta 设置页面元信息
            </li>
            <li>
              <strong>6. 错误处理：</strong>创建 error.vue 页面处理错误
            </li>
            <li>
              <strong>7. 性能优化：</strong>使用 lazy loading、代码分割等优化技术
            </li>
            <li>
              <strong>8. 类型安全：</strong>使用 TypeScript 提高代码质量
            </li>
          </ul>
        </div>
      </section>

      <!-- 14. 常见问题 -->
      <section class="guide-section">
        <h2>1️⃣4️⃣ 常见问题</h2>
        <div class="content-box">
          <div class="qa-item">
            <h4>Q: NUXT 2 和 NUXT 3 有什么区别？</h4>
            <p>A: NUXT 3 基于 Vue 3，使用 Vite 作为构建工具，支持组合式 API，性能更好，API 更简洁。</p>
          </div>

          <div class="qa-item">
            <h4>Q: 什么时候使用 SSR，什么时候使用 SSG？</h4>
            <p>A: SSR 适合需要动态内容、用户个性化数据的应用；SSG 适合内容相对静态的网站，如博客、文档站。</p>
          </div>

          <div class="qa-item">
            <h4>Q: 如何处理客户端特定的代码？</h4>
            <p>A: 使用 <code>process.client</code> 判断，或创建 <code>.client.js</code> 后缀的文件。</p>
          </div>

          <div class="qa-item">
            <h4>Q: 如何优化首屏加载速度？</h4>
            <p>A: 使用 SSG、代码分割、图片优化、CDN 加速、减少 JavaScript 体积等方法。</p>
          </div>
        </div>
      </section>

      <!-- 15. Nuxt3 核心：Nitro & Server API -->
      <section class="guide-section">
        <h2>1️⃣5️⃣ Nuxt3 核心：Nitro & Server API</h2>
        <div class="content-box">
          <p>
            Nuxt3 的后端能力来自 <strong>Nitro</strong>：你可以在同一个项目里写服务端 API（Server Routes），实现“前后端一体”的小型服务。
            这对文档站、后台、BFF、简单业务非常实用。
          </p>

          <h3>15.1 server/api 示例（REST 风格）</h3>
          <pre v-pre class="code-block"><code>server/
└── api/
    ├── hello.get.ts
    └── users/
        └── [id].get.ts</code></pre>

          <pre v-pre class="code-block"><code>// server/api/hello.get.ts
export default defineEventHandler(() => {
  return { ok: true, message: 'hello from nitro' }
})</code></pre>

          <h3>15.2 在页面里调用（useFetch / $fetch）</h3>
          <pre v-pre class="code-block"><code>&lt;script setup&gt;
const { data, pending, error } = await useFetch('/api/hello')
// 或：
// const res = await $fetch('/api/hello')
&lt;/script&gt;</code></pre>

          <h3>15.3 统一错误返回（示意）</h3>
          <pre v-pre class="code-block"><code>export default defineEventHandler(async () => {
  const user = null
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }
  return user
})</code></pre>
        </div>
      </section>

      <!-- 16. Composables：把可复用逻辑写成 useXxx -->
      <section class="guide-section">
        <h2>1️⃣6️⃣ Composables：把可复用逻辑写成 useXxx</h2>
        <div class="content-box">
          <p>Nuxt 会自动导入 <code>composables/</code> 下的函数，你可以像用内置的 <code>useFetch</code> 一样使用自己的 <code>useXXX</code>。</p>
          <pre v-pre class="code-block"><code>// composables/useCounter.ts
export function useCounter() {
  const count = useState('count', () => 0)
  const inc = () => count.value++
  const reset = () => (count.value = 0)
  return { count, inc, reset }
}

// 任意页面/组件中
const { count, inc } = useCounter()</code></pre>
        </div>
      </section>

      <!-- 17. 渲染模式 & 路由规则：SSR/SSG/SPA + routeRules -->
      <section class="guide-section">
        <h2>1️⃣7️⃣ 渲染模式 & 路由规则：SSR/SSG/SPA + routeRules</h2>
        <div class="content-box">
          <p>Nuxt 既能 SSR，也能 SSG，也能纯 SPA。更强的是你可以对不同路由做不同策略（缓存、预渲染、禁用 SSR）。</p>
          <pre v-pre class="code-block"><code>// nuxt.config.ts（示意）
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },          // 预渲染首页（SSG）
    '/docs/**': { swr: 60 },           // stale-while-revalidate
    '/admin/**': { ssr: false }        // 后台页面走 SPA
  }
})</code></pre>
          <ul class="feature-list">
            <li><strong>prerender</strong>：适合文档/博客，速度快、SEO 好</li>
            <li><strong>swr</strong>：适合内容更新但不那么频繁的页面</li>
            <li><strong>ssr:false</strong>：适合强交互后台（减少 SSR 复杂度）</li>
          </ul>
        </div>
      </section>

      <!-- 18. 错误处理与页面：error.vue / useError -->
      <section class="guide-section">
        <h2>1️⃣8️⃣ 错误处理与页面：error.vue / useError</h2>
        <div class="content-box">
          <h3>18.1 自定义错误页</h3>
          <pre v-pre class="code-block"><code>// 根目录创建 error.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;出错了&lt;/h1&gt;
    &lt;p&gt;{{ error?.statusCode }} - {{ error?.message }}&lt;/p&gt;
    &lt;button @click=\"clearError({ redirect: '/' })\"&gt;回首页&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
const error = useError()
&lt;/script&gt;</code></pre>
          <p>
            注意：上面代码块里出现了 <code>&#123;&#123; &#125;&#125;</code>，在本项目（Vue 模板）里会被解析。
            如果你想复制粘贴到 Nuxt 项目里，这段是正确的；但在文档展示里请用 <code>v-pre</code> 或转义大括号。
          </p>
          <p><strong>本页面的代码块已加了 v-pre</strong>，因此不会触发解析。</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// NUXT.JS 基础知识讲解组件
</script>

<style scoped>
.nuxt-guide {
  background: white;
  padding: 20px;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
}

.guide-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.guide-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.guide-header .subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0;
}

.guide-content {
  padding: 0;
}

.guide-section {
  margin-bottom: 40px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 30px;
}

.guide-section:last-child {
  border-bottom: none;
}

.guide-section h2 {
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

.guide-section h3 {
  color: #555;
  font-size: 1.2rem;
  margin-top: 25px;
  margin-bottom: 15px;
}

.guide-section h4 {
  color: #666;
  font-size: 1rem;
  margin-bottom: 10px;
}

.content-box {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.content-box p {
  line-height: 1.8;
  color: #333;
  margin-bottom: 15px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.feature-list li {
  padding: 8px 0;
  color: #555;
  line-height: 1.6;
}

.code-block {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 20px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 15px 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.code-block code {
  color: #f8f8f2;
  white-space: pre;
}

.practice-list {
  list-style: none;
  padding: 0;
}

.practice-list li {
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  line-height: 1.8;
  color: #555;
}

.practice-list li:last-child {
  border-bottom: none;
}

.practice-list strong {
  color: #667eea;
}

.qa-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
  border-left: 4px solid #667eea;
}

.qa-item h4 {
  color: #667eea;
  margin-bottom: 10px;
}

.qa-item p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .nuxt-guide {
    padding: 15px;
  }

  .guide-header h1 {
    font-size: 1.5rem;
  }

  .code-block {
    font-size: 12px;
    padding: 15px;
  }
}
</style>