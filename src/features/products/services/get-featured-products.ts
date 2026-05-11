import { supabase } from "@/lib/supabase/client"

import type { Product } from "@/data/products"

type ProductCategory = "coffee" | "desserts" | "cakes"

type DbProduct = {
  id: string
  category_id: string | null
  slug: string
  title: string
  description: string
  image_url: string | null
  price: number
  weight: string | null
  badge: string | null
  ingredients: string[] | null
  taste: string[] | null
  info: string[] | null
  pairings: string[] | null
}

type DbCategory = {
  id: string
  slug: ProductCategory
}

export async function getFeaturedProducts() {
  const { data: categories } = await supabase
    .from("categories")
    .select("id, slug")

  const categorySlugById = new Map(
    ((categories ?? []) as DbCategory[]).map((category) => [
      category.id,
      category.slug,
    ])
  )

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      category_id,
      slug,
      title,
      description,
      image_url,
      price,
      weight,
      badge,
      ingredients,
      taste,
      info,
      pairings
    `
    )
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("getFeaturedProducts error:", error)
    throw new Error(error.message)
  }

  return ((data ?? []) as DbProduct[]).map((product) =>
    mapProduct(product, categorySlugById)
  )
}

function mapProduct(
  product: DbProduct,
  categorySlugById: Map<string, ProductCategory>
): Product {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    description: product.description,
    image: product.image_url || "/images/products/placeholder.png",
    price: product.price,
    weight: product.weight || "",
    badge: product.badge || undefined,
    category: product.category_id
      ? categorySlugById.get(product.category_id) || "desserts"
      : "desserts",
    ingredients: product.ingredients || [],
    taste: product.taste || [],
    info: product.info || [],
    pairings: product.pairings || [],
  }
}
