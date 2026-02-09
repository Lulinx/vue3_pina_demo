<template>
  <div class="questions-section">
    <h2>🎨 HTML/CSS 面试题</h2>
    <p class="section-desc">包含HTML5、CSS3、布局、响应式设计等前端基础面试题</p>

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
    title: 'Q1: HTML5有哪些新特性？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '腾讯',
    tags: ['HTML5', '语义化', '多媒体'],
    content: `
      <h5>HTML5新特性包括:</h5>
      <ul>
        <li><strong>语义化标签:</strong>header、nav、article、section、aside、footer</li>
        <li><strong>多媒体标签:</strong>audio、video、canvas、svg</li>
        <li><strong>表单增强:</strong>新的input类型、表单验证</li>
        <li><strong>API支持:</strong>Geolocation、Web Storage、Web Workers</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>语义化标签示例:</h5>
      <div class="code-block"><pre>&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;文章标题&lt;/h1&gt;
    &lt;p&gt;发布日期: &lt;time&gt;2024-01-01&lt;/time&gt;&lt;/p&gt;
  &lt;/header&gt;
  &lt;section&gt;
    &lt;p&gt;文章内容...&lt;/p&gt;
  &lt;/section&gt;
  &lt;footer&gt;
    &lt;p&gt;作者信息&lt;/p&gt;
  &lt;/footer&gt;
&lt;/article&gt;</pre></div>

      <h5>多媒体标签:</h5>
      <div class="code-block"><pre>&lt;!-- 音频 --&gt;
&lt;audio controls&gt;
  &lt;source src="audio.mp3" type="audio/mpeg"&gt;
  &lt;source src="audio.ogg" type="audio/ogg"&gt;
  您的浏览器不支持音频播放。
&lt;/audio&gt;

&lt;!-- 视频 --&gt;
&lt;video width="320" height="240" controls&gt;
  &lt;source src="movie.mp4" type="video/mp4"&gt;
  &lt;source src="movie.webm" type="video/webm"&gt;
  您的浏览器不支持视频播放。
&lt;/video&gt;</pre></div>

      <h5>新的表单控件:</h5>
      <ul>
        <li><code>email</code>: 邮箱输入</li>
        <li><code>url</code>: URL输入</li>
        <li><code>number</code>: 数字输入</li>
        <li><code>range</code>: 范围选择</li>
        <li><code>date</code>: 日期选择</li>
        <li><code>color</code>: 颜色选择</li>
      </ul>
    `
  },
  {
    id: 2,
    title: 'Q2: CSS盒模型(Box Model)是什么？',
    difficulty: 'medium',
    frequency: '★★★★★',
    company: '字节跳动',
    tags: ['盒模型', '布局', 'CSS基础'],
    content: `
      <h5>盒模型组成:</h5>
      <ul>
        <li><strong>content:</strong>内容区域</li>
        <li><strong>padding:</strong>内边距</li>
        <li><strong>border:</strong>边框</li>
        <li><strong>margin:</strong>外边距</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>标准盒模型 vs IE盒模型:</h5>
      <table class="comparison-table">
        <tr><th>盒模型</th><th>width/height计算</th><th>box-sizing</th></tr>
        <tr><td>标准盒模型</td><td>仅content</td><td>content-box</td></tr>
        <tr><td>IE盒模型</td><td>content+padding+border</td><td>border-box</td></tr>
      </table>

      <h5>盒模型计算示例:</h5>
      <div class="code-block"><pre>.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 10px solid #000;
  margin: 30px;
}

/* 标准盒模型总宽度: 200 + 40 + 20 = 260px */
/* IE盒模型总宽度: 200px (包含padding和border) */</pre></div>

      <h5>box-sizing使用:</h5>
      <div class="code-block"><pre>/* 推荐使用border-box，更容易控制元素尺寸 */
* {
  box-sizing: border-box;
}

.box {
  width: 200px; /* 无论padding/border如何变化，总宽度都是200px */
  padding: 20px;
  border: 2px solid #000;
}</pre></div>
    `
  },
  {
    id: 3,
    title: 'Q3: Flexbox布局是什么？如何使用？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '美团',
    tags: ['Flexbox', '布局', '响应式'],
    content: `
      <h5>Flexbox是什么:</h5>
      <p>Flexbox是CSS3的一种布局模式，用于在一维空间中排列和分布元素。</p>

      <h5>基本概念:</h5>
      <ul>
        <li><strong>主轴:</strong>flex-direction定义的方向</li>
        <li><strong>交叉轴:</strong>垂直于主轴的方向</li>
        <li><strong>flex容器:</strong>设置display: flex的元素</li>
        <li><strong>flex项目:</strong>容器的直接子元素</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>容器属性:</h5>
      <div class="code-block"><pre>.container {
  display: flex;
  flex-direction: row; /* 主轴方向: row | column */
  flex-wrap: nowrap; /* 换行: nowrap | wrap | wrap-reverse */
  justify-content: flex-start; /* 主轴对齐 */
  align-items: stretch; /* 交叉轴对齐 */
  align-content: stretch; /* 多行交叉轴对齐 */
}</pre></div>

      <h5>项目属性:</h5>
      <div class="code-block"><pre>.item {
  flex-grow: 0; /* 放大比例 */
  flex-shrink: 1; /* 缩小比例 */
  flex-basis: auto; /* 初始大小 */
  flex: 1; /* flex-grow flex-shrink flex-basis的简写 */
  align-self: auto; /* 单个项目对齐 */
  order: 0; /* 排列顺序 */
}</pre></div>

      <h5>经典布局示例:</h5>
      <h6>圣杯布局:</h6>
      <div class="code-block"><pre>&lt;!-- HTML --&gt;
&lt;div class="container"&gt;
  &lt;header&gt;Header&lt;/header&gt;
  &lt;div class="main"&gt;
    &lt;aside class="left"&gt;Left&lt;/aside&gt;
    &lt;article&gt;Content&lt;/article&gt;
    &lt;aside class="right"&gt;Right&lt;/aside&gt;
  &lt;/div&gt;
  &lt;footer&gt;Footer&lt;/footer&gt;
&lt;/div&gt;

&lt;!-- CSS --&gt;
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  display: flex;
  flex: 1;
}

article {
  flex: 1;
}</pre></div>
    `
  },
  {
    id: 4,
    title: 'Q4: CSS选择器的优先级是如何计算的？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '京东',
    tags: ['选择器', '优先级', 'CSS'],
    content: `
      <h5>CSS选择器优先级:</h5>
      <ul>
        <li><strong>!important:</strong>无限大</li>
        <li><strong>内联样式:</strong>1000</li>
        <li><strong>ID选择器:</strong>100</li>
        <li><strong>类/伪类/属性:</strong>10</li>
        <li><strong>标签/伪元素:</strong>1</li>
        <li><strong>通配符/继承:</strong>0</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>优先级计算规则:</h5>
      <ol>
        <li>从高到低计算选择器的权重</li>
        <li>相同权重时，后定义的样式生效</li>
        <li>!important优先级最高，但应谨慎使用</li>
      </ol>

      <h5>示例计算:</h5>
      <div class="code-block"><pre>/* 优先级计算 */
#nav .list li.active { /* 0,1,2,1 = 121 */
  color: red;
}

div p { /* 0,0,0,2 = 2 */
  color: blue;
}

p { /* 0,0,0,1 = 1 */
  color: green;
}

/* 最终显示红色 */</pre></div>

      <h5>特殊情况:</h5>
      <ul>
        <li><strong>继承样式:</strong>优先级为0，任何直接样式都能覆盖</li>
        <li><strong>通配符:</strong>优先级为0</li>
        <li><strong>:not():</strong>不影响优先级计算</li>
        <li><strong>:is():</strong>使用最高优先级的选择器</li>
      </ul>

      <h5>最佳实践:</h5>
      <ul>
        <li>避免过度使用!important</li>
        <li>保持选择器简洁</li>
        <li>使用类选择器而不是ID选择器</li>
        <li>遵循BEM命名规范</li>
      </ul>
    `
  },
  {
    id: 5,
    title: 'Q5: 什么是BFC？如何触发BFC？',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '字节跳动',
    tags: ['BFC', '布局', '浮动'],
    content: `
      <h5>BFC是什么:</h5>
      <p>Block Formatting Context，块级格式化上下文，是CSS布局的一个概念。</p>

      <h5>触发条件:</h5>
      <ul>
        <li>根元素(html)</li>
        <li>浮动元素(float)</li>
        <li>绝对定位元素(position: absolute/fixed)</li>
        <li>display: inline-block/table-cell等</li>
        <li>overflow: hidden/auto/scroll</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>BFC特性:</h5>
      <ul>
        <li><strong>内部元素不会影响外部:</strong>BFC内部的浮动不会影响外部布局</li>
        <li><strong>垂直margin合并:</strong>BFC内部相邻元素的margin会合并</li>
        <li><strong>包含浮动:</strong>BFC会包含其内部所有浮动元素</li>
      </ul>

      <h5>应用场景:</h5>
      <h6>1. 清除浮动:</h6>
      <div class="code-block"><pre>.container {
  overflow: hidden; /* 触发BFC，包含内部浮动 */
}

.float-left {
  float: left;
  width: 50%;
}</pre></div>

      <h6>2. 防止margin合并:</h6>
      <div class="code-block"><pre>.box1 {
  margin-bottom: 20px;
}

.box2 {
  margin-top: 30px;
  overflow: hidden; /* 触发BFC，防止margin合并 */
}</pre></div>

      <h6>3. 防止文字环绕:</h6>
      <div class="code-block"><pre>.float-img {
  float: left;
  margin-right: 10px;
}

.text {
  overflow: hidden; /* 触发BFC，防止文字环绕图片 */
}</pre></div>

      <h5>现代替代方案:</h5>
      <p>虽然BFC仍然重要，但现代布局更推荐使用Flexbox和Grid。</p>
    `
  },
  {
    id: 6,
    title: 'Q6: 响应式设计有哪些实现方式？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '小米',
    tags: ['响应式', '媒体查询', '移动端'],
    content: `
      <h5>响应式设计核心:</h5>
      <ul>
        <li><strong>流式布局:</strong>使用相对单位</li>
        <li><strong>媒体查询:</strong>根据屏幕尺寸调整样式</li>
        <li><strong>弹性图片:</strong>图片自适应容器</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>媒体查询:</h5>
      <div class="code-block"><pre>/* 移动优先 */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

/* 常用断点 */
.mobile { /* 手机 */ }
.tablet { /* 平板 */ }
.desktop { /* 桌面 */ }</pre></div>

      <h5>相对单位:</h5>
      <div class="code-block"><pre>/* 推荐使用rem/vw等相对单位 */
html {
  font-size: 16px;
}

.container {
  width: 50rem; /* 800px */
  padding: 1rem; /* 16px */
}

/* 移动端适配 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}</pre></div>

      <h5>Flexbox响应式:</h5>
      <div class="code-block"><pre>.grid {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 300px; /* 基础宽度300px，可伸缩 */
  margin: 10px;
}

/* 小屏幕单列 */
@media (max-width: 600px) {
  .item {
    flex: 1 1 100%;
  }
}</pre></div>

      <h5>CSS Grid响应式:</h5>
      <div class="code-block"><pre>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* 自动适应列数 */</pre></div>
    `
  },
  {
    id: 7,
    title: 'Q7: CSS3动画有哪些实现方式？',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '华为',
    tags: ['动画', 'CSS3', '性能'],
    content: `
      <h5>CSS3动画方式:</h5>
      <ul>
        <li><strong>transition:</strong>过渡动画</li>
        <li><strong>animation:</strong>关键帧动画</li>
        <li><strong>transform:</strong>变换</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Transition过渡:</h5>
      <div class="code-block"><pre>.box {
  width: 100px;
  height: 100px;
  background: red;
  transition: all 0.3s ease;
}

.box:hover {
  width: 200px;
  transform: rotate(45deg);
}

/* transition属性 */
transition: property duration timing-function delay;</pre></div>

      <h5>Animation关键帧:</h5>
      <div class="code-block"><pre>@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.box {
  animation: slideIn 1s ease-in-out;
}

/* animation属性 */
animation: name duration timing-function delay iteration-count direction;</pre></div>

      <h5>Transform变换:</h5>
      <div class="code-block"><pre>/* 2D变换 */
transform: translate(50px, 100px);
transform: rotate(45deg);
transform: scale(1.5);
transform: skew(10deg, 20deg);

/* 3D变换 */
transform: translate3d(50px, 100px, 20px);
transform: rotateX(45deg);
transform: perspective(1000px);</pre></div>

      <h5>性能优化:</h5>
      <ul>
        <li>使用transform和opacity进行动画</li>
        <li>避免改变布局属性的动画</li>
        <li>使用will-change属性提示浏览器</li>
        <li>合理使用GPU加速</li>
      </ul>

      <h5>will-change:</h5>
      <div class="code-block"><pre>.animated-element {
  will-change: transform, opacity;
}

/* 使用完毕后重置 */
.animated-element:not(:hover) {
  will-change: auto;
}</pre></div>
    `
  },
  {
    id: 8,
    title: 'Q8: 什么是CSS预处理器？常用的预处理器有哪些？',
    difficulty: 'easy',
    frequency: '★★★☆☆',
    company: '百度',
    tags: ['预处理器', 'Sass', 'Less'],
    content: `
      <h5>CSS预处理器:</h5>
      <p>允许使用编程语言的方式编写CSS，提供变量、嵌套、混合等功能。</p>

      <h5>常用预处理器:</h5>
      <ul>
        <li><strong>Sass/SCSS:</strong>功能强大，语法丰富</li>
        <li><strong>Less:</strong>简单易用，JavaScript环境</li>
        <li><strong>Stylus:</strong>语法灵活，支持多种写法</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Sass/SCSS特性:</h5>
      <div class="code-block"><pre>// 变量
$primary-color: #007bff;
$border-radius: 4px;

// 嵌套
.navbar {
  background: $primary-color;

  .nav-item {
    display: inline-block;

    &:hover {
      color: darken($primary-color, 10%);
    }
  }
}

// 混合器
@mixin button-variant($color) {
  background: $color;
  border: 1px solid darken($color, 10%);

  &:hover {
    background: darken($color, 10%);
  }
}

.btn-primary {
  @include button-variant(#007bff);
}

// 继承
.btn {
  padding: 10px 20px;
  border-radius: $border-radius;
}

.btn-primary {
  @extend .btn;
  background: $primary-color;
}</pre></div>

      <h5>Less特性:</h5>
      <div class="code-block"><pre>// 变量
@primary-color: #007bff;

// 嵌套
.navbar {
  background: @primary-color;

  .nav-item {
    &:hover {
      color: darken(@primary-color, 10%);
    }
  }
}

// 混合器
.button-variant(@color) {
  background: @color;
  border: 1px solid darken(@color, 10%);

  &:hover {
    background: darken(@color, 10%);
  }
}

.btn-primary {
  .button-variant(#007bff);
}</pre></div>

      <h5>选择预处理器:</h5>
      <ul>
        <li><strong>Sass:</strong>功能最全面，社区活跃</li>
        <li><strong>Less:</strong>Bootstrap使用，JavaScript环境友好</li>
        <li><strong>Stylus:</strong>语法灵活，学习成本较高</li>
      </ul>
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