import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"

import { Hero } from "@/features/landing/components/Hero"
import { CategoriesSection } from "@/features/landing/components/CategoriesSection"
import { PopularProductsSection } from "@/features/landing/components/PopularProductsSection"

export default function Home() {
  return (
    <>
      <Header />

      <main className="pb-28">
        <Hero />
        <CategoriesSection />
        <PopularProductsSection />
      </main>

      <FloatingCart />
    </>
  )
}
