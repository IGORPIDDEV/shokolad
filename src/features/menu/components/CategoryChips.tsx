"use client"

const items = [
  { id: "all", label: "Усе" },
  { id: "coffee", label: "Кава" },
  { id: "desserts", label: "Десерти" },
  { id: "cakes", label: "Торти" },
]

type CategoryChipsProps = {
  activeCategory: string
  onChange: (category: string) => void
}

export function CategoryChips({
  activeCategory,
  onChange,
}: CategoryChipsProps) {
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
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
