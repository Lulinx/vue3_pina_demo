<template>
  <div class="flutter-guide">
    <div class="guide-header">
      <h1>🦋 Flutter 基础知识完整指南</h1>
      <p class="subtitle">用一套 Dart 代码开发 iOS / Android / Web / Desktop 应用</p>
    </div>

    <div class="guide-content">
      <section class="guide-section">
        <h2>1️⃣ Flutter 是什么？适合做什么？</h2>
        <div class="content-box">
          <p>
            <strong>Flutter</strong> 是 Google 推出的跨平台 UI 框架，使用 <strong>Dart</strong> 语言，采用自绘引擎（Skia/Impeller），
            可以用一套代码构建多端应用，并且拥有非常好的渲染一致性与开发体验。
          </p>
          <ul class="feature-list">
            <li>✅ 一套代码多端运行（iOS / Android / Web / Windows / macOS / Linux）</li>
            <li>✅ 性能好：靠近原生、动画顺滑</li>
            <li>✅ UI 一致性强：自带 Material / Cupertino 组件体系</li>
            <li>✅ 热重载（Hot Reload）：开发调试效率高</li>
            <li>✅ 生态成熟：路由、状态管理、网络、存储、CI/CD 方案丰富</li>
          </ul>

          <p><strong>常见适用场景：</strong>工具类 App、内容展示型 App、业务中台、跨端 MVP、需要高一致性 UI 的产品。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>2️⃣ 开发环境安装（最通俗版本）</h2>
        <div class="content-box">
          <h3>2.1 你需要的东西</h3>
          <ul class="feature-list">
            <li>Flutter SDK（包含 Dart）</li>
            <li>Android Studio（Android SDK）或 Xcode（macOS 上 iOS 必备）</li>
            <li>IDE：VS Code / Android Studio（安装 Flutter + Dart 插件）</li>
          </ul>

          <h3>2.2 常用命令</h3>
          <pre class="code-block"><code># 检查环境是否OK
flutter doctor

# 查看可用设备（模拟器/真机）
flutter devices

# 创建项目
flutter create my_app

# 运行（默认 Debug）
flutter run

# 拉取依赖（等同 pub get）
flutter pub get</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>3️⃣ 项目结构（先认识这些就够用）</h2>
        <div class="content-box">
          <pre class="code-block"><code>my_app/
├── lib/                 # 绝大多数业务代码都在这里
│   └── main.dart        # 入口
├── pubspec.yaml         # 依赖与资源配置（非常重要）
├── android/             # Android 原生工程
├── ios/                 # iOS 原生工程（macOS 上）
├── test/                # 单测
└── build/               # 构建产物（自动生成）</code></pre>

          <p><strong>最重要的文件：</strong></p>
          <ul class="feature-list">
            <li><strong>lib/main.dart</strong>：应用入口、根 Widget</li>
            <li><strong>pubspec.yaml</strong>：依赖、assets、fonts 配置</li>
          </ul>
        </div>
      </section>

      <section class="guide-section">
        <h2>4️⃣ Dart 语法速通（够你写 Flutter）</h2>
        <div class="content-box">
          <h3>4.1 变量与类型</h3>
          <pre class="code-block"><code>var name = 'Tom';        // 类型推断
String title = 'Hello';  // 显式类型
final now = DateTime.now(); // 运行时常量（常用）
const pi = 3.14159;      // 编译期常量</code></pre>

          <h3>4.2 函数、可选参数、命名参数</h3>
          <pre class="code-block"><code>int add(int a, int b) => a + b;

// 可选位置参数
String greet(String name, [String? prefix]) {
  return '${prefix ?? 'Hi'} $name';
}

// 命名参数（Flutter 最常见）
void logMsg({required String msg, int level = 1}) {
  print('[$level] $msg');
}</code></pre>

          <h3>4.3 class、构造函数、空安全</h3>
          <pre class="code-block"><code>class User {
  final int id;
  final String name;
  final String? avatar; // 可空

  User({required this.id, required this.name, this.avatar});
}</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>5️⃣ Flutter 核心理念：一切皆 Widget</h2>
        <div class="content-box">
          <p>
            Flutter UI 是一棵 Widget Tree。你通过组合 Widget（像搭积木）构建界面。
            Widget 分两类：<strong>StatelessWidget</strong>（无内部状态）与 <strong>StatefulWidget</strong>（有状态）。
          </p>

          <h3>5.1 最小可运行示例</h3>
          <pre class="code-block"><code>import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        appBar: AppBar(title: const Text('Hello Flutter')),
        body: const Center(child: Text('Welcome!')),
      ),
    );
  }
}</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>6️⃣ 常用基础组件（最常见的 20%）</h2>
        <div class="content-box">
          <div class="component-grid">
            <div class="component-item">
              <h4>Text</h4>
              <p>文本</p>
              <pre class="code-snippet"><code>Text('hello', style: TextStyle(fontSize: 18))</code></pre>
            </div>
            <div class="component-item">
              <h4>Container</h4>
              <p>容器（padding/margin/背景/圆角）</p>
              <pre class="code-snippet"><code>Container(
  padding: EdgeInsets.all(12),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
  ),
)</code></pre>
            </div>
            <div class="component-item">
              <h4>Row / Column</h4>
              <p>水平/垂直布局</p>
              <pre class="code-snippet"><code>Row(
  children: [Icon(Icons.star), Text('Like')],
)</code></pre>
            </div>
            <div class="component-item">
              <h4>ListView</h4>
              <p>列表</p>
              <pre class="code-snippet"><code>ListView.builder(
  itemCount: items.length,
  itemBuilder: (_, i) => Text(items[i]),
)</code></pre>
            </div>
            <div class="component-item">
              <h4>Image</h4>
              <p>图片</p>
              <pre class="code-snippet"><code>Image.network('https://...')</code></pre>
            </div>
            <div class="component-item">
              <h4>Button</h4>
              <p>按钮</p>
              <pre class="code-snippet"><code>ElevatedButton(
  onPressed: () {},
  child: Text('提交'),
)</code></pre>
            </div>
          </div>
        </div>
      </section>

      <section class="guide-section">
        <h2>7️⃣ 布局系统：约束（Constraints）决定一切</h2>
        <div class="content-box">
          <p>
            Flutter 布局规则可以用一句话记住：<strong>父给子约束，子给父大小，父决定位置。</strong>
            常见“布局不生效/溢出”问题基本都能用这个思路定位。
          </p>
          <h3>7.1 Expanded / Flexible</h3>
          <pre class="code-block"><code>Row(
  children: [
    Expanded(child: Container(color: Colors.red)),
    Expanded(child: Container(color: Colors.blue)),
  ],
)</code></pre>

          <h3>7.2 Padding / Align / Center</h3>
          <pre class="code-block"><code>Padding(
  padding: const EdgeInsets.all(16),
  child: Align(
    alignment: Alignment.centerRight,
    child: Text('右对齐'),
  ),
)</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>8️⃣ 状态管理：从 setState 到工程化</h2>
        <div class="content-box">
          <h3>8.1 setState（入门必会）</h3>
          <pre class="code-block"><code>class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State&lt;CounterPage&gt; createState() =&gt; _CounterPageState();
}

class _CounterPageState extends State&lt;CounterPage&gt; {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text('count: $count')),
      floatingActionButton: FloatingActionButton(
        onPressed: () =&gt; setState(() =&gt; count++),
        child: const Icon(Icons.add),
      ),
    );
  }
}</code></pre>

          <h3>8.2 Provider / Riverpod / BLoC（常见选择）</h3>
          <ul class="feature-list">
            <li><strong>Provider</strong>：入门简单、生态广</li>
            <li><strong>Riverpod</strong>：更现代、更可测试，社区很火</li>
            <li><strong>BLoC</strong>：偏架构化，适合大型复杂项目</li>
          </ul>
          <p>建议：小项目用 setState/Provider，大项目优先考虑 Riverpod。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>9️⃣ 路由与页面跳转（Navigator）</h2>
        <div class="content-box">
          <h3>9.1 基础跳转</h3>
          <pre class="code-block"><code>// push 新页面
Navigator.of(context).push(
  MaterialPageRoute(builder: (_) =&gt; const DetailPage()),
);

// pop 返回
Navigator.of(context).pop();</code></pre>

          <h3>9.2 命名路由（中型项目常用）</h3>
          <pre class="code-block"><code>MaterialApp(
  routes: {
    '/': (_) =&gt; const HomePage(),
    '/detail': (_) =&gt; const DetailPage(),
  },
);

Navigator.pushNamed(context, '/detail');</code></pre>

          <p>更工程化的路由：<strong>go_router</strong>（推荐）或 auto_route。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>🔟 异步：Future / async-await / Stream</h2>
        <div class="content-box">
          <h3>10.1 Future + async/await</h3>
          <pre class="code-block"><code>Future&lt;String&gt; fetchName() async {
  await Future.delayed(const Duration(seconds: 1));
  return 'Tom';
}</code></pre>

          <h3>10.2 FutureBuilder（渲染异步结果）</h3>
          <pre class="code-block"><code>FutureBuilder&lt;String&gt;(
  future: fetchName(),
  builder: (context, snapshot) {
    if (snapshot.connectionState != ConnectionState.done) {
      return const CircularProgressIndicator();
    }
    if (snapshot.hasError) return Text('error: ${snapshot.error}');
    return Text('name: ${snapshot.data}');
  },
)</code></pre>

          <p>Stream 用于连续数据流（如 WebSocket、定位、传感器）。对应组件：StreamBuilder。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣1️⃣ 网络请求（HTTP）</h2>
        <div class="content-box">
          <p>常见方案：<strong>http</strong>（轻量）或 <strong>dio</strong>（功能强：拦截器、取消、FormData）。</p>
          <pre class="code-block"><code>// 以 dio 为例（伪代码）
// final dio = Dio(BaseOptions(baseUrl: 'https://api.example.com'));
// final res = await dio.get('/users', queryParameters: {'page': 1});
// print(res.data);</code></pre>

          <p>最佳实践：</p>
          <ul class="feature-list">
            <li>统一封装 API Client（baseUrl、timeout、错误处理）</li>
            <li>统一数据模型（json_serializable/freezed）</li>
            <li>异常分层：网络错误/业务错误/解析错误</li>
          </ul>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣2️⃣ 本地存储与缓存</h2>
        <div class="content-box">
          <ul class="feature-list">
            <li><strong>shared_preferences</strong>：轻量 key-value（适合 token、开关）</li>
            <li><strong>hive</strong>：轻量本地数据库（性能好，上手快）</li>
            <li><strong>sqflite / drift</strong>：SQLite（结构化数据更强）</li>
          </ul>
          <pre class="code-block"><code>// shared_preferences（伪代码）：
// final prefs = await SharedPreferences.getInstance();
// await prefs.setString('token', 'xxx');
// final token = prefs.getString('token');</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣3️⃣ 资源管理：图片、字体、国际化</h2>
        <div class="content-box">
          <h3>13.1 pubspec.yaml 配置 assets</h3>
          <pre class="code-block"><code>flutter:
  assets:
    - assets/images/
  fonts:
    - family: MyFont
      fonts:
        - asset: assets/fonts/MyFont-Regular.ttf</code></pre>

          <h3>13.2 使用资源</h3>
          <pre class="code-block"><code>Image.asset('assets/images/logo.png');
Text('hello', style: const TextStyle(fontFamily: 'MyFont'));</code></pre>

          <p>国际化常用：flutter_localizations + intl（或第三方方案）。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣4️⃣ 调试与性能优化</h2>
        <div class="content-box">
          <ul class="feature-list">
            <li><strong>Flutter DevTools</strong>：性能、内存、布局、网络分析</li>
            <li>避免在 build 中做重计算：用 const、缓存、拆分 widget</li>
            <li>列表用 ListView.builder，图片用缓存（cached_network_image）</li>
            <li>减少重建：合理使用 StatefulWidget、ValueListenableBuilder、Provider/Riverpod</li>
          </ul>

          <h3>常用运行模式</h3>
          <pre class="code-block"><code># Debug（开发）
flutter run

# Profile（性能分析）
flutter run --profile

# Release（接近线上）
flutter run --release</code></pre>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣5️⃣ 打包与发布（入门版）</h2>
        <div class="content-box">
          <h3>15.1 Android</h3>
          <pre class="code-block"><code># APK
flutter build apk

# App Bundle（上架 Play 推荐）
flutter build appbundle</code></pre>

          <h3>15.2 iOS（macOS）</h3>
          <pre class="code-block"><code># 生成 iOS 构建（还需要 Xcode 配置签名）
flutter build ios</code></pre>

          <p>上架要点：签名、包名/Bundle ID、版本号、隐私合规、权限说明、截图与描述。</p>
        </div>
      </section>

      <section class="guide-section">
        <h2>1️⃣6️⃣ 常见问题（FAQ）</h2>
        <div class="content-box">
          <div class="qa-item">
            <h4>Q: 为什么我改了代码没生效？</h4>
            <p>A: 先确保 Hot Reload 正常；如果是依赖或原生配置变化，建议 Hot Restart 或重新运行。</p>
          </div>
          <div class="qa-item">
            <h4>Q: 为什么布局溢出（黄色黑条）？</h4>
            <p>A: 多半是 Row/Column 子组件超出约束，尝试 Expanded/Flexible、Wrap、或者给可滚动容器。</p>
          </div>
          <div class="qa-item">
            <h4>Q: 如何选择状态管理？</h4>
            <p>A: 小项目 setState/Provider；中大型建议 Riverpod；特别复杂流程可用 BLoC。</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Flutter 基础知识讲解组件
</script>

<style scoped>
.flutter-guide {
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
  .flutter-guide {
    padding: 15px;
  }

  .guide-header h1 {
    font-size: 1.5rem;
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
