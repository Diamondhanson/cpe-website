"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type AuthGateProps = {
  children: React.ReactNode;
};

type Profile = {
  user_id: string;
  is_admin: boolean;
};

export default function AdminAuthGate({ children }: AuthGateProps) {
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [email, setEmail] = useState('admin@fantasyartsproduction.com');
  const [password, setPassword] = useState('ChangeMe123!');

  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const isSignedIn = useMemo(() => Boolean(sessionUserId), [sessionUserId]);

  useEffect(() => {
    let mounted = true;

    async function refreshSessionAndProfile() {
      setLoading(true);
      setAuthError(null);

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (!mounted) return;

      if (sessionError) {
        setAuthError(sessionError.message);
        setSessionUserId(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      const userId = sessionData.session?.user?.id ?? null;
      setSessionUserId(userId);
      if (!userId) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('user_id,is_admin')
        .eq('user_id', userId)
        .maybeSingle();

      if (!mounted) return;

      if (profileError) {
        setAuthError(profileError.message);
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile((profileData ?? null) as Profile | null);
      setLoading(false);
    }

    void refreshSessionAndProfile();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      void refreshSessionAndProfile();
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setAuthError(error.message);
      setLoading(false);
      return;
    }
    // session/profile refresh is handled by auth listener
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="p-8 text-gray-700">Loading…</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-sm text-gray-600 mb-6">
            Sign in with your Supabase admin user.
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 text-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="adminEmail">
                Email
              </label>
              <input
                id="adminEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="adminPassword">
                Password
              </label>
              <input
                id="adminPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-social text-white py-3 px-4 font-semibold hover:bg-blue-social/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!profile?.is_admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Access denied</h1>
          <p className="text-sm text-gray-600 mb-6">
            Your user is signed in but not marked as an admin.
          </p>
          {authError && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 text-sm">
              {authError}
            </div>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full bg-gray-900 text-white py-3 px-4 font-semibold hover:bg-black transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">Admin Dashboard</div>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Sign out
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}


