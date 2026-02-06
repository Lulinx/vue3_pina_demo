<template>
  <div class="webgl-guide">
    <div class="guide-header">
      <h1>🎨 WebGL 基础知识完整指南</h1>
      <p class="subtitle">Web图形库 - GPU加速的3D图形渲染技术</p>
    </div>

    <div class="guide-content">
      <!-- 1. WebGL 简介 -->
      <section class="guide-section">
        <h2>1️⃣ 什么是 WebGL？</h2>
        <div class="content-box">
          <p><strong>WebGL (Web Graphics Library)</strong> 是一个 JavaScript API，用于在网页中渲染交互式的 3D 和 2D 图形。它基于 OpenGL ES 2.0，通过 GPU 硬件加速实现高性能图形渲染。</p>

          <div class="webgl-features">
            <div class="feature-item">
              <h4>🎯 核心特性</h4>
              <ul>
                <li>✅ GPU硬件加速渲染</li>
                <li>✅ 跨平台兼容性</li>
                <li>✅ 着色器编程支持</li>
                <li>✅ 实时3D图形渲染</li>
                <li>✅ 零插件运行</li>
              </ul>
            </div>

            <div class="feature-item">
              <h4>🚀 应用场景</h4>
              <ul>
                <li>🎮 3D游戏开发</li>
                <li>📊 数据可视化</li>
                <li>🎨 创意编程</li>
                <li>🏗️ CAD模型展示</li>
                <li>🖼️ 图像处理</li>
                <li>🔬 科学计算可视化</li>
              </ul>
            </div>

            <div class="feature-item">
              <h4>⚡ 性能优势</h4>
              <ul>
                <li>💪 GPU并行计算</li>
                <li>🎯 硬件加速</li>
                <li>🔥 高帧率渲染</li>
                <li>📈 百万顶点处理</li>
                <li>⚙️ 底层优化</li>
              </ul>
            </div>
          </div>

          <h3>1.1 WebGL vs Canvas 2D</h3>
          <div class="comparison-table">
            <div class="comparison-item">
              <h4>Canvas 2D</h4>
              <ul>
                <li>CPU渲染</li>
                <li>2D图形</li>
                <li>简单API</li>
                <li>易于学习</li>
                <li>性能一般</li>
              </ul>
            </div>
            <div class="comparison-item webgl-highlight">
              <h4>WebGL</h4>
              <ul>
                <li>GPU加速</li>
                <li>2D/3D图形</li>
                <li>复杂API</li>
                <li>学习曲线陡</li>
                <li>高性能</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. WebGL 基础概念 -->
      <section class="guide-section">
        <h2>2️⃣ WebGL 基础概念</h2>
        <div class="content-box">
          <h3>2.1 渲染管线 (Graphics Pipeline)</h3>
          <div class="pipeline-diagram">
            <div class="pipeline-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>顶点数据</h4>
                <p>3D模型的顶点坐标、法线、纹理坐标等</p>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="pipeline-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>顶点着色器</h4>
                <p>处理每个顶点的位置变换</p>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="pipeline-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>图元装配</h4>
                <p>将顶点组装成三角形等图元</p>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="pipeline-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>几何着色器</h4>
                <p>生成或修改几何图元</p>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="pipeline-step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h4>片段着色器</h4>
                <p>计算每个像素的颜色</p>
              </div>
            </div>
            <div class="arrow">→</div>
            <div class="pipeline-step">
              <div class="step-number">6</div>
              <div class="step-content">
                <h4>帧缓冲</h4>
                <p>最终显示在屏幕上</p>
              </div>
            </div>
          </div>

          <h3>2.2 坐标系统</h3>
          <pre class="code-block"><code>// 1. 局部坐标系 (Object Space)
// 模型的原始坐标，相对于模型中心

// 2. 世界坐标系 (World Space)
// 通过模型矩阵变换到世界坐标

// 3. 观察坐标系 (View Space)
// 通过视图矩阵变换到相机坐标

// 4. 裁剪坐标系 (Clip Space)
// 通过投影矩阵变换到标准化设备坐标 [-1, 1]

// 5. 屏幕坐标系 (Screen Space)
// 最终的像素坐标

// 坐标变换流程
const modelMatrix = mat4.create();      // 模型变换
const viewMatrix = mat4.create();       // 视图变换
const projectionMatrix = mat4.create(); // 投影变换

// MVP矩阵 = 投影矩阵 × 视图矩阵 × 模型矩阵
const mvpMatrix = mat4.create();
mat4.multiply(mvpMatrix, projectionMatrix, viewMatrix);
mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix);</code></pre>

          <h3>2.3 着色器语言 (GLSL)</h3>
          <div class="shader-example">
            <h4>顶点着色器示例：</h4>
            <pre class="code-block"><code>// 顶点着色器 (Vertex Shader)
attribute vec3 a_position;    // 顶点位置属性
attribute vec2 a_texCoord;   // 纹理坐标属性
uniform mat4 u_mvpMatrix;    // MVP变换矩阵
varying vec2 v_texCoord;     // 传递给片段着色器的变量

void main() {
    // 变换顶点位置
    gl_Position = u_mvpMatrix * vec4(a_position, 1.0);

    // 传递纹理坐标
    v_texCoord = a_texCoord;
}</code></pre>

            <h4>片段着色器示例：</h4>
            <pre class="code-block"><code>// 片段着色器 (Fragment Shader)
precision mediump float;
uniform sampler2D u_texture;  // 纹理采样器
uniform vec3 u_lightColor;    // 光照颜色
varying vec2 v_texCoord;      // 从顶点着色器接收的纹理坐标

void main() {
    // 采样纹理颜色
    vec4 texColor = texture2D(u_texture, v_texCoord);

    // 应用光照
    vec3 finalColor = texColor.rgb * u_lightColor;

    // 输出最终颜色
    gl_FragColor = vec4(finalColor, texColor.a);
}</code></pre>
          </div>
        </div>
      </section>

      <!-- 3. WebGL 编程基础 -->
      <section class="guide-section">
        <h2>3️⃣ WebGL 编程基础</h2>
        <div class="content-box">
          <h3>3.1 初始化 WebGL 上下文</h3>
          <pre class="code-block"><code>// 1. 获取canvas元素
const canvas = document.getElementById('webgl-canvas');

// 2. 获取WebGL上下文
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

if (!gl) {
    alert('您的浏览器不支持WebGL');
    return;
}

// 3. 设置视口
gl.viewport(0, 0, canvas.width, canvas.height);

// 4. 设置清除颜色
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// 5. 开启深度测试
gl.enable(gl.DEPTH_TEST);

// 6. 清除缓冲区
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);</code></pre>

          <h3>3.2 创建和编译着色器</h3>
          <pre class="code-block"><code>// 创建着色器函数
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // 检查编译状态
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('着色器编译失败:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

// 创建着色器程序
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // 检查链接状态
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('着色器程序链接失败:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
}

// 使用示例
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);</code></pre>

          <h3>3.3 缓冲区对象 (Buffer)</h3>
          <pre class="code-block"><code>// 1. 创建缓冲区
const vertexBuffer = gl.createBuffer();

// 2. 绑定缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// 3. 写入数据
const vertices = new Float32Array([
    -0.5, -0.5, 0.0,  // 第一个顶点
     0.5, -0.5, 0.0,  // 第二个顶点
     0.0,  0.5, 0.0   // 第三个顶点
]);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 4. 获取属性位置
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

// 5. 启用属性
gl.enableVertexAttribArray(positionAttributeLocation);

// 6. 指定属性格式
gl.vertexAttribPointer(
    positionAttributeLocation, // 属性位置
    3,                        // 每个顶点的分量数
    gl.FLOAT,                 // 数据类型
    false,                    // 是否归一化
    0,                        // 步长
    0                         // 偏移
);</code></pre>

          <h3>3.4 绘制基本图形</h3>
          <pre class="code-block"><code>// 绘制三角形
function drawTriangle() {
    // 设置顶点数据
    const vertices = new Float32Array([
        -0.5, -0.5, 0.0,
         0.5, -0.5, 0.0,
         0.0,  0.5, 0.0
    ]);

    // 创建缓冲区并写入数据
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 获取属性位置并设置
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    // 绘制
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// 绘制矩形（两个三角形）
function drawRectangle() {
    const vertices = new Float32Array([
        -0.5, -0.5, 0.0,  // 左下
         0.5, -0.5, 0.0,  // 右下
         0.5,  0.5, 0.0,  // 右上
        -0.5,  0.5, 0.0   // 左上
    ]);

    const indices = new Uint16Array([
        0, 1, 2,  // 第一个三角形
        0, 2, 3   // 第二个三角形
    ]);

    // 顶点缓冲区
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 索引缓冲区
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

    // 使用索引绘制
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}</code></pre>
        </div>
      </section>

      <!-- 4. 变换和矩阵 -->
      <section class="guide-section">
        <h2>4️⃣ 变换和矩阵</h2>
        <div class="content-box">
          <h3>4.1 基础变换矩阵</h3>
          <pre class="code-block"><code>// 1. 位移矩阵 (Translation)
function createTranslationMatrix(tx, ty, tz) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1
    ];
}

// 2. 缩放矩阵 (Scale)
function createScaleMatrix(sx, sy, sz) {
    return [
        sx, 0,  0,  0,
        0,  sy, 0,  0,
        0,  0,  sz, 0,
        0,  0,  0,  1
    ];
}

// 3. 旋转矩阵 (Rotation around Z-axis)
function createRotationZMatrix(angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [
        c, -s, 0, 0,
        s,  c, 0, 0,
        0,  0,  1, 0,
        0,  0,  0,  1
    ];
}

// 4. 矩阵乘法
function multiplyMatrices(a, b) {
    const result = new Array(16);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            result[i * 4 + j] = 0;
            for (let k = 0; k < 4; k++) {
                result[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
            }
        }
    }
    return result;
}

// 5. 应用变换
const translation = createTranslationMatrix(1, 2, 0);
const scale = createScaleMatrix(2, 2, 1);
const rotation = createRotationZMatrix(Math.PI / 4);

// 组合变换 (注意顺序：缩放 → 旋转 → 位移)
const transform = multiplyMatrices(translation,
    multiplyMatrices(rotation, scale));

// 传递给着色器
const matrixLocation = gl.getUniformLocation(program, 'u_transform');
gl.uniformMatrix4fv(matrixLocation, false, transform);</code></pre>

          <h3>4.2 投影矩阵</h3>
          <pre class="code-block"><code>// 正交投影矩阵 (Orthographic Projection)
function createOrthographicMatrix(left, right, bottom, top, near, far) {
    const width = right - left;
    const height = top - bottom;
    const depth = far - near;

    return [
        2/width, 0, 0, 0,
        0, 2/height, 0, 0,
        0, 0, -2/depth, 0,
        -(right+left)/width, -(top+bottom)/height, -(far+near)/depth, 1
    ];
}

// 透视投影矩阵 (Perspective Projection)
function createPerspectiveMatrix(fov, aspect, near, far) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    const rangeInv = 1.0 / (near - far);

    return [
        f/aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
    ];
}

// 视图矩阵 (Look-At)
function createLookAtMatrix(eye, target, up) {
    const zAxis = normalize(subtract(eye, target));
    const xAxis = normalize(cross(up, zAxis));
    const yAxis = cross(zAxis, xAxis);

    return [
        xAxis[0], yAxis[0], zAxis[0], 0,
        xAxis[1], yAxis[1], zAxis[1], 0,
        xAxis[2], yAxis[2], zAxis[2], 0,
        -dot(xAxis, eye), -dot(yAxis, eye), -dot(zAxis, eye), 1
    ];
}

// 使用示例
const projectionMatrix = createPerspectiveMatrix(
    Math.PI / 4,    // 45度视野
    canvas.width / canvas.height,  // 宽高比
    0.1,            // 近裁剪面
    100             // 远裁剪面
);

const viewMatrix = createLookAtMatrix(
    [0, 0, 5],      // 相机位置
    [0, 0, 0],      // 目标位置
    [0, 1, 0]       // 上方向
);

// MVP矩阵
const mvpMatrix = multiplyMatrices(projectionMatrix,
    multiplyMatrices(viewMatrix, modelMatrix));</code></pre>
        </div>
      </section>

      <!-- 5. 纹理和材质 -->
      <section class="guide-section">
        <h2>5️⃣ 纹理和材质</h2>
        <div class="content-box">
          <h3>5.1 加载和使用纹理</h3>
          <pre class="code-block"><code>// 1. 创建纹理对象
function createTexture(gl, image) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 设置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // 上传纹理数据
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    return texture;
}

// 2. 异步加载纹理
function loadTexture(gl, url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';

        image.onload = () => {
            const texture = createTexture(gl, image);
            resolve(texture);
        };

        image.onerror = reject;
        image.src = url;
    });
}

// 3. 使用纹理
async function initTextures() {
    try {
        const texture1 = await loadTexture(gl, 'texture1.jpg');
        const texture2 = await loadTexture(gl, 'texture2.png');

        // 激活纹理单元
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture1);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture2);

        // 传递纹理单元给着色器
        const textureLocation1 = gl.getUniformLocation(program, 'u_texture1');
        gl.uniform1i(textureLocation1, 0); // 纹理单元 0

        const textureLocation2 = gl.getUniformLocation(program, 'u_texture2');
        gl.uniform1i(textureLocation2, 1); // 纹理单元 1

    } catch (error) {
        console.error('纹理加载失败:', error);
    }
}</code></pre>

          <h3>5.2 纹理坐标系</h3>
          <div class="texture-coords">
            <div class="coord-example">
              <pre class="code-block"><code>// 纹理坐标 (UV坐标)
// (0,0) 左上角
// (1,0) 右上角
// (1,1) 右下角
// (0,1) 左下角

const textureCoords = new Float32Array([
    0.0, 0.0,  // 左上
    1.0, 0.0,  // 右上
    1.0, 1.0,  // 右下
    0.0, 1.0   // 左下
]);

// 在片段着色器中使用
varying vec2 v_texCoord;
uniform sampler2D u_texture;

void main() {
    vec4 texColor = texture2D(u_texture, v_texCoord);
    gl_FragColor = texColor;
}</code></pre>
            </div>
            <div class="coord-diagram">
              <div class="texture-grid">
                <div class="grid-point">(0,0)</div>
                <div class="grid-point">(1,0)</div>
                <div class="grid-point">(0,1)</div>
                <div class="grid-point">(1,1)</div>
              </div>
            </div>
          </div>

          <h3>5.3 多重纹理和混合</h3>
          <pre class="code-block"><code>// 片段着色器 - 多重纹理混合
precision mediump float;

uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
uniform float u_mixRatio;

varying vec2 v_texCoord;

void main() {
    // 采样两个纹理
    vec4 color1 = texture2D(u_texture1, v_texCoord);
    vec4 color2 = texture2D(u_texture2, v_texCoord);

    // 线性混合
    vec4 finalColor = mix(color1, color2, u_mixRatio);

    // 添加透明度混合
    finalColor.a = color1.a * color2.a;

    gl_FragColor = finalColor;
}

// JavaScript 中控制混合比例
const mixRatioLocation = gl.getUniformLocation(program, 'u_mixRatio');
let mixRatio = 0.5;

function animate() {
    mixRatio += 0.01;
    if (mixRatio > 1.0) mixRatio = 0.0;

    gl.uniform1f(mixRatioLocation, mixRatio);
    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

    requestAnimationFrame(animate);
}

animate();</code></pre>
        </div>
      </section>

      <!-- 6. 光照和材质 -->
      <section class="guide-section">
        <h2>6️⃣ 光照和材质</h2>
        <div class="content-box">
          <h3>6.1 基础光照模型</h3>
          <pre class="code-block"><code>// 片段着色器 - Phong光照模型
precision mediump float;

struct Light {
    vec3 position;
    vec3 color;
    float intensity;
};

struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

uniform Light u_light;
uniform Material u_material;
uniform vec3 u_viewPosition;

varying vec3 v_position;
varying vec3 v_normal;

void main() {
    // 环境光
    vec3 ambient = u_light.color * u_material.ambient * u_light.intensity;

    // 漫反射
    vec3 norm = normalize(v_normal);
    vec3 lightDir = normalize(u_light.position - v_position);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = u_light.color * u_material.diffuse * diff * u_light.intensity;

    // 镜面反射
    vec3 viewDir = normalize(u_viewPosition - v_position);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), u_material.shininess);
    vec3 specular = u_light.color * u_material.specular * spec * u_light.intensity;

    // 最终颜色
    vec3 result = ambient + diffuse + specular;
    gl_FragColor = vec4(result, 1.0);
}</code></pre>

          <h3>6.2 法向量和变换</h3>
          <pre class="code-block"><code>// 1. 法向量变换矩阵 (Normal Matrix)
// 对于非均匀缩放，需要使用法向量矩阵

// 法向量矩阵 = (模型矩阵的逆矩阵)的转置
function createNormalMatrix(modelMatrix) {
    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
    return normalMatrix;
}

// 2. 在着色器中应用法向量变换
// 顶点着色器
attribute vec3 a_normal;
uniform mat4 u_normalMatrix;

varying vec3 v_normal;

void main() {
    // 变换法向量 (使用法向量矩阵)
    v_normal = mat3(u_normalMatrix) * a_normal;

    // 其他顶点变换...
    gl_Position = u_mvpMatrix * vec4(a_position, 1.0);
}

// 3. 多光源光照
struct DirectionalLight {
    vec3 direction;
    vec3 color;
    float intensity;
};

struct PointLight {
    vec3 position;
    vec3 color;
    float intensity;
    float constant;
    float linear;
    float quadratic;
};

uniform DirectionalLight u_directionalLights[4];
uniform PointLight u_pointLights[8];

vec3 calculateDirectionalLight(DirectionalLight light, vec3 normal, vec3 viewDir) {
    vec3 lightDir = normalize(-light.direction);
    float diff = max(dot(normal, lightDir), 0.0);
    return light.color * light.intensity * diff;
}

vec3 calculatePointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir) {
    vec3 lightDir = normalize(light.position - fragPos);
    float diff = max(dot(normal, lightDir), 0.0);

    // 距离衰减
    float distance = length(light.position - fragPos);
    float attenuation = 1.0 / (light.constant + light.linear * distance +
                               light.quadratic * distance * distance);

    return light.color * light.intensity * diff * attenuation;
}</code></pre>
        </div>
      </section>

      <!-- 7. 高级技术 -->
      <section class="guide-section">
        <h2>7️⃣ 高级技术</h2>
        <div class="content-box">
          <h3>7.1 帧缓冲区对象 (FBO)</h3>
          <pre class="code-block"><code>// 创建离屏渲染目标
function createFramebuffer(gl, width, height) {
    // 创建帧缓冲区
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    // 创建纹理附件
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
                  gl.RGBA, gl.UNSIGNED_BYTE, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // 附加到帧缓冲区
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                           gl.TEXTURE_2D, texture, 0);

    // 创建深度缓冲区
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);

    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
                              gl.RENDERBUFFER, depthBuffer);

    // 检查帧缓冲区完整性
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status !== gl.FRAMEBUFFER_COMPLETE) {
        console.error('帧缓冲区创建失败');
        return null;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { framebuffer, texture, depthBuffer };
}

// 后处理效果示例：模糊
function applyBlurEffect(originalTexture, blurTexture) {
    // 第一遍：水平模糊
    gl.bindFramebuffer(gl.FRAMEBUFFER, blurFBO);
    gl.useProgram(horizontalBlurProgram);
    gl.bindTexture(gl.TEXTURE_2D, originalTexture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // 第二遍：垂直模糊
    gl.bindFramebuffer(gl.FRAMEBUFFER, null); // 渲染到屏幕
    gl.useProgram(verticalBlurProgram);
    gl.bindTexture(gl.TEXTURE_2D, blurTexture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}</code></pre>

          <h3>7.2 WebGL 2.0 新特性</h3>
          <pre class="code-block"><code>// 1. 顶点数组对象 (VAO)
function createVAO(gl, program, attributes) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // 设置所有属性
    for (const attr of attributes) {
        const location = gl.getAttribLocation(program, attr.name);
        gl.enableVertexAttribArray(location);

        gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer);
        gl.vertexAttribPointer(location, attr.size, gl.FLOAT, false, 0, 0);
    }

    gl.bindVertexArray(null);
    return vao;
}

// 2. 统一缓冲区对象 (UBO)
function createUBO(gl, blockName, program, data) {
    const blockIndex = gl.getUniformBlockIndex(program, blockName);
    const blockSize = gl.getActiveUniformBlockParameter(program, blockIndex,
                                                       gl.UNIFORM_BLOCK_DATA_SIZE);

    const ubo = gl.createBuffer();
    gl.bindBuffer(gl.UNIFORM_BUFFER, ubo);
    gl.bufferData(gl.UNIFORM_BUFFER, blockSize, gl.DYNAMIC_DRAW);

    // 绑定到绑定点
    gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, ubo);
    gl.uniformBlockBinding(program, blockIndex, 0);

    return ubo;
}

// 3. 多重渲染目标 (MRT)
function setupMRT(gl) {
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    // 创建多个颜色附件
    const textures = [];
    for (let i = 0; i < 4; i++) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
                      gl.RGBA, gl.UNSIGNED_BYTE, null);

        gl.framebufferTexture2D(gl.FRAMEBUFFER,
                               gl.COLOR_ATTACHMENT0 + i,
                               gl.TEXTURE_2D, texture, 0);
        textures.push(texture);
    }

    // 指定要写入的颜色附件
    gl.drawBuffers([
        gl.COLOR_ATTACHMENT0,
        gl.COLOR_ATTACHMENT1,
        gl.COLOR_ATTACHMENT2,
        gl.COLOR_ATTACHMENT3
    ]);

    return { framebuffer, textures };
}</code></pre>

          <h3>7.3 性能优化技巧</h3>
          <div class="optimization-tips">
            <div class="tip-group">
              <h4>🎯 渲染优化</h4>
              <ul>
                <li><strong>批量绘制：</strong>减少 draw call，使用实例化渲染</li>
                <li><strong>LOD：</strong>距离越远，细节越少</li>
                <li><strong>视锥剔除：</strong>只渲染可见对象</li>
                <li><strong>遮挡剔除：</strong>被遮挡的对象不渲染</li>
              </ul>
            </div>

            <div class="tip-group">
              <h4>💾 内存优化</h4>
              <ul>
                <li><strong>纹理压缩：</strong>使用压缩纹理格式</li>
                <li><strong>对象池：</strong>复用几何体和材质</li>
                <li><strong>垃圾回收：</strong>及时清理不再使用的资源</li>
                <li><strong>流式加载：</strong>按需加载资源</li>
              </ul>
            </div>

            <div class="tip-group">
              <h4>⚡ GPU优化</h4>
              <ul>
                <li><strong>着色器优化：</strong>减少计算复杂度</li>
                <li><strong>数据精度：</strong>合理使用 float/half</li>
                <li><strong>分支避免：</strong>减少条件语句</li>
                <li><strong>纹理采样：</strong>优化纹理访问模式</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. 常用库和框架 -->
      <section class="guide-section">
        <h2>8️⃣ 常用库和框架</h2>
        <div class="content-box">
          <div class="library-grid">
            <div class="library-item">
              <h4>🎯 Three.js</h4>
              <p>3D JavaScript库，封装了WebGL的复杂性</p>
              <ul>
                <li>✅ 简化的3D API</li>
                <li>✅ 丰富的几何体和材质</li>
                <li>✅ 内置动画系统</li>
                <li>✅ 强大的插件生态</li>
              </ul>
            </div>

            <div class="library-item">
              <h4>🎨 Babylon.js</h4>
              <p>现代化的WebGL游戏引擎</p>
              <ul>
                <li>✅ 完整的游戏引擎功能</li>
                <li>✅ 物理引擎集成</li>
                <li>✅ PBR材质系统</li>
                <li>✅ 音频系统支持</li>
              </ul>
            </div>

            <div class="library-item">
              <h4>🚀 PlayCanvas</h4>
              <p>基于WebGL的3D游戏引擎</p>
              <ul>
                <li>✅ 可视化编辑器</li>
                <li>✅ 实时协作</li>
                <li>✅ 强大的图形管线</li>
                <li>✅ 云端发布</li>
              </ul>
            </div>

            <div class="library-item">
              <h4>🎪 A-Frame</h4>
              <p>基于Three.js的WebVR框架</p>
              <ul>
                <li>✅ 声明式语法</li>
                <li>✅ VR/AR支持</li>
                <li>✅ 组件化架构</li>
                <li>✅ 实体-组件系统</li>
              </ul>
            </div>

            <div class="library-item">
              <h4>🧰 gl-matrix</h4>
              <p>高性能的JavaScript矩阵运算库</p>
              <ul>
                <li>✅ 优化的矩阵运算</li>
                <li>✅ 支持向量和四元数</li>
                <li>✅ 兼容WebGL</li>
                <li>✅ TypeScript支持</li>
              </ul>
            </div>

            <div class="library-item">
              <h4>🎭 Regl</h4>
              <p>函数式WebGL编程框架</p>
              <ul>
                <li>✅ 函数式编程范式</li>
                <li>✅ 自动资源管理</li>
                <li>✅ 简化的API设计</li>
                <li>✅ 优秀的性能</li>
              </ul>
            </div>
          </div>

          <h3>Three.js 快速上手</h3>
          <pre class="code-block"><code>// 1. 基本场景设置
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// 3. 设置相机位置
camera.position.z = 5;

// 4. 渲染循环
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();</code></pre>
        </div>
      </section>

      <!-- 9. 最佳实践和调试 -->
      <section class="guide-section">
        <h2>9️⃣ 最佳实践和调试</h2>
        <div class="content-box">
          <h3>9.1 错误处理和调试</h3>
          <pre class="code-block"><code>// 1. WebGL上下文丢失处理
canvas.addEventListener('webglcontextlost', function(event) {
    console.warn('WebGL context lost');
    event.preventDefault();

    // 清理资源
    cleanupResources();

    // 尝试恢复
    setTimeout(() => {
        initWebGL();
    }, 1000);
});

canvas.addEventListener('webglcontextrestored', function(event) {
    console.log('WebGL context restored');
    initWebGL();
});

// 2. 着色器编译错误检查
function checkShaderError(gl, shader, source) {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('着色器编译错误:', error);

        // 显示错误的源代码行
        const lines = source.split('\n');
        const errorLines = error.match(/ERROR: \d+:(\d+)/g);
        if (errorLines) {
            errorLines.forEach(match => {
                const lineNum = match.match(/\d+/)[0];
                console.log(`第${lineNum}行:`, lines[lineNum - 1]);
            });
        }

        return false;
    }
    return true;
}

// 3. 性能监控
class WebGLProfiler {
    constructor(gl) {
        this.gl = gl;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 0;
    }

    beginFrame() {
        this.frameStart = performance.now();
    }

    endFrame() {
        const frameTime = performance.now() - this.frameStart;
        this.frameCount++;

        if (this.frameCount >= 60) {
            this.fps = 1000 / (performance.now() - this.lastTime) * 60;
            this.frameCount = 0;
            this.lastTime = performance.now();
        }

        // 检查WebGL错误
        const error = this.gl.getError();
        if (error !== this.gl.NO_ERROR) {
            console.error('WebGL Error:', this.getErrorString(error));
        }
    }

    getErrorString(error) {
        switch(error) {
            case this.gl.INVALID_ENUM: return 'INVALID_ENUM';
            case this.gl.INVALID_VALUE: return 'INVALID_VALUE';
            case this.gl.INVALID_OPERATION: return 'INVALID_OPERATION';
            case this.gl.OUT_OF_MEMORY: return 'OUT_OF_MEMORY';
            default: return 'UNKNOWN_ERROR';
        }
    }
}</code></pre>

          <h3>9.2 浏览器兼容性处理</h3>
          <pre class="code-block"><code>// 1. 检测WebGL支持
function detectWebGL() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ||
              canvas.getContext('experimental-webgl');

    if (!gl) {
        return {
            supported: false,
            reason: '浏览器不支持WebGL'
        };
    }

    // 检查扩展支持
    const extensions = {
        'OES_texture_float': gl.getExtension('OES_texture_float'),
        'WEBGL_draw_buffers': gl.getExtension('WEBGL_draw_buffers'),
        'OES_standard_derivatives': gl.getExtension('OES_standard_derivatives')
    };

    // 检查最大纹理尺寸
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);

    // 检查顶点着色器最大uniform数量
    const maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);

    return {
        supported: true,
        extensions,
        maxTextureSize,
        maxVertexUniforms,
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION)
    };
}

// 2. 优雅降级
async function initWebGL() {
    const webglInfo = detectWebGL();

    if (!webglInfo.supported) {
        // 显示降级UI
        showFallbackUI(webglInfo.reason);
        return;
    }

    try {
        await loadShaders();
        await loadTextures();
        setupScene();
        startRenderLoop();
    } catch (error) {
        console.error('WebGL初始化失败:', error);
        showFallbackUI('初始化失败，请刷新页面重试');
    }
}

// 3. 内存管理
class ResourceManager {
    constructor(gl) {
        this.gl = gl;
        this.resources = new Set();
    }

    track(resource, type) {
        this.resources.add({ resource, type });
    }

    dispose(resource, type) {
        switch(type) {
            case 'buffer':
                this.gl.deleteBuffer(resource);
                break;
            case 'texture':
                this.gl.deleteTexture(resource);
                break;
            case 'program':
                this.gl.deleteProgram(resource);
                break;
            case 'framebuffer':
                this.gl.deleteFramebuffer(resource);
                break;
        }
        this.resources.delete(resource);
    }

    disposeAll() {
        for (const { resource, type } of this.resources) {
            this.dispose(resource, type);
        }
        this.resources.clear();
    }
}</code></pre>

          <h3>9.3 移动端优化</h3>
          <ul>
            <li><strong>纹理压缩：</strong>使用ETC1/ETC2/PVRTC格式</li>
            <li><strong>着色器简化：</strong>减少计算复杂度，合并纹理采样</li>
            <li><strong>几何体优化：</strong>使用索引缓冲区，减少顶点数量</li>
            <li><strong>渲染分辨率：</strong>根据设备像素比调整</li>
            <li><strong>电池优化：</strong>降低帧率，减少GPU负载</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// WebGL 基础知识讲解组件
</script>

<style scoped>
.webgl-guide {
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

.content-box {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.webgl-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.feature-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.feature-item h4 {
  color: #667eea;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.feature-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item li {
  padding: 5px 0;
  color: #555;
  font-size: 0.9rem;
}

.comparison-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.comparison-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

.comparison-item h4 {
  color: #667eea;
  margin-bottom: 15px;
  text-align: center;
}

.comparison-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-item li {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #555;
}

.comparison-item li:last-child {
  border-bottom: none;
}

.webgl-highlight {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.pipeline-diagram {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  padding: 20px;
  background: white;
  border-radius: 8px;
  overflow-x: auto;
}

.pipeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.step-content {
  text-align: center;
}

.step-content h4 {
  color: #333;
  margin-bottom: 5px;
  font-size: 1rem;
}

.step-content p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.arrow {
  font-size: 1.5rem;
  color: #667eea;
  font-weight: bold;
}

.shader-example pre {
  margin: 15px 0;
}

.texture-coords {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}

.coord-example pre {
  margin: 0;
}

.coord-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
}

.texture-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100px;
  height: 100px;
  background: #f0f0f0;
  border: 1px solid #ccc;
}

.grid-point {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ccc;
  font-size: 0.7rem;
  color: #666;
}

.library-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.library-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.library-item h4 {
  color: #667eea;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.library-item > p {
  color: #666;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.library-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.library-item li {
  padding: 5px 0;
  color: #555;
  font-size: 0.9rem;
  border-bottom: 1px solid #f0f0f0;
}

.library-item li:last-child {
  border-bottom: none;
}

.optimization-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.tip-group {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.tip-group h4 {
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.tip-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-group li {
  padding: 8px 0;
  color: #555;
  border-bottom: 1px solid #f0f0f0;
  line-height: 1.5;
}

.tip-group li:last-child {
  border-bottom: none;
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
}

@media (max-width: 768px) {
  .webgl-guide {
    padding: 15px;
  }

  .guide-header h1 {
    font-size: 1.5rem;
  }

  .webgl-features {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    grid-template-columns: 1fr;
  }

  .pipeline-diagram {
    flex-wrap: wrap;
    gap: 10px;
  }

  .pipeline-step {
    min-width: 100px;
  }

  .texture-coords {
    grid-template-columns: 1fr;
  }

  .library-grid {
    grid-template-columns: 1fr;
  }

  .optimization-tips {
    grid-template-columns: 1fr;
  }

  .code-block {
    font-size: 12px;
    padding: 15px;
  }
}
</style>