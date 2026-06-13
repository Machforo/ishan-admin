import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api';
import {
  Shield,
  UserPlus,
  Trash2,
  Globe,
  Check,
} from 'lucide-react';
import { siteConfigs } from '../config/siteConfigs';

interface UserPermissions {
  sites: string[];
  sections: string[];
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

interface SystemUser {
  _id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'team';
  permissions: UserPermissions;
}

const RoleManagement = () => {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<SystemUser['role']>('team');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://ishan-backend-g096.onrender.com/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('ishan_admin_token')}` }
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://ishan-backend-g096.onrender.com/api/users', {
        email: newEmail,
        password: newPassword,
        role: newRole,
        permissions: { sites: [], sections: [], canCreate: true, canUpdate: true, canDelete: false }
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('ishan_admin_token')}` }
      });
      setShowAddModal(false);
      fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  const toggleSitePermission = async (user: SystemUser, siteKey: string) => {
    const hasSite = user.permissions.sites.includes(siteKey);
    const updatedSites = hasSite
      ? user.permissions.sites.filter(s => s !== siteKey)
      : [...user.permissions.sites, siteKey];

    try {
      await api.put(`/users/${user._id}`, {
        permissions: { ...user.permissions, sites: updatedSites }
      });
      fetchUsers();
    } catch (err) {
      console.error('Error updating permissions:', err);
    }
  };

  const toggleSectionPermission = async (user: SystemUser, sectionKey: string) => {
    const hasSection = user.permissions.sections?.includes(sectionKey);
    const updatedSections = hasSection
      ? (user.permissions.sections || []).filter(s => s !== sectionKey)
      : [...(user.permissions.sections || []), sectionKey];

    try {
      await api.put(`/users/${user._id}`, {
        permissions: { ...user.permissions, sections: updatedSections }
      });
      fetchUsers();
    } catch (err) {
      console.error('Error updating permissions:', err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Role Management</h1>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-bold tracking-[0.2em]">Administrative Security Framework</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" /> Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white/70 backdrop-blur-md border border-white/20 shadow-2xl rounded-[2.5rem] p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <Shield className={`w-8 h-8 ${user.role === 'super_admin' ? 'text-amber-500' : 'text-blue-500'}`} />
                </div>
                <div>
                  <div className="text-lg font-bold flex items-center gap-2">
                    {user.email}
                    {user.role === 'super_admin' && (
                      <span className="text-[10px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-black uppercase">Super Admin</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Role: {user.role}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Check className={`w-4 h-4 ${user.permissions.canCreate ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">Create</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Check className={`w-4 h-4 ${user.permissions.canUpdate ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">Update</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <Check className={`w-4 h-4 ${user.permissions.canDelete ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-500">Delete</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-slate-400" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Institutional Access (Toggle)</h3>
              </div>

              <div className="flex flex-col gap-4">
                {Object.entries(siteConfigs).map(([siteKey, config]) => {
                  const hasSite = user.permissions.sites.includes(siteKey) || user.role === 'super_admin';
                  const allSections = config.pages.flatMap(p => p.sections);

                  return (
                    <div key={siteKey} className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-amber-500" />
                          <h4 className="font-bold text-slate-900">{config.name}</h4>
                        </div>
                        <button
                          onClick={() => user.role !== 'super_admin' && toggleSitePermission(user, siteKey)}
                          disabled={user.role === 'super_admin'}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                            ${hasSite
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-white border border-slate-200 text-slate-400 hover:border-slate-300'}`}
                        >
                          {hasSite ? 'Full Access Granted' : 'Grant Full Access'}
                        </button>
                      </div>

                      {!hasSite && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Or grant specific section access:</p>
                          <div className="flex flex-wrap gap-2">
                            {allSections.map(section => {
                              const sectionKey = `${siteKey}:${section.id}`;
                              const hasSection = user.permissions.sections?.includes(sectionKey);
                              return (
                                <button
                                  key={section.id}
                                  onClick={() => toggleSectionPermission(user, sectionKey)}
                                  className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase transition-all border
                                    ${hasSection
                                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}
                                >
                                  {section.title}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {user.role !== 'super_admin' && (
              <div className="flex justify-end mt-6">
                <button className="text-rose-500 hover:text-rose-600 font-bold text-xs flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Terminate User
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowAddModal(false)} />
          <div className="bg-white w-full max-w-lg relative rounded-[2.5rem] p-10 space-y-8 animate-in zoom-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Expand Access</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Create a new system operative</p>
            </div>

            <form onSubmit={handleAddUser} className="space-y-6">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Official Email"
                  className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-slate-200"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Master Password"
                  className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-slate-200"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <select
                  className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-slate-200"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                >
                  <option value="team">Team Member</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-4 rounded-2xl text-xs font-black uppercase bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
                >
                  Abadon
                </button>
                <button
                  type="submit"
                  className="flex-2 px-10 py-4 rounded-2xl text-xs font-black uppercase bg-slate-900 text-white hover:bg-slate-800 transition-all"
                >
                  Deploy User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
