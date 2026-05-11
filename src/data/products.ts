export type Product = {
  id: string
  title: string
  description: string
  image: string
  price: number
  weight: string
  badge?: string
  category: "coffee" | "desserts" | "cakes"
  ingredients: string[]
  taste: string[]
  info: string[]
  pairings: string[]
}

export const products: Product[] = [
  {
    id: "pistachio-cake",
    title: "Фісташка-малина",
    description:
      "Фісташковий бісквіт, малинове конфі та ніжний крем",
    image: "/images/products/pistachio-cake.png",
    price: 180,
    weight: "150 г",
    badge: "Хіт",
    category: "desserts",

    ingredients: [
      "Фісташка",
      "Малина",
      "Вершковий крем",
      "Бісквіт",
    ],

    taste: [
      "Горіховий",
      "Ніжний",
      "Ягідний",
    ],

    info: [
      "Готуємо щодня",
      "Без заморожування",
      "Доступно сьогодні",
    ],

    pairings: [
      "Капучино",
      "Лате",
      "Флет вайт",
    ],
  },

  {
    id: "cappuccino",
    title: "Капучино",
    description:
      "Класичний капучино на зерні преміум якості",
    image: "/images/products/cappuccino.png",
    price: 85,
    weight: "250 мл",
    badge: "Fresh",
    category: "coffee",

    ingredients: [
      "Еспресо",
      "Молоко",
      "Молочна піна",
      "Арабіка",
    ],

    taste: [
      "Насичений",
      "Мʼякий",
      "Кремовий",
    ],

    info: [
      "100% арабіка",
      "Свіже обсмаження",
      "Готуємо під замовлення",
    ],

    pairings: [
      "Круасан",
      "Макарон",
      "Чізкейк",
    ],
  },

  {
    id: "chocolate-dessert",
    title: "Шоколадний ганаш",
    description:
      "Насичений шоколадний десерт з вершковою текстурою",
    image: "/images/products/chocolate-dessert.png",
    price: 160,
    weight: "140 г",
    badge: "Новинка",
    category: "desserts",

    ingredients: [
      "Темний шоколад",
      "Вершки",
      "Какао",
      "Бісквіт",
    ],

    taste: [
      "Шоколадний",
      "Насичений",
      "Оксамитовий",
    ],

    info: [
      "Авторський рецепт",
      "Без заморожування",
      "Доступно сьогодні",
    ],

    pairings: [
      "Еспресо",
      "Американо",
      "Раф кава",
    ],
  },

  {
    id: "custom-cake",
    title: "Торт на замовлення",
    description:
      "Авторський торт для свята, події або подарунку",
    image: "/images/products/custom-cake.png",
    price: 950,
    weight: "від 1 кг",
    badge: "Авторський",
    category: "cakes",

    ingredients: [
      "Шоколад",
      "Ягоди",
      "Крем",
      "Бісквіт",
    ],

    taste: [
      "Святковий",
      "Ніжний",
      "Авторський",
    ],

    info: [
      "Індивідуальний дизайн",
      "Під замовлення",
      "Можна додати напис",
    ],

    pairings: [
      "Капучино",
      "Просеко",
      "Чай",
    ],
  },
]