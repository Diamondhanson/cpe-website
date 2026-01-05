"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  video_url: string;
  tags: string[] | null;
  sort_order: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
};

const CATEGORIES = ['COMMERCIAL', 'MUSIC VIDEO', 'EVENT', 'DOCUMENTARY', 'SHORT FILE'];

export default function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    video_url: '',
    tags_csv: '',
    sort_order: 0,
    is_active: true,
  });
  const [saving, setSaving] = useState(false);
  const [togglingFeatured, setTogglingFeatured] = useState<string | null>(null);

  const canSave = useMemo(() => {
    return Boolean(form.title.trim() && form.description.trim() && form.video_url.trim() && form.category);
  }, [form]);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, PortfolioItem[]> = {};
    CATEGORIES.forEach((cat) => {
      grouped[cat] = [];
    });
    items.forEach((item) => {
      if (grouped[item.category]) {
        grouped[item.category].push(item);
      }
    });
    // Sort each category by sort_order
    Object.keys(grouped).forEach((cat) => {
      grouped[cat].sort((a, b) => a.sort_order - b.sort_order);
    });
    return grouped;
  }, [items]);

  async function load() {
    setLoading(true);
    setError(null);

    const { data, error: loadError } = await supabase
      .from('portfolio_items')
      .select('id,title,description,category,video_url,tags,sort_order,is_active,is_featured,created_at')
      .order('sort_order', { ascending: true });

    if (loadError) {
      setError(loadError.message);
      setItems([]);
      setLoading(false);
      return;
    }

    setItems((data ?? []) as PortfolioItem[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm({
      title: '',
      description: '',
      category: CATEGORIES[0],
      video_url: '',
      tags_csv: '',
      sort_order: 0,
      is_active: true,
    });
  }

  function parseTags(csv: string): string[] | null {
    const tags = csv
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    return tags.length ? tags : null;
  }

  async function save() {
    if (!canSave || saving) return;
    setSaving(true);
    setError(null);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        video_url: form.video_url.trim(),
        tags: parseTags(form.tags_csv),
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from('portfolio_items')
          .update(payload)
          .eq('id', editingId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('portfolio_items').insert(payload);
        if (insertError) throw insertError;
      }

      await load();
      resetForm();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item: PortfolioItem) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      video_url: item.video_url,
      tags_csv: (item.tags ?? []).join(', '),
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
  }

  async function remove(id: string) {
    if (!confirm('Delete this portfolio item?')) return;
    setError(null);
    const { error: deleteError } = await supabase.from('portfolio_items').delete().eq('id', id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await load();
  }

  async function toggleFeatured(item: PortfolioItem) {
    if (togglingFeatured === item.id) return;
    setTogglingFeatured(item.id);
    setError(null);

    try {
      const newFeaturedValue = !item.is_featured;

      // If turning ON, first turn OFF all others in the same category
      if (newFeaturedValue) {
        const othersInCategory = items.filter(
          (i) => i.category === item.category && i.id !== item.id && i.is_featured
        );

        for (const other of othersInCategory) {
          const { error: unfeatureError } = await supabase
            .from('portfolio_items')
            .update({ is_featured: false })
            .eq('id', other.id);
          if (unfeatureError) throw unfeatureError;
        }
      }

      // Then update the current item
      const { error: updateError } = await supabase
        .from('portfolio_items')
        .update({ is_featured: newFeaturedValue })
        .eq('id', item.id);

      if (updateError) throw updateError;

      await load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setTogglingFeatured(null);
    }
  }

  function extractYoutubeId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
        <button
          type="button"
          onClick={resetForm}
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          New
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 text-sm">{error}</div>}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
              placeholder="Project title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
              rows={4}
              placeholder="Short description"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((p) => ({ ...p, sort_order: Number(e.target.value) }))}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="portfolioActive"
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
            />
            <label htmlFor="portfolioActive" className="text-sm text-gray-700">
              Active (visible on site)
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video link</label>
            <input
              value={form.video_url}
              onChange={(e) => setForm((p) => ({ ...p, video_url: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
              placeholder="https://www.youtube.com/watch?v=…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              value={form.tags_csv}
              onChange={(e) => setForm((p) => ({ ...p, tags_csv: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
              placeholder="Brand Film, Corporate, Storytelling"
            />
          </div>

          <button
            type="button"
            onClick={save}
            disabled={!canSave || saving}
            className="w-full bg-blue-600 text-white py-3 px-4 font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add portfolio item'}
          </button>
        </div>

        {/* List - Grouped by Category */}
        <div>
          {loading ? (
            <div className="text-gray-600">Loading…</div>
          ) : items.length === 0 ? (
            <div className="text-gray-600">No portfolio items yet.</div>
          ) : (
            <div className="space-y-6 max-h-[600px] overflow-y-auto">
              {CATEGORIES.map((category) => {
                const categoryItems = itemsByCategory[category];
                if (categoryItems.length === 0) return null;

                const featuredInCategory = categoryItems.find((i) => i.is_featured);

                return (
                  <div key={category} className="border border-gray-300 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">{category}</h3>
                    <div className="space-y-2">
                      {categoryItems.map((p) => {
                        const isCurrentlyFeatured = p.is_featured;
                        const canToggleFeatured = !isCurrentlyFeatured && !featuredInCategory;

                        return (
                          <div
                            key={p.id}
                            className={`border rounded p-3 flex items-start justify-between gap-3 ${
                              isCurrentlyFeatured ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-semibold text-gray-900 truncate">{p.title}</div>
                                {isCurrentlyFeatured && (
                                  <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded font-medium">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                order: {p.sort_order} • {p.is_active ? 'active' : 'hidden'}
                              </div>
                              {extractYoutubeId(p.video_url) && (
                                <div className="mt-2">
                                  <div className="w-full h-24 bg-gray-200 rounded overflow-hidden">
                                    <iframe
                                      src={`https://www.youtube.com/embed/${extractYoutubeId(p.video_url)}?rel=0&modestbranding=1&showinfo=0`}
                                      title={p.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleFeatured(p)}
                                disabled={togglingFeatured === p.id || (!isCurrentlyFeatured && !canToggleFeatured)}
                                className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${
                                  isCurrentlyFeatured
                                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                                    : canToggleFeatured
                                      ? 'bg-gray-600 text-white hover:bg-gray-700'
                                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                title={
                                  !canToggleFeatured && !isCurrentlyFeatured
                                    ? 'Another item in this category is already featured'
                                    : isCurrentlyFeatured
                                      ? 'Remove from featured'
                                      : 'Feature on home page'
                                }
                              >
                                {togglingFeatured === p.id
                                  ? '…'
                                  : isCurrentlyFeatured
                                    ? 'Unfeature'
                                    : 'Feature'}
                              </button>
                              <button
                                type="button"
                                onClick={() => startEdit(p)}
                                className="text-xs font-medium text-blue-700 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => remove(p.id)}
                                className="text-xs font-medium text-red-700 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
