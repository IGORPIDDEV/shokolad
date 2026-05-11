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

  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  )

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
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Пошук у меню"
                  className="border-border/70 bg-background placeholder:text-muted-foreground/45 h-14 rounded-2xl pl-12 text-[15px] font-medium focus-visible:border-[#C58A5C] focus-visible:ring-1 focus-visible:ring-[#C58A5C]/30"
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
