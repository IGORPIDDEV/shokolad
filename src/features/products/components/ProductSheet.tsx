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
  SheetDescription,
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
        className="border-border bg-background mx-auto flex h-[92dvh] max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] p-0 [&>button]:hidden"
      >
        <SheetClose asChild>
          <button
            type="button"
            className="bg-background/80 text-foreground hover:bg-background absolute top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:scale-105"
            aria-label="Закрити"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetClose>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-8 sm:px-6 sm:pt-6">
          <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-[1.75rem] sm:aspect-16/10">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="100vw"
              className="object-cover"
            />

            {product.badge && (
              <div className="bg-background/85 text-foreground absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur">
                {product.badge}
              </div>
            )}
          </div>

          <SheetHeader className="mt-6 text-left">
            <SheetTitle className="text-foreground text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">
              {product.title}
            </SheetTitle>
          </SheetHeader>

          <SheetDescription className="sr-only">
            Детальна інформація про товар та додавання в кошик
          </SheetDescription>

          <p className="text-muted-foreground mt-3 text-base leading-7 font-medium sm:text-lg">
            {product.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 text-xs font-bold">
              {product.weight}
            </span>

            <span className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 text-xs font-bold">
              {product.category}
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            <InfoBlock title="Смак" items={product.taste} />
            <InfoBlock title="Склад" items={product.ingredients} />
            <InfoBlock title="Інформація" items={product.info} />
            <InfoBlock title="Смакує разом з" items={product.pairings} />
          </div>

          <div className="border-border bg-card mt-8 rounded-[1.75rem] border p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground text-sm font-bold">
                  Кількість
                </p>

                <p className="text-foreground mt-1 text-3xl font-extrabold tracking-[-0.045em]">
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

                <span className="text-foreground w-6 text-center text-lg font-bold">
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

        <div className="border-border bg-background/90 shrink-0 border-t p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
          <Button className="w-full" onClick={() => addItem(product, quantity)}>
            <ShoppingBag className="mr-2 h-5 w-5" />
            Додати в кошик · {total}₴
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-border bg-card rounded-[1.5rem] border p-4">
      <p className="text-foreground text-sm font-bold">{title}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 text-xs font-bold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
