-- =========================
-- Supabase schema + RLS
-- =========================
-- Run this in Supabase SQL Editor (project: Fanarts Studio / CPE website)
-- Safe to run multiple times where possible.

-- Extensions (Supabase usually has pgcrypto already)
create extension if not exists pgcrypto;

-- -------------------------
-- Admin helper: profiles + is_admin()
-- -------------------------
create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- IMPORTANT:
-- This must be SECURITY DEFINER + row_security = off, otherwise any policy that calls
-- public.is_admin() can recurse back into profiles RLS and cause:
--   "stack depth limit exceeded"
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

-- Create a profile row for every new auth user
-- Automatically sets is_admin = true for all new users
create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Insert profile with error handling
  -- Use a subtransaction to prevent rollback if profile already exists
  begin
    insert into public.profiles (user_id, is_admin)
    values (new.id, true);
  exception
    when unique_violation then
      -- Profile already exists, update it to ensure is_admin = true
      update public.profiles
      set is_admin = true
      where user_id = new.id;
    when others then
      -- Log error but don't fail user creation
      raise warning 'Error creating profile for user %: %', new.id, SQLERRM;
  end;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute procedure public.handle_new_user_profile();

-- Profiles policies
drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
on public.profiles
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Admins can update profiles"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete profiles" on public.profiles;
create policy "Admins can delete profiles"
on public.profiles
for delete
to authenticated
using (public.is_admin());

-- Allow service role and trigger to manage profiles
-- This is needed for the trigger function and dashboard operations
drop policy if exists "Service role can manage profiles" on public.profiles;
create policy "Service role can manage profiles"
on public.profiles
for all
to service_role
using (true)
with check (true);

-- Allow users to delete their own profile (for cascade deletes)
drop policy if exists "Users can delete their own profile" on public.profiles;
create policy "Users can delete their own profile"
on public.profiles
for delete
to authenticated
using (user_id = auth.uid());

-- -------------------------
-- Team members
-- -------------------------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  description text not null,
  image_url text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists team_members_active_sort_idx
on public.team_members (is_active, sort_order);

alter table public.team_members enable row level security;

drop policy if exists "Public can read active team members" on public.team_members;
create policy "Public can read active team members"
on public.team_members
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Admins can manage team members" on public.team_members;
create policy "Admins can manage team members"
on public.team_members
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- -------------------------
-- Portfolio items
-- -------------------------
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  video_url text not null,
  tags text[] null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  constraint portfolio_items_category_check
    check (category in ('COMMERCIAL','MUSIC VIDEO','EVENT','DOCUMENTARY','SHORT FILE'))
);

create index if not exists portfolio_items_active_sort_idx
on public.portfolio_items (is_active, sort_order);

create index if not exists portfolio_items_category_idx
on public.portfolio_items (category);

create index if not exists portfolio_items_featured_idx
on public.portfolio_items (is_featured, category);

alter table public.portfolio_items enable row level security;

drop policy if exists "Public can read active portfolio items" on public.portfolio_items;
create policy "Public can read active portfolio items"
on public.portfolio_items
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public can read featured portfolio items" on public.portfolio_items;
create policy "Public can read featured portfolio items"
on public.portfolio_items
for select
to anon, authenticated
using (is_active = true and is_featured = true);

drop policy if exists "Admins can manage portfolio items" on public.portfolio_items;
create policy "Admins can manage portfolio items"
on public.portfolio_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- -------------------------
-- Reviews (public submit, admin approves)
-- -------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text null,
  profession text not null,
  message text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists reviews_created_at_idx on public.reviews (created_at desc);
create index if not exists reviews_is_approved_idx on public.reviews (is_approved);

alter table public.reviews enable row level security;

drop policy if exists "Public can submit reviews" on public.reviews;
create policy "Public can submit reviews"
on public.reviews
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews"
on public.reviews
for select
to anon, authenticated
using (is_approved = true);

drop policy if exists "Admins can manage reviews" on public.reviews;
create policy "Admins can manage reviews"
on public.reviews
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- -------------------------
-- Contact messages (public submit, admin views)
-- -------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text null,
  phone_number text null,
  project_type text null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "Public can submit contact messages" on public.contact_messages;
create policy "Public can submit contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read contact messages" on public.contact_messages;
create policy "Admins can read contact messages"
on public.contact_messages
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can delete contact messages" on public.contact_messages;
create policy "Admins can delete contact messages"
on public.contact_messages
for delete
to authenticated
using (public.is_admin());

-- -------------------------
-- OPTIONAL: Supabase Storage for team images
-- -------------------------
-- Create a public bucket named "team" (this may require sufficient privileges;
-- if it fails, create the bucket in the Supabase Dashboard instead).
insert into storage.buckets (id, name, public)
values ('team', 'team', true)
on conflict (id) do update set public = excluded.public;

-- Public read access to images in bucket
drop policy if exists "Public read team images" on storage.objects;
create policy "Public read team images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'team');

-- Admin write access to images in bucket
drop policy if exists "Admins manage team images" on storage.objects;
create policy "Admins manage team images"
on storage.objects
for all
to authenticated
using (bucket_id = 'team' and public.is_admin())
with check (bucket_id = 'team' and public.is_admin());

-- -------------------------
-- Migration: Add is_featured to portfolio_items (if column doesn't exist)
-- -------------------------
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'portfolio_items'
      and column_name = 'is_featured'
  ) then
    alter table public.portfolio_items
    add column is_featured boolean not null default false;
    
    create index if not exists portfolio_items_featured_idx
    on public.portfolio_items (is_featured, category);
  end if;
end $$;

-- -------------------------
-- NOTE: All new users are automatically marked as admin
-- -------------------------
-- The trigger function handle_new_user_profile() automatically sets is_admin = true
-- for all users created via Supabase Dashboard or programmatically.
-- 
-- If you need to revoke admin access for a specific user, run:
-- update public.profiles set is_admin = false where user_id = '00000000-0000-0000-0000-000000000000';
--
-- If you need to grant admin access to an existing user, run:
-- update public.profiles set is_admin = true where user_id = '00000000-0000-0000-0000-000000000000';


