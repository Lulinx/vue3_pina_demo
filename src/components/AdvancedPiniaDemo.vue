<template>
  <div class="advanced-pinia-demo">
    <h2>🚀 Pinia 高级功能演示</h2>

    <!-- 1. 选择商品 -->
    <section class="section">
      <h3>1️⃣ 选择商品</h3>
      <div class="products-grid">
        <div
          v-for="product in advancedStore.products"
          :key="product.id"
          class="product-card"
          :class="{ selected: advancedStore.selectedProductIds.includes(product.id) }"
          @click="advancedStore.toggleProductSelection(product.id)"
        >
          <h4>{{ product.name }}</h4>
          <p class="price">¥{{ product.price }}</p>
          <p class="inventory">库存：{{ product.inventory }}</p>
          <p class="status" :class="product.inventory > 0 ? 'in-stock' : 'out-of-stock'">
            {{ product.inventory > 0 ? '有货' : '缺货' }}
          </p>
        </div>
      </div>
    </section>

    <!-- 2. 选中商品列表和价格计算 -->
    <section class="section">
      <h3>2️⃣ 选中商品与价格计算</h3>
      <div class="selected-info">
        <div class="info-item">
          <span class="label">选中商品数：</span>
          <span class="value">{{ advancedStore.selectedProducts.length }}</span>
        </div>
        <div class="info-item">
          <span class="label">小计：</span>
          <span class="value">¥{{ advancedStore.selectedProductsSubtotal }}</span>
        </div>
        <div class="info-item">
          <span class="label">折扣率：</span>
          <span class="value">{{ (advancedStore.discountRate * 100).toFixed(0) }}%</span>
        </div>
        <div class="info-item total">
          <span class="label">总价：</span>
          <span class="value">¥{{ advancedStore.selectedProductsTotal.toFixed(2) }}</span>
        </div>
      </div>

      <div class="selected-products">
        <h4>📦 选中的商品：</h4>
        <ul v-if="advancedStore.selectedProducts.length > 0">
          <li v-for="product in advancedStore.selectedProducts" :key="product.id">
            {{ product.name }} - ¥{{ product.price }}
          </li>
        </ul>
        <p v-else class="empty">未选择任何商品</p>
      </div>
    </section>

    <!-- 3. 应用折扣（演示 $patch） -->
    <section class="section">
      <h3>3️⃣ 应用折扣（演示 $patch）</h3>
      <div class="discount-controls">
        <button v-for="discount in [0, 10, 20, 30]" :key="discount"
          @click="applyDiscount(discount)" class="btn discount-btn">
          {{ discount }}% 折扣
        </button>
      </div>
      <div class="discount-info">
        <p>当前折扣：{{ (advancedStore.discountRate * 100).toFixed(0) }}%</p>
        <p>节省金额：¥{{ (advancedStore.selectedProductsSubtotal * advancedStore.discountRate).toFixed(2) }}</p>
      </div>
    </section>

    <!-- 4. Store 统计信息 -->
    <section class="section">
      <h3>4️⃣ Store 中的高级 Getters</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <h4>📊 产品统计</h4>
          <p>总数: {{ advancedStore.productStats.total }}</p>
          <p>有货: {{ advancedStore.productStats.inStock }}</p>
          <p>缺货: {{ advancedStore.productStats.outOfStock }}</p>
          <p>平均价格: ¥{{ advancedStore.productStats.averagePrice }}</p>
        </div>
        <div class="stat-card">
          <h4>📈 订单统计</h4>
          <p>总订单: {{ advancedStore.orderStats.total }}</p>
          <p>总金额: ¥{{ advancedStore.orderStats.totalAmount }}</p>
          <p>平均值: ¥{{ advancedStore.orderStats.averageOrderValue }}</p>
        </div>
      </div>
    </section>

    <!-- 5. 创建订单 -->
    <section class="section">
      <h3>5️⃣ 创建订单（异步 Action）</h3>
      <div class="order-actions">
        <button @click="handleCreateOrder" :disabled="advancedStore.selectedProducts.length === 0"
          class="btn btn-primary btn-lg">
          创建订单
        </button>
        <button @click="handleClearSelection" class="btn btn-secondary">清空选择</button>
      </div>
      <p v-if="orderMessage" :class="['order-message', orderMessageType]">
        {{ orderMessage }}
      </p>
    </section>

    <!-- 6. 订单历史 -->
    <section class="section">
      <h3>6️⃣ 订单历史</h3>
      <div v-if="advancedStore.orders.length > 0" class="orders-list">
        <div v-for="order in advancedStore.orders" :key="order.id" class="order-item">
          <div class="order-header">
            <span class="order-id">订单 #{{ order.id }}</span>
            <span class="order-amount">¥{{ order.amount.toFixed(2) }}</span>
            <span class="order-date">{{ order.createdAt }}</span>
            <span class="order-status" :class="order.status">{{ order.status }}</span>
          </div>
          <div class="order-items">
            <span v-for="item in order.items" :key="item.id" class="item-tag">
              {{ item.name }}
            </span>
          </div>
          <button v-if="order.status === 'pending'" @click="advancedStore.cancelOrder(order.id)"
            class="btn btn-danger btn-small">
            取消订单
          </button>
        </div>
      </div>
      <p v-else class="empty">暂无订单</p>
    </section>

    <!-- 7. Store Subscribe 演示 -->
    <section class="section">
      <h3>7️⃣ Store 订阅（Subscribe）</h3>
      <div class="subscribe-info">
        <p>状态变化日志（最近10条）：</p>
        <div class="log-list">
          <div v-for="(log, idx) in recentChanges.slice(-10)" :key="idx" class="log-item">
            {{ log }}
          </div>
        </div>
        <button @click="clearChangesLog" class="btn btn-small">清空日志</button>
      </div>
    </section>

    <!-- 8. 高级功能演示 -->
    <section class="section">
      <h3>8️⃣ 高级 Pinia 功能</h3>
      <div class="advanced-features">
        <div class="feature-item">
          <h4>💾 $patch 修改状态</h4>
          <button @click="testPatch" class="btn btn-primary">测试 $patch</button>
          <p>使用 store.$patch() 可以批量修改多个状态，更高效</p>
        </div>
        <div class="feature-item">
          <h4>🔄 $reset 重置状态</h4>
          <button @click="testReset" class="btn btn-primary">重置所有状态</button>
          <p>使用 store.$reset() 可以重置状态到初始值</p>
        </div>
        <div class="feature-item">
          <h4>🔍 $state 直接访问</h4>
          <button @click="testState" class="btn btn-primary">查看 $state</button>
          <p>使用 store.$state 可以直接访问整个状态对象</p>
        </div>
        <div class="feature-item">
          <h4>🎯 getters 互相引用</h4>
          <p>✓ selectedProductsTotal 依赖 selectedProductsSubtotal</p>
          <p>✓ 支持链式计算和复杂逻辑</p>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="section code-section">
      <h3>💻 代码示例</h3>
      <pre v-pre><code>// 1. 在 getters 中互相引用
const selectedProductsTotal = computed(() => {
  // 可以引用其他 getters
  return selectedProductsSubtotal.value * (1 - discountRate.value)
})

// 2. 使用 $patch 批量修改
store.$patch({
  discountRate: 0.1,
  selectedProductIds: []
})

// 3. 订阅状态变化
store.$subscribe((mutation, state) => {
  console.log('状态已改变', mutation, state)
})

// 4. 重置状态
store.$reset()

// 5. 访问原始状态
const state = store.$state

// 6. Store 间调用
const otherStore = useOtherStore()
const result = otherStore.someMethod()</code></pre>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAdvancedStore } from '@/stores/advancedStore'

const advancedStore = useAdvancedStore()
const orderMessage = ref('')
const orderMessageType = ref('')
const recentChanges = ref([])

// 订阅 Store 的变化
advancedStore.$subscribe((mutation, state) => {
  const timestamp = new Date().toLocaleTimeString()
  const payloadStr = mutation.payload ? JSON.stringify(mutation.payload) : '{}'
  const change = `[${timestamp}] ${mutation.type}: ${payloadStr.substring(0, 50)}`
  recentChanges.value.push(change)
})

const applyDiscount = (discountPercent) => {
  advancedStore.applyBulkDiscount(discountPercent)
  orderMessage.value = ''
}

const handleCreateOrder = async () => {
  try {
    const order = await advancedStore.createOrder()
    orderMessage.value = `✅ 订单创建成功！订单号：${order.id}`
    orderMessageType.value = 'success'
  } catch (error) {
    orderMessage.value = `❌ ${error.message}`
    orderMessageType.value = 'error'
  }
}

const handleClearSelection = () => {
  advancedStore.clearSelection()
  orderMessage.value = ''
}

const clearChangesLog = () => {
  recentChanges.value = []
}

const testPatch = () => {
  // 演示 $patch
  advancedStore.$patch({
    discountRate: 0.15,
    selectedProductIds: [1, 2]
  })
  orderMessage.value = '✅ 已使用 $patch 批量修改状态'
  orderMessageType.value = 'success'
}

const testReset = () => {
  advancedStore.$reset()
  orderMessage.value = '✅ 已重置所有状态'
  orderMessageType.value = 'success'
}

const testState = () => {
  console.log('完整的 Store 状态：', advancedStore.$state)
  orderMessage.value = '✅ 已在控制台打印完整状态'
  orderMessageType.value = 'success'
}
</script>

<style scoped>
.advanced-pinia-demo {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.advanced-pinia-demo h2 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  font-size: 2rem;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section h3 {
  color: #667eea;
  margin-bottom: 20px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.product-card {
  padding: 15px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.product-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.product-card.selected {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.product-card h4 {
  margin: 0 0 10px 0;
  font-size: 1rem;
}

.product-card .price {
  color: #667eea;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 5px 0;
}

.product-card.selected .price {
  color: white;
}

.product-card .inventory {
  font-size: 0.85rem;
  color: #666;
  margin: 5px 0;
}

.product-card.selected .inventory {
  color: rgba(255, 255, 255, 0.9);
}

.product-card .status {
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-block;
}

.status.in-stock {
  background: #d4edda;
  color: #155724;
}

.status.out-of-stock {
  background: #f8d7da;
  color: #721c24;
}

.selected-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info-item.total {
  background: #e8eaf6;
  border-left-color: #764ba2;
}

.info-item .label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.info-item .value {
  display: block;
  color: #667eea;
  font-size: 1.5rem;
  font-weight: 600;
}

.info-item.total .value {
  color: #764ba2;
}

.selected-products {
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.selected-products h4 {
  margin: 0 0 10px 0;
  color: #667eea;
}

.selected-products ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.selected-products li {
  padding: 8px 0;
  color: #333;
}

.selected-products li:before {
  content: '✓ ';
  color: #667eea;
  font-weight: bold;
  margin-right: 5px;
}

.discount-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.discount-btn {
  padding: 10px 20px;
  background: #e8eaf6;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.discount-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.discount-info {
  padding: 15px;
  background: #fff3e0;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
}

.discount-info p {
  margin: 8px 0;
  color: #e65100;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.stat-card {
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.stat-card h4 {
  color: #667eea;
  margin: 0 0 12px 0;
}

.stat-card p {
  margin: 6px 0;
  color: #333;
}

.order-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-lg {
  padding: 12px 30px;
  font-size: 1rem;
}

.btn-secondary {
  background: #e8eaf6;
  color: #667eea;
}

.btn-secondary:hover {
  background: #c5cae9;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-small {
  padding: 6px 12px;
  font-size: 0.85rem;
}

.order-message {
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
  font-weight: 600;
}

.order-message.success {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.order-message.error {
  background: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.order-id {
  font-weight: 600;
  color: #333;
}

.order-amount {
  font-weight: 600;
  color: #667eea;
  font-size: 1.1rem;
}

.order-date {
  color: #666;
  font-size: 0.9rem;
}

.order-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.order-status.pending {
  background: #fff3cd;
  color: #856404;
}

.order-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-items {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.item-tag {
  padding: 4px 10px;
  background: #e8eaf6;
  color: #667eea;
  border-radius: 12px;
  font-size: 0.85rem;
}

.subscribe-info {
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.log-list {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  margin: 10px 0;
}

.log-item {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.85rem;
  color: #666;
  font-family: monospace;
}

.log-item:last-child {
  border-bottom: none;
}

.empty {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

.advanced-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.feature-item {
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.feature-item h4 {
  color: #667eea;
  margin: 0 0 10px 0;
}

.feature-item p {
  margin: 8px 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.code-section {
  background: #1e1e1e;
}

.code-section h3 {
  color: #4ec9b0;
  border-bottom-color: #4ec9b0;
}

.code-section pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0;
}

.code-section code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .advanced-pinia-demo {
    padding: 10px;
  }

  .advanced-pinia-demo h2 {
    font-size: 1.5rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
