-- =========================
-- Create User in Supabase SQL Editor
-- =========================
-- IMPORTANT: Replace 'user@example.com' and 'YourPassword123!' with your values
-- 
-- NOTE: The easiest way is to use Supabase Dashboard → Authentication → Users → Add User
-- But if you need SQL, use the command below.

-- =========================
-- RECOMMENDED: Use Supabase Dashboard
-- =========================
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Add User" or "Invite User"
-- 3. Enter email and password
-- 4. The trigger will automatically set is_admin = true

-- =========================
-- SQL Method (if you must use SQL)
-- =========================
-- This creates a user using Supabase's internal functions
-- Replace the email and password values below
-- 
-- NOTE: If you get schema errors, use the Supabase Dashboard instead:
-- Dashboard → Authentication → Users → Add User

DO $$
DECLARE
  new_user_id UUID;
  user_email TEXT := 'user@example.com';  -- ⚠️ CHANGE THIS to your email
  user_password TEXT := 'YourPassword123!';  -- ⚠️ CHANGE THIS to your password
  encrypted_pwd TEXT;
  instance_uuid UUID;
BEGIN
  -- Get the instance_id from existing users (or use default)
  SELECT COALESCE(
    (SELECT instance_id FROM auth.users LIMIT 1),
    '00000000-0000-0000-0000-000000000000'::UUID
  ) INTO instance_uuid;
  
  -- Generate UUID for new user
  new_user_id := gen_random_uuid();
  
  -- Hash password using bcrypt (Supabase standard)
  encrypted_pwd := crypt(user_password, gen_salt('bf'));
  
  -- Insert user into auth.users (minimal required fields)
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data
  ) VALUES (
    instance_uuid,
    new_user_id,
    'authenticated',
    'authenticated',
    user_email,
    encrypted_pwd,
    now(),  -- Auto-confirm email
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}'
  );
  
  -- Ensure profile exists with admin access
  -- (Trigger should create it, but we ensure is_admin = true)
  INSERT INTO public.profiles (user_id, is_admin)
  VALUES (new_user_id, true)
  ON CONFLICT (user_id) DO UPDATE SET is_admin = true;
  
  RAISE NOTICE 'User created successfully with ID: %', new_user_id;
  RAISE NOTICE 'Email: %', user_email;
  RAISE NOTICE 'User can now sign in immediately!';
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error creating user: %', SQLERRM;
END $$;

