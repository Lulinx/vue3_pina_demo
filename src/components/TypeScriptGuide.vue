<template>
  <div class="ts-guide">
    <div class="guide-header">
      <h1>🟦 TypeScript 重点详解（通俗 + 全面）</h1>
      <p class="subtitle">把 JavaScript 变“可预期”：类型系统 + 更好的工程能力</p>
    </div>

    <div class="guide-content">
      <section class="guide-section">
        <h2>1️⃣ TypeScript 是什么？为什么要用？</h2>
        <div class="content-box">
          <p>
            <strong>TypeScript (TS)</strong> 是 JavaScript 的超集：你写的 TS 最终会编译成 JS 运行。
            TS 的核心价值不是“语法更花”，而是 <strong>类型系统</strong> 帮你提前发现错误、提升重构信心、提高团队协作效率。
          </p>
          <ul class="feature-list">
            <li><strong>更少线上 Bug</strong>：很多“undefined 访问属性”、“参数传错类型”在编译期就报错</li>
            <li><strong>更容易重构</strong>：改字段名、改参数，IDE + 类型系统能帮你全局定位</li>
            <li><strong>更好的提示</strong>：自动补全、跳转定义、智能提示更准确</li>
            <li><strong>更清晰的契约</strong>：接口/类型就是文档，前后端/模块之间沟通成本更低</li>
          </ul>
        </div>
      </section>

      <section class="guide-section">
        <h2>2️⃣ 先把这几个“类型基础”吃透</h2>
        <div class="content-box">
          <h3>2.1 原始类型 / 数组 / 元组</h3>
          <pre v-pre class="code-block"><code>let a: number = 1
let b: string = 'hi'
let c: boolean = true
let d: null = null
let e: undefined = undefined

let list: number[] = [1, 2, 3]
let list2: Array&lt;number&gt; = [1, 2, 3]

// 元组：固定长度 + 固定位置类型
let tuple: [number, string] = [1, 'ok']</code></pre>

          <h3>2.2 any / unknown / never（面试高频 & 真正有用）</h3>
          <pre v-pre class="code-block"><code>// any：放弃类型检查（尽量少用）
let x: any = 1
x.foo.bar()  // 不报错，但运行时可能炸

// unknown：不知道类型，但必须“缩小”后才能用（推荐）
let y: unknown = JSON.parse('{"a":1}')
if (typeof y === 'object' && y !== null) {
  // 仍然需要更精确的判断或断言
}

// never：永远不可能发生（通常来自“穷尽检查”）
function assertNever(v: never): never {
  throw new Error('Unexpected: ' + v)
}</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>3️⃣ type vs interface：怎么选？</h2>
        <div class="content-box">
          <p>一句话：两者都能描述对象结构，团队统一风格最重要；但有一些常见选择建议：</p>
          <ul class="feature-list">
            <li><strong>interface</strong>：更适合“对象形状”、可被扩展（extends）、可声明合并（declaration merging）</li>
            <li><strong>type</strong>：更适合“联合/交叉/映射/条件类型”等类型运算</li>
          </ul>

          <pre v-pre class="code-block"><code>// interface
interface User {
  id: number
  name: string
}

interface Admin extends User {
  role: 'admin'
}

// type
type ID = string | number
type ApiResult&lt;T&gt; = { code: number; data: T; message?: string }</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>4️⃣ 联合类型 + 类型缩小（TS 真正的“爽点”）</h2>
        <div class="content-box">
          <h3>4.1 联合类型</h3>
          <pre v-pre class="code-block"><code>type Status = 'idle' | 'loading' | 'success' | 'error'
let status: Status = 'idle'</code></pre>

          <h3>4.2 缩小：typeof / in / instanceof / 自定义类型守卫</h3>
          <pre v-pre class="code-block"><code>function format(input: string | number) {
  if (typeof input === 'string') {
    return input.toUpperCase()
  }
  return input.toFixed(2)
}

type Cat = { kind: 'cat'; meow: () =&gt; void }
type Dog = { kind: 'dog'; bark: () =&gt; void }
type Pet = Cat | Dog

function play(pet: Pet) {
  if (pet.kind === 'cat') pet.meow()
  else pet.bark()
}</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>5️⃣ 泛型（Generic）：写一次，适配多种类型</h2>
        <div class="content-box">
          <pre v-pre class="code-block"><code>// 泛型函数
function first&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0]
}

// 泛型接口/类型
type Page&lt;T&gt; = {
  list: T[]
  page: number
  pageSize: number
  total: number
}

// 泛型约束
function getId&lt;T extends { id: number }&gt;(obj: T) {
  return obj.id
}</code></pre>
          <p><strong>常见误区：</strong>泛型不是“更复杂”，而是“更复用 + 更准确”。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>6️⃣ Utility Types（工具类型）：TS 标配瑞士军刀</h2>
        <div class="content-box">
          <pre v-pre class="code-block"><code>interface User {
  id: number
  name: string
  age?: number
}

type UserRequired = Required&lt;User&gt;
type UserPartial = Partial&lt;User&gt;
type UserPick = Pick&lt;User, 'id' | 'name'&gt;
type UserOmit = Omit&lt;User, 'age'&gt;
type UserReadonly = Readonly&lt;User&gt;

type Keys = keyof User  // 'id' | 'name' | 'age'</code></pre>
          <p>这些工具类型在“表单编辑、接口返回、DTO 转换、Patch 更新”场景非常常见。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>7️⃣ 函数类型：参数、返回值、重载</h2>
        <div class="content-box">
          <h3>7.1 函数签名</h3>
          <pre v-pre class="code-block"><code>type Fn = (a: number, b: number) =&gt; number
const add: Fn = (a, b) =&gt; a + b</code></pre>

          <h3>7.2 函数重载（对外多个签名，对内一个实现）</h3>
          <pre v-pre class="code-block"><code>function toArray(x: string): string[]
function toArray(x: number): number[]
function toArray(x: string | number) {
  return [x]
}</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>8️⃣ 对象类型进阶：索引签名、Record、可选链与空值处理</h2>
        <div class="content-box">
          <pre v-pre class="code-block"><code>// 索引签名：键值表
type Dict = { [key: string]: string }
const dict: Dict = { a: '1' }

// Record：更推荐的“键值表”
type Role = 'admin' | 'user'
type RoleName = Record&lt;Role, string&gt;
const roleName: RoleName = { admin: '管理员', user: '普通用户' }

// 可选链 + 空值合并
type Profile = { avatar?: { url?: string } }
const p: Profile = {}
const url = p.avatar?.url ?? 'default.png'</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>9️⃣ TS 在 Vue3 里怎么写（最实用）</h2>
        <div class="content-box">
          <h3>9.1 script setup + defineProps/defineEmits</h3>
          <pre v-pre class="code-block"><code>&lt;script setup lang=\"ts\"&gt;
type User = { id: number; name: string }

const props = defineProps&lt;{
  user: User
  disabled?: boolean
}&gt;()

const emit = defineEmits&lt;{
  (e: 'save', user: User): void
  (e: 'cancel'): void
}&gt;()

function onSave() {
  emit('save', props.user)
}
&lt;/script&gt;</code></pre>

          <h3>9.2 ref 的类型（常见坑）</h3>
          <pre v-pre class="code-block"><code>import { ref } from 'vue'

const count = ref(0)          // Ref&lt;number&gt;
const input = ref&lt;HTMLInputElement | null&gt;(null)

// 访问 DOM 时注意 null
input.value?.focus()</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>🔟 tsconfig 关键配置（别背，理解即可）</h2>
        <div class="content-box">
          <pre v-pre class="code-block"><code>{
  \"compilerOptions\": {
    \"target\": \"ES2020\",
    \"module\": \"ESNext\",
    \"moduleResolution\": \"Bundler\",
    \"strict\": true,
    \"noImplicitAny\": true,
    \"skipLibCheck\": true,
    \"baseUrl\": \".\",
    \"paths\": {
      \"@/*\": [\"src/*\"]
    }
  }
}</code></pre>
          <ul class="feature-list">
            <li><strong>strict</strong>：强烈建议开启（真正发挥 TS 价值）</li>
            <li><strong>skipLibCheck</strong>：减少第三方声明文件带来的噪音</li>
            <li><strong>paths</strong>：配合 Vite alias，提升导入体验</li>
          </ul>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣1️⃣ 常见错误与最佳实践（很重要）</h2>
        <div class="content-box">
          <ul class="practice-list">
            <li><strong>1. 少用 any</strong>：能用 unknown + 缩小就别用 any</li>
            <li><strong>2. 用字面量联合替代魔法字符串</strong>：如 status、role</li>
            <li><strong>3. API 返回统一封装类型</strong>：ApiResult&lt;T&gt;</li>
            <li><strong>4. 优先类型缩小，而不是 as 断言</strong>：断言会绕过检查</li>
            <li><strong>5. 复杂对象类型优先 interface + extends</strong>：更易维护</li>
            <li><strong>6. 用 eslint + typescript-eslint 统一规范</strong></li>
          </ul>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣2️⃣ FAQ（你大概率会遇到）</h2>
        <div class="content-box">
          <div class="qa-item">
            <h4>Q: “类型体操”要学到什么程度？</h4>
            <p>A: 日常业务把“联合类型、泛型、工具类型、缩小”吃透就够了；条件类型/映射类型属于进阶加分项。</p>
          </div>
          <div class="qa-item">
            <h4>Q: 为什么我觉得 TS 很烦？</h4>
            <p>A: 通常是类型设计不合理或 strict 没开全；正确的类型会让你越写越省心，而不是越写越累。</p>
          </div>
          <div class="qa-item">
            <h4>Q: 怎么给第三方库补类型？</h4>
            <p>A: 优先找 @types；没有的话在项目里写 d.ts 声明文件（declare module ...）。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// TypeScript 教学文档页
</script>

<style scoped>
.ts-guide {
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

.code-snippet {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 10px 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.code-snippet code {
  color: #f8f8f2;
}

@media (max-width: 768px) {
  .ts-guide {
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
