-- Voeg de ontbrekende kolommen toe aan de profiles tabel
-- Voer dit uit in de SQL Editor van je Supabase dashboard

-- Voeg kolommen toe (alleen als ze nog niet bestaan)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS telefoonnummer text,
ADD COLUMN IF NOT EXISTS adres text,
ADD COLUMN IF NOT EXISTS postcode text,
ADD COLUMN IF NOT EXISTS woonplaats text,
ADD COLUMN IF NOT EXISTS vermogensherkomst text;

