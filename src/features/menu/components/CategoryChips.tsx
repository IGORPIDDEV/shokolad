"use client"

import type { Category } from "@/features/categories/services/get-categories"

type CategoryChipsProps = {
  categories: Category[]
  activeCategory: string
  onChange: (category: string) => void
}

export function CategoryChips({
  categories,
  activeCategory,
  onChange,
}: CategoryChipsProps) {
  const items = [
    {
      id: "all",
      title: "Усе",
    },
    ...categories.map((category) => ({
      id: category.slug,
      title: category.title,
    })),
  ]

  return (
    <div className="border-border bg-background/85 lg:bg-card/70 sticky top-20 z-30 -mx-4 border-y px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:rounded-full lg:border lg:px-3">
      <div className="flex gap-2 overflow-x-auto">
        {items.map((item) => {
          const isActive = activeCategory === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
