import { Suspense } from "react"

import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"

import { MenuPage } from "@/features/menu/components/MenuPage"

import { getProducts } from "@/features/products/services/get-products"
import { getCategories } from "@/features/categories/services/get-categories"

type PageProps = {
  searchParams: Promise<{
    category?: string
    query?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams

  const category = params.category || "all"
  const query = params.query || ""

  const [result, categories] = await Promise.all([
    getProducts({
      category,
      query,
      limit: 24,
      offset: 0,
    }),
    getCategories(),
  ])

  return (
    <>
      <Header />

      <Suspense fallback={null}>
        <MenuPage
          products={result.items}
          categories={categories}
          category={category}
          query={query}
        />
      </Suspense>

      <FloatingCart />
    </>
  )
}
