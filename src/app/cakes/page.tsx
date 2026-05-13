import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"

import { CakeConstructor } from "@/features/cakes/components/CakeConstructor"

export default function Page() {
  return (
    <>
      <Header />

      <main className="pb-28">
        <CakeConstructor />
      </main>

      <FloatingCart />
    </>
  )
}
