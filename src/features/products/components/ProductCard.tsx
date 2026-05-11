"use client"

import Image from "next/image"
import { Plus, ShoppingBag } from "lucide-react"

import type { Product } from "@/data/products"
import { Button } from "@/components/ui/button"
import { ProductSheet } from "@/features/products/components/ProductSheet"
import { useCartStore } from "@/store/cart-store"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <ProductSheet product={product}>
      <article className="group cursor-pointer overflow-hidden rounded-[2rem] border border-border bg-card/80 p-2.5 shadow-[0_14px_50px_rgba(58,36,28,0.07)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_18px_70px_rgba(58,36,28,0.12)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.3)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {product.badge && (
            <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-xs font-bold text-foreground backdrop-blur">
              {product.badge}
            </div>
          )}

          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-foreground shadow-sm backdrop-blur transition hover:scale-105"
            aria-label="Швидко додати"
            onClick={(event) => {
              event.stopPropagation()
              addItem(product, 1)
            }}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold tracking-[-0.045em] text-foreground">
                {product.title}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {product.description}
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
              {product.weight}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-2xl font-extrabold tracking-[-0.045em] text-foreground">
              {product.price}₴
            </p>

            <Button
              size="sm"
              className="h-11 px-4"
              onClick={(event) => {
                event.stopPropagation()
                addItem(product, 1)
              }}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              У кошик
            </Button>
          </div>
        </div>
      </article>
    </ProductSheet>
  )
}