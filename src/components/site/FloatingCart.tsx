"use client"

import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FloatingCart() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-40 px-4 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <Button className="h-13 w-full rounded-[1.5rem] shadow-2xl">
        <ShoppingBag className="mr-2 h-5 w-5" />
        Кошик · 0₴
      </Button>
    </div>
  )
}