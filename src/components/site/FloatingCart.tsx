"use client"

import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartSheet } from "@/features/cart/components/CartSheet"
import { useCartStore } from "@/store/cart-store"

export function FloatingCart() {
  const count = useCartStore((state) => state.getItemsCount())
  const total = useCartStore((state) => state.getTotal())

  if (count === 0) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-4 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <CartSheet>
        <Button className="h-[56px] w-full rounded-[1.6rem] text-base font-semibold shadow-2xl">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Кошик · {count} · {total}₴
        </Button>
      </CartSheet>
    </div>
  )
}
