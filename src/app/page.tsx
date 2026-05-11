import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"

import { Hero } from "@/features/landing/components/Hero"
import { CategoriesSection } from "@/features/landing/components/CategoriesSection"
import { PopularProductsSection } from "@/features/landing/components/PopularProductsSection"

import { getCategories } from "@/features/categories/services/get-categories"
import { getFeaturedProducts } from "@/features/products/services/get-featured-products"

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ])

  return (
    <>
      <Header />

      <main className="pb-28">
        <Hero />
        <CategoriesSection categories={categories} />
        <PopularProductsSection products={products} />
      </main>

      <FloatingCart />
    </>
  )
}
