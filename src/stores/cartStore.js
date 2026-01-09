import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCounterStore } from './counterStore'

/**
 * Demo 4: 购物车 Store
 * 演示：
 * 1. 多个Store的创建和使用
 * 2. Store之间的相互调用（依赖其他Store）
 * 3. 复杂的计算逻辑
 */

// 产品 Store
export const useProductStore = defineStore('product', () => {
  const products = ref([
    { id: 1, name: '苹果', price: 5.99, stock: 100 },
    { id: 2, name: '香蕉', price: 3.99, stock: 50 },
    { id: 3, name: '橙子', price: 4.99, stock: 75 },
    { id: 4, name: '葡萄', price: 8.99, stock: 40 }
  ])

  const getProduct = (id) => {
    return products.value.find(p => p.id === id)
  }

  const updateStock = (productId, quantity) => {
    const product = getProduct(productId)
    if (product) {
      product.stock -= quantity
    }
  }

  return {
    products,
    getProduct,
    updateStock
  }
})

// 购物车 Store
export const useCartStore = defineStore('cart', () => {
  // ============= STATE =============
  const items = ref([])
  const shippingFee = ref(10)
  const discountCode = ref('')
  const discountPercent = ref(0)

  // ============= GETTERS =============
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  })

  const discount = computed(() => {
    return Math.floor(subtotal.value * (discountPercent.value / 100))
  })

  const total = computed(() => {
    return subtotal.value - discount.value + shippingFee.value
  })

  const summary = computed(() => ({
    itemCount: itemCount.value,
    subtotal: subtotal.value.toFixed(2),
    discount: discount.value.toFixed(2),
    shippingFee: shippingFee.value.toFixed(2),
    total: total.value.toFixed(2)
  }))

  // ============= ACTIONS =============
  
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
      })
    }
  }

  const removeItem = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  const applyDiscount = (code) => {
    discountCode.value = code
    // 模拟优惠码逻辑
    const discounts = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME': 15
    }
    discountPercent.value = discounts[code] || 0
  }

  const clearCart = () => {
    items.value = []
    discountCode.value = ''
    discountPercent.value = 0
  }

  // 调用其他Store的Action
  const checkout = () => {
    const counterStore = useCounterStore()
    const productStore = useProductStore()
    
    // 示例：将购物车项数加到计数器
    counterStore.addAmount(itemCount.value)
    
    // 更新产品库存
    items.value.forEach(item => {
      productStore.updateStock(item.id, item.quantity)
    })
    
    return {
      success: true,
      message: '订单已创建！',
      summary: summary.value
    }
  }

  return {
    items,
    shippingFee,
    discountCode,
    discountPercent,
    itemCount,
    subtotal,
    discount,
    total,
    summary,
    addItem,
    removeItem,
    updateQuantity,
    applyDiscount,
    clearCart,
    checkout
  }
})
