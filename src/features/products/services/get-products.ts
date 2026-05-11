import { products, type Product } from "@/data/products"

export type GetProductsParams = {
  category?: string
  query?: string
  limit?: number
  offset?: number
}

export type GetProductsResult = {
  items: Product[]
  total: number
  hasMore: boolean
}

export function getProducts({
  category = "all",
  query = "",
  limit = 24,
  offset = 0,
}: GetProductsParams = {}): GetProductsResult {
  const normalizedQuery = query.trim().toLowerCase()

  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category

    const matchesQuery =
      !normalizedQuery ||
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)

    return matchesCategory && matchesQuery
  })

  const items = filtered.slice(offset, offset + limit)

  return {
    items,
    total: filtered.length,
    hasMore: offset + limit < filtered.length,
  }
}
