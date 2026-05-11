insert into public.categories (
  slug,
  title,
  description,
  image_url,
  sort_order
)
values
(
  'coffee',
  'Кава',
  'Авторські кавові напої та класика',
  '/images/categories/coffee.jpg',
  1
),
(
  'desserts',
  'Десерти',
  'Ніжні десерти ручної роботи',
  '/images/categories/desserts.jpg',
  2
),
(
  'cakes',
  'Торти',
  'Святкові та авторські торти',
  '/images/categories/cakes.jpg',
  3
);

insert into public.products (
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
  pairings,
  sort_order
)
values
(
  (
    select id
    from public.categories
    where slug = 'desserts'
  ),
  'pistachio-cake',
  'Фісташка-малина',
  'Фісташковий бісквіт, малинове конфі та ніжний крем',
  '/images/products/pistachio-cake.png',
  180,
  '150 г',
  'Хіт',
  array[
    'Фісташка',
    'Малина',
    'Вершковий крем',
    'Бісквіт'
  ],
  array[
    'Ніжний',
    'Горіховий',
    'Ягідний'
  ],
  array[
    'Ручна робота',
    'Свіжі інгредієнти',
    'Premium dessert'
  ],
  array[
    'Капучино',
    'Лате',
    'Флет вайт'
  ],
  1
),
(
  (
    select id
    from public.categories
    where slug = 'coffee'
  ),
  'cappuccino',
  'Капучино',
  'Класичний капучино на зерні преміум якості',
  '/images/products/cappuccino.png',
  85,
  '250 мл',
  'Fresh',
  array[
    'Еспресо',
    'Молоко',
    'Кавові зерна'
  ],
  array[
    'Мʼякий',
    'Вершковий',
    'Балансований'
  ],
  array[
    '100% арабіка',
    'Свіже молоко',
    'Авторське зерно'
  ],
  array[
    'Круасан',
    'Чізкейк',
    'Тірамісу'
  ],
  2
),
(
  (
    select id
    from public.categories
    where slug = 'desserts'
  ),
  'chocolate-dessert',
  'Шоколадний ганаш',
  'Насичений шоколадний десерт з вершковою текстурою',
  '/images/products/chocolate-dessert.png',
  160,
  '140 г',
  'Новинка',
  array[
    'Темний шоколад',
    'Вершки',
    'Какао'
  ],
  array[
    'Насичений',
    'Шоколадний',
    'Creamy'
  ],
  array[
    'Belgian chocolate',
    'Ручна робота',
    'Без штучних ароматизаторів'
  ],
  array[
    'Еспресо',
    'Американо',
    'Раф'
  ],
  3
),
(
  (
    select id
    from public.categories
    where slug = 'cakes'
  ),
  'custom-cake',
  'Торт на замовлення',
  'Авторський торт для свята, події або подарунку',
  '/images/products/custom-cake.png',
  950,
  'від 1 кг',
  'Авторський',
  array[
    'Індивідуальний дизайн',
    'Преміум інгредієнти',
    'Свіжі ягоди'
  ],
  array[
    'Святковий',
    'Ніжний',
    'Premium'
  ],
  array[
    'Під замовлення',
    'Декор вручну',
    'Індивідуальний рецепт'
  ],
  array[
    'Просеко',
    'Кава',
    'Чай'
  ],
  4
);