import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Search, Filter, Download, ExternalLink, RefreshCw } from 'lucide-react';

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course?: string;
  message?: string;
  site: string;
  status: string;
  createdAt: string;
}

const AllLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSite, setFilterSite] = useState('all');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/leads/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('ishan_admin_token')}` }
      });
      setLeads(response.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSite = filterSite === 'all' || lead.site === filterSite;
    return matchesSearch && matchesSite;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a]">Consolidated Leads</h1>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-bold tracking-[0.2em]">Cross-Institutional Enquiry Management</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchLeads}
            className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md">
            <Download className="w-4 h-4" /> Export All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select 
            className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200 transition-all font-bold appearance-none"
            value={filterSite}
            onChange={(e) => setFilterSite(e.target.value)}
          >
            <option value="all">All Institutions</option>
            <option value="iimt">Management & Tech</option>
            <option value="ayurveda">Ayurveda</option>
            <option value="hospital">Hospital</option>
            <option value="legal">Legal</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
        </div>

        <div className="flex items-center justify-center bg-slate-100/50 border border-slate-200 border-dashed rounded-2xl px-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Filtered: {filteredLeads.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-6">Institution</th>
                <th className="px-8 py-6">Prospect Details</th>
                <th className="px-8 py-6">Interest/Course</th>
                <th className="px-8 py-6">Received</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Enquiries...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No Leads Found</td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600`}>
                        {lead.site}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{lead.name}</span>
                        <span className="text-xs text-slate-400 font-medium">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-600">{lead.course || 'General Enquiry'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs text-slate-400 font-bold">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllLeads;
