<template>
  <div class="taro-guide">
    <div class="guide-header">
      <h1>📱 Taro 基础知识完整指南</h1>
      <p class="subtitle">跨平台小程序开发框架 - 一套代码，多端运行</p>
    </div>

    <div class="guide-content">
      <!-- 1. Taro 简介 -->
      <section class="guide-section">
        <h2>1️⃣ 什么是 Taro？</h2>
        <div class="content-box">
          <p><strong>Taro</strong> 是一个开放式跨端跨框架解决方案，支持用 React 的开发方式编写一次代码，生成能运行在 <strong>微信/京东/百度/支付宝/字节跳动/QQ 小程序/快应用/H5/React Native</strong> 等的应用。</p>
          <ul class="feature-list">
            <li>✅ 使用 React 语法，学习成本低</li>
            <li>✅ 一套代码，多端运行</li>
            <li>✅ 支持 TypeScript</li>
            <li>✅ 丰富的组件库和 API</li>
            <li>✅ 完善的开发工具链</li>
          </ul>
        </div>
      </section>

      <!-- 2. 项目结构 -->
      <section class="guide-section">
        <h2>2️⃣ 项目结构</h2>
        <div class="content-box">
          <pre class="code-block"><code>taro-project/
├── src/
│   ├── app.js          # 入口文件
│   ├── app.config.js   # 全局配置
│   ├── app.scss        # 全局样式
│   ├── pages/          # 页面目录
│   │   ├── index/
│   │   │   ├── index.js
│   │   │   ├── index.config.js
│   │   │   └── index.scss
│   ├── components/     # 组件目录
│   └── utils/          # 工具函数
├── config/             # 编译配置
│   ├── dev.js
│   ├── prod.js
│   └── index.js
└── package.json</code></pre>
        </div>
      </section>

      <!-- 3. 基础语法 -->
      <section class="guide-section">
        <h2>3️⃣ 基础语法（React 风格）</h2>
        <div class="content-box">
          <h3>3.1 组件定义</h3>
          <pre class="code-block"><code>import { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (
      &lt;View className='container'&gt;
        &lt;Text&gt;计数: {this.state.count}&lt;/Text&gt;
        &lt;Button onClick={this.handleClick}&gt;点击+1&lt;/Button&gt;
      &lt;/View&gt;
    )
  }
}</code></pre>

          <h3>3.2 Hooks 函数式组件（推荐）</h3>
          <pre class="code-block"><code>import { useState } from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default function Index() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    &lt;View className='container'&gt;
      &lt;Text&gt;计数: {count}&lt;/Text&gt;
      &lt;Button onClick={handleClick}&gt;点击+1&lt;/Button&gt;
    &lt;/View&gt;
  )
}</code></pre>
        </div>
      </section>

      <!-- 4. 核心组件 -->
      <section class="guide-section">
        <h2>4️⃣ 核心组件</h2>
        <div class="content-box">
          <div class="component-grid">
            <div class="component-item">
              <h4>View</h4>
              <p>视图容器，类似 div</p>
              <pre class="code-snippet"><code>&lt;View className='box'&gt;
  内容区域
&lt;/View&gt;</code></pre>
            </div>

            <div class="component-item">
              <h4>Text</h4>
              <p>文本组件，类似 span</p>
              <pre class="code-snippet"><code>&lt;Text selectable&gt;可选中文本&lt;/Text&gt;</code></pre>
            </div>

            <div class="component-item">
              <h4>Image</h4>
              <p>图片组件</p>
              <pre class="code-snippet"><code>&lt;Image 
  src='https://...'
  mode='aspectFit'
  lazyLoad
/&gt;</code></pre>
            </div>

            <div class="component-item">
              <h4>Button</h4>
              <p>按钮组件</p>
              <pre class="code-snippet"><code>&lt;Button 
  type='primary'
  size='normal'
  onClick={handleClick}
&gt;
  按钮
&lt;/Button&gt;</code></pre>
            </div>

            <div class="component-item">
              <h4>Input</h4>
              <p>输入框组件</p>
              <pre class="code-snippet"><code>&lt;Input 
  type='text'
  value={value}
  onInput={handleInput}
  placeholder='请输入'
/&gt;</code></pre>
            </div>

            <div class="component-item">
              <h4>ScrollView</h4>
              <p>可滚动视图</p>
              <pre class="code-snippet"><code>&lt;ScrollView 
  scrollY
  onScrollToLower={loadMore}
&gt;
  {list.map(item => ...)}
&lt;/ScrollView&gt;</code></pre>
            </div>

            <div class="component-item">
              <h4>Swiper</h4>
              <p>轮播图组件</p>
              <pre class="code-snippet"><code>&lt;Swiper 
  indicatorDots
  autoplay
  interval={3000}
&gt;
  {images.map(img => (
    &lt;SwiperItem key={img.id}&gt;
      &lt;Image src={img.url} /&gt;
    &lt;/SwiperItem&gt;
  ))}
&lt;/Swiper&gt;</code></pre>
            </div>

            <div class="component-item">
              <h4>Form</h4>
              <p>表单组件</p>
              <pre class="code-snippet"><code>&lt;Form onSubmit={handleSubmit}&gt;
  &lt;Input name='username' /&gt;
  &lt;Button formType='submit'&gt;提交&lt;/Button&gt;
&lt;/Form&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. 生命周期 -->
      <section class="guide-section">
        <h2>5️⃣ 生命周期</h2>
        <div class="content-box">
          <h3>类组件生命周期</h3>
          <pre class="code-block"><code>import { Component } from 'react'
import Taro from '@tarojs/taro'

export default class Index extends Component {
  // 组件挂载时
  componentDidMount() {
    console.log('页面加载完成')
    // 获取数据
    this.fetchData()
  }

  // 页面显示时
  componentDidShow() {
    console.log('页面显示')
  }

  // 页面隐藏时
  componentDidHide() {
    console.log('页面隐藏')
  }

  // 组件卸载时
  componentWillUnmount() {
    console.log('页面卸载')
  }

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    this.refreshData()
  }

  // 上拉加载
  onReachBottom() {
    console.log('上拉加载')
    this.loadMore()
  }

  render() {
    return &lt;View&gt;内容&lt;/View&gt;
  }
}</code></pre>

          <h3>Hooks 生命周期</h3>
          <pre class="code-block"><code>import { useEffect } from 'react'
import Taro from '@tarojs/taro'

export default function Index() {
  useEffect(() => {
    console.log('组件挂载')
    return () => {
      console.log('组件卸载')
    }
  }, [])

  // 使用 useDidShow, useDidHide 等 Hooks
  Taro.useDidShow(() => {
    console.log('页面显示')
  })

  Taro.useDidHide(() => {
    console.log('页面隐藏')
  })

  Taro.usePullDownRefresh(() => {
    console.log('下拉刷新')
  })

  Taro.useReachBottom(() => {
    console.log('上拉加载')
  })

  return &lt;View&gt;内容&lt;/View&gt;
}</code></pre>
        </div>
      </section>

      <!-- 6. 路由导航 -->
      <section class="guide-section">
        <h2>6️⃣ 路由导航</h2>
        <div class="content-box">
          <h3>6.1 页面跳转</h3>
          <pre class="code-block"><code>import Taro from '@tarojs/taro'

// 跳转到指定页面
Taro.navigateTo({
  url: '/pages/detail/index?id=123'
})

// 重定向（关闭当前页面）
Taro.redirectTo({
  url: '/pages/login/index'
})

// 返回上一页
Taro.navigateBack({
  delta: 1  // 返回的页面数
})

// 跳转到 TabBar 页面
Taro.switchTab({
  url: '/pages/index/index'
})

// 页面参数获取
const router = Taro.getCurrentInstance().router
const { id } = router.params  // 获取 url 参数</code></pre>

          <h3>6.2 路由传参</h3>
          <pre class="code-block"><code>// 跳转时传参
Taro.navigateTo({
  url: '/pages/detail/index?id=123&name=test'
})

// 接收参数（在目标页面）
const router = Taro.getCurrentInstance().router
const { id, name } = router.params

// 或者使用 useRouter Hook
import { useRouter } from '@tarojs/taro'
const router = useRouter()
const { id, name } = router.params</code></pre>
        </div>
      </section>

      <!-- 7. API 使用 -->
      <section class="guide-section">
        <h2>7️⃣ 常用 API</h2>
        <div class="content-box">
          <h3>7.1 网络请求</h3>
          <pre class="code-block"><code>import Taro from '@tarojs/taro'

// GET 请求
Taro.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  data: { id: 123 },
  header: {
    'Content-Type': 'application/json'
  },
  success: (res) => {
    console.log(res.data)
  },
  fail: (err) => {
    console.error(err)
  }
})

// 使用 async/await
const fetchData = async () => {
  try {
    const res = await Taro.request({
      url: 'https://api.example.com/data',
      method: 'GET'
    })
    console.log(res.data)
  } catch (error) {
    console.error(error)
  }
}</code></pre>

          <h3>7.2 本地存储</h3>
          <pre class="code-block"><code>// 同步存储
Taro.setStorageSync('key', 'value')
const value = Taro.getStorageSync('key')
Taro.removeStorageSync('key')
Taro.clearStorageSync()

// 异步存储
Taro.setStorage({
  key: 'userInfo',
  data: { name: '张三', age: 25 }
}).then(() => {
  console.log('存储成功')
})

Taro.getStorage({
  key: 'userInfo'
}).then(res => {
  console.log(res.data)
})</code></pre>

          <h3>7.3 界面交互</h3>
          <pre class="code-block"><code>// 显示提示
Taro.showToast({
  title: '操作成功',
  icon: 'success',
  duration: 2000
})

// 显示加载
Taro.showLoading({
  title: '加载中...'
})
Taro.hideLoading()

// 显示模态框
Taro.showModal({
  title: '提示',
  content: '确定要删除吗？',
  success: (res) => {
    if (res.confirm) {
      console.log('用户点击确定')
    }
  }
})

// 显示操作菜单
Taro.showActionSheet({
  itemList: ['拍照', '从相册选择'],
  success: (res) => {
    console.log('选择了第' + res.tapIndex + '个')
  }
})</code></pre>

          <h3>7.4 设备信息</h3>
          <pre class="code-block"><code>// 获取系统信息
const systemInfo = Taro.getSystemInfoSync()
console.log(systemInfo.windowWidth)  // 窗口宽度
console.log(systemInfo.windowHeight) // 窗口高度
console.log(systemInfo.platform)     // 平台信息

// 获取网络状态
Taro.getNetworkType({
  success: (res) => {
    console.log(res.networkType) // wifi/2g/3g/4g/unknown
  }
})</code></pre>

          <h3>7.5 媒体 API</h3>
          <pre class="code-block"><code>// 选择图片
Taro.chooseImage({
  count: 1,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success: (res) => {
    const tempFilePaths = res.tempFilePaths
    console.log(tempFilePaths)
  }
})

// 预览图片
Taro.previewImage({
  current: 'https://example.com/image.jpg',
  urls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
})

// 录音
const recorderManager = Taro.getRecorderManager()
recorderManager.start({
  duration: 60000,
  sampleRate: 44100
})
recorderManager.onStop((res) => {
  console.log(res.tempFilePath)
})</code></pre>
        </div>
      </section>

      <!-- 8. 样式处理 -->
      <section class="guide-section">
        <h2>8️⃣ 样式处理</h2>
        <div class="content-box">
          <h3>8.1 单位使用</h3>
          <pre class="code-block"><code>// Taro 使用 rpx 作为响应式单位
// 设计稿宽度 750px，1rpx = 屏幕宽度 / 750

&lt;View style='width: 750rpx; height: 200rpx;'&gt;
  {/* 全屏宽度，高度 200rpx */}
&lt;/View&gt;

// 也可以使用 px，但推荐使用 rpx
&lt;View style='width: 375px;'&gt;固定宽度&lt;/View&gt;</code></pre>

          <h3>8.2 样式文件</h3>
          <pre class="code-block"><code>// index.scss
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  
  .title {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
  }
  
  .content {
    margin-top: 20rpx;
    line-height: 1.6;
  }
}

// 在组件中使用
import './index.scss'
&lt;View className='container'&gt;
  &lt;Text className='title'&gt;标题&lt;/Text&gt;
  &lt;View className='content'&gt;内容&lt;/View&gt;
&lt;/View&gt;</code></pre>

          <h3>8.3 条件样式</h3>
          <pre class="code-block"><code>import classNames from 'classnames'

const [isActive, setIsActive] = useState(false)

&lt;View className={classNames('box', { active: isActive })}&gt;
  内容
&lt;/View&gt;

// 或者使用内联样式
&lt;View style={&#123;
  color: isActive ? 'red' : 'black',
  fontSize: '32rpx'
&#125;}&gt;
  内容
&lt;/View&gt;</code></pre>
        </div>
      </section>

      <!-- 9. 状态管理 -->
      <section class="guide-section">
        <h2>9️⃣ 状态管理</h2>
        <div class="content-box">
          <h3>9.1 本地状态（useState）</h3>
          <pre class="code-block"><code>import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    &lt;View&gt;
      &lt;Text&gt;计数: {count}&lt;/Text&gt;
      &lt;Button onClick={() => setCount(count + 1)}&gt;+1&lt;/Button&gt;
    &lt;/View&gt;
  )
}</code></pre>

          <h3>9.2 全局状态（Redux/MobX）</h3>
          <pre class="code-block"><code>// 使用 @tarojs/redux
import { Provider } from '@tarojs/redux'
import store from './store'

// app.js
class App extends Component {
  render() {
    return (
      &lt;Provider store={store}&gt;
        {this.props.children}
      &lt;/Provider&gt;
    )
  }
}

// 在组件中使用
import { connect } from '@tarojs/redux'
import { addCount } from './actions'

const mapStateToProps = (state) => ({
  count: state.counter.count
})

const mapDispatchToProps = (dispatch) => ({
  addCount: () => dispatch(addCount())
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)</code></pre>
        </div>
      </section>

      <!-- 10. 事件处理 -->
      <section class="guide-section">
        <h2>🔟 事件处理</h2>
        <div class="content-box">
          <pre class="code-block"><code>// 点击事件
&lt;Button onClick={handleClick}&gt;点击&lt;/Button&gt;

// 输入事件
&lt;Input onInput={(e) => {
  console.log(e.detail.value)
}} /&gt;

// 触摸事件
&lt;View 
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
&gt;
  可触摸区域
&lt;/View&gt;

// 长按事件
&lt;View onLongPress={handleLongPress}&gt;长按我&lt;/View&gt;

// 事件对象
const handleClick = (e) => {
  console.log(e.type)        // 事件类型
  console.log(e.target)      // 事件目标
  console.log(e.currentTarget) // 当前目标
  console.log(e.detail)      // 额外信息
}</code></pre>
        </div>
      </section>

      <!-- 11. 条件渲染和列表 -->
      <section class="guide-section">
        <h2>1️⃣1️⃣ 条件渲染和列表</h2>
        <div class="content-box">
          <h3>11.1 条件渲染</h3>
          <pre class="code-block"><code>// if 条件
{isShow && &lt;View&gt;显示内容&lt;/View&gt;}

// 三元运算符
{isLogin ? (
  &lt;View&gt;已登录&lt;/View&gt;
) : (
  &lt;View&gt;未登录&lt;/View&gt;
)}

// 复杂条件
{status === 'loading' && &lt;View&gt;加载中...&lt;/View&gt;}
{status === 'success' && &lt;View&gt;加载成功&lt;/View&gt;}
{status === 'error' && &lt;View&gt;加载失败&lt;/View&gt;}</code></pre>

          <h3>11.2 列表渲染</h3>
          <pre class="code-block"><code>const list = [
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橙子' }
]

// 渲染列表
&lt;View&gt;
  {list.map(item => (
    &lt;View key={item.id}&gt;
      {item.name}
    &lt;/View&gt;
  ))}
&lt;/View&gt;

// 带索引
{list.map((item, index) => (
  &lt;View key={item.id}&gt;
    {index + 1}. {item.name}
  &lt;/View&gt;
))}</code></pre>
        </div>
      </section>

      <!-- 12. 自定义组件 -->
      <section class="guide-section">
        <h2>1️⃣2️⃣ 自定义组件</h2>
        <div class="content-box">
          <h3>12.1 组件定义</h3>
          <pre class="code-block"><code>// components/Card/index.jsx
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Card({ title, content, onClick }) {
  return (
    &lt;View className='card' onClick={onClick}&gt;
      &lt;Text className='card-title'&gt;{title}&lt;/Text&gt;
      &lt;Text className='card-content'&gt;{content}&lt;/Text&gt;
    &lt;/View&gt;
  )
}

// 使用组件
import Card from '../../components/Card/index'

&lt;Card 
  title='标题'
  content='内容'
  onClick={handleClick}
/&gt;</code></pre>

          <h3>12.2 Props 和默认值</h3>
          <pre class="code-block"><code>import PropTypes from 'prop-types'

function Button({ text, type, onClick }) {
  return (
    &lt;View className={`btn btn-${type}`} onClick={onClick}&gt;
      {text}
    &lt;/View&gt;
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
  onClick: PropTypes.func
}

Button.defaultProps = {
  type: 'primary',
  onClick: () => {}
}</code></pre>
        </div>
      </section>

      <!-- 13. 配置文件 -->
      <section class="guide-section">
        <h2>1️⃣3️⃣ 配置文件</h2>
        <div class="content-box">
          <h3>13.1 app.config.js（全局配置）</h3>
          <pre class="code-block"><code>export default {
  pages: [
    'pages/index/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro Demo',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home-active.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/user.png',
        selectedIconPath: 'assets/user-active.png'
      }
    ]
  }
}</code></pre>

          <h3>13.2 页面配置（index.config.js）</h3>
          <pre class="code-block"><code>export default {
  navigationBarTitleText: '首页',
  enablePullDownRefresh: true,
  backgroundTextStyle: 'dark',
  onReachBottomDistance: 50
}</code></pre>
        </div>
      </section>

      <!-- 14. 最佳实践 -->
      <section class="guide-section">
        <h2>1️⃣4️⃣ 最佳实践</h2>
        <div class="content-box">
          <ul class="practice-list">
            <li>
              <strong>1. 使用 rpx 单位：</strong>确保在不同设备上显示一致
            </li>
            <li>
              <strong>2. 图片优化：</strong>使用合适的图片格式和尺寸，启用懒加载
            </li>
            <li>
              <strong>3. 代码分割：</strong>使用动态 import 减少包体积
            </li>
            <li>
              <strong>4. 错误处理：</strong>网络请求和异步操作都要有错误处理
            </li>
            <li>
              <strong>5. 性能优化：</strong>避免在 render 中创建新对象，使用 useMemo 和 useCallback
            </li>
            <li>
              <strong>6. 类型安全：</strong>使用 TypeScript 提高代码质量
            </li>
            <li>
              <strong>7. 组件复用：</strong>提取公共组件，减少代码重复
            </li>
            <li>
              <strong>8. 状态管理：</strong>合理使用本地状态和全局状态
            </li>
          </ul>
        </div>
      </section>

      <!-- 15. 常见问题 -->
      <section class="guide-section">
        <h2>1️⃣5️⃣ 常见问题</h2>
        <div class="content-box">
          <div class="qa-item">
            <h4>Q: 如何适配不同屏幕尺寸？</h4>
            <p>A: 使用 rpx 单位，Taro 会自动根据屏幕宽度进行换算。设计稿宽度为 750px，1rpx = 屏幕宽度 / 750。</p>
          </div>

          <div class="qa-item">
            <h4>Q: 如何实现下拉刷新？</h4>
            <p>A: 在页面配置中启用 enablePullDownRefresh，然后实现 onPullDownRefresh 方法。</p>
          </div>

          <div class="qa-item">
            <h4>Q: 如何跨端兼容？</h4>
            <p>A: 使用 Taro.getEnv() 判断环境，使用条件编译或平台特定代码。</p>
          </div>

          <div class="qa-item">
            <h4>Q: 如何处理异步操作？</h4>
            <p>A: 使用 async/await 或 Promise，配合 try-catch 进行错误处理。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Taro 基础知识讲解组件
</script>

<style scoped>
.taro-guide {
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

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.component-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.component-item h4 {
  color: #667eea;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.component-item p {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
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
  .taro-guide {
    padding: 15px;
  }

  .guide-header h1 {
    font-size: 1.5rem;
  }

  .guide-content {
    padding: 0;
  }

  .component-grid {
    grid-template-columns: 1fr;
  }

  .code-block {
    font-size: 12px;
    padding: 15px;
  }
}
</style>