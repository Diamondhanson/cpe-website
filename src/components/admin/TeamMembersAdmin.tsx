"use client";

import React, { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { supabase } from '../../lib/supabaseClient';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export default function TeamMembersAdmin() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    role: '',
    description: '',
    image_url: '',
    sort_order: 0,
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const canSave = useMemo(() => {
    return Boolean(form.name.trim() && form.role.trim() && form.description.trim());
  }, [form.description, form.name, form.role]);

  async function load() {
    setLoading(true);
    setError(null);

    const { data, error: loadError } = await supabase
      .from('team_members')
      .select('id,name,role,description,image_url,sort_order,is_active,created_at')
      .order('sort_order', { ascending: true });

    if (loadError) {
      setError(loadError.message);
      setItems([]);
      setLoading(false);
      return;
    }

    setItems((data ?? []) as TeamMember[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm({
      name: '',
      role: '',
      description: '',
      image_url: '',
      sort_order: 0,
      is_active: true,
    });
    setImageFile(null);
    setImagePreview(null);
  }

  async function uploadSelectedImage(): Promise<string | null> {
    if (!imageFile) return null;

    const ext = imageFile.name.split('.').pop() || 'jpg';
    const path = `team_members/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('team')
      .upload(path, imageFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('team').getPublicUrl(path);
    return data.publicUrl;
  }

  async function save() {
    if (!canSave || saving) return;
    setSaving(true);
    setError(null);

    try {
      const uploadedUrl = await uploadSelectedImage();
      const imageUrlToSave = (uploadedUrl ?? form.image_url).trim();
      if (!imageUrlToSave) {
        setError('Please provide an image URL or upload an image.');
        setSaving(false);
        return;
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('team_members')
          .update({
            name: form.name.trim(),
            role: form.role.trim(),
            description: form.description.trim(),
            image_url: imageUrlToSave,
            sort_order: Number(form.sort_order) || 0,
            is_active: form.is_active,
          })
          .eq('id', editingId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('team_members').insert({
          name: form.name.trim(),
          role: form.role.trim(),
          description: form.description.trim(),
          image_url: imageUrlToSave,
          sort_order: Number(form.sort_order) || 0,
          is_active: form.is_active,
        });
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

  function startEdit(item: TeamMember) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      description: item.description,
      image_url: item.image_url,
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
    setImageFile(null);
    setImagePreview(item.image_url || null);
  }

  function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this team member?')) return;
    setError(null);
    const { error: deleteError } = await supabase.from('team_members').delete().eq('id', id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await load();
  }

  return (
    <div className="bg-white shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
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
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Role / title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400"
                rows={4}
                placeholder="Short bio/description"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((p) => ({ ...p, sort_order: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900"
                />
              </div>
              <div className="flex items-center gap-3 mt-8">
                <input
                  id="teamActive"
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
                />
                <label htmlFor="teamActive" className="text-sm text-gray-700">
                  Active (visible on site)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="space-y-3">
                {/* File Picker */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <label className="cursor-pointer flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 mb-1">
                      {imageFile ? imageFile.name : 'Click to upload image'}
                    </span>
                    <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Image Preview */}
                {imagePreview && (

                  <div className="relative w-full h-48 rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700"
                      title="Remove image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Or use URL */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Or enter image URL:
                  </label>
                  <input
                    value={form.image_url}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, image_url: e.target.value }));
                      if (e.target.value && !imageFile) {
                        setImagePreview(e.target.value);
                      } else if (!e.target.value && !imageFile) {
                        setImagePreview(null);
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <p className="text-xs text-gray-500">
                  Upload uses the Supabase Storage bucket <code className="bg-gray-100 px-1 rounded">team</code> (must exist and be public/readable).
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={save}
              disabled={!canSave || saving}
              className="w-full bg-blue-social text-white py-3 px-4 font-semibold hover:bg-blue-social/90 disabled:opacity-60"
            >
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add team member'}
            </button>
          </div>
        </div>

        {/* List */}
        <div>
          {loading ? (
            <div className="text-gray-600">Loading…</div>
          ) : items.length === 0 ? (
            <div className="text-gray-600">No team members yet.</div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {items.map((m) => (
                <div
                  key={m.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors bg-white"
                >
                  <div className="flex items-start gap-4">
                    {/* Image */}
                    {m.image_url && (
                      <div className="flex-shrink-0">

                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                          <Image
                            src={m.image_url}
                            alt={m.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{m.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{m.role}</div>
                      <div className="text-xs text-gray-500 mt-2 line-clamp-2">{m.description}</div>
                      <div className="text-xs text-gray-400 mt-2">
                        Order: {m.sort_order} • {m.is_active ? (
                          <span className="text-green-600 font-medium">Active</span>
                        ) : (
                          <span className="text-gray-400">Hidden</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => startEdit(m)}
                        className="text-xs font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(m.id)}
                        className="text-xs font-medium text-red-700 hover:text-red-900 hover:bg-red-50 px-3 py-1.5 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


