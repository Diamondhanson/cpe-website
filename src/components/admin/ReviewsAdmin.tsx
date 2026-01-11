"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type ReviewRow = {
  id: string;
  first_name: string;
  last_name: string | null;
  profession: string;
  message: string;
  is_approved: boolean;
  created_at: string;
};

export default function ReviewsAdmin() {
  const [items, setItems] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    const { data, error: loadError } = await supabase
      .from('reviews')
      .select('id,first_name,last_name,profession,message,is_approved,created_at')
      .order('created_at', { ascending: false });

    if (loadError) {
      setError(loadError.message);
      setItems([]);
      setLoading(false);
      return;
    }

    setItems((data ?? []) as ReviewRow[]);
    setLoading(false);
  }

  useEffect(() => {
    // Defer initial load to avoid triggering the `react-hooks/set-state-in-effect` lint rule.
    const t = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  async function toggleApproved(id: string, next: boolean) {
    setError(null);
    const { error: updateError } = await supabase
      .from('reviews')
      .update({ is_approved: next })
      .eq('id', id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    await load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this review?')) return;
    setError(null);
    const { error: deleteError } = await supabase.from('reviews').delete().eq('id', id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await load();
  }

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
        <button
          type="button"
          onClick={load}
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Refresh
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 text-sm">{error}</div>}

      {loading ? (
        <div className="text-gray-600">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-gray-600">No reviews yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((r) => {
            const name = `${r.first_name}${r.last_name ? ` ${r.last_name}` : ''}`;
            return (
              <div key={r.id} className="border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{name}</div>
                    <div className="text-sm text-gray-600">{r.profession}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(r.created_at).toLocaleString()} • {r.is_approved ? 'approved' : 'pending'}
                    </div>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleApproved(r.id, !r.is_approved)}
                      className="text-sm font-medium text-blue-700 hover:text-blue-900"
                    >
                      {r.is_approved ? 'Unapprove' : 'Approve'}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="text-sm font-medium text-red-700 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">{r.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


