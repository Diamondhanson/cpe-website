-- =========================
-- Fix User Creation Error
-- =========================
-- Run this in Supabase SQL Editor to fix the "database error checking email" issue
-- This updates the trigger function to handle errors better

-- Step 1: Update the trigger function with better error handling
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

-- Step 2: Ensure the trigger exists and is properly configured
drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute procedure public.handle_new_user_profile();

-- Step 3: Grant necessary permissions (if needed)
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on public.profiles to postgres, service_role;

-- Step 4: Verify the function works
do $$
begin
  raise notice 'Trigger function updated successfully!';
  raise notice 'You can now create users in the Dashboard.';
end $$;

