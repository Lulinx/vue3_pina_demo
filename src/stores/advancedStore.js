import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 进阶 Pinia 演示 Store
 * 演示：
 * 1. Store 间的依赖关系
 * 2. $patch 和 $state 直接修改
 * 3. $reset 重置状态
 * 4. getters 中使用 this 访问其他 getters
 * 5. 状态订阅和监听
 * 6. 复杂的异步操作
 */

export const useAdvancedStore = defineStore('advanced', () => {
  // ============= STATE =============
  const products = ref([
    { id: 1, name: '手机', price: 2999, inventory: 50 },
    { id: 2, name: '平板', price: 1999, inventory: 30 },
    { id: 3, name: '电脑', price: 5999, inventory: 20 }
  ])

  const orders = ref([])
  const nextOrderId = ref(1000)
  const selectedProductIds = ref([])
  const discountRate = ref(0) // 0-1 的折扣率

  // ============= GETTERS（高级用法）=============

  // 1. 获取选中的产品
  const selectedProducts = computed(() => {
    return products.value.filter(p => selectedProductIds.value.includes(p.id))
  })

  // 2. 计算选中产品的小计（演示 getters 互相引用）
  const selectedProductsSubtotal = computed(() => {
    return selectedProducts.value.reduce((sum, p) => sum + p.price, 0)
  })

  // 3. 应用折扣后的总价（演示 this 的使用）
  const selectedProductsTotal = computed(() => {
    return selectedProductsSubtotal.value * (1 - discountRate.value)
  })

  // 4. 获取产品统计信息
  const productStats = computed(() => ({
    total: products.value.length,
    inStock: products.value.filter(p => p.inventory > 0).length,
    outOfStock: products.value.filter(p => p.inventory === 0).length,
    averagePrice: (products.value.reduce((sum, p) => sum + p.price, 0) / products.value.length).toFixed(2)
  }))

  // 5. 获取订单统计
  const orderStats = computed(() => ({
    total: orders.value.length,
    totalAmount: orders.value.reduce((sum, o) => sum + o.amount, 0).toFixed(2),
    averageOrderValue: orders.value.length > 0 
      ? (orders.value.reduce((sum, o) => sum + o.amount, 0) / orders.value.length).toFixed(2)
      : 0
  }))

  // ============= ACTIONS =============

  // 1. 选择/取消选择产品
  const toggleProductSelection = (productId) => {
    const index = selectedProductIds.value.indexOf(productId)
    if (index > -1) {
      selectedProductIds.value.splice(index, 1)
    } else {
      selectedProductIds.value.push(productId)
    }
  }

  // 2. 清空选择
  const clearSelection = () => {
    selectedProductIds.value = []
  }

  // 3. 更新产品库存（演示 $patch 的两种用法）
  const updateProductInventory = (productId, quantity) => {
    // 用法 1：对象方式 patch
    const product = products.value.find(p => p.id === productId)
    if (product) {
      product.inventory = Math.max(0, product.inventory - quantity)
    }
  }

  // 4. 批量更新状态（演示 $patch）
  const applyBulkDiscount = (discountPercent) => {
    // 这展示了如何使用 $patch
    // 在组件中可以这样调用：store.$patch({ discountRate: 0.1 })
    discountRate.value = discountPercent / 100
  }

  // 5. 创建订单（演示异步操作和复杂业务逻辑）
  const createOrder = async () => {
    if (selectedProducts.value.length === 0) {
      throw new Error('请先选择商品')
    }

    // 模拟异步 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 检查库存
    for (const product of selectedProducts.value) {
      if (product.inventory === 0) {
        throw new Error(`${product.name} 库存不足`)
      }
    }

    // 创建订单
    const orderId = nextOrderId.value++
    const order = {
      id: orderId,
      items: selectedProducts.value.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price
      })),
      amount: selectedProductsTotal.value,
      status: 'pending',
      createdAt: new Date().toLocaleString()
    }

    orders.value.push(order)

    // 更新库存
    for (const product of selectedProducts.value) {
      updateProductInventory(product.id, 1)
    }

    // 清空选择
    clearSelection()

    return order
  }

  // 6. 直接修改状态（演示不推荐的方式，但有时候需要）
  const directStateModification = (updates) => {
    // 不推荐：直接修改
    // Object.assign(state, updates)
    
    // 推荐：使用 mutations/actions
    // 但如果一定要直接修改多个状态，可以使用 $patch
  }

  // 7. 重置特定部分的状态
  const resetOrders = () => {
    orders.value = []
    nextOrderId.value = 1000
  }

  // 8. 获取订单历史
  const getOrderById = (orderId) => {
    return orders.value.find(o => o.id === orderId)
  }

  // 9. 取消订单
  const cancelOrder = (orderId) => {
    const orderIndex = orders.value.findIndex(o => o.id === orderId)
    if (orderIndex > -1) {
      orders.value[orderIndex].status = 'cancelled'
    }
  }

  // 10. 高级查询：根据条件搜索产品
  const searchProducts = (keyword) => {
    return products.value.filter(p => 
      p.name.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  // 11. 重置整个状态（Setup Store 必须显式定义 $reset）
  const $reset = () => {
    selectedProductIds.value = []
    discountRate.value = 0
    orders.value = []
    nextOrderId.value = 1000
  }

  // 返回暴露的属性
  return {
    // State
    products,
    orders,
    selectedProductIds,
    discountRate,

    // Getters
    selectedProducts,
    selectedProductsSubtotal,
    selectedProductsTotal,
    productStats,
    orderStats,

    // Actions
    toggleProductSelection,
    clearSelection,
    updateProductInventory,
    applyBulkDiscount,
    createOrder,
    resetOrders,
    getOrderById,
    cancelOrder,
    searchProducts,
    directStateModification,
    $reset
  }
})
