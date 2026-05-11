"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import type { Product } from "@/data/products"

import type { Category } from "@/features/categories/services/get-categories"

import { Input } from "@/components/ui/input"
import { Container } from "@/components/shared/Container"

import { ProductCard } from "@/features/products/components/ProductCard"

import { CategoryChips } from "@/features/menu/components/CategoryChips"

type MenuPageProps = {
  products: Product[]
  categories: Category[]
  category: string
  query: string
}

export function MenuPage({
  products,
  categories,
  category,
  query,
}: MenuPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = React.useState(query)

  const [isPending, startTransition] = React.useTransition()

  const [optimisticCategory, setOptimisticCategory] =
    React.useOptimistic(category)

  function updateCategory(nextCategory: string) {
    setOptimisticCategory(nextCategory)

    const params = new URLSearchParams(searchParams.toString())

    if (nextCategory !== "all") {
      params.set("category", nextCategory)
    } else {
      params.delete("category")
    }

    if (searchValue.trim()) {
      params.set("query", searchValue.trim())
    } else {
      params.delete("query")
    }

    const href = params.toString() ? `/menu?${params.toString()}` : "/menu"

    startTransition(() => {
      router.push(href, {
        scroll: false,
      })
    })
  }

  function updateQuery(value: string) {
    setSearchValue(value)

    const params = new URLSearchParams(searchParams.toString())

    if (value.trim()) {
      params.set("query", value.trim())
    } else {
      params.delete("query")
    }

    if (optimisticCategory && optimisticCategory !== "all") {
      params.set("category", optimisticCategory)
    } else {
      params.delete("category")
    }

    const href = params.toString() ? `/menu?${params.toString()}` : "/menu"

    startTransition(() => {
      router.push(href, {
        scroll: false,
      })
    })
  }

  return (
    <main className="pb-28">
      <section className="bg-background py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="border-border bg-card/80 rounded-[2rem] border p-5 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur sm:p-8 lg:rounded-[3rem]">
            <p className="border-border bg-background text-muted-foreground mb-4 inline-flex rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase shadow-sm">
              Меню
            </p>

            <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
              <div>
                <h1 className="text-foreground max-w-3xl text-5xl leading-[0.92] font-extrabold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  Оберіть щось смачне
                </h1>

                <p className="text-muted-foreground mt-5 max-w-xl text-base leading-7 font-medium sm:text-lg">
                  Кава, десерти та торти ручної роботи — усе в одному меню.
                </p>
              </div>

              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />

                <Input
                  value={searchValue}
                  onChange={(event) => updateQuery(event.target.value)}
                  placeholder="Пошук у меню"
                  className="border-border/70 bg-background placeholder:text-muted-foreground/45 h-14 rounded-2xl pl-12 text-[15px] font-medium focus-visible:border-[#C58A5C] focus-visible:ring-1 focus-visible:ring-[#C58A5C]/30"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CategoryChips
              categories={categories}
              activeCategory={optimisticCategory}
              onChange={updateCategory}
            />
          </div>

          {isPending ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!isPending && products.length === 0 && (
            <div className="border-border bg-card mt-6 rounded-[2rem] border p-8 text-center">
              <p className="text-foreground text-2xl font-extrabold tracking-[-0.045em]">
                Нічого не знайдено
              </p>

              <p className="text-muted-foreground mt-2 text-sm">
                Спробуйте інший запит або категорію.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="border-border bg-card/80 overflow-hidden rounded-[2rem] border p-2.5 shadow-[0_14px_50px_rgba(58,36,28,0.07)] backdrop-blur">
      <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
        <div className="bg-background/60 absolute top-4 left-4 h-[26px] w-[58px] animate-pulse rounded-full" />

        <div className="bg-background/60 absolute top-4 right-4 h-10 w-10 animate-pulse rounded-full" />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="bg-muted h-[32px] w-4/5 animate-pulse rounded-2xl" />

            <div className="bg-muted mt-3 h-4 w-full animate-pulse rounded-full" />

            <div className="bg-muted mt-2 h-4 w-3/4 animate-pulse rounded-full" />
          </div>

          <div className="bg-muted h-[24px] w-[58px] shrink-0 animate-pulse rounded-full" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="bg-muted h-[32px] w-[70px] animate-pulse rounded-2xl" />

          <div className="bg-muted h-11 w-[104px] animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  )
}
