import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { products } from "@/data/products"

import { Container } from "@/components/shared/Container"

import { ProductCard } from "@/features/products/components/ProductCard"

export function PopularProductsSection() {
  return (
    <section className="bg-background py-10 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-border bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
              Популярне
            </p>

            <h2 className="max-w-2xl text-4xl font-extrabold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl">
              Найчастіше обирають гості
            </h2>
          </div>

          <Link
            href="/menu"
            className="hidden items-center rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-foreground shadow-sm transition hover:bg-muted sm:inline-flex"
          >
            Усе меню
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <Link
          href="/menu"
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-bold text-foreground shadow-sm sm:hidden"
        >
          Переглянути все меню
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Container>
    </section>
  )
}