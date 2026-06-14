import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Lock, Mail, Loader2, AlertCircle, Building2 } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

      <div className="w-full max-w-md relative animate-in fade-in zoom-in duration-500">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2.5rem] p-10 space-y-8">
          {/* Logo/Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto shadow-xl mb-6 transform -rotate-6">
              <Building2 className="text-amber-400 w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Ishan Admin</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Central Command Center</p>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider border border-rose-100 animate-shake">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-slate-100/50 border border-transparent focus:border-slate-200 focus:bg-white rounded-2xl px-12 py-4 text-sm outline-none transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-slate-100/50 border border-transparent focus:border-slate-200 focus:bg-white rounded-2xl px-12 py-4 text-sm outline-none transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Dashboard'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Protected by Ishan Network Security</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
