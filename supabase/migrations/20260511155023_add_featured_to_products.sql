alter table public.products
add column if not exists is_featured boolean not null default false;

update public.products
set is_featured = true
where slug in (
  'pistachio-cake',
  'cappuccino',
  'chocolate-dessert',
  'custom-cake'
);