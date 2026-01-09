<template>
  <div class="cart-demo">
    <!-- 产品列表 -->
    <div class="products-section">
      <h3>📦 可用产品</h3>
      <div class="products-grid">
        <div v-for="product in productStore.products" :key="product.id" class="product-card">
          <div class="product-header">
            <h4>{{ product.name }}</h4>
            <span class="price">${{ product.price }}</span>
          </div>
          <p class="stock">库存: {{ product.stock }}</p>
          <button
            @click="addToCart(product)"
            :disabled="product.stock === 0"
            class="btn btn-primary"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>

    <!-- 购物车摘要 -->
    <div class="cart-summary">
      <div class="summary-item">
        <span class="label">购物车商品数</span>
        <span class="value">{{ cartStore.summary.itemCount }}</span>
      </div>
      <div class="summary-item">
        <span class="label">小计</span>
        <span class="value">${{ cartStore.summary.subtotal }}</span>
      </div>
      <div class="summary-item">
        <span class="label">折扣</span>
        <span class="value">-${{ cartStore.summary.discount }}</span>
      </div>
      <div class="summary-item total">
        <span class="label">合计</span>
        <span class="value">${{ cartStore.summary.total }}</span>
      </div>
    </div>

    <!-- 购物车列表 -->
    <div v-if="cartStore.items.length > 0" class="cart-items">
      <h3>🛒 购物车</h3>
      <div class="items-list">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <div class="item-info">
            <h4>{{ item.name }}</h4>
            <p class="item-price">${{ item.price }} × {{ item.quantity }}</p>
          </div>
          <div class="item-actions">
            <input
              type="number"
              v-model.number="item.quantity"
              @change="cartStore.updateQuantity(item.id, item.quantity)"
              min="1"
              class="quantity-input"
            />
            <button @click="cartStore.removeItem(item.id)" class="btn-delete">🗑️</button>
          </div>
        </div>
      </div>

      <!-- 优惠码 -->
      <div class="discount-section">
        <h4>🎉 优惠码</h4>
        <div class="discount-form">
          <select v-model="selectedDiscount" class="input">
            <option value="">选择优惠码</option>
            <option value="SAVE10">SAVE10 (10%折扣)</option>
            <option value="SAVE20">SAVE20 (20%折扣)</option>
            <option value="WELCOME">WELCOME (15%折扣)</option>
          </select>
          <button @click="applyDiscount" class="btn btn-primary">应用</button>
        </div>
        <p v-if="cartStore.discountCode" class="discount-applied">
          ✅ 已应用优惠码: {{ cartStore.discountCode }}
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="actions">
        <button @click="cartStore.clearCart" class="btn btn-danger">清空购物车</button>
        <button @click="handleCheckout" class="btn btn-primary">结账</button>
      </div>
    </div>

    <!-- 空购物车 -->
    <div v-else class="empty-cart">
      <p>🛒 购物车为空，请添加商品</p>
    </div>

    <!-- 代码示例 -->
    <div class="code-example">
      <h4>💻 多Store交互示例</h4>
      <pre v-pre><code>// cartStore.js - 调用其他Store
import { useCounterStore } from './counterStore'
import { useProductStore } from './productStore'

const checkout = () => {
  // 获取其他Store实例
  const counterStore = useCounterStore()
  const productStore = useProductStore()
  
  // 调用其他Store的actions
  counterStore.addAmount(itemCount.value)
  
  // 更新产品库存
  items.value.forEach(item => {
    productStore.updateStock(item.id, item.quantity)
  })
}

// 在组件中使用
const handleCheckout = () => {
  const result = cartStore.checkout()
  console.log('订单结果:', result)
}</code></pre>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useCartStore, useProductStore } from '@/stores/cartStore';

  const cartStore = useCartStore();
  const productStore = useProductStore();
  const selectedDiscount = ref('');

  const addToCart = product => {
    if (product.stock > 0) {
      cartStore.addItem(product, 1);
    }
  };

  const applyDiscount = () => {
    if (selectedDiscount.value) {
      cartStore.applyDiscount(selectedDiscount.value);
    }
  };

  const handleCheckout = () => {
    const result = cartStore.checkout();
    alert(`订单已创建！合计: $${result.summary.total}`);
    cartStore.clearCart();
    selectedDiscount.value = '';
  };
</script>

<style scoped>
  .cart-demo {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .products-section h3,
  .cart-items h3 {
    color: #667eea;
    font-size: 1.3rem;
    margin-bottom: 15px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .product-card {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: all 0.3s;
  }

  .product-card:hover {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }

  .product-header h4 {
    margin: 0;
    flex: 1;
    font-size: 0.95rem;
  }

  .price {
    font-weight: bold;
    color: #667eea;
    font-size: 1.1rem;
  }

  .stock {
    margin: 0;
    font-size: 0.85rem;
    color: #999;
  }

  .btn {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
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

  .btn-danger {
    background: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background: #dc2626;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }

  .cart-summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .summary-item {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .summary-item.total {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-left-color: white;
  }

  .label {
    display: block;
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 8px;
  }

  .value {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .summary-item.total .label,
  .summary-item.total .value {
    color: white;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cart-item {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 15px;
    align-items: center;
    border-left: 4px solid #10b981;
  }

  .item-info h4 {
    margin: 0 0 5px 0;
    color: #111;
  }

  .item-price {
    margin: 0;
    color: #667eea;
    font-weight: 600;
  }

  .item-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .quantity-input {
    width: 60px;
    padding: 6px;
    border: 2px solid #e5e7eb;
    border-radius: 4px;
    text-align: center;
  }

  .btn-delete {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px 8px;
    transition: transform 0.3s;
  }

  .btn-delete:hover {
    transform: scale(1.2);
  }

  .discount-section {
    background: #f9fafb;
    padding: 15px;
    border-radius: 8px;
  }

  .discount-section h4 {
    color: #667eea;
    margin: 0 0 12px 0;
  }

  .discount-form {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .input {
    flex: 1;
    padding: 10px;
    border: 2px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.95rem;
  }

  .input:focus {
    outline: none;
    border-color: #667eea;
  }

  .discount-applied {
    margin: 0;
    color: #10b981;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .empty-cart {
    text-align: center;
    padding: 40px 20px;
    background: #f9fafb;
    border-radius: 8px;
    color: #999;
    font-size: 1.1rem;
  }

  .code-example {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-size: 0.8rem;
    overflow-x: auto;
  }

  .code-example h4 {
    color: #f8f8f2;
    margin-bottom: 10px;
  }

  pre {
    margin: 0;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .cart-summary {
      grid-template-columns: repeat(2, 1fr);
    }

    .cart-item {
      grid-template-columns: 1fr;
    }

    .discount-form {
      flex-direction: column;
    }

    .actions {
      flex-direction: column;
    }
  }
</style>
