"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { getProducts } from "@/features/products/services/get-products"
import { Input } from "@/components/ui/input"
import { Container } from "@/components/shared/Container"
import { ProductCard } from "@/features/products/components/ProductCard"
import { CategoryChips } from "@/features/menu/components/CategoryChips"

export function MenuPage() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category") || "all"

  const [selectedCategory, setSelectedCategory] =
    React.useState<string | null>(null)

  const [query, setQuery] = React.useState("")

  const activeCategory = selectedCategory ?? categoryFromUrl

  const result = getProducts({
    category: activeCategory,
    query,
    limit: 24,
    offset: 0,
  })

  const filteredProducts = result.items

  return (
    <main className="pb-28">
      <section className="bg-background py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="rounded-[2rem] border border-border bg-card/80 p-5 shadow-[0_20px_80px_rgba(58,36,28,0.08)] backdrop-blur sm:p-8 lg:rounded-[3rem]">
            <p className="mb-4 inline-flex rounded-full border border-border bg-background px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              Меню
            </p>

            <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
              <div>
                <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.92] tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl">
                  Оберіть щось смачне
                </h1>

                <p className="mt-5 max-w-xl text-base font-medium leading-7 text-muted-foreground sm:text-lg">
                  Кава, десерти та торти ручної роботи — усе в одному меню.
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Пошук у меню"
                  className="h-14 rounded-2xl border-border/70 bg-background pl-12 text-[15px] font-medium placeholder:text-muted-foreground/45 focus-visible:border-[#C58A5C] focus-visible:ring-1 focus-visible:ring-[#C58A5C]/30"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <CategoryChips
              activeCategory={activeCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="mt-6 rounded-[2rem] border border-border bg-card p-8 text-center">
              <p className="text-2xl font-extrabold tracking-[-0.045em] text-foreground">
                Нічого не знайдено
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Спробуйте інший запит або категорію.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}