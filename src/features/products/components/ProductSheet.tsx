"use client"

import * as React from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useCartStore } from "@/store/cart-store"

import type { Product } from "@/data/products"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type ProductSheetProps = {
  product: Product
  children: React.ReactNode
}

export function ProductSheet({ product, children }: ProductSheetProps) {
  const [quantity, setQuantity] = React.useState(1)
  const total = product.price * quantity
  const addItem = useCartStore((state) => state.addItem)

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="bottom"
        className="mx-auto flex h-[92dvh] max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] border-border bg-background p-0 [&>button]:hidden"
      >
        <SheetClose asChild>
          <button
            type="button"
            className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-background/80 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:scale-105 hover:bg-background"
            aria-label="Закрити"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetClose>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-4 sm:px-6 sm:pt-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-muted sm:aspect-[16/10]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="100vw"
              className="object-cover"
            />

            {product.badge && (
              <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-xs font-bold text-foreground backdrop-blur">
                {product.badge}
              </div>
            )}
          </div>

          <SheetHeader className="mt-6 text-left">
            <SheetTitle className="text-4xl font-extrabold tracking-[-0.055em] text-foreground sm:text-5xl">
              {product.title}
            </SheetTitle>
          </SheetHeader>

          <p className="mt-3 text-base font-medium leading-7 text-muted-foreground sm:text-lg">
            {product.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">
              {product.weight}
            </span>

            <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">
              {product.category}
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            <InfoBlock title="Смак" items={product.taste} />
            <InfoBlock title="Склад" items={product.ingredients} />
            <InfoBlock title="Інформація" items={product.info} />
            <InfoBlock title="Смакує разом з" items={product.pairings} />
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-muted-foreground">
                  Кількість
                </p>

                <p className="mt-1 text-3xl font-extrabold tracking-[-0.045em] text-foreground">
                  {total}₴
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Зменшити кількість"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-6 text-center text-lg font-bold text-foreground">
                  {quantity}
                </span>

                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Збільшити кількість"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-border bg-background/90 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
          <Button className="w-full" onClick={() => addItem(product, quantity)}>
            <ShoppingBag className="mr-2 h-5 w-5" />
            Додати в кошик · {total}₴
        </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function InfoBlock({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card p-4">
      <p className="text-sm font-bold text-foreground">{title}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}