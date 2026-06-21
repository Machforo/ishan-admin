import React, { useState, useEffect } from 'react';
import api from '../api';
import {
  Save,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Edit2,
  Lock,
  UploadCloud
} from 'lucide-react';
import { siteConfigs, type Section, type Field } from '../config/siteConfigs';
import { useAuth } from '../context/AuthContext';
import JoditEditor from 'jodit-react';

interface GenericEditorProps {
  siteKey: string;
  pageId: string;
  section: Section;
  onNavigate: (pageId: string, sectionId: string) => void;
}

const GenericEditor: React.FC<GenericEditorProps> = ({ siteKey, pageId, section, onNavigate }) => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [broadcastSites, setBroadcastSites] = useState<string[]>([]);

  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, onChange: (val: string) => void, fieldKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dsqpiofo3';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ishan_admin_preset';

    setUploadingImage(fieldKey);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        setStatus({ type: 'error', message: 'Failed to upload image.' });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatus({ type: 'error', message: 'Failed to upload image.' });
    } finally {
      setUploadingImage(null);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onChange: (val: string) => void, fieldKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dsqpiofo3';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ishan_admin_preset';

    setUploadingImage(fieldKey);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        setStatus({ type: 'error', message: 'Failed to upload file.' });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatus({ type: 'error', message: 'Failed to upload file.' });
    } finally {
      setUploadingImage(null);
    }
  };

  // Permission flags
  const canUpdate = user?.role === 'super_admin' || user?.permissions.canUpdate;
  const canDelete = user?.role === 'super_admin' || user?.permissions.canDelete;
  const canCreate = user?.role === 'super_admin' || user?.permissions.canCreate;

  const buildUrl = (ep?: string, suffix = '') => {
    let base = `${siteKey}/`;
    if (ep) {
      if (ep.startsWith('^')) {
        base = ep.substring(1);
      } else {
        base = `${siteKey}/${ep}`;
      }
    }
    return suffix ? `${base}/${suffix}` : base;
  };

  const fetchSectionData = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await api.get(buildUrl(section.endpoint));
      setData(response.data);
      setEditingId(null);
      setEditForm(null);
      setBroadcastSites([]);
    } catch (err) {
      console.error('Error fetching section data:', err);
      setStatus({ type: 'error', message: 'Failed to load section data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData();
  }, [siteKey, section]);

  const handleSaveSingleton = async () => {
    if (!canUpdate) return;
    setSaving(true);
    setStatus(null);
    try {
      await api.put(buildUrl(section.endpoint), data);
      setStatus({ type: 'success', message: 'Changes saved successfully!' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  const getBroadcastableSites = () => {
    if (section.type !== 'collection' || !section.endpoint.includes('news')) return [];

    const broadcastable: { siteKey: string, siteName: string, endpoint: string }[] = [];

    Object.entries(siteConfigs).forEach(([key, config]) => {
      if (key === siteKey) return;
      if (user?.role !== 'super_admin' && !user?.permissions.sites.includes(key)) return;

      // Search through all pages and their sections to see if this site has a news collection
      let targetEndpoint = null;
      for (const page of config.pages) {
        const newsSection = page.sections?.find((s: any) => s.type === 'collection' && s.endpoint.includes('news'));
        if (newsSection) {
          targetEndpoint = newsSection.endpoint;
          break;
        }
      }

      if (!targetEndpoint) return;

      broadcastable.push({ siteKey: key, siteName: config.name, endpoint: targetEndpoint });
    });

    return broadcastable;
  };

  const handleAddItem = async () => {
    if (!canCreate) return;
    setSaving(true);
    try {
      const response = await api.post(buildUrl(section.endpoint), editForm);
      setData([response.data, ...data]);

      if (broadcastSites.length > 0) {
        const broadcastable = getBroadcastableSites();
        for (const bSite of broadcastable) {
          if (broadcastSites.includes(bSite.siteKey)) {
            try {
              await api.post(`${bSite.siteKey}/${bSite.endpoint}`, editForm);
            } catch (e) {
              console.error(`Broadcast failed for ${bSite.siteKey}`, e);
            }
          }
        }
      }

      setEditingId(null);
      setEditForm(null);
      setBroadcastSites([]);
      setStatus({ type: 'success', message: 'Item added successfully!' + (broadcastSites.length ? ' Broadcasted to selected portals.' : '') });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to add item.' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateItem = async () => {
    if (!canUpdate) return;
    setSaving(true);
    try {
      const response = await api.put(buildUrl(section.endpoint, editingId!), editForm);
      setData(data.map((item: any) => item._id === editingId ? response.data : item));
      setEditingId(null);
      setEditForm(null);
      setStatus({ type: 'success', message: 'Item updated successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to update item.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canDelete) return;
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(buildUrl(section.endpoint, id));
      setData(data.filter((item: any) => item._id !== id));
      setStatus({ type: 'success', message: 'Item deleted.' });
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to delete.' });
    }
  };

  const renderField = (field: Field, value: any, onChange: (val: any) => void) => {
    const label = <label className="text-[10px] font-black text-slate-400  block mb-1.5">{field.label}</label>;

    switch (field.type) {
      case 'text':
        return (
          <div className="space-y-1">
            {label}
            <input
              type="text"
              readOnly={!canUpdate}
              className={`w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/5 transition-all ${!canUpdate ? 'opacity-70 cursor-not-allowed' : ''}`}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className="space-y-1">
            {label}
            <div className={!canUpdate ? 'opacity-70 pointer-events-none' : ''}>
              <JoditEditor
                value={value || ""}
                config={{
                  readonly: !canUpdate,
                  height: 300,
                  toolbarAdaptive: false,
                  placeholder: 'Start typing here...'
                }}
                onBlur={(newContent) => onChange(newContent)} // Use onBlur for performance
              />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-1">
            {label}
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  placeholder="Image URL..."
                  readOnly={!canUpdate}
                  className={`w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/5 transition-all ${!canUpdate ? 'opacity-70 cursor-not-allowed' : ''}`}
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                />
                {canUpdate && (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, onChange, field.key)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploadingImage === field.key}
                    />
                    <div className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-200 border-dashed">
                      {uploadingImage === field.key ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <UploadCloud className="w-4 h-4" />
                      )}
                      {uploadingImage === field.key ? 'Uploading...' : 'Upload Image'}
                    </div>
                  </div>
                )}
              </div>
              {value && (
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 relative group">
                  <img src={value} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        );
      case 'file':
        return (
          <div className="space-y-1">
            {label}
            <div className="flex gap-4 items-start">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  placeholder="File URL..."
                  readOnly={!canUpdate}
                  className={`w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/5 transition-all ${!canUpdate ? 'opacity-70 cursor-not-allowed' : ''}`}
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                />
                {canUpdate && (
                  <div className="relative">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, onChange, field.key)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploadingImage === field.key}
                    />
                    <div className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border border-slate-200 border-dashed">
                      {uploadingImage === field.key ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <UploadCloud className="w-4 h-4" />
                      )}
                      {uploadingImage === field.key ? 'Uploading...' : 'Upload File'}
                    </div>
                  </div>
                )}
              </div>
              {value && (
                <div className="shrink-0 flex items-center justify-center rounded-xl p-3 border border-slate-200 shadow-sm bg-slate-50 relative group">
                  <a href={value} target="_blank" rel="noreferrer" className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1">
                    <ExternalLink className="w-4 h-4" /> View File
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      case 'date':
        return (
          <div className="space-y-1">
            {label}
            <input
              type="date"
              readOnly={!canUpdate}
              className={`w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/5 transition-all ${!canUpdate ? 'opacity-70 cursor-not-allowed' : ''}`}
              value={value ? new Date(value).toISOString().split('T')[0] : ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        );
      case 'array':
        const items = value || [];
        return (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              {label}
              {canUpdate && (
                <button
                  onClick={() => onChange([...items, {}])}
                  className="text-[10px] font-black uppercase text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3" /> Add Entry
                </button>
              )}
            </div>
            <div className="space-y-3">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 relative group">
                  {canDelete && (
                    <button
                      onClick={() => onChange(items.filter((_: any, i: number) => i !== idx))}
                      className="absolute top-4 right-4 text-slate-300 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    {Array.isArray(field.fields) && (field.fields as (string | Field)[]).map((f: string | Field) => {
                      const fConfig = typeof f === 'string' ? { key: f, label: f.replace(/([A-Z])/g, ' $1'), type: 'text' } as Field : f;
                      return (
                        <div key={fConfig.key}>
                          {renderField(fConfig, item[fConfig.key], (v) => {
                            const newArr = [...items];
                            newArr[idx] = { ...newArr[idx], [fConfig.key]: v };
                            onChange(newArr);
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'object':
        return (
          <div className="bg-white/40 border border-slate-200/60 p-6 rounded-[2rem] shadow-sm mb-4">
            {field.label && <h4 className="text-sm font-semibold text-slate-700 mb-6 border-b border-slate-100 pb-3">{field.label}</h4>}
            <div className="grid grid-cols-1 gap-6">
              {(field.fields as (string | Field)[]).map((f: string | Field) => {
                const fConfig = typeof f === 'string' ? { key: f, label: f.replace(/([A-Z])/g, ' $1'), type: 'text' } as Field : f;
                return (
                  <div key={fConfig.key} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    {renderField(fConfig, value?.[fConfig.key], (v) => onChange({ ...value, [fConfig.key]: v }))}
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-1">
            {label}
            <textarea
              readOnly={!canUpdate}
              rows={3}
              className={`w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-900/5 transition-all font-medium resize-y ${!canUpdate ? 'opacity-70 cursor-not-allowed' : ''}`}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 animate-pulse">
        <Loader2 className="w-10 h-10 text-slate-800 animate-spin mb-4" />
        <p className="text-slate-400 font-bold  text-xs">Syncing Database...</p>
      </div>
    );
  }

  if (section.redirect) {
    return (
      <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl p-12 rounded-[2.5rem] text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
          <ExternalLink className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">{section.redirect.message}</p>
        </div>
        <button
          onClick={() => onNavigate(section.redirect!.targetPage, section.redirect!.targetSection)}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
        >
          Go to Target Section <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {!canUpdate && (
        <div className="bg-amber-50 text-amber-700 p-4 rounded-2xl flex items-center gap-3 text-[10px] font-black  border border-amber-100">
          <Lock className="w-4 h-4" /> Read-Only Mode: Insufficient permissions to modify content.
        </div>
      )}

      {status && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="text-xs font-black ">{status.message}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{section.title}</h1>
          <p className="text-slate-400 text-xs font-bold  mt-1">Management Mode</p>
        </div>

        {section.type === 'singleton' && canUpdate && (
          <button
            onClick={handleSaveSingleton}
            disabled={saving}
            className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            {saving ? 'Syncing...' : 'Save Changes'}
          </button>
        )}

        {section.type === 'collection' && !editingId && !editForm && canCreate && (
          <button
            onClick={() => {
              setEditingId(null);
              setEditForm({});
            }}
            className="bg-amber-400 text-slate-900 px-8 py-2.5 rounded-xl font-bold hover:bg-amber-500 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        )}
      </div>

      {section.type === 'collection' && (editingId || editForm) && (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 space-y-8 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-slate-50">
            <h3 className="font-black text-slate-900 ">{editingId ? 'Edit Item' : 'Create New Item'}</h3>
            <button
              onClick={() => { setEditingId(null); setEditForm(null); }}
              className="text-[10px] font-black text-slate-400  hover:text-slate-900"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-6">
            {section.fields.map(f => {
              const field = typeof f === 'string' ? { key: f, label: f.replace(/([A-Z])/g, ' $1'), type: 'text' } as Field : f;
              return (
                <div key={field.key}>
                  {renderField(field, editForm?.[field.key], (v) => setEditForm({ ...editForm, [field.key]: v }))}
                </div>
              );
            })}
          </div>

          {!editingId && getBroadcastableSites().length > 0 && (
            <div className="pt-6 border-t border-slate-50 space-y-4">
              <div>
                <h4 className="text-xs font-black  text-slate-800">Broadcast to other portals?</h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">Select other websites to publish this item simultaneously.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {getBroadcastableSites().map(b => (
                  <button
                    key={b.siteKey}
                    onClick={() => setBroadcastSites(prev => prev.includes(b.siteKey) ? prev.filter(k => k !== b.siteKey) : [...prev, b.siteKey])}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black  transition-all border flex items-center gap-2 ${broadcastSites.includes(b.siteKey)
                      ? 'bg-amber-100 border-amber-200 text-amber-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 hover:border-slate-300'
                      }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${broadcastSites.includes(b.siteKey) ? 'bg-amber-500' : 'bg-slate-200'}`} />
                    {b.siteName}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
            <button
              onClick={editingId ? handleUpdateItem : handleAddItem}
              disabled={saving || (editingId ? !canUpdate : !canCreate)}
              className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingId ? 'Update Item' : 'Save Item'}
            </button>
          </div>
        </div>
      )}

      {section.type === 'collection' && Array.isArray(data) && !editingId && !editForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {data.map((item) => (
            <div key={item._id} className="bg-white/70 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all group overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1 pr-4">
                  <h4 className="font-bold text-slate-900 line-clamp-1">{item.programName || item.title || item.name || 'Untitled'}</h4>
                  <p className="text-[10px] font-black text-slate-400 ">{item.date ? new Date(item.date).toLocaleDateString() : (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active Content')}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingId(item._id); setEditForm(item); }}
                    className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                  >
                    {canUpdate ? <Edit2 className="w-4 h-4" /> : <Loader2 className="w-4 h-4" />}
                  </button>
                  {canDelete && (
                    <button
                      onClick={(e) => handleDeleteItem(item._id, e)}
                      className="p-2.5 bg-slate-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 my-4" />
              <div className="space-y-2 opacity-60">
                <div className="w-full h-1 bg-slate-100 rounded-full" />
                <div className="w-2/3 h-1 bg-slate-100 rounded-full" />
              </div>
            </div>
          ))}
          {(data as any[]).length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-[2.5rem]">
              <p className="text-slate-400 font-bold  text-xs italic">No items found in this collection.</p>
            </div>
          )}
        </div>
      )}

      {section.type === 'singleton' && data && (
        <div className="space-y-10">
          {section.fields.map(f => {
            const field = typeof f === 'string' ? { key: f, label: f.replace(/([A-Z])/g, ' $1'), type: 'text' } as Field : f;
            return (
              <div key={field.key} className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl p-10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-32 h-32 rounded-full border-[8px] border-slate-900" />
                </div>
                <div className="relative">
                  {renderField(field, data[field.key], (v) => setData({ ...data, [field.key]: v }))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Navigation Footer */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
        {(() => {
          const site = siteConfigs[siteKey];
          const page = site?.pages.find((p: any) => p.id === pageId);
          if (!page) return null;
          const sectionIdx = page.sections.findIndex((s: any) => s.id === section.id);
          const prev = page.sections[sectionIdx - 1];
          const next = page.sections[sectionIdx + 1];

          return (
            <>
              {prev ? (
                <button
                  onClick={() => onNavigate(pageId, prev.id)}
                  className="flex flex-col items-start gap-1 group"
                >
                  <span className="text-[10px] font-black text-slate-400 ">Previous Section</span>
                  <div className="flex items-center gap-2 text-slate-600 group-hover:text-slate-900 transition-colors">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200">
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </div>
                    <span className="text-sm font-bold">{prev.title}</span>
                  </div>
                </button>
              ) : <div />}

              {next ? (
                <button
                  onClick={() => onNavigate(pageId, next.id)}
                  className="flex flex-col items-end gap-1 group text-right"
                >
                  <span className="text-[10px] font-black text-slate-400 ">Next Section</span>
                  <div className="flex items-center gap-2 text-slate-600 group-hover:text-slate-900 transition-colors">
                    <span className="text-sm font-bold">{next.title}</span>
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ) : <div />}
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default GenericEditor;
