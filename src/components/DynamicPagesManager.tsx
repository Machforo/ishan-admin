import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Globe, FileText, Loader2, Check, X, ArrowLeft } from 'lucide-react';

interface DynamicPage {
  _id?: string;
  portal: string;
  title: string;
  slug: string;
  template: string;
  content: any;
  published: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const TEMPLATES = [
  { id: 'standard', name: 'Standard Text Page' },
  { id: 'gallery', name: 'Gallery Page' },
  { id: 'custom_html', name: 'Custom HTML (With Navbar & Footer)' },
  { id: 'raw_html', name: 'Raw HTML (Completely Blank Page)' },
];

export default function DynamicPagesManager({ siteKey }: { siteKey: string }) {
  const [pages, setPages] = useState<DynamicPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<DynamicPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, [siteKey]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/dynamic-pages`);
      const data = await res.json();
      setPages(data.filter((p: DynamicPage) => p.portal === siteKey));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPage) return;
    setSaving(true);
    try {
      const url = editingPage._id
        ? `${API_BASE}/dynamic-pages/${editingPage._id}`
        : `${API_BASE}/dynamic-pages`;

      const method = editingPage._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPage)
      });

      if (res.ok) {
        await fetchPages();
        setEditingPage(null);
      } else {
        const errData = await res.json().catch(() => null);
        alert(errData?.message || 'Failed to save page. Please ensure slug is unique.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    try {
      await fetch(`${API_BASE}/dynamic-pages/${id}`, { method: 'DELETE' });
      await fetchPages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNew = () => {
    setEditingPage({
      portal: siteKey,
      title: '',
      slug: '',
      template: 'standard',
      content: { heading: '', body: '', image: '' },
      published: true
    });
  };

  const updateContent = (key: string, value: any) => {
    setEditingPage(prev => {
      if (!prev) return prev;
      return { ...prev, content: { ...prev.content, [key]: value } };
    });
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-300" /></div>;
  }

  if (editingPage) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 max-w-4xl animate-in fade-in">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditingPage(null)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <h2 className="text-2xl font-bold text-slate-800">
              {editingPage._id ? 'Edit Custom Page' : 'Create Custom Page'}
            </h2>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-sm flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Save Page
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Page Title</label>
            <input
              type="text"
              value={editingPage.title}
              onChange={(e) => {
                const title = e.target.value;
                setEditingPage(prev => prev ? {
                  ...prev,
                  title,
                  // Auto-generate slug if it's a new page
                  slug: !prev._id ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug
                } : null)
              }}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
              placeholder="e.g., Alumni Meet 2026"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">URL Slug</label>
            <div className="flex items-center">
              <span className="px-3 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-400 text-sm">
                /p/
              </span>
              <input
                type="text"
                value={editingPage.slug}
                onChange={(e) => setEditingPage(prev => prev ? { ...prev, slug: e.target.value } : null)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-r-xl outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-slate-600"
                placeholder="alumni-meet-2026"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Template</label>
            <select
              value={editingPage.template}
              onChange={(e) => setEditingPage(prev => prev ? { ...prev, template: e.target.value, content: {} } : null)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-slate-700 appearance-none"
            >
              {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="flex items-center pt-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editingPage.published}
                onChange={(e) => setEditingPage(prev => prev ? { ...prev, published: e.target.checked } : null)}
                className="w-5 h-5 rounded text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm font-bold text-slate-700">Published (Visible on site)</span>
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl -mx-8 -mb-8">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" /> Content Editor ({TEMPLATES.find(t => t.id === editingPage.template)?.name})
          </h3>

          {editingPage.template === 'standard' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Main Heading</label>
                <input
                  type="text"
                  value={editingPage.content.heading || ''}
                  onChange={(e) => updateContent('heading', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Hero Image URL</label>
                <input
                  type="text"
                  value={editingPage.content.image || ''}
                  onChange={(e) => updateContent('image', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Page Body Content (HTML Supported)</label>
                <textarea
                  rows={15}
                  value={editingPage.content.body || ''}
                  onChange={(e) => updateContent('body', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-medium text-slate-800 font-mono text-sm leading-relaxed"
                  placeholder="<h2>Subheading</h2><p>Write your content here...</p>"
                />
              </div>
            </div>
          )}

          {editingPage.template === 'gallery' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Gallery Title</label>
                <input
                  type="text"
                  value={editingPage.content.heading || ''}
                  onChange={(e) => updateContent('heading', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Image URLs (One per line or comma-separated)</label>
                <textarea 
                  rows={5}
                  value={editingPage.content.images ? editingPage.content.images.join('\n') : ''}
                  onChange={(e) => {
                    const urls = e.target.value.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
                    updateContent('images', urls);
                  }}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none font-medium text-slate-800 font-mono text-sm"
                  placeholder="https://image1.jpg&#10;https://image2.jpg"
                />
              </div>
            </div>
          )}

          {(editingPage.template === 'custom_html' || editingPage.template === 'raw_html') && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Raw HTML / Tailwind Code</label>
                <textarea
                  rows={20}
                  value={editingPage.content.html || editingPage.content.body || ''}
                  onChange={(e) => updateContent('html', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1e293b] text-emerald-400 border border-slate-700 rounded-xl outline-none font-mono text-sm leading-relaxed"
                  placeholder="<!-- Paste your full HTML / Tailwind code here -->&#10;<div class='w-full bg-blue-500'>...</div>"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Custom Pages</h2>
          <p className="text-sm text-slate-500 mt-1">Create and manage dynamic pages for this portal.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0f172a] rounded-xl font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Create New Page
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {pages.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No custom pages found</h3>
            <p className="text-slate-500 mt-2">Create your first custom page to see it here.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Page Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">URL Slug</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map(page => (
                <tr key={page._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{page.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-mono">
                      /p/{page.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 capitalize">{page.template}</td>
                  <td className="px-6 py-4">
                    {page.published ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingPage(page)}
                        className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(page._id!)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
