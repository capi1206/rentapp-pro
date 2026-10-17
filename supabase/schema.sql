create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 business_name text,
 created_at timestamptz default now()
);
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null,
 price numeric not null default 0,
 units integer not null default 0,
 variable_cost numeric not null default 0,
 fixed_cost numeric not null default 0,
 real_cost numeric not null default 0,
 profit numeric not null default 0,
 margin numeric not null default 0,
 target_margin numeric not null default 0,
 recommended_price numeric not null default 0,
 break_even integer not null default 0,
 created_at timestamptz default now()
);
create table if not exists public.entitlements (
 id uuid primary key default gen_random_uuid(),
 email text unique not null,
 is_active boolean not null default false,
 hotmart_event text,
 raw_event jsonb,
 updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
alter table public.products enable row level security;
create policy "profiles own" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "products own" on public.products for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer as $$
begin insert into public.profiles(id) values(new.id) on conflict do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();