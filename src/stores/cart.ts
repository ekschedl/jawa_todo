// store/cart.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Interfaces
export interface Product {
  id: number
  title: string
  price: number
  image: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

  // Nutze hier Product statt any
  const addToCart = (product: Product) => {
    const existingItem = cartItems.value.find(item => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ product, quantity: 1 })
    }
  }

  const removeFromCart = (id: number) => {
    const index = cartItems.value.findIndex(item => item.product.id === id)
    if (index !== -1) {
      if (cartItems.value[index].quantity > 1) {
        cartItems.value[index].quantity--
      } else {
        cartItems.value.splice(index, 1)
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  }

}, {
  persist: true
})
