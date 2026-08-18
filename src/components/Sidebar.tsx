import React, { useMemo, useState } from 'react';
import {
  Building2,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Mail,
  ShieldCheck,
  Globe,
  Search,
  EyeOff,
  X,
} from 'lucide-react';
import type { SiteConfig, Page, Section } from '../config/siteConfigs';
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

const norm = (s: string) => s.toLowerCase().trim();

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
  const [query, setQuery] = useState('');

  React.useEffect(() => {
    if (selectedSite) setExpandedSite(selectedSite);
  }, [selectedSite]);

  React.useEffect(() => {
    if (selectedPage) setExpandedPage(selectedPage);
  }, [selectedPage]);

  const hasSiteAccess = (siteKey: string) => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    if (user.permissions.sites?.includes(siteKey)) return true;
    return user.permissions.sections?.some((s) => s.startsWith(`${siteKey}:`));
  };

  const hasSectionAccess = (siteKey: string, sectionId: string) => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    if (user.permissions.sites?.includes(siteKey)) return true;
    return user.permissions.sections?.includes(`${siteKey}:${sectionId}`);
  };

  const permittedSites = useMemo(
    () => Object.entries(sites).filter(([key]) => hasSiteAccess(key)),
    [sites, user]
  );

  /**
   * Search across site / page / section names. A non-technical admin usually
   * knows the wording on the website, not which admin page it lives under —
   * this lets them type "hostel" and land on the right editor.
   */
  const q = norm(query);
  const searching = q.length > 0;

  const matchingSites = useMemo(() => {
    if (!searching) return permittedSites;
    return permittedSites
      .map(([siteKey, site]) => {
        const siteHit = norm(site.name).includes(q);
        const pages = (site.pages || [])
          .map((page) => {
            const pageHit = norm(page.title).includes(q);
            const sections = (page.sections || []).filter(
              (s) => siteHit || pageHit || norm(s.title).includes(q)
            );
            return sections.length > 0 || pageHit || siteHit ? { ...page, sections } : null;
          })
          .filter(Boolean) as Page[];
        return pages.length > 0 ? ([siteKey, { ...site, pages }] as [string, SiteConfig]) : null;
      })
      .filter(Boolean) as [string, SiteConfig][];
  }, [permittedSites, q, searching]);

  if (!user) return null;

  const renderSection = (siteKey: string, page: Page, section: Section) => (
    <button
      key={section.id}
      onClick={() => {
        if (selectedSite !== siteKey) onSelectSite(siteKey);
        if (selectedPage !== page.id) onSelectPage(page.id);
        onSelectSection(section.id);
      }}
      className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
        selectedSection === section.id && selectedSite === siteKey
          ? 'text-white bg-white/10'
          : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
      }`}
      title={section.path ? `Appears on ${section.path}` : section.title}
    >
      <span className="truncate">{section.title}</span>
      {section.isHidden && <EyeOff className="w-3 h-3 shrink-0 opacity-60" />}
      {section.isCloned && <span className="ml-auto text-[9px] font-black text-amber-400/70 shrink-0">COPY</span>}
    </button>
  );

  const renderSite = ([siteKey, site]: [string, SiteConfig]) => {
    const isOpen = searching || expandedSite === siteKey;
    return (
      <div key={siteKey} className="space-y-1">
        <button
          onClick={() => {
            onSelectSite(siteKey);
            setExpandedSite(expandedSite === siteKey ? null : siteKey);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            selectedSite === siteKey ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Globe className={`w-4 h-4 shrink-0 ${selectedSite === siteKey ? 'text-amber-400' : 'text-slate-600'}`} />
          <span className="text-sm font-bold truncate">{site.name}</span>
          {isOpen ? <ChevronDown className="w-4 h-4 ml-auto shrink-0" /> : <ChevronRight className="w-4 h-4 ml-auto shrink-0" />}
        </button>

        {isOpen && (
          <div className="ml-4 pl-4 border-l border-white/10 space-y-1 animate-in slide-in-from-left-2 duration-200">
            {site.pages?.map((page) => {
              const sections = (page.sections || []).filter((s) => hasSectionAccess(siteKey, s.id));
              const pageOpen = searching || expandedPage === page.id;
              return (
                <div key={page.id} className="space-y-1">
                  <button
                    onClick={() => {
                      if (selectedSite !== siteKey) onSelectSite(siteKey);
                      onSelectPage(page.id);
                      setExpandedPage(expandedPage === page.id ? null : page.id);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
                      selectedPage === page.id && selectedSite === siteKey
                        ? 'bg-amber-400/10 text-amber-400'
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                    }`}
                    title={page.path ? `Website page: ${page.path}` : page.title}
                  >
                    <span className="truncate">{page.title}</span>
                    {sections.length > 0 && (
                      <span className="ml-auto text-[9px] font-black text-slate-600 shrink-0">{sections.length}</span>
                    )}
                    {pageOpen ? <ChevronDown className="w-3 h-3 opacity-50 shrink-0" /> : <ChevronRight className="w-3 h-3 opacity-50 shrink-0" />}
                  </button>

                  {pageOpen && sections.length > 0 && (
                    <div className="ml-2 pl-3 border-l border-white/5 space-y-0.5 py-1">
                      {sections.map((section) => renderSection(siteKey, page, section))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const landingSites = matchingSites.filter(([key]) => key.startsWith('landing'));
  const institutionalSites = matchingSites.filter(([key]) => !key.startsWith('landing'));

  return (
    <aside className="w-72 bg-[#0f172a] text-white p-6 flex flex-col fixed h-full z-50 border-r border-white/5">
      <div className="flex items-center gap-3 mb-6 pl-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shrink-0">
          <Building2 className="text-[#0f172a] w-6 h-6" />
        </div>
        <div>
          <div className="font-black text-lg tracking-tighter leading-none italic uppercase">Ishan Admin</div>
          <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Control Center</div>
        </div>
      </div>

      {/* Find a section by the words that appear on the website. */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages & sections…"
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:bg-white/10 focus:border-white/20 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {!searching && (
          <>
            <button
              onClick={() => onSelectSite('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                selectedSite === 'overview' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm font-semibold">Dashboard</span>
            </button>

            <button
              onClick={() => onSelectSite('all_leads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                selectedSite === 'all_leads' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-5 h-5 text-rose-400" />
              <span className="text-sm font-semibold">Consolidated Leads</span>
            </button>

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
          </>
        )}

        {searching && matchingSites.length === 0 && (
          <p className="px-4 py-6 text-xs text-slate-500 italic">No pages or sections match “{query}”.</p>
        )}

        {landingSites.length > 0 && (
          <>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 pl-4 pt-6 pb-2">Landing Pages</div>
            {landingSites.map(renderSite)}
          </>
        )}

        {institutionalSites.length > 0 && (
          <>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 pl-4 pt-6 pb-2">Websites</div>
            {institutionalSites.map(renderSite)}
          </>
        )}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="px-4 pb-3 text-[10px] text-slate-500 font-medium truncate" title={user.email}>
          {user.email}
        </div>
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
