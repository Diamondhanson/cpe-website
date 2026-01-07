-- =========================
-- Fix: "stack depth limit exceeded" (RLS recursion)
-- =========================
-- Symptoms:
-- - Inserts/updates/deletes fail with "stack depth limit exceeded"
-- - Often shows up when inserting into storage.objects (uploads), or loading admin tables
--
-- Root cause:
-- - RLS policies call public.is_admin()
-- - public.is_admin() queries public.profiles
-- - profiles has RLS policies that (directly/indirectly) call public.is_admin()
-- - This can recurse and hit Postgres stack depth limit
--
-- Fix:
-- Make public.is_admin() SECURITY DEFINER and disable row_security inside it
-- so it can safely read public.profiles without invoking RLS again.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
set row_security = off
as $$
  select exists (
    select 1
    from public.profiles p
    where p.user_id = auth.uid()
      and p.is_admin = true
  );
$$;

-- Optional quick sanity check (run while authenticated in SQL editor if you want):
-- select public.is_admin();


