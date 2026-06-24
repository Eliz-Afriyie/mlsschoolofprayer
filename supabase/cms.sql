create table if not exists public.site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Site content is publicly readable" on public.site_content;
create policy "Site content is publicly readable"
on public.site_content
for select
to anon
using (true);
