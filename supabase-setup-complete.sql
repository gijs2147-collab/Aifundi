-- Supabase Setup voor Aifundi - Complete Setup
-- Voer dit uit in de SQL Editor van je Supabase dashboard
-- Dit script controleert of dingen al bestaan voordat het ze aanmaakt

-- 1. Maak de Profiles tabel (alleen als deze nog niet bestaat)
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  role text default 'investor',
  kyc_status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- 2. Zet de beveiliging (RLS) aan (als deze nog niet aan staat)
alter table public.profiles enable row level security;

-- 3. Verwijder bestaande policies als ze al bestaan (om duplicaten te voorkomen)
drop policy if exists "Users and Admins can view profiles" on public.profiles;
drop policy if exists "Users and Admins can update profiles" on public.profiles;

-- 4. Maak de policies opnieuw aan
create policy "Users and Admins can view profiles"
on public.profiles for select
using ( 
  auth.uid() = id 
  OR 
  (select role from public.profiles where id = auth.uid()) = 'admin' 
);

create policy "Users and Admins can update profiles"
on public.profiles for update
using ( 
  auth.uid() = id 
  OR 
  (select role from public.profiles where id = auth.uid()) = 'admin' 
);

-- 5. Verwijder bestaande functie en trigger als ze al bestaan
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- 6. Maak de functie opnieuw aan
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', 'investor')
  on conflict (id) do nothing;
  return new;
end;
$$;

-- 7. Activeer de trigger opnieuw
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

