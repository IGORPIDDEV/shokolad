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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const categorySlugById = await getCategorySlugById()

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
    .eq("slug", slug)
    .eq("is_active", true)
    .single()

  if (error || !data) {
    return null
  }

  return mapProduct(data as DbProduct, categorySlugById)
}

export async function getRelatedProducts(
  slug: string,
  category: ProductCategory
): Promise<Product[]> {
  const categorySlugById = await getCategorySlugById()
  const categoryId = [...categorySlugById.entries()].find(
    ([, value]) => value === category
  )?.[0]

  if (!categoryId) {
    return []
  }

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
    .eq("category_id", categoryId)
    .neq("slug", slug)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .limit(4)

  if (error) {
    console.error("getRelatedProducts error:", error)
    return []
  }

  return ((data ?? []) as DbProduct[]).map((product) =>
    mapProduct(product, categorySlugById)
  )
}

async function getCategorySlugById() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug")
    .eq("is_active", true)

  if (error) {
    console.error("getCategorySlugById error:", error)
    return new Map<string, ProductCategory>()
  }

  return new Map(
    ((data ?? []) as DbCategory[]).map((category) => [
      category.id,
      category.slug,
    ])
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
