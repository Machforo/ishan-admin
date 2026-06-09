import React, { useState } from 'react';
import { 
  Building2, 
  ChevronDown, 
  ChevronRight, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Mail,
  ShieldCheck,
  Globe
} from 'lucide-react';
import type { SiteConfig } from '../config/siteConfigs';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  sites: Record<string, SiteConfig>;
  selectedSite: string;
  onSelectSite: (site: string) => void;
  selectedPage: string;
  onSelectPage: (page: string) => void;
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sites,
  selectedSite,
  onSelectSite,
  selectedPage,
  onSelectPage,
  selectedSection,
  onSelectSection,
}) => {
  const { user, logout } = useAuth();
  const [expandedSite, setExpandedSite] = useState<string | null>(selectedSite);
  const [expandedPage, setExpandedPage] = useState<string | null>(selectedPage);

  React.useEffect(() => {
    if (selectedSite) setExpandedSite(selectedSite);
  }, [selectedSite]);

  React.useEffect(() => {
    if (selectedPage) setExpandedPage(selectedPage);
  }, [selectedPage]);

  if (!user) return null;

  // Filter sites based on permissions
  const hasSiteAccess = (siteKey: string) => {
    if (user.role === 'super_admin') return true;
    if (user.permissions.sites?.includes(siteKey)) return true;
    return user.permissions.sections?.some(s => s.startsWith(`${siteKey}:`));
  };

  const hasSectionAccess = (siteKey: string, sectionId: string) => {
    if (user.role === 'super_admin') return true;
    if (user.permissions.sites?.includes(siteKey)) return true;
    return user.permissions.sections?.includes(`${siteKey}:${sectionId}`);
  };

  const permittedSites = Object.entries(sites).filter(([key]) => hasSiteAccess(key));

  return (
    <aside className="w-72 bg-[#0f172a] text-white p-6 flex flex-col fixed h-full z-50 border-r border-white/5">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-10 pl-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
          <Building2 className="text-[#0f172a] w-6 h-6" />
        </div>
        <div>
          <div className="font-black text-lg tracking-tighter leading-none italic uppercase">Ishan Admin</div>
          <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Control Center</div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {/* Dashboard */}
        <button 
          onClick={() => onSelectSite('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            selectedSite === 'overview' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm font-semibold">Dashboard</span>
        </button>

        {/* All Leads (Consolidated) */}
        <button 
          onClick={() => onSelectSite('all_leads')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            selectedSite === 'all_leads' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Mail className="w-5 h-5 text-rose-400" />
          <span className="text-sm font-semibold">Consolidated Leads</span>
        </button>

        {/* Role Management (Super Admin Only) */}
        {user.role === 'super_admin' && (
          <button 
            onClick={() => onSelectSite('roles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              selectedSite === 'roles' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold">Role Management</span>
          </button>
        )}

        <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 pl-4 pt-6 pb-2">Main Portals</div>
        {permittedSites.filter(([key]) => key.startsWith('landing')).map(([siteKey, site]) => (
          <div key={siteKey} className="space-y-1">
            <button
              onClick={() => {
                onSelectSite(siteKey);
                setExpandedSite(expandedSite === siteKey ? null : siteKey);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                selectedSite === siteKey ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe className={`w-4 h-4 ${selectedSite === siteKey ? 'text-amber-400' : 'text-slate-600'}`} />
              <span className="text-sm font-bold truncate">{site.name}</span>
              {expandedSite === siteKey ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>

            {expandedSite === siteKey && (
              <div className="ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-left-2 duration-200">
                {site.pages?.map((page) => (
                  <div key={page.id} className="space-y-1">
                    <button
                      onClick={() => {
                        onSelectPage(page.id);
                        setExpandedPage(expandedPage === page.id ? null : page.id);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        selectedPage === page.id ? 'bg-amber-400/10 text-amber-400' : 'text-slate-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {page.title}
                      {expandedPage === page.id ? <ChevronDown className="w-3 h-3 ml-auto opacity-50" /> : <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                    </button>

                    {expandedPage === page.id && page.sections && (
                      <div className="ml-2 pl-3 border-l border-white/5 space-y-0.5 py-1">
                        {page.sections.filter(s => hasSectionAccess(siteKey, s.id)).map((section) => (
                          <button
                            key={section.id}
                            onClick={() => onSelectSection(section.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                              selectedSection === section.id ? 'text-white bg-white/10' : 'text-slate-600 hover:text-slate-300'
                            }`}
                          >
                            {section.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 pl-4 pt-6 pb-2">Institutional Management</div>
        {permittedSites.filter(([key]) => !key.startsWith('landing')).map(([siteKey, site]) => (
          <div key={siteKey} className="space-y-1">
            <button
              onClick={() => {
                onSelectSite(siteKey);
                setExpandedSite(expandedSite === siteKey ? null : siteKey);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                selectedSite === siteKey ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Globe className={`w-4 h-4 ${selectedSite === siteKey ? 'text-amber-400' : 'text-slate-600'}`} />
              <span className="text-sm font-bold truncate">{site.name}</span>
              {expandedSite === siteKey ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>

            {expandedSite === siteKey && (
              <div className="ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-left-2 duration-200">
                {site.pages?.map((page) => (
                  <div key={page.id} className="space-y-1">
                    <button
                      onClick={() => {
                        onSelectPage(page.id);
                        setExpandedPage(expandedPage === page.id ? null : page.id);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        selectedPage === page.id ? 'bg-amber-400/10 text-amber-400' : 'text-slate-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {page.title}
                      {expandedPage === page.id ? <ChevronDown className="w-3 h-3 ml-auto opacity-50" /> : <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                    </button>

                    {expandedPage === page.id && page.sections && (
                      <div className="ml-2 pl-3 border-l border-white/5 space-y-0.5 py-1">
                        {page.sections.filter(s => hasSectionAccess(siteKey, s.id)).map((section) => (
                          <button
                            key={section.id}
                            onClick={() => onSelectSection(section.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                              selectedSection === section.id ? 'text-white bg-white/10' : 'text-slate-600 hover:text-slate-300'
                            }`}
                          >
                            {section.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/5 font-medium">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-semibold">Settings</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-rose-400 hover:text-white hover:bg-rose-500/10 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
