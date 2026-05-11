"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet"
import { useCartStore } from "@/store/cart-store"

type CartSheetProps = {
  children: React.ReactNode
}

export function CartSheet({ children }: CartSheetProps) {
  const items = useCartStore((state) => state.items)
  const increase = useCartStore((state) => state.increase)
  const decrease = useCartStore((state) => state.decrease)
  const removeItem = useCartStore((state) => state.removeItem)
  const total = useCartStore((state) => state.getTotal())

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

        <div className="border-b border-border px-5 py-5">
          <SheetHeader className="text-left">
            <SheetTitle className="text-3xl font-extrabold tracking-[-0.055em] text-foreground">
              Кошик
            </SheetTitle>
            <SheetDescription className="sr-only">
                Перегляд товарів у кошику та оформлення замовлення
            </SheetDescription>
          </SheetHeader>
          

          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {items.length > 0
              ? "Перевірте замовлення перед оформленням"
              : "Ваш кошик поки порожній"}
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-border bg-card p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>

              <p className="mt-5 text-2xl font-extrabold tracking-[-0.045em] text-foreground">
                Тут поки пусто
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Додайте каву, десерт або торт, щоб оформити замовлення.
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 rounded-[1.5rem] border border-border bg-card p-3 shadow-sm"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.2rem] bg-muted">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="line-clamp-1 text-base font-extrabold tracking-[-0.035em] text-foreground">
                          {item.product.title}
                        </p>

                        <p className="mt-1 text-xs font-bold text-muted-foreground">
                          {item.product.weight}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:text-foreground"
                        aria-label="Видалити"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          onClick={() => decrease(item.product.id)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>

                        <span className="w-6 text-center text-sm font-bold text-foreground">
                          {item.quantity}
                        </span>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          onClick={() => increase(item.product.id)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      <p className="text-lg font-extrabold tracking-[-0.04em] text-foreground">
                        {item.product.price * item.quantity}₴
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-border bg-background/90 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold text-muted-foreground">
              Разом
            </span>

            <span className="text-2xl font-extrabold tracking-[-0.045em] text-foreground">
              {total}₴
            </span>
          </div>

          <Button className="w-full" disabled={items.length === 0}>
            Оформити замовлення
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}