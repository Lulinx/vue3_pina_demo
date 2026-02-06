<template>
  <div class="interview-guide">
    <div class="guide-header">
      <h1>🎯 前端81道高频面试题详解</h1>
      <p class="subtitle">JS/HTML/CSS/TS/Vue/React/Node/Webpack/算法/系统设计 + 各大厂真题</p>
    </div>

    <div class="guide-content">
      <!-- 导航菜单 -->
      <div class="nav-menu">
        <button
          v-for="category in categories"
          :key="category.key"
          :class="['nav-btn', { active: activeCategory === category.key }]"
          @click="activeCategory = category.key"
        >
          {{ category.icon }} {{ category.label }}
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- JS基础 -->
        <section v-if="activeCategory === 'js'" class="guide-section">
          <h2>1️⃣ JavaScript 基础与进阶 (20道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in jsQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- HTML/CSS -->
        <section v-if="activeCategory === 'html-css'" class="guide-section">
          <h2>2️⃣ HTML5/CSS3 (15道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in htmlCssQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- TypeScript -->
        <section v-if="activeCategory === 'typescript'" class="guide-section">
          <h2>3️⃣ TypeScript (10道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in tsQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- Vue.js -->
        <section v-if="activeCategory === 'vue'" class="guide-section">
          <h2>4️⃣ Vue.js (15道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in vueQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- React -->
        <section v-if="activeCategory === 'react'" class="guide-section">
          <h2>5️⃣ React (15道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in reactQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- Node.js -->
        <section v-if="activeCategory === 'node'" class="guide-section">
          <h2>6️⃣ Node.js (10道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in nodeQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- 工程化 -->
        <section v-if="activeCategory === 'engineering'" class="guide-section">
          <h2>7️⃣ 工程化/Webpack (10道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in engineeringQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- 浏览器/网络 -->
        <section v-if="activeCategory === 'browser'" class="guide-section">
          <h2>8️⃣ 浏览器原理/网络协议 (10道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in browserQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- 算法 -->
        <section v-if="activeCategory === 'algorithm'" class="guide-section">
          <h2>9️⃣ 算法与数据结构 (15道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in algorithmQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- 系统设计 -->
        <section v-if="activeCategory === 'system-design'" class="guide-section">
          <h2>🔟 系统设计 (10道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in systemDesignQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>

        <!-- 各大厂真题 -->
        <section v-if="activeCategory === 'companies'" class="guide-section">
          <h2>1️⃣1️⃣ 各大厂真题精选 (25道)</h2>
          <div class="content-box">
            <div class="question-item" v-for="(q, index) in companyQuestions" :key="index">
              <h4 class="question-title">{{ q.title }}</h4>
              <div class="question-meta">
                <span class="company">{{ q.company }}</span>
                <span class="difficulty">{{ q.difficulty }}</span>
                <span class="frequency">{{ q.frequency }}</span>
              </div>
              <div class="question-content" v-html="q.content"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 导航菜单
const categories = [
  { key: 'js', label: 'JavaScript', icon: '🟨' },
  { key: 'html-css', label: 'HTML/CSS', icon: '🎨' },
  { key: 'typescript', label: 'TypeScript', icon: '🟦' },
  { key: 'vue', label: 'Vue.js', icon: '💚' },
  { key: 'react', label: 'React', icon: '⚛️' },
  { key: 'node', label: 'Node.js', icon: '🟢' },
  { key: 'engineering', label: '工程化', icon: '🔧' },
  { key: 'browser', label: '浏览器', icon: '🌐' },
  { key: 'algorithm', label: '算法', icon: '🧮' },
  { key: 'system-design', label: '系统设计', icon: '🏗️' },
  { key: 'companies', label: '各大厂真题', icon: '🏢' }
]

const activeCategory = ref('js')

// JavaScript面试题
const jsQuestions = [
  {
    title: 'Q1: 说说你对闭包的理解？闭包有什么作用？',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>回答要点：</h5>
      <p><strong>闭包定义：</strong>闭包是指有权访问另一个函数作用域中变量的函数。通常是在一个函数内部定义的函数。</p>
      <h5>形成条件：</h5>
      <ul>
        <li>函数嵌套</li>
        <li>内部函数引用外部函数的变量</li>
        <li>外部函数被调用执行</li>
      </ul>
      <h5>经典例子：</h5>
      <pre class="code-block" v-pre><code>function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  }
}

const counter = outer(); // outer执行完毕，但count变量仍被inner引用
counter(); // 1
counter(); // 2</code></pre>
      <h5>实际应用：</h5>
      <ul>
        <li>🔒 私有变量和方法的实现</li>
        <li>🏭 函数工厂模式</li>
        <li>⏰ 防抖和节流函数</li>
        <li>🎣 柯里化函数</li>
        <li>📦 模块化开发</li>
      </ul>
    `
  },
  {
    title: 'Q2: 解释一下原型和原型链',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>核心概念：</h5>
      <ul>
        <li><strong>原型：</strong>每个函数都有一个 prototype 属性，指向原型对象</li>
        <li><strong>原型链：</strong>当访问对象的属性时，如果对象本身没有，会沿着 __proto__ 向上查找</li>
        <li><strong>constructor：</strong>指向构造函数</li>
      </ul>
      <h5>原型链关系：</h5>
      <pre class="code-block" v-pre><code>function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};

const person = new Person('张三');

// 原型链：person -> Person.prototype -> Object.prototype -> null
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null</code></pre>
    `
  },
  {
    title: 'Q3: 谈谈你对this的理解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>this指向规则：</h5>
      <ul>
        <li><strong>全局环境：</strong>指向window/global</li>
        <li><strong>函数调用：</strong>指向window/global</li>
        <li><strong>方法调用：</strong>指向调用该方法的对象</li>
        <li><strong>构造函数：</strong>指向新创建的实例对象</li>
        <li><strong>箭头函数：</strong>不绑定this，继承外层作用域的this</li>
        <li><strong>call/apply/bind：</strong>显式绑定this</li>
      </ul>
      <h5>经典面试题：</h5>
      <pre class="code-block" v-pre><code>const obj = {
  name: 'obj',
  getName: function() {
    return this.name;
  },
  getNameArrow: () => {
    return this.name;
  }
};

const obj2 = { name: 'obj2' };

console.log(obj.getName()); // 'obj' - 方法调用
console.log(obj.getName.call(obj2)); // 'obj2' - 显式绑定
console.log(obj.getNameArrow()); // undefined - 箭头函数继承外层作用域</code></pre>
    `
  },
  {
    title: 'Q4: Promise的实现原理是什么？',
    difficulty: '难度：★★★★☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>Promise状态：</h5>
      <ul>
        <li><strong>pending：</strong>初始状态</li>
        <li><strong>fulfilled：</strong>成功状态</li>
        <li><strong>rejected：</strong>失败状态</li>
        <li><strong>状态不可逆：</strong>一旦改变就不会再变</li>
      </ul>
      <h5>手写Promise：</h5>
      <pre class="code-block" v-pre><code>class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // ... 省略完整实现
    return promise2;
  }
}</code></pre>
      <h5>Promise方法：</h5>
      <ul>
        <li><strong>Promise.all：</strong>所有Promise成功才成功</li>
        <li><strong>Promise.race：</strong>最先完成的Promise决定结果</li>
        <li><strong>Promise.allSettled：</strong>等待所有Promise完成</li>
        <li><strong>Promise.any：</strong>最先成功的Promise决定结果</li>
      </ul>
    `
  },
  {
    title: 'Q5: 说说事件循环(Event Loop)的理解',
    difficulty: '难度：★★★★☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>事件循环机制：</h5>
      <ul>
        <li><strong>调用栈：</strong>执行同步代码的地方</li>
        <li><strong>微任务队列：</strong>Promise.then、MutationObserver</li>
        <li><strong>宏任务队列：</strong>setTimeout、setInterval、I/O操作</li>
      </ul>
      <h5>执行顺序：</h5>
      <pre class="code-block" v-pre><code>console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出：1, 4, 3, 2</code></pre>
      <h5>关键点：</h5>
      <ul>
        <li>执行完同步代码后，先执行微任务，再执行宏任务</li>
        <li>每次执行完一个宏任务，都会检查微任务队列</li>
        <li>微任务优先级高于宏任务</li>
      </ul>
    `
  },
  {
    title: 'Q6: ES6中let、const和var的区别',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>var的问题：</h5>
      <ul>
        <li>变量提升</li>
        <li>没有块级作用域</li>
        <li>可以重复声明</li>
        <li>全局变量污染</li>
      </ul>
      <h5>let和const的改进：</h5>
      <ul>
        <li><strong>块级作用域：</strong>只在代码块内有效</li>
        <li><strong>暂时性死区：</strong>声明前不能使用</li>
        <li><strong>不允许重复声明：</strong>同一作用域内不能重复声明</li>
        <li><strong>const常量：</strong>声明后不能重新赋值</li>
      </ul>
      <h5>经典面试题：</h5>
      <pre class="code-block" v-pre><code>// var的问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 输出：3, 3, 3
}

// let的解决方案
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 输出：0, 1, 2
}</code></pre>
    `
  },
  {
    title: 'Q7: 手写一个防抖函数(debounce)',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>防抖原理：</h5>
      <p>在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。</p>
      <h5>实现代码：</h5>
      <pre class="code-block" v-pre><code>function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// 使用示例
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query);
}, 300);

// 连续调用，只有最后一次会执行
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc');
// 300ms后只输出: 搜索: abc</code></pre>
      <h5>应用场景：</h5>
      <ul>
        <li>🔍 搜索框输入</li>
        <li>📏 窗口resize</li>
        <li>📜 滚动事件</li>
        <li>⌨️ 键盘输入</li>
      </ul>
    `
  },
  {
    title: 'Q8: 手写一个节流函数(throttle)',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>节流原理：</h5>
      <p>规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次，只有一次生效。</p>
      <h5>实现代码：</h5>
      <pre class="code-block" v-pre><code>// 时间戳版本
function throttle(func, delay) {
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();
    const context = this;

    if (now - lastTime >= delay) {
      func.apply(context, args);
      lastTime = now;
    }
  };
}

// 定时器版本
function throttle(func, delay) {
  let timeoutId = null;

  return function(...args) {
    const context = this;

    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(context, args);
        timeoutId = null;
      }, delay);
    }
  };
}</code></pre>
      <h5>应用场景：</h5>
      <ul>
        <li>🖱️ 鼠标移动事件</li>
        <li>📜 页面滚动</li>
        <li>🎯 拖拽操作</li>
        <li>🔫 射击游戏</li>
      </ul>
    `
  },
  {
    title: 'Q9: 深拷贝和浅拷贝的区别？如何实现深拷贝？',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>浅拷贝：</h5>
      <p>只复制对象的第一层属性，如果属性是对象或数组，会共享引用。</p>
      <h5>深拷贝：</h5>
      <p>完全复制整个对象，包括嵌套的对象和数组，互不影响。</p>
      <h5>浅拷贝实现：</h5>
      <pre class="code-block" v-pre><code>// 方法1：Object.assign()
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = Object.assign({}, obj1);

// 方法2：扩展运算符
const obj3 = { ...obj1 };

// 方法3：Array.slice() (数组)
const arr1 = [1, 2, { a: 3 }];
const arr2 = arr1.slice();</code></pre>
      <h5>深拷贝实现：</h5>
      <pre class="code-block" v-pre><code>// 递归实现
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  let clone;

  if (Array.isArray(obj)) {
    clone = [];
    map.set(obj, clone);
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i], map);
    }
  } else {
    clone = {};
    map.set(obj, clone);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key], map);
      }
    }
  }

  return clone;
}

// 使用JSON (无法处理函数、循环引用、特殊对象)
const deepCopy = JSON.parse(JSON.stringify(obj));</code></pre>
    `
  },
  {
    title: 'Q10: 说说你对async/await的理解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>async/await是什么：</h5>
      <ul>
        <li><strong>async：</strong>声明一个函数是异步的，返回Promise对象</li>
        <li><strong>await：</strong>等待Promise解决，只能用在async函数中</li>
        <li><strong>语法糖：</strong>基于Promise的语法糖，让异步代码看起来像同步</li>
      </ul>
      <h5>使用示例：</h5>
      <pre class="code-block" v-pre><code>async function fetchData() {
  try {
    const response1 = await fetch('/api/data1');
    const data1 = await response1.json();

    const response2 = await fetch('/api/data2');
    const data2 = await response2.json();

    return { data1, data2 };
  } catch (error) {
    console.error('获取数据失败：', error);
    throw error;
  }
}

// 等价于Promise写法
function fetchDataPromise() {
  return fetch('/api/data1')
    .then(response => response.json())
    .then(data1 => {
      return fetch('/api/data2')
        .then(response => response.json())
        .then(data2 => ({ data1, data2 }));
    })
    .catch(error => {
      console.error('获取数据失败：', error);
      throw error;
    });
}</code></pre>
      <h5>注意事项：</h5>
      <ul>
        <li>await会阻塞async函数的执行，但不会阻塞主线程</li>
        <li>async函数返回Promise对象</li>
        <li>错误处理使用try/catch</li>
        <li>并发请求使用Promise.all()</li>
      </ul>
    `
  },
  {
    title: 'Q11: JavaScript的数据类型有哪些？',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>基本数据类型(7种)：</h5>
      <ul>
        <li><strong>Undefined：</strong>未定义</li>
        <li><strong>Null：</strong>空值</li>
        <li><strong>Boolean：</strong>布尔值</li>
        <li><strong>Number：</strong>数字</li>
        <li><strong>String：</strong>字符串</li>
        <li><strong>Symbol：</strong>符号(ES6)</li>
        <li><strong>BigInt：</strong>大整数(ES11)</li>
      </ul>
      <h5>引用数据类型：</h5>
      <ul>
        <li><strong>Object：</strong>对象</li>
        <li><strong>Array：</strong>数组</li>
        <li><strong>Function：</strong>函数</li>
        <li><strong>Date：</strong>日期</li>
        <li><strong>RegExp：</strong>正则表达式</li>
      </ul>
      <h5>类型检测：</h5>
      <pre class="code-block" v-pre><code>// typeof
typeof undefined; // "undefined"
typeof null;      // "object" (历史遗留问题)
typeof {};        // "object"
typeof [];        // "object"
typeof function(){}; // "function"

// instanceof
[] instanceof Array;    // true
{} instanceof Object;  // true

// Object.prototype.toString
Object.prototype.toString.call(null);     // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call([]);        // "[object Array]"</code></pre>
    `
  },
  {
    title: 'Q12: 说说你对作用域和作用域链的理解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>作用域：</h5>
      <p>作用域是指变量和函数的可访问范围。</p>
      <h5>作用域类型：</h5>
      <ul>
        <li><strong>全局作用域：</strong>在任何地方都可以访问</li>
        <li><strong>函数作用域：</strong>只在函数内部访问</li>
        <li><strong>块级作用域：</strong>ES6新增，只在块内访问</li>
      </ul>
      <h5>作用域链：</h5>
      <p>当访问一个变量时，会先在当前作用域查找，如果没有找到，会沿着作用域链向上查找，直到找到或到达全局作用域。</p>
      <h5>示例：</h5>
      <pre class="code-block" v-pre><code>var globalVar = 'global';

function outer() {
  var outerVar = 'outer';

  function inner() {
    var innerVar = 'inner';
    console.log(innerVar);  // inner
    console.log(outerVar);  // outer (作用域链查找)
    console.log(globalVar); // global (作用域链查找)
  }

  inner();
}

outer();</code></pre>
      <h5>注意事项：</h5>
      <ul>
        <li>作用域在函数定义时确定，而不是调用时</li>
        <li>ES6之前只有全局作用域和函数作用域</li>
        <li>let和const具有块级作用域</li>
      </ul>
    `
  },
  {
    title: 'Q13: 解释一下call、apply、bind的区别',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>共同点：</h5>
      <p>都可以改变函数的this指向</p>
      <h5>区别：</h5>
      <ul>
        <li><strong>call：</strong>立即执行函数，参数逐个传递</li>
        <li><strong>apply：</strong>立即执行函数，参数以数组形式传递</li>
        <li><strong>bind：</strong>返回新函数，不立即执行</li>
      </ul>
      <h5>使用示例：</h5>
      <pre class="code-block" v-pre><code>const obj = { name: '张三' };

function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

// call - 立即执行
greet.call(obj, '你好', '!'); // "你好, 张三!"

// apply - 立即执行，参数数组
greet.apply(obj, ['你好', '!']); // "你好, 张三!"

// bind - 返回新函数
const greetObj = greet.bind(obj);
greetObj('你好', '!'); // "你好, 张三!"

// bind可以预设部分参数
const greetHello = greet.bind(obj, '你好');
greetHello('!'); // "你好, 张三!"</code></pre>
      <h5>手写bind实现：</h5>
      <pre class="code-block" v-pre><code>Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};</code></pre>
    `
  },
  {
    title: 'Q14: 什么是柯里化？有什么应用场景？',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>柯里化定义：</h5>
      <p>柯里化是将接受多个参数的函数转换为接受一个单一参数的函数，并且返回接受余下参数且返回结果的新函数的技术。</p>
      <h5>简单实现：</h5>
      <pre class="code-block" v-pre><code>// 普通函数
function add(a, b, c) {
  return a + b + c;
}

// 柯里化后
function curryAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

const result = curryAdd(1)(2)(3); // 6</code></pre>
      <h5>通用柯里化函数：</h5>
      <pre class="code-block" v-pre><code>function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(a, b, c, d) {
  return a + b + c + d;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)(4)); // 10
console.log(curriedAdd(1, 2)(3, 4)); // 10
console.log(curriedAdd(1, 2, 3, 4)); // 10</code></pre>
      <h5>应用场景：</h5>
      <ul>
        <li>🔧 函数参数复用</li>
        <li>⏰ 延迟执行</li>
        <li>🔄 函数组合</li>
        <li>📝 参数校验</li>
      </ul>
    `
  },
  {
    title: 'Q15: JavaScript的内存管理机制',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>内存生命周期：</h5>
      <ol>
        <li><strong>分配：</strong>为变量分配内存空间</li>
        <li><strong>使用：</strong>使用分配的内存</li>
        <li><strong>释放：</strong>释放不再使用的内存</li>
      </ol>
      <h5>垃圾回收算法：</h5>
      <ul>
        <li><strong>引用计数：</strong>跟踪引用数量，引用为0时回收</li>
        <li><strong>标记清除：</strong>从根对象开始标记可达对象，清除未标记对象</li>
        <li><strong>标记整理：</strong>标记清除基础上整理内存碎片</li>
        <li><strong>分代回收：</strong>新生代和老生代分别采用不同策略</li>
      </ul>
      <h5>内存泄漏场景：</h5>
      <pre class="code-block" v-pre><code>// 1. 意外的全局变量
function foo() {
  bar = 'some value'; // 没有声明，变成全局变量
}

// 2. 被遗忘的定时器
const intervalId = setInterval(() => {
  // 做一些事情
}, 1000);
// 忘记调用 clearInterval(intervalId);

// 3. 闭包中的变量
function createClosure() {
  const largeData = new Array(1000000); // 大数组
  return function() {
    console.log(largeData.length);
  };
}
// largeData不会被垃圾回收

// 4. DOM引用
const element = document.getElementById('myElement');
const data = { element: element, data: 'some data' };
// 即使DOM元素被移除，data.element仍然引用着它</code></pre>
      <h5>避免内存泄漏：</h5>
      <ul>
        <li>及时清除定时器和事件监听器</li>
        <li>避免意外创建全局变量</li>
        <li>注意闭包中的变量引用</li>
        <li>及时释放DOM引用</li>
      </ul>
    `
  },
  {
    title: 'Q16: 谈谈你对Map和Set的理解',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>Map：</h5>
      <ul>
        <li>键值对集合，键可以是任意类型</li>
        <li>保持插入顺序</li>
        <li>size属性获取长度</li>
        <li>性能优于Object在频繁增删键值对的场景</li>
      </ul>
      <h5>Set：</h5>
      <ul>
        <li>唯一值的集合</li>
        <li>自动去重</li>
        <li>保持插入顺序</li>
        <li>支持集合操作(交集、并集、差集)</li>
      </ul>
      <h5>使用示例：</h5>
      <pre class="code-block" v-pre><code>// Map
const map = new Map();
map.set('name', '张三');
map.set(1, '数字键');
map.set({}, '对象键');

console.log(map.get('name')); // '张三'
console.log(map.size); // 3
console.log(map.has('name')); // true

// Set
const set = new Set([1, 2, 3, 1, 2]);
console.log(set.size); // 3 (自动去重)
console.log([...set]); // [1, 2, 3]

// 集合操作
const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);

// 并集
const union = new Set([...set1, ...set2]);

// 交集
const intersection = new Set([...set1].filter(x => set2.has(x)));

// 差集
const difference = new Set([...set1].filter(x => !set2.has(x)));</code></pre>
    `
  },
  {
    title: 'Q17: 什么是Generator函数？',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>Generator函数：</h5>
      <p>Generator函数是ES6提供的一种异步编程解决方案，返回一个遍历器对象。</p>
      <h5>基本语法：</h5>
      <pre class="code-block" v-pre><code>function* generator() {
  yield 'Hello';
  yield 'World';
  return 'Done';
}

const gen = generator();
console.log(gen.next()); // { value: 'Hello', done: false }
console.log(gen.next()); // { value: 'World', done: false }
console.log(gen.next()); // { value: 'Done', done: true }
console.log(gen.next()); // { value: undefined, done: true }</code></pre>
      <h5>应用场景：</h5>
      <ul>
        <li><strong>异步编程：</strong>用同步的方式写异步代码</li>
        <li><strong>状态机：</strong>实现复杂的状态转换</li>
        <li><strong>数据流处理：</strong>处理大数据流</li>
      </ul>
      <h5>异步Generator：</h5>
      <pre class="code-block" v-pre><code>function* asyncGenerator() {
  const data1 = yield fetch('/api/data1').then(r => r.json());
  const data2 = yield fetch('/api/data2').then(r => r.json());
  return { data1, data2 };
}

// 自动执行器
function run(generator) {
  const gen = generator();

  function next(value) {
    const result = gen.next(value);
    if (result.done) return result.value;

    return Promise.resolve(result.value)
      .then(res => next(res));
  }

  return next();
}

run(asyncGenerator).then(result => console.log(result));</code></pre>
    `
  },
  {
    title: 'Q18: 谈谈你对模块化的理解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>模块化发展历程：</h5>
      <ul>
        <li><strong>无模块化：</strong>全局变量污染，依赖关系混乱</li>
        <li><strong>IIFE：</strong>立即执行函数表达式</li>
        <li><strong>CommonJS：</strong>Node.js规范，同步加载</li>
        <li><strong>AMD：</strong>RequireJS，异步加载</li>
        <li><strong>CMD：</strong>SeaJS，按需加载</li>
        <li><strong>ES6 Modules：</strong>官方标准，静态分析</li>
      </ul>
      <h5>ES6 Modules：</h5>
      <pre class="code-block" v-pre><code>// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { PI, add } from './math.js';

console.log(add(1, 2));      // 3
console.log(multiply(3, 4)); // 12
console.log(PI);             // 3.14159</code></pre>
      <h5>优势：</h5>
      <ul>
        <li>📦 避免命名冲突</li>
        <li>🔄 依赖关系清晰</li>
        <li>🗂️ 代码组织更好</li>
        <li>🌲 Tree Shaking支持</li>
        <li>📊 静态分析优化</li>
      </ul>
    `
  },
  {
    title: 'Q19: 什么是装饰器？如何实现？',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★☆☆☆',
    content: `
      <h5>装饰器定义：</h5>
      <p>装饰器是一种特殊类型的声明，可以附加到类声明、方法、属性或参数上。</p>
      <h5>类装饰器：</h5>
      <pre class="code-block" v-pre><code>function logger(target) {
  console.log('类被定义了:', target.name);
}

@logger
class Person {
  constructor(name) {
    this.name = name;
  }
}</code></pre>
      <h5>方法装饰器：</h5>
      <pre class="code-block" v-pre><code>function timing(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    console.time(key);
    const result = originalMethod.apply(this, args);
    console.timeEnd(key);
    return result;
  };

  return descriptor;
}

class Calculator {
  @timing
  add(a, b) {
    return a + b;
  }
}</code></pre>
      <h5>属性装饰器：</h5>
      <pre class="code-block" v-pre><code>function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Config {
  @readonly
  API_URL = 'https://api.example.com';
}</code></pre>
      <h5>参数装饰器：</h5>
      <pre class="code-block" v-pre><code>function logParameter(target, key, index) {
  console.log(\`参数装饰器: \${key}, 参数索引: \${index}\`);
}

class UserService {
  getUser(@logParameter id: number) {
    return { id, name: 'John' };
  }
}</code></pre>
    `
  },
  {
    title: 'Q20: JavaScript的错误处理机制',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>错误类型：</h5>
      <ul>
        <li><strong>SyntaxError：</strong>语法错误，代码无法解析</li>
        <li><strong>ReferenceError：</strong>引用错误，变量未定义</li>
        <li><strong>TypeError：</strong>类型错误，操作类型不匹配</li>
        <li><strong>RangeError：</strong>范围错误，参数超出范围</li>
        <li><strong>URIError：</strong>URI错误，URI相关函数参数错误</li>
        <li><strong>EvalError：</strong>eval错误，eval函数使用错误</li>
      </ul>
      <h5>错误处理：</h5>
      <pre class="code-block" v-pre><code>// try-catch
try {
  // 可能出错的代码
  const result = riskyOperation();
  console.log('成功:', result);
} catch (error) {
  // 错误处理
  console.error('错误:', error.message);
  // 可以重新抛出
  throw error;
} finally {
  // 无论是否出错都会执行
  console.log('清理工作');
}

// 异步错误处理
async function asyncFunction() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('异步错误:', error);
    throw error;
  }
}

// Promise错误处理
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('请求失败:', error));</code></pre>
      <h5>自定义错误：</h5>
      <pre class="code-block" v-pre><code>class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new CustomError('用户名不能为空', 400);
  }
  if (!user.email) {
    throw new CustomError('邮箱不能为空', 400);
  }
}

try {
  validateUser({ name: 'John' });
} catch (error) {
  if (error instanceof CustomError) {
    console.log(\`验证错误 [\${error.statusCode}]: \${error.message}\`);
  }
}</code></pre>
    `
  },
  {
    title: 'Q21: 什么是Proxy？如何使用？',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>Proxy定义：</h5>
      <p>Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义。</p>
      <h5>基本用法：</h5>
      <pre class="code-block" v-pre><code>const target = {
  name: '张三',
  age: 18
};

const handler = {
  get(target, property) {
    console.log(\`访问属性: \${property}\`);
    return target[property];
  },
  set(target, property, value) {
    console.log(\`设置属性: \${property} = \${value}\`);
    target[property] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // 访问属性: name, 输出: 张三
proxy.age = 20;          // 设置属性: age = 20</code></pre>
      <h5>常用拦截操作：</h5>
      <ul>
        <li><strong>get：</strong>读取属性</li>
        <li><strong>set：</strong>设置属性</li>
        <li><strong>has：</strong>in操作符</li>
        <li><strong>deleteProperty：</strong>delete操作</li>
        <li><strong>ownKeys：</strong>Object.keys等</li>
        <li><strong>apply：</strong>函数调用</li>
        <li><strong>construct：</strong>new操作</li>
      </ul>
      <h5>应用场景：</h5>
      <pre class="code-block" v-pre><code>// 数据验证
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new Error('年龄必须是正数');
      }
    }
    target[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25;    // 正常
person.age = -5;    // 抛出错误

// 数组负索引
const negativeArray = arr => new Proxy(arr, {
  get(target, prop) {
    const index = Number(prop);
    if (index < 0) {
      return target[target.length + index];
    }
    return target[index];
  }
});

const arr = negativeArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4</code></pre>
    `
  },
  {
    title: 'Q22: 谈谈你对WeakMap和WeakSet的理解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★☆☆☆',
    content: `
      <h5>WeakMap特性：</h5>
      <ul>
        <li>键必须是对象，不能是原始值</li>
        <li>键是弱引用，不影响垃圾回收</li>
        <li>没有size属性，无法遍历</li>
        <li>适合存储对象相关的数据</li>
      </ul>
      <h5>WeakSet特性：</h5>
      <ul>
        <li>成员必须是对象</li>
        <li>成员是弱引用</li>
        <li>没有size属性，无法遍历</li>
        <li>适合标记对象</li>
      </ul>
      <h5>使用场景：</h5>
      <pre class="code-block" v-pre><code>// WeakMap - 存储DOM节点相关信息
const domData = new WeakMap();

function setData(element, data) {
  domData.set(element, data);
}

function getData(element) {
  return domData.get(element);
}

// 当DOM节点被移除时，对应的数据也会被垃圾回收

// WeakSet - 标记对象
const visited = new WeakSet();

function traverse(obj) {
  if (visited.has(obj)) return; // 避免循环引用
  visited.add(obj);

  // 遍历对象属性
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      traverse(obj[key]);
    }
  }
}

// 缓存计算结果
const cache = new WeakMap();

function expensiveOperation(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = /* 复杂计算 */ obj.value * 2;
  cache.set(obj, result);
  return result;
}</code></pre>
      <h5>注意事项：</h5>
      <ul>
        <li>WeakMap/WeakSet的键值对随时可能被垃圾回收</li>
        <li>不能使用clear()方法</li>
        <li>不能遍历，无法知道有多少个成员</li>
        <li>适合用于缓存和私有属性</li>
      </ul>
    `
  },
  {
    title: 'Q23: JavaScript的执行上下文和执行栈',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>执行上下文：</h5>
      <p>执行上下文是JavaScript代码执行时的环境，包括变量对象、作用域链、this指向等。</p>
      <h5>执行上下文类型：</h5>
      <ul>
        <li><strong>全局执行上下文：</strong>代码开始时创建</li>
        <li><strong>函数执行上下文：</strong>函数调用时创建</li>
        <li><strong>eval执行上下文：</strong>eval函数执行时创建</li>
      </ul>
      <h5>执行上下文创建过程：</h5>
      <ol>
        <li>创建变量对象(Variable Object)</li>
        <li>建立作用域链(Scope Chain)</li>
        <li>确定this指向</li>
      </ol>
      <h5>执行栈：</h5>
      <p>执行栈是一种后进先出(LIFO)的数据结构，用来存储代码运行时创建的所有执行上下文。</p>
      <h5>示例分析：</h5>
      <pre class="code-block" v-pre><code>// 全局上下文入栈
console.log('1');

function foo() {
  // foo函数上下文入栈
  console.log('2');

  function bar() {
    // bar函数上下文入栈
    console.log('3');
    // bar函数上下文出栈
  }

  bar();
  // foo函数上下文出栈
}

foo();
// 全局上下文出栈

// 执行顺序：1 -> 2 -> 3</code></pre>
      <h5>变量对象(VO)：</h5>
      <ul>
        <li>函数的所有形参</li>
        <li>函数声明</li>
        <li>变量声明</li>
      </ul>
      <h5>活动对象(AO)：</h5>
      <p>进入执行阶段后，变量对象变为活动对象，可以访问变量的值。</p>
    `
  },
  {
    title: 'Q24: 什么是尾调用优化？',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★☆☆☆',
    content: `
      <h5>尾调用定义：</h5>
      <p>尾调用是指函数的最后一步是调用另一个函数。</p>
      <h5>尾调用优化：</h5>
      <p>只保留内层函数的调用帧，这样可以避免栈溢出，节省内存。</p>
      <h5>尾递归：</h5>
      <pre class="code-block" v-pre><code>// 非尾递归
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1); // 最后一步是乘法运算
}

// 尾递归优化
function factorial(n, result = 1) {
  if (n === 1) return result;
  return factorial(n - 1, n * result); // 最后一步是函数调用
}

console.log(factorial(5)); // 120</code></pre>
      <h5>斐波那契数列尾递归：</h5>
      <pre class="code-block" v-pre><code>// 非尾递归
function fib(n) {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

// 尾递归优化
function fib(n, a = 1, b = 1) {
  if (n <= 2) return b;
  return fib(n - 1, b, a + b);
}

console.log(fib(10)); // 55</code></pre>
      <h5>注意事项：</h5>
      <ul>
        <li>ES6的尾调用优化只在严格模式下开启</li>
        <li>Chrome等现代浏览器已经实现了尾调用优化</li>
        <li>可以解决递归调用栈溢出的问题</li>
        <li>函数式编程中很重要</li>
      </ul>
    `
  },
  {
    title: 'Q25: JavaScript中的设计模式',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>单例模式：</h5>
      <pre class="code-block" v-pre><code>class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = 'singleton data';
    Singleton.instance = this;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true</code></pre>
      <h5>工厂模式：</h5>
      <pre class="code-block" v-pre><code>class CarFactory {
  static createCar(type) {
    switch (type) {
      case 'sedan':
        return new SedanCar();
      case 'suv':
        return new SUVCar();
      case 'truck':
        return new TruckCar();
      default:
        throw new Error('Unknown car type');
    }
  }
}

const sedan = CarFactory.createCar('sedan');
const suv = CarFactory.createCar('suv');</code></pre>
      <h5>观察者模式：</h5>
      <pre class="code-block" v-pre><code>class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback.apply(this, args);
      });
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}</code></pre>
      <h5>策略模式：</h5>
      <pre class="code-block" v-pre><code>const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

function calculate(type, a, b) {
  return strategies[type](a, b);
}

console.log(calculate('add', 1, 2)); // 3
console.log(calculate('multiply', 3, 4)); // 12</code></pre>
    `
  }
]

// HTML/CSS面试题
const htmlCssQuestions = [
  {
    title: 'Q1: 说说你对盒模型的理解',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>标准盒模型：</h5>
      <ul>
        <li><strong>content：</strong>内容区域</li>
        <li><strong>padding：</strong>内边距</li>
        <li><strong>border：</strong>边框</li>
        <li><strong>margin：</strong>外边距</li>
      </ul>
      <h5>盒模型计算：</h5>
      <pre class="code-block" v-pre><code>/* 标准盒模型 */
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
}
/* 实际占位：width=200+40+10=250px, height=100+40+10=150px */

/* IE盒模型 */
.box {
  box-sizing: border-box;
  width: 200px; /* 包含padding和border */
  height: 100px;
  padding: 20px;
  border: 5px solid #000;
}
/* 实际占位：width=200px, height=100px */</code></pre>
    `
  },
  {
    title: 'Q2: Flexbox布局详解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>Flex容器属性：</h5>
      <ul>
        <li><strong>flex-direction：</strong>主轴方向</li>
        <li><strong>flex-wrap：</strong>是否换行</li>
        <li><strong>flex-flow：</strong>direction+wrap简写</li>
        <li><strong>justify-content：</strong>主轴对齐</li>
        <li><strong>align-items：</strong>交叉轴对齐</li>
        <li><strong>align-content：</strong>多行交叉轴对齐</li>
      </ul>
      <h5>Flex项目属性：</h5>
      <ul>
        <li><strong>flex-grow：</strong>放大比例</li>
        <li><strong>flex-shrink：</strong>缩小比例</li>
        <li><strong>flex-basis：</strong>初始大小</li>
        <li><strong>flex：</strong>grow+shrink+basis简写</li>
        <li><strong>align-self：</strong>单个项目对齐</li>
        <li><strong>order：</strong>排列顺序</li>
      </ul>
      <h5>经典布局：</h5>
      <pre class="code-block" v-pre><code>/* 圣杯布局 */
.container {
  display: flex;
}
.left { width: 200px; }
.center { flex: 1; }
.right { width: 200px; }

/* 垂直居中 */
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}</code></pre>
    `
  },
  {
    title: 'Q3: CSS选择器优先级',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>优先级计算：</h5>
      <ul>
        <li><strong>!important：</strong>无限大</li>
        <li><strong>内联样式：</strong>1000</li>
        <li><strong>ID选择器：</strong>100</li>
        <li><strong>类/伪类/属性：</strong>10</li>
        <li><strong>标签/伪元素：</strong>1</li>
        <li><strong>通配符/继承：</strong>0</li>
      </ul>
      <h5>计算规则：</h5>
      <pre class="code-block" v-pre><code>/* 优先级比较 */
#nav .list li.active { /* 0,1,1,1 = 111 */
  color: red;
}

div p { /* 0,0,0,2 = 2 */
  color: blue;
}

.red { /* 0,0,1,0 = 10 */
  color: green;
}

p { /* 0,0,0,1 = 1 */
  color: yellow;
}

/* 实际应用顺序：red > #nav .list li.active > div p > p */</code></pre>
      <h5>注意事项：</h5>
      <ul>
        <li>优先级是层叠的，不是简单的相加</li>
        <li>就近原则：相同优先级后定义的生效</li>
        <li>继承样式优先级为0</li>
      </ul>
    `
  },
  {
    title: 'Q4: 响应式布局的实现方案',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>媒体查询：</h5>
      <pre class="code-block" v-pre><code>@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    flex-direction: row;
  }
}</code></pre>
      <h5>Flexbox响应式：</h5>
      <pre class="code-block" v-pre><code>.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 300px; /* 最小300px，自动伸缩 */
}</code></pre>
      <h5>CSS Grid：</h5>
      <pre class="code-block" v-pre><code>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}</code></pre>
      <h5>移动优先：</h5>
      <pre class="code-block" v-pre><code>/* 移动优先设计 */
.container {
  width: 100%;
  padding: 10px;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .container {
    display: flex;
    justify-content: space-between;
  }
}</code></pre>
    `
  },
  {
    title: 'Q5: BFC(Block Formatting Context)',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>BFC是什么：</h5>
      <p>块级格式化上下文，是页面中一个独立的渲染区域，规定了内部元素如何布局。</p>
      <h5>触发条件：</h5>
      <ul>
        <li>根元素(html)</li>
        <li>float不为none</li>
        <li>position为absolute或fixed</li>
        <li>overflow不为visible</li>
        <li>display为inline-block、table-cell等</li>
      </ul>
      <h5>BFC特性：</h5>
      <ul>
        <li>内部元素垂直排列</li>
        <li>不会与浮动元素重叠</li>
        <li>可以包含浮动元素</li>
        <li>形成独立的布局环境</li>
      </ul>
      <h5>应用场景：</h5>
      <ul>
        <li>清除浮动</li>
        <li>防止margin重叠</li>
        <li>自适应两栏布局</li>
      </ul>
      <h5>示例：</h5>
      <pre class="code-block" v-pre><code>/* 清除浮动 */
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

/* 防止margin重叠 */
.box {
  overflow: hidden; /* 触发BFC */
  margin: 20px 0;
}

/* 两栏布局 */
.left {
  float: left;
  width: 200px;
}

.right {
  overflow: hidden; /* 触发BFC */
  margin-left: 220px;
}</code></pre>
    `
  },
  {
    title: 'Q6: CSS动画和过渡',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>transition过渡：</h5>
      <pre class="code-block" v-pre><code>.box {
  width: 100px;
  height: 100px;
  background: red;
  transition: width 0.3s ease-in-out;
}

.box:hover {
  width: 200px;
}

/* 多个属性 */
.box {
  transition: all 0.3s ease;
}

/* 详细控制 */
.box {
  transition-property: width, height;
  transition-duration: 0.3s, 0.5s;
  transition-timing-function: ease-in, ease-out;
  transition-delay: 0s, 0.2s;
}</code></pre>
      <h5>animation动画：</h5>
      <pre class="code-block" v-pre><code>@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.box {
  animation: slideIn 1s ease-in-out;
}

/* 多个属性 */
.box {
  animation-name: slideIn;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-play-state: running;
}</code></pre>
      <h5>性能优化：</h5>
      <ul>
        <li>使用transform代替改变位置</li>
        <li>使用opacity代替visibility</li>
        <li>避免同时动画大量元素</li>
        <li>使用will-change属性提示浏览器</li>
        <li>合理使用GPU加速</li>
      </ul>
      <h5>will-change：</h5>
      <pre class="code-block" v-pre><code>.animated-element {
  will-change: transform;
  /* 动画结束后重置 */
  /* .animated-element { will-change: auto; } */
}</code></pre>
    `
  },
  {
    title: 'Q7: CSS预处理器(Sass/Less)',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>变量：</h5>
      <pre class="code-block" v-pre><code>// Sass
$primary-color: #007bff;
$text-color: #333;

.button {
  background: $primary-color;
  color: $text-color;
}

// Less
@primary-color: #007bff;
@text-color: #333;

.button {
  background: @primary-color;
  color: @text-color;
}</code></pre>
      <h5>嵌套：</h5>
      <pre class="code-block" v-pre><code>// Sass/Less
.nav {
  background: #f8f9fa;

  .nav-item {
    display: inline-block;

    &:hover {
      background: #e9ecef;

      .nav-link {
        color: #007bff;
      }
    }

    .nav-link {
      padding: 10px 15px;
      text-decoration: none;
      color: #333;
    }
  }
}</code></pre>
      <h5>混合器(Mixin)：</h5>
      <pre class="code-block" v-pre><code>// Sass
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

.button {
  @include border-radius(5px);
}

// Less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.button {
  .border-radius(5px);
}</code></pre>
      <h5>函数：</h5>
      <pre class="code-block" v-pre><code>// Sass
@function px-to-rem($px, $base: 16px) {
  @return ($px / $base) * 1rem;
}

.title {
  font-size: px-to-rem(24px);
}

// Less
.px-to-rem(@px, @base: 16px) {
  @return: unit((@px / @base), rem);
}

.title {
  font-size: .px-to-rem(24px)[];
}</code></pre>
      <h5>继承：</h5>
      <pre class="code-block" v-pre><code>// Sass
%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  @extend %button-base;
  background: #007bff;
  color: white;
}

// Less
.button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  &:extend(.button-base);
  background: #007bff;
  color: white;
}</code></pre>
    `
  },
  {
    title: 'Q8: 说说你对CSS Grid的理解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>Grid基础概念：</h5>
      <ul>
        <li><strong>网格容器：</strong>设置display: grid的元素</li>
        <li><strong>网格项：</strong>网格容器的直接子元素</li>
        <li><strong>网格线：</strong>分割网格的线</li>
        <li><strong>网格轨道：</strong>网格线之间的空间</li>
        <li><strong>网格单元格：</strong>两个相邻行和列网格线之间的空间</li>
        <li><strong>网格区域：</strong>四个网格线包围的空间</li>
      </ul>
      <h5>容器属性：</h5>
      <pre class="code-block" v-pre><code>.grid-container {
  display: grid;
  grid-template-columns: 100px 1fr 100px; /* 三列 */
  grid-template-rows: 50px auto 50px;     /* 三行 */
  gap: 10px;                             /* 网格间距 */

  /* 或使用repeat */
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 100px);

  /* 或使用auto-fit/auto-fill */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}</code></pre>
      <h5>项目属性：</h5>
      <pre class="code-block" v-pre><code>.grid-item {
  /* 跨越多个网格单元格 */
  grid-column: 1 / 3;    /* 从第1条线到第3条线 */
  grid-row: 2 / 4;       /* 从第2条线到第4条线 */

  /* 或使用span */
  grid-column: span 2;   /* 跨越2列 */
  grid-row: span 3;      /* 跨越3行 */

  /* 简写 */
  grid-area: 1 / 2 / 3 / 4; /* row-start / column-start / row-end / column-end */
}</code></pre>
      <h5>对齐方式：</h5>
      <pre class="code-block" v-pre><code>.grid-container {
  justify-items: center;     /* 水平对齐所有项目 */
  align-items: center;       /* 垂直对齐所有项目 */
  justify-content: space-between; /* 水平对齐网格 */
  align-content: center;     /* 垂直对齐网格 */
}

.grid-item {
  justify-self: start;       /* 单个项目水平对齐 */
  align-self: end;          /* 单个项目垂直对齐 */
}</code></pre>
      <h5>命名网格线：</h5>
      <pre class="code-block" v-pre><code>.grid-container {
  grid-template-columns: [sidebar-start] 200px [content-start] 1fr [content-end] 200px [sidebar-end];
  grid-template-rows: [header-start] 100px [main-start] 1fr [footer-start] 100px [footer-end];
}

.sidebar {
  grid-column: sidebar-start / sidebar-end;
}

.content {
  grid-column: content-start / content-end;
  grid-row: main-start / footer-start;
}</code></pre>
      <h5>响应式网格：</h5>
      <pre class="code-block" v-pre><code>/* 响应式卡片布局 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* 复杂响应式 */
@media (min-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header header header"
      "sidebar main main"
      "sidebar footer footer";
  }
}

@media (min-width: 1024px) {
  .dashboard {
    grid-template-areas:
      "header header header"
      "sidebar main sidebar2"
      "footer footer footer";
  }
}</code></pre>
    `
  },
  {
    title: 'Q9: CSS性能优化',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>渲染性能：</h5>
      <ul>
        <li>减少重排和重绘</li>
        <li>使用transform和opacity</li>
        <li>避免使用table布局</li>
        <li>减少CSS选择器的复杂度</li>
        <li>避免使用CSS表达式</li>
      </ul>
      <h5>加载优化：</h5>
      <ul>
        <li>压缩CSS文件</li>
        <li>使用CSS雪碧图</li>
        <li>按需加载CSS</li>
        <li>避免@import</li>
        <li>使用CDN</li>
      </ul>
      <h5>选择器优化：</h5>
      <pre class="code-block" v-pre><code>/* ❌ 低效选择器 */
div > p + span ~ a:hover {
  color: red;
}

/* ✅ 高效选择器 */
.nav-link {
  color: blue;
}

.nav-link:hover {
  color: red;
}

/* ❌ 过度限定 */
html body .container div p {
  color: red;
}

/* ✅ 简洁明了 */
.content p {
  color: red;
}</code></pre>
      <h5>CSS动画优化：</h5>
      <pre class="code-block" v-pre><code>/* 使用transform替代改变位置 */
.element {
  transform: translateX(100px);
  /* 比改变left/top性能更好 */
}

/* 使用will-change提示浏览器 */
.animated-element {
  will-change: transform;
}

.animated-element:hover {
  transform: scale(1.1);
}

/* 动画结束后重置 */
.animated-element {
  will-change: auto;
}</code></pre>
      <h5>字体优化：</h5>
      <pre class="code-block" v-pre><code>/* 字体加载优化 */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2'),
       url('font.woff') format('woff');
  font-display: swap; /* 防止FOUT */
}

/* 使用font-display */
font-display: auto;    /* 默认 */
font-display: block;   /* 短暂不可见，然后显示 */
font-display: swap;    /* 先显示fallback字体，然后替换 */
font-display: fallback; /* 很短时间显示fallback，然后替换 */
font-display: optional; /* 如果来不及加载就不显示 */</code></pre>
    `
  },
  {
    title: 'Q10: HTML5新特性',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>语义化标签：</h5>
      <pre class="code-block" v-pre><code>&lt;!-- 结构语义化 --&gt;
&lt;header&gt;网站头部&lt;/header&gt;
&lt;nav&gt;导航菜单&lt;/nav&gt;
&lt;main&gt;主要内容&lt;/main&gt;
&lt;article&gt;文章内容&lt;/article&gt;
&lt;section&gt;内容区块&lt;/section&gt;
&lt;aside&gt;侧边栏&lt;/aside&gt;
&lt;footer&gt;网站底部&lt;/footer&gt;

&lt;!-- 其他语义标签 --&gt;
&lt;figure&gt;图片容器&lt;/figure&gt;
&lt;figcaption&gt;图片说明&lt;/figcaption&gt;
&lt;time&gt;时间元素&lt;/time&gt;
&lt;mark&gt;高亮文本&lt;/mark&gt;
&lt;progress&gt;进度条&lt;/progress&gt;</code></pre>
      <h5>表单增强：</h5>
      <pre class="code-block" v-pre><code>&lt;!-- 新输入类型 --&gt;
&lt;input type="email" placeholder="请输入邮箱"&gt;
&lt;input type="url" placeholder="请输入网址"&gt;
&lt;input type="tel" placeholder="请输入电话"&gt;
&lt;input type="number" min="0" max="100" step="5"&gt;
&lt;input type="range" min="0" max="100"&gt;
&lt;input type="date"&gt;
&lt;input type="datetime-local"&gt;
&lt;input type="color"&gt;
&lt;input type="search"&gt;

&lt;!-- 表单属性 --&gt;
&lt;input type="text" required placeholder="必填字段"&gt;
&lt;input type="text" autofocus&gt;
&lt;input type="text" autocomplete="username"&gt;
&lt;form novalidate&gt;&lt;/form&gt;</code></pre>
      <h5>多媒体：</h5>
      <pre class="code-block" v-pre><code>&lt;!-- 音频 --&gt;
&lt;audio controls&gt;
  &lt;source src="audio.mp3" type="audio/mpeg"&gt;
  &lt;source src="audio.ogg" type="audio/ogg"&gt;
  您的浏览器不支持音频播放。
&lt;/audio&gt;

&lt;!-- 视频 --&gt;
&lt;video controls width="640" height="360"&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
  &lt;source src="video.webm" type="video/webm"&gt;
  您的浏览器不支持视频播放。
&lt;/video&gt;

&lt;!-- 字幕 --&gt;
&lt;video controls&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
  &lt;track kind="subtitles" src="subtitles.vtt" srclang="zh" label="中文"&gt;
&lt;/video&gt;</code></pre>
      <h5>Canvas和SVG：</h5>
      <pre class="code-block" v-pre><code>&lt;!-- Canvas --&gt;
&lt;canvas id="myCanvas" width="400" height="200"&gt;
  您的浏览器不支持Canvas。
&lt;/canvas&gt;

&lt;script&gt;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);
&lt;/script&gt;

&lt;!-- SVG --&gt;
&lt;svg width="200" height="200"&gt;
  &lt;circle cx="100" cy="100" r="50" fill="blue" /&gt;
  &lt;rect x="50" y="50" width="100" height="60" fill="green" /&gt;
&lt;/svg&gt;</code></pre>
      <h5>Web存储：</h5>
      <pre class="code-block" v-pre><code>// LocalStorage - 永久存储
localStorage.setItem('user', JSON.stringify({name: 'John'}));
const user = JSON.parse(localStorage.getItem('user'));

// SessionStorage - 会话存储
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');</code></pre>
      <h5>Web Workers：</h5>
      <pre class="code-block" v-pre><code>// 主线程
const worker = new Worker('worker.js');
worker.postMessage({data: 'Hello Worker'});

worker.onmessage = function(e) {
  console.log('收到Worker消息:', e.data);
};

// worker.js
self.onmessage = function(e) {
  console.log('收到主线程消息:', e.data);
  // 执行耗时操作
  const result = heavyComputation(e.data);
  self.postMessage(result);
};</code></pre>
    `
  },
  {
    title: 'Q11: CSS模块化和组件化',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>CSS Modules：</h5>
      <pre class="code-block" v-pre><code>/* Button.module.css */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background: #007bff;
  color: white;
}

.secondary {
  background: #6c757d;
  color: white;
}</code></pre>
      <pre class="code-block" v-pre><code>// Button.jsx
import styles from './Button.module.css';

function Button({ variant, children }) {
  return (
    &lt;button className={styles[variant] || styles.button}&gt;
      {children}
    &lt;/button&gt;
  );
}</code></pre>
      <h5>CSS-in-JS：</h5>
      <pre class="code-block" v-pre><code>// styled-components
import styled from 'styled-components';

const Button = styled.button\`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;

  &:hover {
    opacity: 0.8;
  }
\`;

const PrimaryButton = styled(Button)\`
  background: #28a745;
\`;

// 使用
&lt;Button&gt;普通按钮&lt;/Button&gt;
&lt;Button primary&gt;主要按钮&lt;/Button&gt;
&lt;PrimaryButton&gt;成功按钮&lt;/PrimaryButton&gt;</code></pre>
      <h5>BEM命名规范：</h5>
      <pre class="code-block" v-pre><code>/* BEM: Block Element Modifier */
.nav {}                    /* 块 */
.nav__item {}             /* 元素 */
.nav__item--active {}     /* 修饰符 */

.nav {
  background: #f8f9fa;
}

.nav__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__item {
  margin: 0 10px;
}

.nav__item--active {
  color: #007bff;
  font-weight: bold;
}

.nav__link {
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav__link:hover {
  background: #e9ecef;
}</code></pre>
      <h5>原子化CSS：</h5>
      <pre class="code-block" v-pre><code>&lt;!-- Tailwind CSS --&gt;
&lt;button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"&gt;
  按钮
&lt;/button&gt;

&lt;!-- 等价的传统CSS --&gt;
.button {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.button:hover {
  background-color: #1d4ed8;
}</code></pre>
      <h5>组件库设计：</h5>
      <pre class="code-block" v-pre><code>// 设计系统变量
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  }
};

// 组件样式函数
const buttonStyles = (variant = 'primary') => \`
  padding: \${theme.spacing.sm} \${theme.spacing.md};
  border: none;
  border-radius: \${theme.borderRadius.md};
  background: \${theme.colors[variant]};
  color: white;
  cursor: pointer;
\`;</code></pre>
    `
  },
  {
    title: 'Q12: Web字体和图标',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★☆☆☆',
    content: `
      <h5>Web字体：</h5>
      <pre class="code-block" v-pre><code>@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2'),
       url('font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* 使用 */
body {
  font-family: 'MyFont', sans-serif;
}</code></pre>
      <h5>图标字体：</h5>
      <pre class="code-block" v-pre><code>@font-face {
  font-family: 'iconfont';
  src: url('iconfont.woff2') format('woff2'),
       url('iconfont.woff') format('woff');
}

.icon-home:before { content: "\\e900"; }
.icon-user:before { content: "\\e901"; }
.icon-settings:before { content: "\\e902"; }

/* 使用 */
&lt;span class="icon-home"&gt;&lt;/span&gt;
&lt;i class="iconfont icon-user"&gt;&lt;/i&gt;</code></pre>
      <h5>SVG图标：</h5>
      <pre class="code-block" v-pre><code>&lt;!-- 内联SVG --&gt;
&lt;svg width="24" height="24" viewBox="0 0 24 24"&gt;
  &lt;path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/&gt;
&lt;/svg&gt;

&lt;!-- SVG Sprite --&gt;
&lt;svg style="display: none;"&gt;
  &lt;defs&gt;
    &lt;symbol id="icon-home" viewBox="0 0 24 24"&gt;
      &lt;path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/&gt;
    &lt;/symbol&gt;
  &lt;/defs&gt;
&lt;/svg&gt;

&lt;!-- 使用 --&gt;
&lt;svg class="icon"&gt;
  &lt;use xlink:href="#icon-home"&gt;&lt;/use&gt;
&lt;/svg&gt;</code></pre>
      <h5>Icon Font vs SVG：</h5>
      <table>
        <tr><th>特性</th><th>Icon Font</th><th>SVG</th></tr>
        <tr><td>可缩放</td><td>❌ (像素化)</td><td>✅</td></tr>
        <tr><td>颜色控制</td><td>❌ (单色)</td><td>✅ (多色)</td></tr>
        <tr><td>文件大小</td><td>📦 (包含所有图标)</td><td>📦 (按需加载)</td></tr>
        <tr><td>浏览器支持</td><td>✅ (IE8+)</td><td>✅ (现代浏览器)</td></tr>
        <tr><td>可编辑性</td><td>❌</td><td>✅ (CSS/SVG属性)</td></tr>
      </table>
      <h5>性能优化：</h5>
      <ul>
        <li>使用font-display: swap避免FOUT</li>
        <li>压缩字体文件，使用WOFF2格式</li>
        <li>只加载需要的字符子集</li>
        <li>使用CDN加速字体加载</li>
        <li>本地存储字体缓存</li>
      </ul>
    `
  },
  {
    title: 'Q13: CSS Houdini',
    difficulty: '难度：★★★★☆',
    frequency: '频率：★☆☆☆☆',
    content: `
      <h5>CSS Houdini是什么：</h5>
      <p>CSS Houdini是一套底层API，让开发者可以直接访问CSS引擎，创建新的CSS功能。</p>
      <h5>主要API：</h5>
      <ul>
        <li><strong>Properties & Values API：</strong>注册自定义CSS属性</li>
        <li><strong>Paint API：</strong>创建自定义背景和边框</li>
        <li><strong>Layout API：</strong>创建自定义布局</li>
        <li><strong>Animation & Typed OM：</strong>动画和类型化对象模型</li>
      </ul>
      <h5>Paint API示例：</h5>
      <pre class="code-block" v-pre><code>// paint-worklet.js
class CheckerboardPainter {
  paint(ctx, size, properties) {
    const { width, height } = size;
    const colors = properties.get('--checkerboard-colors');

    const cellSize = 20;
    const rows = Math.ceil(height / cellSize);
    const cols = Math.ceil(width / cellSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const color = (row + col) % 2 === 0 ? colors[0] : colors[1];
        ctx.fillStyle = color;

        ctx.fillRect(
          col * cellSize,
          row * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }
}

registerPaint('checkerboard', CheckerboardPainter);</code></pre>
      <pre class="code-block" v-pre><code>// CSS中使用
CSS.registerProperty({
  name: '--checkerboard-colors',
  syntax: '&lt;color&gt;+',
  initialValue: 'black white'
});

.element {
  background-image: paint(checkerboard);
  --checkerboard-colors: red blue;
}</code></pre>
      <h5>Properties & Values API：</h5>
      <pre class="code-block" v-pre><code>// 注册自定义属性
CSS.registerProperty({
  name: '--my-color',
  syntax: '&lt;color&gt;',
  initialValue: 'black',
  inherits: true
});

// 在CSS中使用
.my-element {
  --my-color: blue;
  color: var(--my-color);
}

// JavaScript中修改
element.style.setProperty('--my-color', 'red');</code></pre>
      <h5>Layout API：</h5>
      <pre class="code-block" v-pre><code>// layout-worklet.js
class MasonryLayout {
  async layout(children, edges, constraints, styleMap) {
    const childFragments = [];

    // 瀑布流布局逻辑
    let currentColumn = 0;
    const columnHeights = new Array(3).fill(0);

    for (const child of children) {
      const fragment = await child.layoutNextFragment({
        availableInlineSize: constraints.fixedInlineSize / 3,
        availableBlockSize: constraints.fixedBlockSize
      });

      fragment.inlineOffset = currentColumn * (constraints.fixedInlineSize / 3);
      fragment.blockOffset = columnHeights[currentColumn];

      columnHeights[currentColumn] += fragment.blockSize;
      currentColumn = (currentColumn + 1) % 3;

      childFragments.push(fragment);
    }

    return childFragments;
  }
}

registerLayout('masonry', MasonryLayout);</code></pre>
      <h5>浏览器支持：</h5>
      <ul>
        <li>Chrome 85+ 支持Paint API</li>
        <li>Properties & Values API 在Chrome 78+</li>
        <li>Layout API 仍在开发中</li>
        <li>需要使用worklet</li>
      </ul>
    `
  },
  {
    title: 'Q14: 移动端适配方案',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>视口设置：</h5>
      <pre class="code-block" v-pre><code>&lt;!-- 标准视口 --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

&lt;!-- 完整视口设置 --&gt;
&lt;meta name="viewport" content="
  width=device-width,
  initial-scale=1.0,
  minimum-scale=1.0,
  maximum-scale=1.0,
  user-scalable=no
"&gt;</code></pre>
      <h5>单位选择：</h5>
      <ul>
        <li><strong>px：</strong>固定像素，不推荐</li>
        <li><strong>%：</strong>相对于父元素</li>
        <li><strong>em：</strong>相对于字体大小</li>
        <li><strong>rem：</strong>相对于根元素字体大小</li>
        <li><strong>vw/vh：</strong>相对于视口</li>
        <li><strong>vmin/vmax：</strong>相对于视口较小/较大值</li>
      </ul>
      <h5>rem适配：</h5>
      <pre class="code-block" v-pre><code>// 设置根字体大小
function setRem() {
  const designWidth = 375; // 设计稿宽度
  const currentWidth = document.documentElement.clientWidth;
  const scale = currentWidth / designWidth;
  document.documentElement.style.fontSize = scale * 100 + 'px';
}

setRem();
window.addEventListener('resize', setRem);

// CSS中使用
.container {
  width: 3.75rem; /* 375px / 100 = 3.75rem */
  padding: 0.3rem; /* 30px */
}</code></pre>
      <h5>vw适配：</h5>
      <pre class="code-block" v-pre><code>// postcss-px-to-viewport插件配置
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿宽度
      viewportHeight: 667, // 设计稿高度
      unitPrecision: 3, // 小数位数
      viewportUnit: 'vw', // 转换单位
      selectorBlackList: ['.ignore'], // 忽略的类名
      minPixelValue: 1, // 小于1px不转换
      mediaQuery: false // 不转换媒体查询中的px
    }
  }
}

// CSS直接使用vw
.container {
  width: 100vw; /* 100% 视口宽度 */
  height: 50vh; /* 50% 视口高度 */
  padding: 2.667vw; /* 10px 在375px设计稿中 */
}</code></pre>
      <h5>flexible方案：</h5>
      <pre class="code-block" v-pre><code>// flexible.js (淘宝方案)
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // 设置data-dpr属性
  docEl.setAttribute('data-dpr', dpr);

  // 设置viewport
  var metaEl = document.querySelector('meta[name="viewport"]');
  if (metaEl) {
    metaEl.setAttribute('content',
      'width=device-width,initial-scale=' + 1/dpr +
      ',maximum-scale=' + 1/dpr + ',minimum-scale=' + 1/dpr +
      ',user-scalable=no'
    );
  }

  function setRem() {
    var width = docEl.getBoundingClientRect().width;
    var rem = width / 10; // 1rem = 屏幕宽度的1/10
    docEl.style.fontSize = rem + 'px';
  }

  setRem();
  window.addEventListener('resize', setRem);
})(window, document);</code></pre>
      <h5>高清屏适配：</h5>
      <pre class="code-block" v-pre><code>// 检测设备像素比
const dpr = window.devicePixelRatio;

// 设置viewport scale
const scale = 1 / dpr;
const viewport = document.querySelector('meta[name="viewport"]');
viewport.setAttribute('content',
  \`width=device-width,initial-scale=\${scale},maximum-scale=\${scale},minimum-scale=\${scale},user-scalable=no\`
);

// 设置body字体大小
document.body.style.fontSize = 12 * dpr + 'px';

// 1px边框问题
.border-1px {
  position: relative;
}

.border-1px::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #ccc;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
}</code></pre>
    `
  },
  {
    title: 'Q15: Web Components',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★☆☆☆',
    content: `
      <h5>Web Components三大规范：</h5>
      <ul>
        <li><strong>Custom Elements：</strong>自定义HTML元素</li>
        <li><strong>Shadow DOM：</strong>封装的DOM树</li>
        <li><strong>HTML Templates：</strong>HTML模板</li>
      </ul>
      <h5>Custom Elements：</h5>
      <pre class="code-block" v-pre><code>class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = \`
      &lt;style&gt;
        button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
      &lt;/style&gt;
      &lt;button&gt;&lt;slot&gt;按钮&lt;/slot&gt;&lt;/button&gt;
    \`;

    this.shadowRoot.querySelector('button')
      .addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('my-click', {
      bubbles: true,
      detail: { message: 'Hello from Web Component!' }
    }));
  }

  // 监听属性变化
  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      this.shadowRoot.querySelector('button').disabled = newValue !== null;
    }
  }
}

// 注册自定义元素
customElements.define('my-button', MyButton);

// 使用
&lt;my-button disabled&gt;禁用按钮&lt;/my-button&gt;</code></pre>
      <h5>Shadow DOM：</h5>
      <pre class="code-block" v-pre><code>// 创建Shadow DOM
const shadow = element.attachShadow({ mode: 'open' });

// mode: 'open' - 外部可以访问shadowRoot
// mode: 'closed' - 外部无法访问shadowRoot

// 添加样式和内容
shadow.innerHTML = \`
  &lt;style&gt;
    .internal {
      color: red;
    }
  &lt;/style&gt;
  &lt;div class="internal"&gt;Shadow DOM内容&lt;/div&gt;
\`;

// 外部样式无法影响Shadow DOM内部
// Shadow DOM内部样式不会泄露到外部</code></pre>
      <h5>HTML Templates：</h5>
      <pre class="code-block" v-pre><code>&lt;template id="my-template"&gt;
  &lt;style&gt;
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
    }
  &lt;/style&gt;
  &lt;div class="card"&gt;
    &lt;h3&gt;&lt;/h3&gt;
    &lt;p&gt;&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
const template = document.getElementById('my-template');
const clone = template.content.cloneNode(true);

// 填充内容
clone.querySelector('h3').textContent = '标题';
clone.querySelector('p').textContent = '内容';

// 添加到页面
document.body.appendChild(clone);
&lt;/script&gt;</code></pre>
      <h5>生命周期：</h5>
      <pre class="code-block" v-pre><code>class MyElement extends HTMLElement {
  constructor() {
    super();
    console.log('constructor - 元素被创建');
  }

  connectedCallback() {
    console.log('connectedCallback - 元素被添加到DOM');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback - 元素从DOM移除');
  }

  adoptedCallback() {
    console.log('adoptedCallback - 元素被移动到新文档');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback - 属性变化');
  }
}</code></pre>
      <h5>浏览器支持：</h5>
      <ul>
        <li>Chrome 54+, Firefox 63+, Safari 10.1+</li>
        <li>Edge支持Custom Elements和Shadow DOM</li>
        <li>IE11不支持，需要polyfill</li>
        <li>可以使用框架如Stencil、Lit等</li>
      </ul>
      <h5>与框架比较：</h5>
      <table>
        <tr><th>特性</th><th>Web Components</th><th>React/Vue</th></tr>
        <tr><td>浏览器原生</td><td>✅</td><td>❌</td></tr>
        <tr><td>框架无关</td><td>✅</td><td>❌</td></tr>
        <tr><td>样式隔离</td><td>✅ (Shadow DOM)</td><td>❌</td></tr>
        <tr><td>学习成本</td><td>📈</td><td>📉</td></tr>
        <tr><td>生态系统</td><td>📉</td><td>📈</td></tr>
      </table>
    `
  }
]

// TypeScript面试题
const tsQuestions = [
  {
    title: 'Q1: TypeScript中的类型系统有哪些基本类型？',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>基本类型：</h5>
      <ul>
        <li><strong>boolean：</strong>true/false</li>
        <li><strong>number：</strong>所有数字类型</li>
        <li><strong>string：</strong>字符串类型</li>
        <li><strong>array：</strong>数组类型</li>
        <li><strong>tuple：</strong>元组类型</li>
        <li><strong>enum：</strong>枚举类型</li>
        <li><strong>any：</strong>任意类型</li>
        <li><strong>unknown：</strong>未知类型</li>
        <li><strong>never：</strong>永不存在的值</li>
        <li><strong>void：</strong>无返回值</li>
        <li><strong>null/undefined：</strong>空值类型</li>
      </ul>
      <h5>使用示例：</h5>
      <pre class="code-block" v-pre><code>let isDone: boolean = false;
let age: number = 25;
let name: string = "John";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];
enum Color {Red, Green, Blue};
let notSure: any = 4;
let u: undefined = undefined;
let n: null = null;</code></pre>
    `
  },
  {
    title: 'Q2: interface和type的区别',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>interface：</h5>
      <ul>
        <li>只能用于对象类型</li>
        <li>支持继承和合并</li>
        <li>可以被类实现</li>
        <li>更好的错误提示</li>
      </ul>
      <h5>type：</h5>
      <ul>
        <li>可以表示任何类型</li>
        <li>支持联合类型、交叉类型</li>
        <li>不能被继承或合并</li>
        <li>更灵活的类型操作</li>
      </ul>
      <h5>使用场景：</h5>
      <pre class="code-block" v-pre><code>// interface适合对象
interface User {
  name: string;
  age: number;
}

// type适合复杂类型
type ID = string | number;
type Point = { x: number; y: number };
type PartialPoint = Partial&lt;Point&gt;;

// interface继承
interface Admin extends User {
  role: string;
}

// type联合
type Status = "success" | "error" | "loading";</code></pre>
    `
  },
  {
    title: 'Q3: TypeScript中的泛型是什么？如何使用？',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>泛型定义：</h5>
      <p>泛型允许我们在定义函数、接口或类时不预先指定具体的类型，而在使用时再指定类型的一种特性。</p>
      <h5>泛型函数：</h5>
      <pre class="code-block" v-pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}

// 使用
let output1 = identity&lt;string&gt;("myString");
let output2 = identity&lt;number&gt;(100);

// 类型推断
let output3 = identity("myString"); // 自动推断为string</code></pre>
      <h5>泛型接口：</h5>
      <pre class="code-block" v-pre><code>interface GenericIdentityFn&lt;T&gt; {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn&lt;number&gt; = identity;</code></pre>
      <h5>泛型类：</h5>
      <pre class="code-block" v-pre><code>class GenericNumber&lt;T&gt; {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber&lt;number&gt;();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };</code></pre>
      <h5>泛型约束：</h5>
      <pre class="code-block" v-pre><code>interface Lengthwise {
  length: number;
}

function loggingIdentity&lt;T extends Lengthwise&gt;(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 使用
loggingIdentity({length: 10, value: 3}); // ✅
loggingIdentity(3); // ❌ Error: number没有length属性</code></pre>
      <h5>泛型工具类型：</h5>
      <pre class="code-block" v-pre><code>// Partial - 所有属性可选
type PartialUser = Partial&lt;User&gt;; // 等价于 { name?: string; age?: number; }

// Required - 所有属性必选
type RequiredUser = Required&lt;PartialUser&gt;; // 等价于 { name: string; age: number; }

// Readonly - 所有属性只读
type ReadonlyUser = Readonly&lt;User&gt;; // 等价于 { readonly name: string; readonly age: number; }

// Pick - 选择部分属性
type UserName = Pick&lt;User, 'name'&gt;; // 等价于 { name: string; }

// Omit - 排除部分属性
type UserWithoutAge = Omit&lt;User, 'age'&gt;; // 等价于 { name: string; }</code></pre>
    `
  },
  {
    title: 'Q4: TypeScript中的联合类型和交叉类型',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>联合类型(Union Types)：</h5>
      <p>表示一个值可以是几种类型之一，用 | 分隔。</p>
      <pre class="code-block" v-pre><code>function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(\`Expected string or number, got '\${padding}'\`);
}</code></pre>
      <h5>交叉类型(Intersection Types)：</h5>
      <p>将多个类型合并为一个类型，用 & 连接。</p>
      <pre class="code-block" v-pre><code>interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

const cc: ColorfulCircle = {
  color: "red",
  radius: 42
};</code></pre>
      <h5>类型守卫(Type Guards)：</h5>
      <pre class="code-block" v-pre><code>// typeof类型守卫
function isString(test: any): test is string {
  return typeof test === "string";
}

function example(foo: number | string) {
  if (isString(foo)) {
    console.log(foo.length); // foo被推断为string
  }
}

// instanceof类型守卫
class Bird {
  fly() {}
}

class Fish {
  swim() {}
}

function move(pet: Bird | Fish) {
  if (pet instanceof Bird) {
    pet.fly(); // pet被推断为Bird
  } else {
    pet.swim(); // pet被推断为Fish
  }
}</code></pre>
      <h5>可辨识联合(Discriminated Unions)：</h5>
      <pre class="code-block" v-pre><code>interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function area(s: Shape): number {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.width * s.height;
  }
}</code></pre>
    `
  },
  {
    title: 'Q5: TypeScript配置详解',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>tsconfig.json基本配置：</h5>
      <pre class="code-block" v-pre><code>{
  "compilerOptions": {
    "target": "ES2020",              // 编译目标
    "module": "ESNext",              // 模块系统
    "lib": ["ES2020", "DOM"],        // 包含的库
    "outDir": "./dist",              // 输出目录
    "rootDir": "./src",              // 源代码目录
    "strict": true,                  // 启用严格模式
    "esModuleInterop": true,         // ES模块互操作
    "skipLibCheck": true,            // 跳过库文件检查
    "forceConsistentCasingInFileNames": true // 文件名大小写一致性
  },
  "include": ["src/**/*"],           // 包含的文件
  "exclude": ["node_modules"]        // 排除的文件
}</code></pre>
      <h5>重要编译选项：</h5>
      <ul>
        <li><strong>target：</strong>编译目标ES版本</li>
        <li><strong>module：</strong>模块系统(CommonJS/ESNext)</li>
        <li><strong>lib：</strong>包含的类型定义库</li>
        <li><strong>strict：</strong>启用所有严格类型检查</li>
        <li><strong>noImplicitAny：</strong>不允许隐式any</li>
        <li><strong>strictNullChecks：</strong>严格空值检查</li>
        <li><strong>noImplicitReturns：</strong>函数必须有返回值</li>
        <li><strong>noUnusedLocals：</strong>检查未使用的局部变量</li>
      </ul>
      <h5>路径映射：</h5>
      <pre class="code-block" v-pre><code>{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/utils/*": ["utils/*"]
    }
  }
}

// 使用
import Button from '@/components/Button';
import { formatDate } from '@/utils/date';</code></pre>
      <h5>类型声明：</h5>
      <pre class="code-block" v-pre><code>// types/index.d.ts
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// 全局类型
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

// 第三方库类型声明
declare module 'some-library' {
  export function doSomething(): void;
}</code></pre>
      <h5>项目引用：</h5>
      <pre class="code-block" v-pre><code>// packages.json
{
  "name": "my-project",
  "references": [
    { "path": "./packages/utils" },
    { "path": "./packages/components" }
  ]
}

// packages/utils/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/utils",
    "rootDir": "."
  },
  "references": []
}</code></pre>
    `
  },
  {
    title: 'Q6: TypeScript装饰器',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>装饰器是什么：</h5>
      <p>装饰器是一种特殊类型的声明，可以附加到类声明、方法、属性或参数上。</p>
      <h5>类装饰器：</h5>
      <pre class="code-block" v-pre><code>function logger(target: Function) {
    console.log('类被定义了:', target.name);
  }
      

@logger
class Person {
  constructor(public name: string) {}
}</code></pre>
      <h5>方法装饰器：</h5>
      <pre class="code-block" v-pre><code>function timing(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.time(key);
    const result = originalMethod.apply(this, args);
    console.timeEnd(key);
    return result;
  };

  return descriptor;
}

class Calculator {
  @timing
  add(a: number, b: number): number {
    return a + b;
  }
}</code></pre>
      <h5>属性装饰器：</h5>
      <pre class="code-block" v-pre><code>function readonly(
  target: any,
  key: string
): void {
  Object.defineProperty(target, key, {
    writable: false
  });
}

class Config {
  @readonly
  API_URL = 'https://api.example.com';
}
      
]

// Vue.js面试题
const vueQuestions = [
  {
    title: 'Q1: Vue的生命周期详解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>Vue2生命周期：</h5>
      <ul>
        <li><strong>beforeCreate：</strong>实例初始化前</li>
        <li><strong>created：</strong>实例创建完成</li>
        <li><strong>beforeMount：</strong>挂载前</li>
        <li><strong>mounted：</strong>挂载完成</li>
        <li><strong>beforeUpdate：</strong>更新前</li>
        <li><strong>updated：</strong>更新完成</li>
        <li><strong>beforeDestroy：</strong>销毁前</li>
        <li><strong>destroyed：</strong>销毁完成</li>
      </ul>
      <h5>Vue3生命周期：</h5>
      <ul>
        <li><strong>setup：</strong>组合式API入口</li>
        <li><strong>onBeforeMount：</strong>挂载前</li>
        <li><strong>onMounted：</strong>挂载完成</li>
        <li><strong>onBeforeUpdate：</strong>更新前</li>
        <li><strong>onUpdated：</strong>更新完成</li>
        <li><strong>onBeforeUnmount：</strong>卸载前</li>
        <li><strong>onUnmounted：</strong>卸载完成</li>
      </ul>
    `
  },
  {
    title: 'Q2: Vue的响应式原理',
    difficulty: '难度：★★★★☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>Vue2响应式原理：</h5>
      <ul>
        <li><strong>Object.defineProperty：</strong>劫持对象属性的getter/setter</li>
        <li><strong>Observer：</strong>递归遍历对象，设置响应式</li>
        <li><strong>Watcher：</strong>订阅者，数据变化时更新视图</li>
        <li><strong>Dep：</strong>依赖收集器，管理Watcher</li>
      </ul>
      <h5>Vue3响应式原理：</h5>
      <ul>
        <li><strong>Proxy：</strong>代理整个对象，无需递归</li>
        <li><strong>Reflect：</strong>统一的对象操作API</li>
        <li><strong>reactive：</strong>创建响应式对象</li>
        <li><strong>ref：</strong>创建响应式引用</li>
        <li><strong>effect：</strong>副作用函数</li>
      </ul>
    `
  },
  {
    title: 'Q3: computed和watch的区别',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>computed：</h5>
      <ul>
        <li>有缓存，依赖变化时才重新计算</li>
        <li>同步计算，不能执行异步操作</li>
        <li>返回计算结果</li>
        <li>适合复杂计算场景</li>
      </ul>
      <h5>watch：</h5>
      <ul>
        <li>监听数据变化，执行回调</li>
        <li>可以执行异步操作</li>
        <li>可以监听多个数据</li>
        <li>适合副作用操作</li>
      </ul>
      <h5>使用示例：</h5>
      <pre class="code-block" v-pre><code>&lt;script setup&gt;
import { ref, computed, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// computed: 计算全名
const fullName = computed(() => {
  console.log('computed执行')
  return \`\${firstName.value} \${lastName.value}\`
})

// watch: 监听变化
watch([firstName, lastName], (newValues, oldValues) => {
  console.log('姓名变化:', newValues, oldValues)
  // 可以执行异步操作，如API调用
}, { immediate: true })

// watchEffect: 自动收集依赖
watchEffect(() => {
  console.log(\`欢迎 \${fullName.value}\`)
})
&lt;/script&gt;</code></pre>
    `
  },
  {
    title: 'Q4: Vue组件通信方式',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>父子组件通信：</h5>
      <ul>
        <li><strong>props：</strong>父传子</li>
        <li><strong>$emit：</strong>子传父</li>
        <li><strong>$refs：</strong>父组件获取子组件实例</li>
        <li><strong>$parent/$children：</strong>直接访问父子组件</li>
      </ul>
      <h5>兄弟组件通信：</h5>
      <ul>
        <li><strong>共同父组件：</strong>通过父组件中转</li>
        <li><strong>事件总线：</strong>Vue.prototype.$bus</li>
        <li><strong>Vuex/Pinia：</strong>状态管理</li>
        <li><strong>provide/inject：</strong>依赖注入</li>
      </ul>
      <h5>provide/inject示例：</h5>
      <pre class="code-block" v-pre><code>// 父组件
&lt;script setup&gt;
import { provide } from 'vue'

provide('theme', 'dark')
provide('user', { name: 'John' })
&lt;/script&gt;

// 子组件
&lt;script setup&gt;
import { inject } from 'vue'

const theme = inject('theme')
const user = inject('user')
&lt;/script&gt;</code></pre>
      <h5>自定义事件：</h5>
      <pre class="code-block" v-pre><code>// 子组件
&lt;template&gt;
  &lt;button @click="$emit('custom-event', data)"&gt;发送事件&lt;/button&gt;
&lt;/template&gt;

// 父组件
&lt;template&gt;
  &lt;Child @custom-event="handleEvent" /&gt;
&lt;/template&gt;</code></pre>
    `
  },
  {
    title: 'Q5: Vue3的Composition API',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>Composition API优势：</h5>
      <ul>
        <li>更好的代码组织和复用</li>
        <li>更好的TypeScript支持</li>
        <li>更灵活的逻辑组合</li>
        <li>更小的打包体积</li>
      </ul>
      <h5>核心函数：</h5>
      <ul>
        <li><strong>setup：</strong>组合式API入口</li>
        <li><strong>ref：</strong>响应式引用</li>
        <li><strong>reactive：</strong>响应式对象</li>
        <li><strong>computed：</strong>计算属性</li>
        <li><strong>watch/watchEffect：</strong>监听器</li>
        <li><strong>生命周期钩子：</strong>onMounted等</li>
      </ul>
      <h5>组合式函数：</h5>
      <pre class="code-block" v-pre><code>// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return {
    count,
    doubleCount,
    increment,
    decrement
  }
}

// 在组件中使用
&lt;script setup&gt;
const { count, doubleCount, increment } = useCounter(10)
&lt;/script&gt;</code></pre>
    `
  }
]

// React面试题
const reactQuestions = [
  {
    title: 'Q1: React生命周期详解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>类组件生命周期：</h5>
      <ul>
        <li><strong>挂载阶段：</strong>constructor → getDerivedStateFromProps → render → componentDidMount</li>
        <li><strong>更新阶段：</strong>getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate</li>
        <li><strong>卸载阶段：</strong>componentWillUnmount</li>
        <li><strong>错误处理：</strong>componentDidCatch</li>
      </ul>
      <h5>函数组件生命周期：</h5>
      <ul>
        <li><strong>useEffect：</strong>副作用处理，相当于componentDidMount/Update/Unmount</li>
        <li><strong>useLayoutEffect：</strong>DOM更新后同步执行</li>
        <li><strong>useInsertionEffect：</strong>CSS-in-JS库使用</li>
      </ul>
    `
  },
  {
    title: 'Q2: React Hooks详解',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>基础Hooks：</h5>
      <ul>
        <li><strong>useState：</strong>状态管理</li>
        <li><strong>useEffect：</strong>副作用处理</li>
        <li><strong>useContext：</strong>上下文消费</li>
      </ul>
      <h5>额外Hooks：</h5>
      <ul>
        <li><strong>useReducer：</strong>复杂状态逻辑</li>
        <li><strong>useCallback：</strong>函数memo化</li>
        <li><strong>useMemo：</strong>值memo化</li>
        <li><strong>useRef：</strong>可变引用</li>
        <li><strong>useImperativeHandle：</strong>暴露子组件方法</li>
        <li><strong>useLayoutEffect：</strong>同步DOM操作</li>
        <li><strong>useDebugValue：</strong>调试工具</li>
      </ul>
      <h5>Hooks规则：</h5>
      <ul>
        <li>只在React函数组件或自定义Hooks中调用</li>
        <li>只在顶层调用，不要在循环、条件或嵌套函数中</li>
        <li>使用ESLint插件检测规则违反</li>
      </ul>
    `
  },
  {
    title: 'Q3: React性能优化方案',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>组件优化：</h5>
      <ul>
        <li><strong>React.memo：</strong>防止不必要的重新渲染</li>
        <li><strong>useMemo：</strong>缓存计算结果</li>
        <li><strong>useCallback：</strong>缓存函数引用</li>
        <li><strong>React.lazy：</strong>代码分割</li>
        <li><strong>Suspense：</strong>异步组件加载</li>
      </ul>
      <h5>列表渲染优化：</h5>
      <pre class="code-block" v-pre><code>// 使用key优化
{items.map(item => (
  &lt;Item key={item.id} data={item} /&gt;
))}

// 使用React.memo
const Item = React.memo(({ data }) => {
  return &lt;div&gt;{data.name}&lt;/div&gt;;
});

// 虚拟滚动
import { FixedSizeList as List } from 'react-window';</code></pre>
      <h5>状态优化：</h5>
      <pre class="code-block" v-pre><code>// 使用useReducer处理复杂状态
const [state, dispatch] = useReducer(reducer, initialState);

// 避免不必要的状态更新
const handleClick = useCallback(() => {
  setCount(prevCount => prevCount + 1);
}, []);

// 批量更新
const updateMultiple = () => {
  setCount(c => c + 1);
  setName(n => n + ' updated');
  // React会自动批量更新
};</code></pre>
      <h5>代码分割：</h5>
      <pre class="code-block" v-pre><code>// 路由级代码分割
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

// 组件级代码分割
const ExpensiveComponent = lazy(() =>
  import('./ExpensiveComponent')
);

// 使用
&lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
  &lt;ExpensiveComponent /&gt;
&lt;/Suspense&gt;</code></pre>
    `
  },
  {
    title: 'Q4: React状态管理方案',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>内置状态管理：</h5>
      <ul>
        <li><strong>useState：</strong>组件级状态</li>
        <li><strong>useReducer：</strong>复杂状态逻辑</li>
        <li><strong>useContext：</strong>跨组件状态共享</li>
        <li><strong>Context + useReducer：</strong>轻量级状态管理</li>
      </ul>
      <h5>第三方状态管理：</h5>
      <ul>
        <li><strong>Redux：</strong>经典的状态管理库</li>
        <li><strong>Zustand：</strong>轻量级状态管理</li>
        <li><strong>Recoil：</strong>Facebook推出的状态管理</li>
        <li><strong>Jotai：</strong>原子化状态管理</li>
      </ul>
      <h5>Redux核心概念：</h5>
      <pre class="code-block" v-pre><code>// Action
const increment = () => ({
  type: 'INCREMENT'
});

// Reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

// Store
const store = createStore(counter);

// React组件中使用
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={() => dispatch(increment())}&gt;+&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <h5>Zustand示例：</h5>
      <pre class="code-block" v-pre><code>// store.js
import create from 'zustand';

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));

// 组件中使用
function Counter() {
  const { count, increment, decrement } = useStore();

  return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={increment}&gt;+&lt;/button&gt;
      &lt;button onClick={decrement}&gt;-&lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
    `
  },
  {
    title: 'Q5: React中的key有什么作用？',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>key的作用：</h5>
      <ul>
        <li>帮助React识别哪些元素改变了</li>
        <li>提高渲染性能</li>
        <li>保持组件状态</li>
        <li>触发正确的组件生命周期</li>
      </ul>
      <h5>错误用法：</h5>
      <pre class="code-block" v-pre><code>// ❌ 使用数组索引作为key
{items.map((item, index) => (
  &lt;Item key={index} data={item} /&gt;
))}

// 当数组变化时，所有组件都会重新渲染
const items = ['A', 'B', 'C'];
const newItems = ['B', 'C', 'D']; // A删除，D添加

// React认为所有key都变了，需要重新创建组件</code></pre>
      <h5>正确用法：</h5>
      <pre class="code-block" v-pre><code>// ✅ 使用唯一标识符
{items.map(item => (
  &lt;Item key={item.id} data={item} /&gt;
))}

// 动态列表
const [items, setItems] = useState([
  { id: 1, text: 'A' },
  { id: 2, text: 'B' },
  { id: 3, text: 'C' }
]);

// 添加项目
setItems(prev => [...prev, { id: Date.now(), text: 'New' }]);

// 删除项目
setItems(prev => prev.filter(item => item.id !== targetId));</code></pre>
      <h5>最佳实践：</h5>
      <ul>
        <li>使用稳定的唯一标识符</li>
        <li>避免使用数组索引</li>
        <li>在列表项有状态时特别重要</li>
        <li>对于静态列表可以不设置key</li>
      </ul>
    `
  }
]

// Node.js面试题
const nodeQuestions = [
  {
    title: 'Q1: Node.js的事件循环',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>事件循环阶段：</h5>
      <ol>
        <li><strong>timers：</strong>执行setTimeout和setInterval的回调</li>
        <li><strong>pending callbacks：</strong>执行延迟到下一个循环的I/O回调</li>
        <li><strong>idle, prepare：</strong>仅内部使用</li>
        <li><strong>poll：</strong>检索新的I/O事件</li>
        <li><strong>check：</strong>执行setImmediate回调</li>
        <li><strong>close callbacks：</strong>执行close事件的回调</li>
      </ol>
      <h5>宏任务vs微任务：</h5>
      <ul>
        <li><strong>宏任务：</strong>setTimeout、setInterval、setImmediate、I/O</li>
        <li><strong>微任务：</strong>Promise.then、process.nextTick</li>
        <li><strong>执行顺序：</strong>宏任务 → 微任务 → 宏任务...</li>
      </ul>
    `
  }
]

// 工程化面试题
const engineeringQuestions = [
  {
    title: 'Q1: Webpack构建优化',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>构建速度优化：</h5>
      <ul>
        <li><strong>多进程/多线程：</strong>thread-loader, HappyPack</li>
        <li><strong>缓存：</strong>cache-loader, babel-loader缓存</li>
        <li><strong>缩小范围：</strong>include/exclude, noParse</li>
        <li><strong>预编译：</strong>DLLPlugin, Externals</li>
      </ul>
      <h5>打包体积优化：</h5>
      <ul>
        <li><strong>代码分割：</strong>动态导入, 路由懒加载</li>
        <li><strong>Tree Shaking：</strong>移除未使用代码</li>
        <li><strong>压缩：</strong>UglifyJS, Terser</li>
        <li><strong>CDN：</strong>外部库使用CDN</li>
      </ul>
    `
  }
]

// 浏览器面试题
const browserQuestions = [
  {
    title: 'Q1: 浏览器渲染原理',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★★',
    content: `
      <h5>渲染流程：</h5>
      <ol>
        <li><strong>解析HTML：</strong>构建DOM树</li>
        <li><strong>解析CSS：</strong>构建CSSOM树</li>
        <li><strong>构建Render树：</strong>DOM + CSSOM</li>
        <li><strong>布局(Layout)：</strong>计算元素位置和大小</li>
        <li><strong>绘制(Paint)：</strong>绘制像素到屏幕</li>
        <li><strong>合成(Composite)：</strong>层合成和显示</li>
      </ol>
      <h5>关键概念：</h5>
      <ul>
        <li><strong>重排(Reflow)：</strong>重新计算布局</li>
        <li><strong>重绘(Repaint)：</strong>重新绘制像素</li>
        <li><strong>合成：</strong>不触发重排重绘的变换</li>
      </ul>
    `
  }
]

// 算法面试题
const algorithmQuestions = [
  {
    title: 'Q1: 排序算法比较',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    content: `
      <h5>时间复杂度对比：</h5>
      <table>
        <tr><th>算法</th><th>最好</th><th>平均</th><th>最坏</th><th>空间</th><th>稳定</th></tr>
        <tr><td>冒泡排序</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>✅</td></tr>
        <tr><td>选择排序</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>❌</td></tr>
        <tr><td>插入排序</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>✅</td></tr>
        <tr><td>快速排序</td><td>O(nlogn)</td><td>O(nlogn)</td><td>O(n²)</td><td>O(logn)</td><td>❌</td></tr>
        <tr><td>归并排序</td><td>O(nlogn)</td><td>O(nlogn)</td><td>O(nlogn)</td><td>O(n)</td><td>✅</td></tr>
        <tr><td>堆排序</td><td>O(nlogn)</td><td>O(nlogn)</td><td>O(nlogn)</td><td>O(1)</td><td>❌</td></tr>
      </table>
    `
  }
]

// 系统设计面试题
const systemDesignQuestions = [
  {
    title: 'Q1: 设计一个短链接服务',
    difficulty: '难度：★★★★☆',
    frequency: '频率：★★★☆☆',
    content: `
      <h5>需求分析：</h5>
      <ul>
        <li>将长URL转换为短URL</li>
        <li>短URL重定向到原始URL</li>
        <li>高并发、高可用</li>
        <li>数据持久化</li>
      </ul>
      <h5>核心算法：</h5>
      <pre class="code-block" v-pre><code>// Base62编码
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function encode(num) {
  let result = '';
  do {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  } while (num > 0);
  return result.padStart(6, '0');
}</code></pre>
    `
  }
]

// 各大厂真题
const companyQuestions = [
  {
    title: 'Q1: 实现一个Promise.all方法',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 字节跳动',
    content: `
      <h5>实现代码：</h5>
      <pre class="code-block" v-pre><code>function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || promises.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let completedCount = 0;
    let hasRejected = false;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          if (hasRejected) return;
          results[index] = value;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          if (!hasRejected) {
            hasRejected = true;
            reject(error);
          }
        });
    });
  });
}</code></pre>
    `
  },
  {
    title: 'Q2: 设计一个LRU缓存',
    difficulty: '难度：★★★★☆',
    frequency: '频率：★★★★☆',
    company: '🏢 阿里',
    content: `
      <h5>LRU实现：</h5>
      <pre class="code-block" v-pre><code>class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}</code></pre>
    `
  },
  {
    title: 'Q3: 实现一个深拷贝函数',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 腾讯',
    content: `
      <h5>需要处理的类型：</h5>
      <ul>
        <li>基本类型：直接返回</li>
        <li>对象和数组：递归拷贝</li>
        <li>函数：直接赋值（函数不可变）</li>
        <li>循环引用：使用WeakMap解决</li>
        <li>特殊对象：Date、RegExp等</li>
      </ul>
      <h5>完整实现：</h5>
      <pre class="code-block" v-pre><code>function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  let clone;

  if (Array.isArray(obj)) {
    clone = [];
    map.set(obj, clone);
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i], map);
    }
  } else {
    clone = {};
    map.set(obj, clone);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key], map);
      }
    }
  }

  return clone;
}</code></pre>
    `
  },
  {
    title: 'Q4: 实现一个事件发布订阅系统',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 百度',
    content: `
      <h5>EventEmitter实现：</h5>
      <pre class="code-block" v-pre><code>class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  once(event, callback) {
    const onceCallback = (...args) => {
      callback.apply(this, args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        try {
          callback.apply(this, args);
        } catch (error) {
          console.error('事件回调执行出错:', error);
        }
      });
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}</code></pre>
    `
  },
  {
    title: 'Q5: 实现一个防抖函数',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 小米',
    content: `
      <h5>防抖实现：</h5>
      <pre class="code-block" v-pre><code>function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// 使用示例
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query);
}, 300);</code></pre>
    `
  },
  {
    title: 'Q6: 数组扁平化实现',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 京东',
    content: `
      <h5>递归实现：</h5>
      <pre class="code-block" v-pre><code>function flatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

// 使用
flatten([1, [2, [3, 4]], 5]); // [1, 2, 3, 4, 5]</code></pre>
      <h5>指定深度：</h5>
      <pre class="code-block" v-pre><code>function flattenDepth(arr, depth = 1) {
  if (depth <= 0) return arr;

  return arr.reduce((flat, item) => {
    return flat.concat(
      Array.isArray(item) ? flattenDepth(item, depth - 1) : item
    );
  }, []);
}</code></pre>
    `
  },
  {
    title: 'Q7: 实现一个简单的Promise',
    difficulty: '难度：★★★★☆',
    frequency: '频率：★★★★☆',
    company: '🏢 网易',
    content: `
      <h5>Promise实现：</h5>
      <pre class="code-block" v-pre><code>class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}</code></pre>
    `
  },
  {
    title: 'Q8: 实现一个 curry 函数',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 美团',
    content: `
      <h5>柯里化实现：</h5>
      <pre class="code-block" v-pre><code>function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6</code></pre>
    `
  },
  {
    title: 'Q9: 实现一个 sleep 函数',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 滴滴',
    content: `
      <h5>Promise实现：</h5>
      <pre class="code-block" v-pre><code>function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// 使用
async function demo() {
  console.log('开始');
  await sleep(2000);
  console.log('2秒后');
}</code></pre>
      <h5>Generator实现：</h5>
      <pre class="code-block" v-pre><code>function* sleepGenerator(ms) {
  yield new Promise(resolve => setTimeout(resolve, ms));
}

function run(generator) {
  const gen = generator();

  function next() {
    const result = gen.next();
    if (!result.done) {
      result.value.then(() => next());
    }
  }

  next();
}</code></pre>
    `
  },
  {
    title: 'Q10: 二叉树遍历实现',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 快手',
    content: `
      <h5>前序遍历：</h5>
      <pre class="code-block" v-pre><code>// 递归
function preorderTraversal(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorderTraversal(root.left, result);
  preorderTraversal(root.right, result);
  return result;
}

// 非递归
function preorderTraversal(root) {
  if (!root) return [];
  const result = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}</code></pre>
    `
  },
  {
    title: 'Q11: 快速排序实现',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 拼多多',
    content: `
      <h5>快速排序：</h5>
      <pre class="code-block" v-pre><code>function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const pivot = partition(arr, left, right);
  quickSort(arr, left, pivot - 1);
  quickSort(arr, pivot + 1, right);

  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}</code></pre>
    `
  },
  {
    title: 'Q12: 两数之和',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★★',
    company: '🏢 字节跳动',
    content: `
      <h5>哈希表解法：</h5>
      <pre class="code-block" v-pre><code>function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}</code></pre>
    `
  },
  {
    title: 'Q13: 合并两个有序数组',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 阿里',
    content: `
      <h5>双指针解法：</h5>
      <pre class="code-block" v-pre><code>function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }

  while (j >= 0) {
    nums1[k] = nums2[j];
    j--;
    k--;
  }
}</code></pre>
    `
  },
  {
    title: 'Q14: 反转链表',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 腾讯',
    content: `
      <h5>迭代解法：</h5>
      <pre class="code-block" v-pre><code>function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}</code></pre>
    `
  },
  {
    title: 'Q15: 有效的括号',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★★☆',
    company: '🏢 百度',
    content: `
      <h5>栈解法：</h5>
      <pre class="code-block" v-pre><code>function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (char in map) {
      const top = stack.pop();
      if (top !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}</code></pre>
    `
  },
  {
    title: 'Q16: 最长公共前缀',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 小米',
    content: `
      <h5>水平扫描：</h5>
      <pre class="code-block" v-pre><code>function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return '';
    }
  }

  return prefix;
}</code></pre>
    `
  },
  {
    title: 'Q17: 删除排序数组中的重复项',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 京东',
    content: `
      <h5>双指针解法：</h5>
      <pre class="code-block" v-pre><code>function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
}</code></pre>
    `
  },
  {
    title: 'Q18: 最大子序和',
    difficulty: '难度：★★★☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 网易',
    content: `
      <h5>动态规划：</h5>
      <pre class="code-block" v-pre><code>function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}</code></pre>
    `
  },
  {
    title: 'Q19: 爬楼梯',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 美团',
    content: `
      <h5>动态规划：</h5>
      <pre class="code-block" v-pre><code>function climbStairs(n) {
  if (n <= 2) return n;

  let prev = 1;
  let curr = 2;

  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}</code></pre>
    `
  },
  {
    title: 'Q20: 二叉树的最大深度',
    difficulty: '难度：★★☆☆☆',
    frequency: '频率：★★★☆☆',
    company: '🏢 滴滴',
    content: `
      <h5>递归解法：</h5>
      <pre class="code-block" v-pre><code>function maxDepth(root) {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}</code></pre>
    `
  }
</script>

<style scoped>
.interview-guide {
  background: white;
  padding: 20px;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.nav-btn {
  padding: 8px 16px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
}

.nav-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}

.nav-btn.active {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.nav-btn.active:hover {
  background: #5a6fd8;
}

/* 内容区域 */
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* 问题项样式 */
.question-item {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.question-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.question-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  line-height: 1.4;
}

.question-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.question-meta span {
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 500;
}

.difficulty {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.frequency {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.company {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
}

.question-content {
  color: #555;
  line-height: 1.6;
}

.question-content h5 {
  color: #333;
  font-weight: 600;
  margin: 20px 0 10px 0;
  font-size: 1.1rem;
}

.question-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.question-content li {
  margin: 8px 0;
}

.question-content pre {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.4;
}

.question-content code {
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  background: #f1f3f4;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    padding: 15px;
    gap: 8px;
  }

  .nav-btn {
    padding: 6px 12px;
    font-size: 13px;
  }

  .question-item {
    padding: 16px;
    margin-bottom: 16px;
  }

  .question-title {
    font-size: 1.1rem;
  }

  .question-meta {
    gap: 12px;
  }

  .guide-section h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .interview-guide {
    padding: 15px;
  }

  .nav-menu {
    padding: 12px;
    gap: 6px;
  }

  .nav-btn {
    padding: 5px 10px;
    font-size: 12px;
  }

  .question-meta {
    flex-direction: column;
    gap: 8px;
  }

  .question-meta span {
    padding: 3px 8px;
    font-size: 13px;
  }
}
</style>