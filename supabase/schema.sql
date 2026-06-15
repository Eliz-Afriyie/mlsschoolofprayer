create table if not exists public.books (
  id bigint generated always as identity primary key,
  title text not null,
  author text not null,
  category text not null,
  price text not null,
  rating numeric not null default 5,
  image text not null,
  excerpt text not null,
  description text not null,
  amazon_url text,
  is_featured boolean not null default false,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.devotionals (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null,
  image text not null,
  devotional_date date not null,
  read_time text not null,
  author text not null,
  scripture text not null,
  excerpt text not null,
  pdf_url text,
  is_featured boolean not null default false,
  status text not null default 'published',
  publish_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.books enable row level security;
alter table public.devotionals enable row level security;

drop policy if exists "Books are publicly readable" on public.books;
create policy "Books are publicly readable"
on public.books
for select
to anon
using (status = 'published');

drop policy if exists "Devotionals are publicly readable" on public.devotionals;
create policy "Devotionals are publicly readable"
on public.devotionals
for select
to anon
using (status = 'published');

create index if not exists books_status_created_at_idx
on public.books (status, created_at desc);

create index if not exists devotionals_status_date_idx
on public.devotionals (status, devotional_date desc);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  8388608,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Media files are publicly readable" on storage.objects;
create policy "Media files are publicly readable"
on storage.objects
for select
to anon
using (bucket_id = 'media');
