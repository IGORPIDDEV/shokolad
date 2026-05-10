export type Category = {
  id: string
  title: string
  description: string
  href: string
  image: string
  badge: string
  items: string
  price: string
}

export const categories: Category[] = [
  {
    id: "coffee",
    title: "Кава",
    description: "Еспресо, капучино, лате та сезонні напої",
    href: "/menu?category=coffee",
    image: "/images/categories/coffee.png",
    badge: "Fresh daily",
    items: "15+ позицій",
    price: "від 85₴",
  },
  {
    id: "desserts",
    title: "Десерти",
    description: "Ніжні тістечка, еклери, макарони та солодощі",
    href: "/menu?category=desserts",
    image: "/images/categories/desserts.png",
    badge: "Популярне",
    items: "20+ десертів",
    price: "від 120₴",
  },
  {
    id: "cakes",
    title: "Торти",
    description: "Торти на замовлення та святкові набори",
    href: "/cakes",
    image: "/images/categories/cakes.png",
    badge: "Авторські",
    items: "Custom cakes",
    price: "від 950₴",
  },
]