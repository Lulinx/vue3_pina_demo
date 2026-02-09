<template>
  <div class="questions-section">
    <h2>🟨 JavaScript 面试题</h2>
    <p class="section-desc">包含ES5/ES6+、异步编程、设计模式等中高级前端JavaScript面试题</p>

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
    title: 'Q1: 说说你对闭包的理解？闭包有什么作用？',
    difficulty: 'medium',
    frequency: '★★★★★',
    company: '字节跳动',
    tags: ['闭包', '作用域', '内存管理'],
    content: `
      <h5>回答要点:</h5>
      <p><strong>闭包定义:</strong>闭包是指有权访问另一个函数作用域中变量的函数。通常是在一个函数内部定义的函数。</p>
      <h5>形成条件:</h5>
      <ul>
        <li>函数嵌套</li>
        <li>内部函数引用外部函数的变量</li>
        <li>外部函数被调用执行</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>经典例子:</h5>
      <div class="code-block"><pre>function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  }
}

const counter = outer(); // outer执行完毕，但count变量仍被inner引用
counter(); // 1
counter(); // 2</pre></div>

      <h5>实际应用场景:</h5>
      <ul>
        <li>🔒 <strong>私有变量和方法的实现</strong></li>
        <li>🏭 <strong>函数工厂模式</strong></li>
        <li>⏰ <strong>防抖和节流函数</strong></li>
        <li>🎣 <strong>柯里化函数</strong></li>
        <li>📦 <strong>模块化开发</strong></li>
      </ul>

      <h5>内存泄漏风险:</h5>
      <div class="code-block"><pre>function createLeak() {
  const data = new Array(1000000).fill('leak'); // 大对象
  return function() {
    console.log(data.length); // 闭包引用，造成内存泄漏
  };
}</pre></div>
    `
  },
  {
    id: 2,
    title: 'Q2: 解释一下原型和原型链',
    difficulty: 'medium',
    frequency: '★★★★★',
    company: '腾讯',
    tags: ['原型', '原型链', '继承'],
    content: `
      <h5>核心概念:</h5>
      <ul>
        <li><strong>原型:</strong>每个函数都有一个 prototype 属性，指向原型对象</li>
        <li><strong>原型链:</strong>当访问对象的属性时，如果对象本身没有，会沿着 __proto__ 向上查找</li>
        <li><strong>constructor:</strong>指向构造函数</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>原型链关系图:</h5>
      <div class="code-block"><pre>function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};

const person = new Person('张三');

// 原型链: person -> Person.prototype -> Object.prototype -> null
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null</pre></div>

      <h5>属性查找过程:</h5>
      <ol>
        <li>先在对象自身属性上查找</li>
        <li>如果没有，沿着__proto__向上查找</li>
        <li>直到找到或到达原型链顶端(null)</li>
      </ol>

      <h5>原型继承实现:</h5>
      <div class="code-block"><pre>// 方式1: 构造函数继承
function Child(name, age) {
  Person.call(this, name);
  this.age = age;
}

// 方式2: 原型链继承
Child.prototype = new Person();
Child.prototype.constructor = Child;</pre></div>
    `
  },
  {
    id: 3,
    title: 'Q3: 谈谈你对this的理解',
    difficulty: 'medium',
    frequency: '★★★★★',
    company: '阿里',
    tags: ['this', '作用域', '绑定'],
    content: `
      <h5>this指向规则:</h5>
      <ul>
        <li><strong>全局环境:</strong>指向window/global</li>
        <li><strong>函数调用:</strong>指向window/global</li>
        <li><strong>方法调用:</strong>指向调用该方法的对象</li>
        <li><strong>构造函数:</strong>指向新创建的实例对象</li>
        <li><strong>箭头函数:</strong>不绑定this，继承外层作用域的this</li>
        <li><strong>call/apply/bind:</strong>显式绑定this</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>经典面试题:</h5>
      <div class="code-block"><pre>const obj = {
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
console.log(obj.getNameArrow()); // undefined - 箭头函数继承外层作用域</pre></div>

      <h5>手写bind实现:</h5>
      <div class="code-block"><pre>Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// 使用示例
const boundFn = obj.getName.myBind(obj2);
console.log(boundFn()); // 'obj2'</pre></div>

      <h5>优先级顺序:</h5>
      <ol>
        <li>new绑定 > 显式绑定(call/apply/bind)</li>
        <li>显式绑定 > 隐式绑定(方法调用)</li>
        <li>隐式绑定 > 默认绑定</li>
        <li>箭头函数 > 以上所有规则</li>
      </ol>
    `
  },
  {
    id: 4,
    title: 'Q4: Promise的实现原理是什么？',
    difficulty: 'hard',
    frequency: '★★★★★',
    company: '字节跳动',
    tags: ['Promise', '异步', '状态机'],
    content: `
      <h5>Promise状态:</h5>
      <ul>
        <li><strong>pending:</strong>初始状态，可变为fulfilled或rejected</li>
        <li><strong>fulfilled:</strong>成功状态，不可逆</li>
        <li><strong>rejected:</strong>失败状态，不可逆</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>手写Promise:</h5>
      <div class="code-block"><pre>class MyPromise {
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
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }
}</pre></div>

      <h5>Promise方法:</h5>
      <ul>
        <li><strong>Promise.all:</strong>所有Promise成功才成功</li>
        <li><strong>Promise.race:</strong>最先完成的Promise决定结果</li>
        <li><strong>Promise.allSettled:</strong>等待所有Promise完成</li>
        <li><strong>Promise.any:</strong>最先成功的Promise决定结果</li>
      </ul>
    `
  },
  {
    id: 5,
    title: 'Q5: 谈谈事件循环(Event Loop)的机制',
    difficulty: 'hard',
    frequency: '★★★★☆',
    company: '美团',
    tags: ['Event Loop', '异步', '宏任务', '微任务'],
    content: `
      <h5>事件循环机制:</h5>
      <ul>
        <li><strong>调用栈:</strong>执行同步代码的地方</li>
        <li><strong>微任务队列:</strong>Promise.then、MutationObserver、process.nextTick</li>
        <li><strong>宏任务队列:</strong>setTimeout、setInterval、I/O操作、UI渲染</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>执行顺序:</h5>
      <div class="code-block"><pre>console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
});

Promise.resolve().then(() => {
  console.log('4');
});

console.log('5');

// 输出顺序: 1, 5, 4, 2, 3</pre></div>

      <h5>执行流程:</h5>
      <ol>
        <li>执行同步代码，调用栈清空</li>
        <li>执行所有微任务</li>
        <li>执行一个宏任务</li>
        <li>再次执行所有微任务</li>
        <li>重复步骤3-4</li>
      </ol>

      <h5>浏览器与Node.js的区别:</h5>
      <ul>
        <li><strong>浏览器:</strong>宏任务包括setTimeout、setInterval、requestAnimationFrame等</li>
        <li><strong>Node.js:</strong>宏任务包括setTimeout、setInterval、setImmediate等</li>
        <li><strong>Node.js额外:</strong>process.nextTick优先级高于Promise</li>
      </ul>
    `
  },
  {
    id: 6,
    title: 'Q6: 什么是防抖和节流？有什么区别？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '京东',
    tags: ['防抖', '节流', '性能优化'],
    content: `
      <h5>防抖(debounce):</h5>
      <p>在事件触发后，延迟一段时间再执行，如果在这段时间内再次触发，则重新计时。</p>

      <h5>节流(throttle):</h5>
      <p>在一段时间内，只能执行一次函数，如果在这段时间内再次触发，则忽略。</p>
    `,
    detailedAnswer: `
      <h5>防抖实现:</h5>
      <div class="code-block"><pre>function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用示例
const debouncedSearch = debounce(searchAPI, 300);
input.addEventListener('input', debouncedSearch);</pre></div>

      <h5>节流实现:</h5>
      <div class="code-block"><pre>// 时间戳版
function throttle(fn, delay) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 定时器版
function throttle(fn, delay) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}</pre></div>

      <h5>应用场景:</h5>
      <ul>
        <li><strong>防抖:</strong>搜索框输入、窗口resize、按钮点击</li>
        <li><strong>节流:</strong>滚动事件、鼠标移动、频繁点击</li>
      </ul>
    `
  },
  {
    id: 7,
    title: 'Q7: 谈谈深拷贝和浅拷贝的区别',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '小米',
    tags: ['深拷贝', '浅拷贝', '对象复制'],
    content: `
      <h5>浅拷贝:</h5>
      <p>只复制对象的第一层属性，对于嵌套对象，只是复制引用。</p>

      <h5>深拷贝:</h5>
      <p>完全复制整个对象，包括所有嵌套对象的属性。</p>
    `,
    detailedAnswer: `
      <h5>浅拷贝实现:</h5>
      <div class="code-block"><pre>// 方法1: Object.assign()
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, obj);

// 方法2: 扩展运算符
const shallowCopy2 = { ...obj };

// 方法3: Array.slice() (数组)
const arr = [1, [2, 3]];
const shallowArr = arr.slice();</pre></div>

      <h5>深拷贝实现:</h5>
      <div class="code-block"><pre>// 方法1: JSON序列化（无法处理函数、undefined等）
const deepCopy1 = JSON.parse(JSON.stringify(obj));

// 方法2: 递归实现
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }

  return clone;
}

// 方法3: 使用库
import _ from 'lodash';
const deepCopy3 = _.cloneDeep(obj);</pre></div>

      <h5>性能对比:</h5>
      <ul>
        <li><strong>浅拷贝:</strong>性能好，但可能导致意外修改</li>
        <li><strong>深拷贝:</strong>性能差，但保证数据独立性</li>
      </ul>
    `
  },
  {
    id: 8,
    title: 'Q8: async/await的实现原理',
    difficulty: 'hard',
    frequency: '★★★★☆',
    company: '字节跳动',
    tags: ['async', 'await', 'Generator'],
    content: `
      <h5>async/await是什么:</h5>
      <p>async函数是Generator函数的语法糖，await相当于yield。</p>
    `,
    detailedAnswer: `
      <h5>async函数特点:</h5>
      <ul>
        <li>自动返回Promise对象</li>
        <li>await只能在async函数中使用</li>
        <li>await会暂停函数执行，等待Promise解决</li>
        <li>错误处理使用try/catch</li>
      </ul>

      <h5>使用示例:</h5>
      <div class="code-block"><pre>async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

// 等价于Promise写法
function fetchDataPromise() {
  return fetch('/api/data')
    .then(response => response.json())
    .catch(error => console.error('获取数据失败:', error));
}</pre></div>

      <h5>Generator实现async/await:</h5>
      <div class="code-block"><pre>function asyncToGenerator(generatorFn) {
  return function() {
    const gen = generatorFn.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let info, value;
        try {
          info = gen[key](arg);
          value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(
            val => step('next', val),
            err => step('throw', err)
          );
        }
      }
      step('next');
    });
  };
}</pre></div>
    `
  },
  {
    id: 9,
    title: 'Q9: 谈谈你对模块化的理解',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '腾讯',
    tags: ['模块化', 'CommonJS', 'ES6 Modules'],
    content: `
      <h5>模块化发展历程:</h5>
      <ul>
        <li><strong>无模块化:</strong>全局变量污染，依赖关系混乱</li>
        <li><strong>IIFE:</strong>立即执行函数表达式</li>
        <li><strong>CommonJS:</strong>Node.js规范，同步加载</li>
        <li><strong>AMD:</strong>RequireJS，异步加载</li>
        <li><strong>CMD:</strong>SeaJS，按需加载</li>
        <li><strong>ES6 Modules:</strong>官方标准，静态分析</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>CommonJS vs ES6 Modules:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>CommonJS</th><th>ES6 Modules</th></tr>
        <tr><td>加载方式</td><td>运行时加载</td><td>编译时加载</td></tr>
        <tr><td>导入导出</td><td>module.exports/require</td><td>export/import</td></tr>
        <tr><td>执行时机</td><td>同步</td><td>异步</td></tr>
        <tr><td>Tree Shaking</td><td>不支持</td><td>支持</td></tr>
        <tr><td>循环依赖</td><td>支持但有风险</td><td>报错</td></tr>
      </table>

      <h5>ES6 Modules示例:</h5>
      <div class="code-block"><pre>// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { PI, add } from './math.js';
console.log(add(1, 2)); // 3
console.log(multiply(3, 4)); // 12</pre></div>

      <h5>Tree Shaking:</h5>
      <p>ES6 Modules的静态分析特性使得构建工具能够分析哪些代码被使用，自动移除未使用的代码。</p>
    `
  },
  {
    id: 10,
    title: 'Q10: 什么是设计模式？常用的设计模式有哪些？',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '华为',
    tags: ['设计模式', '面向对象', '架构'],
    content: `
      <h5>设计模式分类:</h5>
      <ul>
        <li><strong>创建型:</strong>对象实例化</li>
        <li><strong>结构型:</strong>类和对象组合</li>
        <li><strong>行为型:</strong>对象间通信</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>常用设计模式:</h5>
      <h6>创建型模式:</h6>
      <ul>
        <li><strong>单例模式:</strong>保证一个类只有一个实例</li>
        <li><strong>工厂模式:</strong>创建对象的接口</li>
        <li><strong>建造者模式:</strong>分离复杂对象的构建</li>
      </ul>

      <h6>结构型模式:</h6>
      <ul>
        <li><strong>装饰器模式:</strong>动态添加功能</li>
        <li><strong>适配器模式:</strong>接口转换</li>
        <li><strong>代理模式:</strong>控制访问</li>
      </ul>

      <h6>行为型模式:</h6>
      <ul>
        <li><strong>观察者模式:</strong>一对多依赖关系</li>
        <li><strong>策略模式:</strong>算法封装</li>
        <li><strong>状态模式:</strong>状态转换</li>
      </ul>

      <h5>单例模式实现:</h5>
      <div class="code-block"><pre>// 饿汉式
class Singleton {
  static instance = new Singleton();
  static getInstance() {
    return this.instance;
  }
}

// 懒汉式
class Singleton {
  static instance = null;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}</pre></div>

      <h5>观察者模式实现:</h5>
      <div class="code-block"><pre>class EventEmitter {
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
      this.events[event].forEach(callback => callback(...args));
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}</pre></div>
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