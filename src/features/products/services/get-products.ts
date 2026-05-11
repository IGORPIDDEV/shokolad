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

type GetProductsParams = {
  category?: string
  query?: string
  limit?: number
  offset?: number
}

export async function getProducts({
  category = "all",
  query = "",
  limit = 24,
  offset = 0,
}: GetProductsParams = {}) {
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, slug")
    .eq("is_active", true)

  if (categoriesError) {
    console.error("getProducts categories error:", categoriesError)
    throw new Error(categoriesError.message)
  }

  const categoryList = (categories ?? []) as DbCategory[]

  const categoryIdBySlug = new Map(
    categoryList.map((category) => [category.slug, category.id])
  )

  const categorySlugById = new Map(
    categoryList.map((category) => [category.id, category.slug])
  )

  const categoryId =
    category !== "all"
      ? categoryIdBySlug.get(category as ProductCategory)
      : undefined

  if (category !== "all" && !categoryId) {
    return {
      items: [],
      total: 0,
      hasMore: false,
    }
  }

  let request = supabase
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
      `,
      { count: "exact" }
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .range(offset, offset + limit - 1)

  if (categoryId) {
    request = request.eq("category_id", categoryId)
  }

  if (query.trim()) {
    request = request.or(
      `title.ilike.%${query.trim()}%,description.ilike.%${query.trim()}%`
    )
  }

  const { data, count, error } = await request

  if (error) {
    console.error("getProducts products error:", error)
    throw new Error(error.message)
  }

  return {
    items: ((data ?? []) as DbProduct[]).map((product) =>
      mapProduct(product, categorySlugById)
    ),
    total: count ?? 0,
    hasMore: (count ?? 0) > offset + limit,
  }
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
