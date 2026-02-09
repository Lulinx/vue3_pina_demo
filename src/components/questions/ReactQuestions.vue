<template>
  <div class="questions-section">
    <h2>⚛️ React 面试题</h2>
    <p class="section-desc">包含React基础、Hooks、生命周期、性能优化等React生态面试题</p>

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
    title: 'Q1: React的生命周期方法有哪些？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '腾讯',
    tags: ['生命周期', 'Class组件', 'React'],
    content: `
      <h5>React生命周期分为三个阶段:</h5>
      <ul>
        <li><strong>挂载阶段:</strong>componentDidMount</li>
        <li><strong>更新阶段:</strong>componentDidUpdate, shouldComponentUpdate</li>
        <li><strong>卸载阶段:</strong>componentWillUnmount</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>完整的生命周期:</h5>
      <div class="code-block"><pre>class MyComponent extends React.Component {
  // 挂载阶段
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  // 更新阶段
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
  }

  // 卸载阶段
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // 错误处理
  componentDidCatch(error, info) {
    console.log('componentDidCatch');
  }

  render() {
    return <div>Hello World</div>;
  }
}</pre></div>

      <h5>生命周期执行顺序:</h5>
      <div class="code-block"><pre>// 首次渲染
constructor → getDerivedStateFromProps → render → componentDidMount

// props/state更新
getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate

// 卸载
componentWillUnmount</pre></div>

      <h5>Hooks替代生命周期:</h5>
      <table class="comparison-table">
        <tr><th>Class生命周期</th><th>Hooks替代</th></tr>
        <tr><td>componentDidMount</td><td>useEffect(() => {}, [])</td></tr>
        <tr><td>componentDidUpdate</td><td>useEffect(() => {})</td></tr>
        <tr><td>componentWillUnmount</td><td>useEffect(() => { return () => {} }, [])</td></tr>
        <tr><td>shouldComponentUpdate</td><td>React.memo / useMemo</td></tr>
        <tr><td>getDerivedStateFromProps</td><td>useEffect</td></tr>
      </table>
    `
  },
  {
    id: 2,
    title: 'Q2: useState的原理是什么？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '字节跳动',
    tags: ['Hooks', 'useState', '状态管理'],
    content: `
      <h5>useState的基本用法:</h5>
      <div class="code-block"><pre>const [count, setCount] = useState(0);

setCount(count + 1); // 同步更新
setCount(prevCount => prevCount + 1); // 函数式更新</pre></div>

      <h5>useState的原理:</h5>
      <p>通过闭包保存状态，通过队列管理多次更新。</p>
    `,
    detailedAnswer: `
      <h5>简化实现:</h5>
      <div class="code-block"><pre>let stateIndex = 0;
const states = [];

function useState(initialValue) {
  const currentIndex = stateIndex++;

  if (states[currentIndex] === undefined) {
    states[currentIndex] = initialValue;
  }

  const setState = (newValue) => {
    const value = typeof newValue === 'function'
      ? newValue(states[currentIndex])
      : newValue;

    states[currentIndex] = value;
    // 触发重新渲染
    render();
  };

  return [states[currentIndex], setState];
}</pre></div>

      <h5>批量更新机制:</h5>
      <div class="code-block"><pre>// React 18之前
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// 只触发一次更新，最终count = 1

// React 18的自动批量更新
function handleClick() {
  setCount(count + 1); // 批量更新队列
  setCount(count + 1); // 批量更新队列
  setCount(count + 1); // 批量更新队列
  // 合并为一次更新，最终count = 3
}

// 跳出批量更新的方法
setTimeout(() => {
  setCount(count + 1); // 同步更新
}, 0);</pre></div>

      <h5>函数式更新:</h5>
      <div class="code-block"><pre>const [count, setCount] = useState(0);

// 推荐使用函数式更新
setCount(prevCount => prevCount + 1);

// 闭包陷阱示例
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // 这里形成了闭包，count始终是0
    setTimeout(() => {
      setCount(count + 1); // 错误
    }, 1000);
  };

  const incrementCorrect = () => {
    setTimeout(() => {
      setCount(prevCount => prevCount + 1); // 正确
    }, 1000);
  };

  return (
    <div>
      <p>Count: &lcub;count&rcub;</p>
      <button onClick={increment}>Increment (错误)</button>
      <button onClick={incrementCorrect}>Increment (正确)</button>
    </div>
  );
}</pre></div>
    `
  },
  {
    id: 3,
    title: 'Q3: useEffect的依赖数组有什么作用？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '美团',
    tags: ['Hooks', 'useEffect', '依赖数组'],
    content: `
      <h5>useEffect依赖数组的作用:</h5>
      <ul>
        <li><strong>[]:</strong>只在组件挂载时执行</li>
        <li><strong>[dep1, dep2]:</strong>依赖改变时执行</li>
        <li><strong>不传:</strong>每次渲染都执行</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>依赖数组详解:</h5>
      <div class="code-block"><pre>useEffect(() => {
  console.log('执行副作用');
  return () => {
    console.log('清理副作用');
  };
}, [count]); // 依赖count的变化

// 1. 空依赖数组 - 只执行一次
useEffect(() => {
  console.log('组件挂载');
  return () => console.log('组件卸载');
}, []);

// 2. 有依赖 - 依赖变化时执行
useEffect(() => {
  document.title = Count: /$/{count};
}, [count]); // count改变时更新标题

// 3. 无依赖 - 每次渲染都执行
useEffect(() => {
  console.log('每次渲染都执行');
}); // 不推荐，慎用

// 4. 多个依赖
useEffect(() => {
  fetchData(userId, page);
}, [userId, page]);</pre></div>

      <h5>常见错误:</h5>
      <div class="code-block"><pre>// 错误: 依赖不完整
const [count, setCount] = useState(0);
const [step, setStep] = useState(1);

useEffect(() => {
  setCount(count + step);
}, [count]); // 遗漏了step依赖

// 正确: 包含所有依赖
useEffect(() => {
  setCount(prevCount => prevCount + step);
}, [step]); // 或者使用函数式更新避免count依赖</pre></div>

      <h5>ESLint规则:</h5>
      <p>使用eslint-plugin-react-hooks插件来检查依赖数组的正确性。</p>

      <h5>useEffect vs useLayoutEffect:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>useEffect</th><th>useLayoutEffect</th></tr>
        <tr><td>执行时机</td><td>浏览器绘制后</td><td>DOM更新后，浏览器绘制前</td></tr>
        <tr><td>阻塞渲染</td><td>不阻塞</td><td>阻塞</td></tr>
        <tr><td>适用场景</td><td>大多数情况</td><td>需要同步操作DOM</td></tr>
      </table>
    `
  },
  {
    id: 4,
    title: 'Q4: React的性能优化方法有哪些？',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '京东',
    tags: ['性能优化', 'React', 'memo'],
    content: `
      <h5>组件优化:</h5>
      <ul>
        <li><strong>React.memo:</strong>防止不必要的重新渲染</li>
        <li><strong>useMemo:</strong>缓存计算结果</li>
        <li><strong>useCallback:</strong>缓存函数引用</li>
      </ul>

      <h5>渲染优化:</h5>
      <ul>
        <li><strong>列表key:</strong>使用稳定且唯一的key</li>
        <li><strong>代码分割:</strong>动态import</li>
        <li><strong>懒加载:</strong>React.lazy</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>React.memo使用:</h5>
      <div class="code-block"><pre>// 基本使用
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});

// 自定义比较函数
const MyComponent = React.memo(
  function MyComponent(props) {
    return <div>{props.value}</div>;
  },
  (prevProps, nextProps) => {
    // 返回true表示不重新渲染
    return prevProps.value === nextProps.value;
  }
);</pre></div>

      <h5>useMemo和useCallback:</h5>
      <div class="code-block"><pre>const ExpensiveComponent = ({ data, onClick }) => {
  // 缓存计算结果
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item));
  }, [data]);

  // 缓存函数引用
  const handleClick = useCallback(() => {
    onClick(processedData);
  }, [onClick, processedData]);

  return (
    <div>
      <p>Processed: {processedData.length} items</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};</pre></div>

      <h5>列表渲染优化:</h5>
      <div class="code-block"><pre>// 错误: 使用索引作为key
{todos.map((todo, index) => (
  &lt;TodoItem key={index} todo={todo} /&gt;
))}

// 正确: 使用唯一标识
{todos.map(todo => (
  &lt;TodoItem key={todo.id} todo={todo} /&gt;
))}

// 虚拟滚动 (react-window)
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  &lt;div style={style}&gt;Row {index}&lt;/div&gt;
);

&lt;List
  height={150}
  itemCount={1000}
  itemSize={35}
  width={300}
&gt;
  {Row}
&lt;/List&gt;</pre></div>

      <h5>代码分割:</h5>
      <div class="code-block"><pre>// 路由级别的代码分割
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

// 组件级别的代码分割
const ExpensiveComponent = lazy(() =>
  import('./ExpensiveComponent')
);

// 使用Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</Suspense></pre></div>

      <h5>Profiling工具:</h5>
      <div class="code-block"><pre>// React DevTools Profiler
import { Profiler } from 'react';

&lt;Profiler id="MyComponent" onRender={callback}&gt;
  &lt;MyComponent /&gt;
&lt;/Profiler&gt;

// callback函数接收性能数据
function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log({ id, phase, actualDuration, baseDuration });
}</pre></div>
    `
  },
  {
    id: 5,
    title: 'Q5: Redux和Context API的区别？',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '小米',
    tags: ['Redux', 'Context API', '状态管理'],
    content: `
      <h5>Redux特点:</h5>
      <ul>
        <li>可预测的状态管理</li>
        <li>中间件支持</li>
        <li>强大的开发者工具</li>
        <li>学习成本较高</li>
      </ul>

      <h5>Context API特点:</h5>
      <ul>
        <li>React内置解决方案</li>
        <li>轻量级，易于使用</li>
        <li>不适合复杂状态管理</li>
        <li>可能导致不必要的重新渲染</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Redux基本结构:</h5>
      <div class="code-block"><pre>// Action
const increment = () => ({
  type: 'INCREMENT'
});

// Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};

// Store
import { createStore } from 'redux';
const store = createStore(counterReducer);

// 使用
store.dispatch(increment());
store.getState(); // 1</pre></div>

      <h5>Context API使用:</h5>
      <div class="code-block"><pre>// 创建Context
const ThemeContext = React.createContext('light');

// Provider
function App() {
  return (
    &lt;ThemeContext.Provider value="dark"&gt;
      &lt;Toolbar /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}

// Consumer
function Toolbar() {
  return (
    <ThemeContext.Consumer>
      {theme => <div>Theme: {theme}</div>}
    </ThemeContext.Consumer>
  );
}

// Hook方式 (推荐)
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
}</pre></div>

      <h5>对比分析:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>Redux</th><th>Context API</th></tr>
        <tr><td>复杂度</td><td>高</td><td>低</td></tr>
        <tr><td>学习成本</td><td>高</td><td>低</td></tr>
        <tr><td>可预测性</td><td>强</td><td>弱</td></tr>
        <tr><td>调试工具</td><td>优秀</td><td>一般</td></tr>
        <tr><td>性能</td><td>可优化</td><td>可能有问题</td></tr>
        <tr><td>适用场景</td><td>复杂应用</td><td>简单状态共享</td></tr>
      </table>

      <h5>Redux Toolkit:</h5>
      <div class="code-block"><pre>import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
});

const store = configureStore({
  reducer: counterSlice.reducer
});

// 使用
store.dispatch(counterSlice.actions.increment());</pre></div>
    `
  },
  {
    id: 6,
    title: 'Q6: React Router的工作原理是什么？',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '华为',
    tags: ['React Router', '路由', 'SPA'],
    content: `
      <h5>React Router的核心概念:</h5>
      <ul>
        <li><strong>BrowserRouter:</strong>使用HTML5 history API</li>
        <li><strong>HashRouter:</strong>使用URL hash</li>
        <li><strong>Route:</strong>定义路由规则</li>
        <li><strong>Link/NavLink:</strong>导航组件</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>基本使用:</h5>
      <div class="code-block"><pre>import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';

function App() {
  return (
    &lt;Router&gt;
      &lt;nav&gt;
        &lt;Link to="/"&gt;Home&lt;/Link&gt;
        &lt;Link to="/about"&gt;About&lt;/Link&gt;
        &lt;Link to="/users/123"&gt;User 123&lt;/Link&gt;
      &lt;/nav&gt;

      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/about" element={&lt;About /&gt;} /&gt;
        &lt;Route path="/users/:id" element={&lt;User /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Router&gt;
  );
}

function User() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <p>User ID: {id}</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}</pre></div>

      <h5>路由守卫:</h5>
      <div class="code-block"><pre>// 路由守卫组件
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const isAuthenticated = checkAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 重定向到登录页，保存当前路径
    return &lt;Navigate to="/login" state=&lcub;&lcub; from: location &rcub;&rcub; /&gt;;
  }

  return children;
}

// 使用
&lt;Route
  path="/protected"
  element={
    &lt;RequireAuth&gt;
      &lt;ProtectedPage /&gt;
    &lt;/RequireAuth&gt;
  }
/&gt;</pre></div>

      <h5>动态路由:</h5>
      <div class="code-block"><pre>// 嵌套路由
function App() {
  return (
    &lt;Routes&gt;
      &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;}&gt;
        &lt;Route path="profile" element={&lt;Profile /&gt;} /&gt;
        &lt;Route path="settings" element={&lt;Settings /&gt;} /&gt;
      &lt;/Route&gt;
    &lt;/Routes&gt;
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* 子路由渲染位置 */}
    </div>
  );
}</pre></div>

      <h5>路由懒加载:</h5>
      <div class="code-block"><pre>import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}</pre></div>
    `
  },
  {
    id: 7,
    title: 'Q7: 受控组件和非受控组件的区别？',
    difficulty: 'easy',
    frequency: '★★★☆☆',
    company: '百度',
    tags: ['受控组件', '非受控组件', '表单'],
    content: `
      <h5>受控组件:</h5>
      <p>组件的状态由React控制，表单元素的值来自组件的state。</p>

      <h5>非受控组件:</h5>
      <p>组件的状态不由React控制，直接操作DOM元素。</p>
    `,
    detailedAnswer: `
      <h5>受控组件示例:</h5>
      <div class="code-block"><pre>class ControlledForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', this.state.value);
  }

  render() {
    return (
      &lt;form onSubmit={this.handleSubmit}&gt;
        &lt;input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        /&gt;
        &lt;button type="submit"&gt;Submit&lt;/button&gt;
      &lt;/form&gt;
    );
  }
}

// Hook版本
function ControlledForm() {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', value);
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}</pre></div>

      <h5>非受控组件示例:</h5>
      <div class="code-block"><pre>class UncontrolledForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', this.inputRef.current.value);
  }

  render() {
    return (
      &lt;form onSubmit={this.handleSubmit}&gt;
        &lt;input
          type="text"
          ref={this.inputRef}
          defaultValue="默认值"
        /&gt;
        &lt;button type="submit"&gt;Submit&lt;/button&gt;
      &lt;/form&gt;
    );
  }
}

// Hook版本
function UncontrolledForm() {
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted value:', inputRef.current.value);
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input
        type="text"
        ref={inputRef}
        defaultValue="默认值"
      /&gt;
      &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  );
}</pre></div>

      <h5>对比分析:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>受控组件</th><th>非受控组件</th></tr>
        <tr><td>数据流</td><td>单向数据流</td><td>直接操作DOM</td></tr>
        <tr><td>表单验证</td><td>容易实现</td><td>较难实现</td></tr>
        <tr><td>性能</td><td>可能有性能问题</td><td>性能更好</td></tr>
        <tr><td>适用场景</td><td>需要实时验证</td><td>简单表单</td></tr>
        <tr><td>默认值</td><td>defaultValue</td><td>defaultValue</td></tr>
      </table>

      <h5>混合使用:</h5>
      <div class="code-block"><pre>// 文件上传通常使用非受控组件
function FileUpload() {
  const fileRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = fileRef.current.files[0];
    // 处理文件上传
  };

  return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input type="file" ref={fileRef} /&gt;
      &lt;button type="submit"&gt;Upload&lt;/button&gt;
    &lt;/form&gt;
  );
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