import { create } from "zustand"

import type { Product } from "@/data/products"

export type CartItem = {
  product: Product
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  increase: (productId: string) => void
  decrease: (productId: string) => void
  clear: () => void
  getItemsCount: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    const items = get().items
    const existingItem = items.find((item) => item.product.id === product.id)

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      })
      return
    }

    set({
      items: [...items, { product, quantity }],
    })
  },

  removeItem: (productId) => {
    set({
      items: get().items.filter((item) => item.product.id !== productId),
    })
  },

  increase: (productId) => {
    set({
      items: get().items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })
  },

  decrease: (productId) => {
    set({
      items: get().items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      ),
    })
  },

  clear: () => set({ items: [] }),

  getItemsCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  getTotal: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
}))
