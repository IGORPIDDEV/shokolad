import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"
import { MenuPage } from "@/features/menu/components/MenuPage"

export default function Page() {
  return (
    <>
      <Header />
      <MenuPage />
      <FloatingCart />
    </>
  )
}