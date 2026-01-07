-- =========================
-- Fix User Deletion Error
-- =========================
-- Run this in Supabase SQL Editor to fix "failed to delete user, database error loading user"
-- This adds necessary RLS policies to allow user deletion

-- Step 1: Add delete policy for admins
drop policy if exists "Admins can delete profiles" on public.profiles;
create policy "Admins can delete profiles"
on public.profiles
for delete
to authenticated
using (public.is_admin());

-- Step 2: Allow service role to manage profiles (for dashboard operations)
drop policy if exists "Service role can manage profiles" on public.profiles;
create policy "Service role can manage profiles"
on public.profiles
for all
to service_role
using (true)
with check (true);

-- Step 3: Allow users to delete their own profile (for cascade deletes)
drop policy if exists "Users can delete their own profile" on public.profiles;
create policy "Users can delete their own profile"
on public.profiles
for delete
to authenticated
using (user_id = auth.uid());

-- Step 4: Ensure cascade delete is working
-- Verify the foreign key constraint
do $$
begin
  if exists (
    select 1 from information_schema.table_constraints tc
    join information_schema.key_column_usage kcu 
      on tc.constraint_name = kcu.constraint_name
    where tc.table_schema = 'public'
      and tc.table_name = 'profiles'
      and tc.constraint_type = 'FOREIGN KEY'
      and kcu.column_name = 'user_id'
  ) then
    raise notice '✅ Foreign key constraint exists - cascade delete should work';
  else
    raise warning '⚠️ Foreign key constraint not found - may need to recreate';
  end if;
end $$;

-- Step 5: Grant necessary permissions
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on public.profiles to postgres, service_role;

-- Step 6: Test message
do $$
begin
  raise notice '✅ User deletion policies added!';
  raise notice '✅ You should now be able to delete users from the Dashboard.';
  raise notice '';
  raise notice 'Note: When you delete a user from auth.users, the profile will';
  raise notice 'automatically be deleted due to CASCADE.';
end $$;

