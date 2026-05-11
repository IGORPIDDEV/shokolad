export type Product = {
  id: string
  title: string
  description: string
  image: string
  price: number
  weight: string
  badge?: string
  category: "coffee" | "desserts" | "cakes"
}

export const products: Product[] = [
  {
    id: "pistachio-cake",
    title: "Фісташка-малина",
    description: "Фісташковий бісквіт, малинове конфі та ніжний крем",
    image: "/images/products/pistachio-cake.png",
    price: 180,
    weight: "150 г",
    badge: "Хіт",
    category: "desserts",
  },
  {
    id: "cappuccino",
    title: "Капучино",
    description: "Класичний капучино на зерні преміум якості",
    image: "/images/products/cappuccino.png",
    price: 85,
    weight: "250 мл",
    badge: "Fresh",
    category: "coffee",
  },
  {
    id: "chocolate-dessert",
    title: "Шоколадний ганаш",
    description: "Насичений шоколадний десерт з вершковою текстурою",
    image: "/images/products/chocolate-dessert.png",
    price: 160,
    weight: "140 г",
    badge: "Новинка",
    category: "desserts",
  },
  {
    id: "custom-cake",
    title: "Торт на замовлення",
    description: "Авторський торт для свята, події або подарунку",
    image: "/images/products/custom-cake.png",
    price: 950,
    weight: "від 1 кг",
    badge: "Авторський",
    category: "cakes",
  },
]