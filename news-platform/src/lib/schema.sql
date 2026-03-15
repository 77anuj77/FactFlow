-- Categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique
);

-- Articles table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category_id uuid not null references public.categories(id) on delete restrict,
  author_id uuid not null references auth.users(id) on delete cascade,
  image_url text,
  created_at timestamptz not null default now()
);

-- Helpful index for ordering by created_at
create index if not exists articles_created_at_idx on public.articles (created_at desc);

