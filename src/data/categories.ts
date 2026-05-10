export type Category = {
  id: string
  title: string
  description: string
  href: string
  imageLabel: string
}

export const categories: Category[] = [
  {
    id: "coffee",
    title: "Кава",
    description: "Еспресо, капучино, лате та сезонні напої",
    href: "/menu?category=coffee",
    imageLabel: "Кава",
  },
  {
    id: "desserts",
    title: "Десерти",
    description: "Ніжні тістечка, еклери та солодощі",
    href: "/menu?category=desserts",
    imageLabel: "Десерти",
  },
  {
    id: "cakes",
    title: "Торти",
    description: "Торти на замовлення та святкові набори",
    href: "/cakes",
    imageLabel: "Торти",
  },
]