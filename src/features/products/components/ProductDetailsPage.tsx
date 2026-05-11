"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react"

import type { Product } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/Container"
import { useCartStore } from "@/store/cart-store"

type ProductDetailsPageProps = {
  product: Product
}

export function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const [quantity, setQuantity] = React.useState(1)
  const addItem = useCartStore((state) => state.addItem)

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const total = product.price * quantity

  return (
    <main className="pb-28">
      <section className="bg-background py-6 sm:py-10 lg:py-14">
        <Container>
          <Link
            href="/menu"
            prefetch
            className="text-muted-foreground hover:text-foreground mb-5 inline-flex items-center text-sm font-bold transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад до меню
          </Link>

          <div className="border-border bg-card/80 overflow-hidden rounded-[2rem] border p-3 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur lg:rounded-[3rem] lg:p-5">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-[1.6rem] lg:aspect-[4/5] lg:rounded-[2.5rem]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {product.badge && (
                  <div className="bg-background/85 text-foreground absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur">
                    {product.badge}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center px-2 py-4 sm:px-4 lg:py-8">
                <p className="border-border bg-background text-muted-foreground mb-4 inline-flex w-fit rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
                  {product.category}
                </p>

                <h1 className="text-foreground text-5xl leading-[0.92] font-extrabold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  {product.title}
                </h1>

                <p className="text-muted-foreground mt-5 max-w-xl text-base leading-7 font-medium sm:text-lg">
                  {product.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <InfoChip>{product.weight}</InfoChip>
                  {product.taste.map((taste) => (
                    <InfoChip key={taste}>{taste}</InfoChip>
                  ))}
                </div>

                <div className="border-border bg-background mt-8 rounded-[1.75rem] border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm font-bold">
                        Разом
                      </p>
                      <p className="text-foreground mt-1 text-3xl font-black tracking-[-0.045em]">
                        {total}₴
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        onClick={() =>
                          setQuantity((value) => Math.max(1, value - 1))
                        }
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
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="mt-5 w-full"
                    onClick={() => addItem(product, quantity)}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Додати в кошик · {total}₴
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <DetailsBlock title="Склад" items={product.ingredients} />
            <DetailsBlock title="Смак" items={product.taste} />
            <DetailsBlock title="Інформація" items={product.info} />
          </div>
        </Container>
      </section>
    </main>
  )
}

function InfoChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-muted text-muted-foreground rounded-full px-3 py-1.5 text-xs font-bold">
      {children}
    </span>
  )
}

function DetailsBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border-border bg-card/80 rounded-[1.75rem] border p-5 shadow-sm backdrop-blur">
      <p className="text-muted-foreground text-sm font-bold">{title}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <InfoChip key={item}>{item}</InfoChip>
        ))}
      </div>
    </div>
  )
}
