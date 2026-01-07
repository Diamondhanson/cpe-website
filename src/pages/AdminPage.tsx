"use client";

import React, { useMemo, useState } from 'react';
import AdminAuthGate from '../components/admin/AdminAuthGate';
import TeamMembersAdmin from '../components/admin/TeamMembersAdmin';
import PortfolioAdmin from '../components/admin/PortfolioAdmin';
import ReviewsAdmin from '../components/admin/ReviewsAdmin';
import ContactsAdmin from '../components/admin/ContactsAdmin';

type TabKey = 'team' | 'portfolio' | 'reviews' | 'contacts';

export default function AdminPage() {
  const [tab, setTab] = useState<TabKey>('team');

  const tabs = useMemo(
    () =>
      [
        { key: 'team', label: 'Team' },
        { key: 'portfolio', label: 'Portfolio' },
        { key: 'reviews', label: 'Reviews' },
        { key: 'contacts', label: 'Contacts' },
      ] as const,
    []
  );

  return (
    <AdminAuthGate>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key ? 'bg-blue-social text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {tab === 'team' && <TeamMembersAdmin />}
        {tab === 'portfolio' && <PortfolioAdmin />}
        {tab === 'reviews' && <ReviewsAdmin />}
        {tab === 'contacts' && <ContactsAdmin />}
      </div>
    </AdminAuthGate>
  );
}


