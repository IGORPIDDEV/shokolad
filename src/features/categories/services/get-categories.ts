import { supabase } from "@/lib/supabase/client"

export type Category = {
  id: string
  slug: string
  title: string
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, title")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("getCategories error:", error)
    throw new Error(error.message)
  }

  return (data ?? []) as Category[]
}
