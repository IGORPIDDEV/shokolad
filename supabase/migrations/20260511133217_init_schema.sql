create extension if not exists "pgcrypto";

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  slug text not null unique,
  title text not null,
  description text not null,
  image_url text,
  price integer not null check (price >= 0),
  weight text,
  badge text,
  ingredients text[] not null default '{}',
  taste text[] not null default '{}',
  info text[] not null default '{}',
  pairings text[] not null default '{}',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  delivery_type text not null check (
    delivery_type in ('pickup', 'delivery')
  ),
  address text,
  comment text,
  total integer not null check (total >= 0),
  status text not null default 'new' check (
    status in (
      'new',
      'confirmed',
      'cooking',
      'ready',
      'completed',
      'cancelled'
    )
  ),
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_title text not null,
  price integer not null check (price >= 0),
  quantity integer not null check (quantity > 0),
  total integer not null check (total >= 0),
  created_at timestamptz not null default now()
);

create index categories_slug_idx
  on public.categories(slug);

create index products_slug_idx
  on public.products(slug);

create index products_category_id_idx
  on public.products(category_id);

create index products_is_active_idx
  on public.products(is_active);

create index orders_status_idx
  on public.orders(status);

create index orders_created_at_idx
  on public.orders(created_at desc);

create index order_items_order_id_idx
  on public.order_items(order_id);