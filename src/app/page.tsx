import { Header } from "@/components/site/Header"

import { Hero } from "@/features/landing/components/Hero"
import { CategoriesSection } from "@/features/landing/components/CategoriesSection"

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <CategoriesSection />
      </main>
    </>
  )
}