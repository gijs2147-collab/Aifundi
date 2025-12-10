-- Supabase Setup voor Aifundi
-- Voer dit uit in de SQL Editor van je Supabase dashboard

-- 1. Maak de Profiles tabel (Hier komt wie wie is)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  role text default 'investor', -- Iedereen is standaard investeerder
  kyc_status text default 'pending', -- Status van paspoort check
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- 2. Zet de beveiliging (RLS) aan
alter table public.profiles enable row level security;

-- 3. De Gouden Regel: Wie mag wat zien?
-- JIJ mag kijken als het jouw profiel is, OF als je 'admin' bent.
create policy "Users and Admins can view profiles"
on public.profiles for select
using ( 
  auth.uid() = id 
  OR 
  (select role from public.profiles where id = auth.uid()) = 'admin' 
);

-- 4. De regel voor updaten (bijv. KYC goedkeuren)
create policy "Users and Admins can update profiles"
on public.profiles for update
using ( 
  auth.uid() = id 
  OR 
  (select role from public.profiles where id = auth.uid()) = 'admin' 
);

-- 5. Automatisering: Maak direct een profiel aan als iemand zich registreert
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', 'investor');
  return new;
end;
$$;

-- 6. Activeer de automatisering
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

