create table if not exists public.user_carts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_carts enable row level security;

grant select, insert, update, delete on public.user_carts to authenticated;

create policy "Users can read their own cart"
  on public.user_carts for select
  using (auth.uid() = user_id);

create policy "Users can create their own cart"
  on public.user_carts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cart"
  on public.user_carts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own cart"
  on public.user_carts for delete
  using (auth.uid() = user_id);
