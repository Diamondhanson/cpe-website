import { createClient } from '@supabase/supabase-js';

// IMPORTANT:
// In Next.js client bundles, env vars are inlined at build time ONLY when accessed
// via static property access (process.env.NEXT_PUBLIC_*). Dynamic access like
// process.env[name] will be undefined in the browser.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});


