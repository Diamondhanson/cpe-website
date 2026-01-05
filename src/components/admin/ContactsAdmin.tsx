"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type ContactRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone_number: string | null;
  project_type: string | null;
  message: string;
  created_at: string;
};

export default function ContactsAdmin() {
  const [items, setItems] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);

    const { data, error: loadError } = await supabase
      .from('contact_messages')
      .select('id,name,email,company,phone_number,project_type,message,created_at')
      .order('created_at', { ascending: false });

    if (loadError) {
      setError(loadError.message);
      setItems([]);
      setLoading(false);
      return;
    }

    setItems((data ?? []) as ContactRow[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm('Delete this message?')) return;
    setError(null);
    const { error: deleteError } = await supabase.from('contact_messages').delete().eq('id', id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await load();
  }

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Contact Messages</h2>
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
        <div className="text-gray-600">No contact messages yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <div key={m.id} className="border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{m.name}</div>
                  <div className="text-sm text-gray-600">{m.email}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(m.created_at).toLocaleString()}
                    {m.project_type ? ` • ${m.project_type}` : ''}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {m.company ? `Company: ${m.company}` : 'Company: —'}
                    {' • '}
                    {m.phone_number ? `Phone: ${m.phone_number}` : 'Phone: —'}
                  </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    className="text-sm font-medium text-red-700 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


