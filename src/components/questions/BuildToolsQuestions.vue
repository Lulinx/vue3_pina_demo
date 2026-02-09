<template>
  <div class="questions-section">
    <h2>🔧 构建工具面试题</h2>
    <p class="section-desc">包含Webpack、Vite、Rollup等现代前端构建工具的原理和使用</p>

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
    title: 'Q1: Webpack的工作原理是什么？',
    difficulty: 'hard',
    frequency: '★★★★☆',
    company: '字节跳动',
    tags: ['Webpack', '构建工具', '模块化'],
    content: `
      <h5>Webpack的核心概念:</h5>
      <ul>
        <li><strong>Entry:</strong>入口文件</li>
        <li><strong>Output:</strong>输出配置</li>
        <li><strong>Loader:</strong>处理不同类型的文件</li>
        <li><strong>Plugin:</strong>扩展Webpack功能</li>
        <li><strong>Module:</strong>模块系统</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Webpack构建流程:</h5>
      <ol>
        <li><strong>初始化参数:</strong>从配置文件和Shell语句中读取与合并参数</li>
        <li><strong>开始编译:</strong>初始化Compiler对象，加载所有配置的插件</li>
        <li><strong>确定入口:</strong>根据配置中的entry找到所有的入口文件</li>
        <li><strong>编译模块:</strong>从入口文件出发，调用所有配置的Loader对模块进行翻译</li>
        <li><strong>完成模块编译:</strong>得到每个模块被翻译后的最终内容以及它们之间的依赖关系</li>
        <li><strong>输出资源:</strong>根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk</li>
        <li><strong>输出完成:</strong>根据配置确定输出的路径和文件名，将文件内容写入到文件系统</li>
      </ol>

      <h5>基本配置:</h5>
      <div class="code-block"><pre>const path = require('path');

module.exports = {
  // 入口
  entry: './src/index.js',

  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // 模块处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  // 开发服务器
  devServer: {
    contentBase: './dist',
    hot: true
  }
};</pre></div>

      <h5>Loader和Plugin的区别:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>Loader</th><th>Plugin</th></tr>
        <tr><td>作用</td><td>转换特定类型的文件</td><td>扩展Webpack功能</td></tr>
        <tr><td>执行时机</td><td>模块编译时</td><td>整个构建过程</td></tr>
        <tr><td>参数</td><td>单个文件内容</td><td>整个构建对象</td></tr>
        <tr><td>示例</td><td>babel-loader</td><td>HtmlWebpackPlugin</td></tr>
      </table>
    `
  },
  {
    id: 2,
    title: 'Q2: Vite为什么比Webpack快？',
    difficulty: 'medium',
    frequency: '★★★★☆',
    company: '腾讯',
    tags: ['Vite', 'ESM', 'HMR'],
    content: `
      <h5>Vite的优势:</h5>
      <ul>
        <li><strong>ESM:</strong>利用浏览器原生ES模块</li>
        <li><strong>按需编译:</strong>只编译当前使用的模块</li>
        <li><strong>快速HMR:</strong>基于ESM的热更新</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Vite vs Webpack对比:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>Webpack</th><th>Vite</th></tr>
        <tr><td>启动方式</td><td>全量打包</td><td>按需编译</td></tr>
        <tr><td>开发体验</td><td>打包后启动</td><td>秒级启动</td></tr>
        <tr><td>HMR</td><td>基于打包系统</td><td>原生ESM</td></tr>
        <tr><td>生产构建</td><td>Rollup</td><td>Rollup</td></tr>
        <tr><td>生态系统</td><td>成熟完善</td><td>快速发展中</td></tr>
      </table>

      <h5>Vite的工作原理:</h5>
      <ol>
        <li><strong>开发阶段:</strong>启动开发服务器，拦截模块请求</li>
        <li><strong>依赖预构建:</strong>将CommonJS/UMD转为ESM</li>
        <li><strong>按需转换:</strong>对源码进行TypeScript/JSX转换</li>
        <li><strong>模块服务:</strong>提供ESM模块给浏览器</li>
      </ol>

      <h5>Vite配置文件:</h5>
      <div class="code-block"><pre>import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})</pre></div>

      <h5>Vite的插件系统:</h5>
      <div class="code-block"><pre>// 自定义插件
function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      if (id.endsWith('.vue')) {
        // 转换Vue文件
        return transformedCode
      }
    }
  }
}

// 使用插件
export default defineConfig({
  plugins: [vue(), myPlugin()]
})</pre></div>
    `
  },
  {
    id: 3,
    title: 'Q3: Tree Shaking是什么？如何实现？',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '美团',
    tags: ['Tree Shaking', '打包优化', 'ES6 Modules'],
    content: `
      <h5>Tree Shaking定义:</h5>
      <p>移除JavaScript上下文中未引用的代码，通常在打包过程中进行。</p>

      <h5>实现条件:</h5>
      <ul>
        <li>使用ES6模块系统</li>
        <li>静态分析代码结构</li>
        <li>构建工具支持Tree Shaking</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>工作原理:</h5>
      <div class="code-block"><pre>// utils.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// main.js
import { add } from './utils.js';
// multiply函数未被使用，会被Tree Shaking移除

console.log(add(1, 2));</pre></div>

      <h5>Webpack Tree Shaking:</h5>
      <div class="code-block"><pre>// webpack.config.js
module.exports = {
  mode: 'production', // 生产模式自动开启
  optimization: {
    usedExports: true, // 标记未使用的导出
    minimize: true     // 压缩代码时移除未使用的代码
  }
};

// package.json
{
  "sideEffects": false, // 标记所有文件都没有副作用
  // 或者指定有副作用的文件
  "sideEffects": ["*.css", "./src/polyfill.js"]
}</pre></div>

      <h5>sideEffects详解:</h5>
      <div class="code-block"><pre>// 有副作用的文件
// styles.css - CSS文件通常有副作用
// polyfill.js - 全局修改window对象

// 无副作用的文件
// math.js - 纯函数库
export function add(a, b) { return a + b; }

// 条件导出
if (process.env.NODE_ENV === 'development') {
  // 这个导入在生产构建时会被移除
  require('./dev-tools.js');
}</pre></div>

      <h5>常见问题:</h5>
      <ul>
        <li><strong>动态导入:</strong><code>import('./module.js')</code>无法静态分析</li>
        <li><strong>CommonJS:</strong>不支持Tree Shaking</li>
        <li><strong>副作用:</strong>CSS导入、全局变量修改等</li>
      </ul>

      <h5>优化建议:</h5>
      <div class="code-block"><pre>// 推荐写法
import { specificFunction } from './utils';
// 不要这样写
import * as utils from './utils';

// 工具函数库
export { add, multiply } from './math.js';
// 不要重新导出所有
export * from './math.js';</pre></div>
    `
  },
  {
    id: 4,
    title: 'Q4: Webpack的代码分割策略有哪些？',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '京东',
    tags: ['代码分割', 'Webpack', '性能优化'],
    content: `
      <h5>代码分割的好处:</h5>
      <ul>
        <li>减少初始包体积</li>
        <li>提高加载性能</li>
        <li>更好的缓存策略</li>
        <li>按需加载资源</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>入口点分割:</h5>
      <div class="code-block"><pre>module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  },
  output: {
    filename: '[name].bundle.js'
  }
};</pre></div>

      <h5>动态导入:</h5>
      <div class="code-block"><pre>// 路由级别的代码分割
const Home = () => import('./Home.vue');
const About = () => import('./About.vue');

// 组件级别的代码分割
const ExpensiveComponent = () => import('./ExpensiveComponent.js');

// 使用
&lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
  &lt;Route path="/home" component={Home} &rcub;&rcub; /&gt;
&lt;/Suspense&gt;</pre></div>

      <h5>提取公共代码:</h5>
      <div class="code-block"><pre>module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 提取node_modules中的代码
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        // 提取公共模块
        common: {
          name: 'common',
          minChunks: 2, // 被至少2个chunk引用
          chunks: 'all'
        },
        // 提取CSS
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};</pre></div>

      <h5>运行时分割:</h5>
      <div class="code-block"><pre>// webpack配置
module.exports = {
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
};

// 手动分割运行时代码
optimization: {
  runtimeChunk: {
    name: entrypoint => "runtime-"&lcub;&lcub;entrypoint.name&rcub;&rcub;
  }
}</pre></div>

      <h5>按文件类型分割:</h5>
      <div class="code-block"><pre">output: {
  filename: 'js/[name].[contenthash].js',
  chunkFilename: 'js/[name].[contenthash].js'
},

optimization: {
  splitChunks: {
    cacheGroups: {
      // 第三方库
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        priority: 10
      },
      // React相关
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react',
        priority: 20
      }
    }
  }
}</pre></div>

      <h5>最佳实践:</h5>
      <ul>
        <li>将第三方库单独打包</li>
        <li>按路由分割页面代码</li>
        <li>提取公共业务代码</li>
        <li>使用动态导入实现懒加载</li>
        <li>合理设置chunk大小</li>
      </ul>
    `
  },
  {
    id: 5,
    title: 'Q5: Babel的工作原理是什么？',
    difficulty: 'medium',
    frequency: '★★★☆☆',
    company: '小米',
    tags: ['Babel', '转译', 'AST'],
    content: `
      <h5>Babel的核心功能:</h5>
      <ul>
        <li><strong>转译:</strong>将新版本JS转换为兼容性更好的版本</li>
        <li><strong>Polyfill:</strong>提供新API的兼容性实现</li>
        <li><strong>插件系统:</strong>可扩展的转换功能</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Babel工作流程:</h5>
      <ol>
        <li><strong>解析(Parse):</strong>将源码转换为AST</li>
        <li><strong>转换(Transform):</strong>通过插件修改AST</li>
        <li><strong>生成(Generate):</strong>将AST转换为代码</li>
      </ol>

      <h5>AST示例:</h5>
      <div class="code-block"><pre>// 源码
const sum = (a, b) => a + b;

// AST结构
{
  "type": "VariableDeclaration",
  "declarations": [
    {
      "type": "VariableDeclarator",
      "id": {
        "type": "Identifier",
        "name": "sum"
      },
      "init": {
        "type": "ArrowFunctionExpression",
        "params": [
          { "type": "Identifier", "name": "a" },
          { "type": "Identifier", "name": "b" }
        ],
        "body": {
          "type": "BinaryExpression",
          "left": { "type": "Identifier", "name": "a" },
          "operator": "+",
          "right": { "type": "Identifier", "name": "b" }
        }
      }
    }
  ]
}</pre></div>

      <h5>Babel配置:</h5>
      <div class="code-block"><pre>// .babelrc 或 babel.config.js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["last 2 versions", "> 1%"]
        },
        "useBuiltIns": "usage", // 按需引入polyfill
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}</pre></div>

      <h5>自定义插件:</h5>
      <div class="code-block"><pre>// 简单插件示例
module.exports = function({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        // 将所有console.log替换为logger.log
        if (path.node.name === 'console') {
          path.node.name = 'logger';
        }
      }
    }
  };
};</pre></div>

      <h5>Presets vs Plugins:</h5>
      <ul>
        <li><strong>Plugins:</strong>单个转换功能，如转换箭头函数</li>
        <li><strong>Presets:</strong>插件集合，如preset-env包含多个插件</li>
        <li><strong>执行顺序:</strong>Plugins在Presets之前执行</li>
      </ul>
    `
  },
  {
    id: 6,
    title: 'Q6: 如何优化Webpack的构建性能？',
    difficulty: 'hard',
    frequency: '★★★☆☆',
    company: '华为',
    tags: ['Webpack', '性能优化', '构建速度'],
    content: `
      <h5>构建性能优化策略:</h5>
      <ul>
        <li><strong>减少解析时间:</strong>优化Loader配置</li>
        <li><strong>减少打包体积:</strong>代码分割和压缩</li>
        <li><strong>缓存优化:</strong>利用缓存加速构建</li>
        <li><strong>多进程处理:</strong>并行处理任务</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>Loader优化:</h5>
      <div class="code-block"><pre">module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src'), // 只处理src目录
        exclude: /node_modules/ // 排除node_modules
      }
    ]
  }
};</pre></div>

      <h5>缓存优化:</h5>
      <div class="code-block"><pre">// 文件缓存
module.exports = {
  cache: {
    type: 'filesystem', // 文件系统缓存
    buildDependencies: {
      config: [__filename] // 当配置文件改变时重新构建
    }
  }
};

// babel缓存
{
  loader: 'babel-loader',
  options: {
    cacheDirectory: true // 启用babel缓存
  }
}</pre></div>

      <h5>多进程优化:</h5>
      <div class="code-block"><pre">const os = require('os');

module.exports = {
  // thread-loader 并行处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: os.cpus().length - 1, // CPU核心数-1
            }
          },
          'babel-loader'
        ]
      }
    ]
  },

  // parallel 插件
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(), // 作用域提升
  ]
};</pre></div>

      <h5>打包优化:</h5>
      <div class="code-block"><pre">module.exports = {
  optimization: {
    // Tree Shaking
    usedExports: true,

    // 代码分割
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

    // 压缩
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length - 1, // 多进程压缩
        terserOptions: {
          compress: {
            drop_console: true, // 移除console
            drop_debugger: true // 移除debugger
          }
        }
      })
    ]
  }
};</pre></div>

      <h5>开发优化:</h5>
      <div class="code-block"><pre">module.exports = {
  devServer: {
    hot: true, // 热更新
    compress: true, // 启用gzip压缩
    historyApiFallback: true, // SPA路由支持
    proxy: {
      '/api': 'http://localhost:3000' // API代理
    }
  },

  // 开发时禁用某些插件
  plugins: process.env.NODE_ENV === 'development'
    ? []
    : [new UglifyJsPlugin()]
};</pre></div>

      <h5>构建分析:</h5>
      <div class="code-block"><pre">// 使用webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 启动分析服务器
      openAnalyzer: true // 自动打开浏览器
    })
  ]
};</pre></div>
    `
  },
  {
    id: 7,
    title: 'Q7: Rollup和Webpack的区别是什么？',
    difficulty: 'medium',
    frequency: '★★☆☆☆',
    company: '百度',
    tags: ['Rollup', 'Webpack', '打包工具'],
    content: `
      <h5>Rollup的特点:</h5>
      <ul>
        <li>更适合库的打包</li>
        <li>Tree Shaking更彻底</li>
        <li>输出更简洁</li>
        <li>插件生态相对简单</li>
      </ul>

      <h5>Webpack的特点:</h5>
      <ul>
        <li>功能更强大</li>
        <li>适合应用开发</li>
        <li>插件生态丰富</li>
        <li>配置更复杂</li>
      </ul>
    `,
    detailedAnswer: `
      <h5>核心区别:</h5>
      <table class="comparison-table">
        <tr><th>特性</th><th>Rollup</th><th>Webpack</th></tr>
        <tr><td>设计目标</td><td>库打包</td><td>应用打包</td></tr>
        <tr><td>Tree Shaking</td><td>开箱即用</td><td>需要配置</td></tr>
        <tr><td>代码分割</td><td>不支持</td><td>原生支持</td></tr>
        <tr><td>HMR</td><td>不支持</td><td>支持</td></tr>
        <tr><td>学习成本</td><td>低</td><td>高</td></tr>
        <tr><td>适用场景</td><td>Vue、React库</td><td>完整应用</td></tr>
      </table>

      <h5>Rollup配置:</h5>
      <div class="code-block"><pre">// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs', // CommonJS
      sourcemap: true
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm', // ES模块
      sourcemap: true
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd', // UMD
      name: 'MyLibrary',
      sourcemap: true
    }
  ],
  plugins: [
    resolve(), // 解析node_modules
    commonjs(), // 转换CommonJS为ESM
    terser() // 压缩代码
  ],
  external: ['react', 'react-dom'] // 外部依赖
};</pre></div>

      <h5>输出格式对比:</h5>
      <ul>
        <li><strong>ESM:</strong>现代浏览器支持，Tree Shaking友好</li>
        <li><strong>CJS:</strong>Node.js环境，同步加载</li>
        <li><strong>UMD:</strong>兼容各种环境，全局变量</li>
        <li><strong>IIFE:</strong>立即执行函数，独立运行</li>
      </ul>

      <h5>选择建议:</h5>
      <ul>
        <li><strong>库开发:</strong>优先选择Rollup</li>
        <li><strong>应用开发:</strong>使用Webpack或Vite</li>
        <li><strong>简单项目:</strong>考虑Parcel或Vite</li>
        <li><strong>复杂应用:</strong>Webpack功能最全面</li>
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