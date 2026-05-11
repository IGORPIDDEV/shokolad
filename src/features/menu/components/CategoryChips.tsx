"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

const items = [
  { id: "all", label: "Усе" },
  { id: "coffee", label: "Кава" },
  { id: "desserts", label: "Десерти" },
  { id: "cakes", label: "Торти" },
]

type CategoryChipsProps = {
  activeCategory: string
}

export function CategoryChips({ activeCategory }: CategoryChipsProps) {
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get("query")

  function getHref(category: string) {
    const params = new URLSearchParams()

    if (category !== "all") {
      params.set("category", category)
    }

    if (currentQuery) {
      params.set("query", currentQuery)
    }

    const query = params.toString()

    return query ? `/menu?${query}` : "/menu"
  }

  return (
    <div className="border-border bg-background/85 lg:bg-card/70 sticky top-20 z-30 -mx-4 border-y px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:rounded-full lg:border lg:px-3">
      <div className="flex gap-2 overflow-x-auto">
        {items.map((item) => {
          const isActive = activeCategory === item.id

          return (
            <Link
              key={item.id}
              href={getHref(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
