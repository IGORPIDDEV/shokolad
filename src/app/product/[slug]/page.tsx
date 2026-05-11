import { notFound } from "next/navigation"

import { Header } from "@/components/site/Header"
import { FloatingCart } from "@/components/site/FloatingCart"
import { ProductDetailsPage } from "@/features/products/components/ProductDetailsPage"
import { getProductBySlug } from "@/features/products/services/get-product"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <ProductDetailsPage product={product} />
      <FloatingCart />
    </>
  )
}
