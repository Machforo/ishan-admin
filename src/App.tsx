import { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  LayoutDashboard,
  Search,
  Plus,
  Mail,
  FileText,
  Loader2
} from 'lucide-react';
import { siteConfigs } from './config/siteConfigs';
import GenericEditor from './components/GenericEditor';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import AllLeads from './components/AllLeads';
import RoleManagement from './components/RoleManagement';
import DynamicPagesManager from './components/DynamicPagesManager';
import { AuthProvider, useAuth } from './context/AuthContext';
import api from './api';

// --- Dashboard Component ---
const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">System Overview</h1>
          <p className="text-slate-500 mt-1">Real-time engagement across all Ishan platforms.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
            <BarChart3 className="w-4 h-4" /> Export Report
          </button>
          <button className="bg-[#1e293b] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Site
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: '1,284', change: '+12.5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Active Sessions', value: '342', change: '+5.2%', icon: LayoutDashboard, color: 'text-emerald-600', bg: 'bg-emerald-100' },
          { label: 'Applications', value: '89', change: '+28.4%', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100' },
          { label: 'Enquiries', value: '452', change: '+10.1%', icon: Mail, color: 'text-rose-600', bg: 'bg-rose-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-600 text-xs font-bold px-2 py-1 bg-emerald-50 rounded-full">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-md border border-white/20 shadow-xl p-8 rounded-[2rem]">
          <h3 className="text-xl font-bold mb-6">Recent Leads</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4 font-bold">Source</th>
                  <th className="pb-4 font-bold">Name</th>
                  <th className="pb-4 font-bold">Interested In</th>
                  <th className="pb-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { source: 'Ayurveda', name: 'Amit Singh', course: 'BAMS', status: 'New' },
                  { source: 'Hospital', name: 'Rahul Sharma', course: 'Panchkarma', status: 'Pending' },
                  { source: 'Legal', name: 'Priya Verma', course: 'BA LL.B', status: 'Contacted' },
                  { source: 'Pharmacy', name: 'Anik Agarwal', course: 'B.Pharm', status: 'Interested' },
                ].map((lead, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                    <td className="py-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-600">{lead.source}</span>
                    </td>
                    <td className="py-4">
                      <div className="font-bold text-sm">{lead.name}</div>
                    </td>
                    <td className="py-4 text-sm text-slate-500">{lead.course}</td>
                    <td className="py-4 text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span> {lead.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl p-8 rounded-[2rem]">
          <h3 className="text-xl font-bold mb-6">Site Health</h3>
          <div className="space-y-6">
            {[
              { label: 'IIMT Portal', value: 98, color: 'bg-emerald-500' },
              { label: 'Ayurveda Site', value: 92, color: 'bg-emerald-500' },
              { label: 'Legal Portal', value: 85, color: 'bg-amber-500' },
              { label: 'Hospital Web', value: 99, color: 'bg-emerald-500' },
            ].map((site, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{site.label}</span>
                  <span className="text-slate-500">{site.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${site.color}`} style={{ width: `${site.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Content ---
const AppContent = () => {
  const { user, loading, logout } = useAuth();
  const [selectedSite, setSelectedSite] = useState<string>('overview');
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  
  const [dynamicConfigs, setDynamicConfigs] = useState<any>(siteConfigs);
  const [fetchingConfigs, setFetchingConfigs] = useState(true);

  const loadDynamicData = async () => {
    try {
      setFetchingConfigs(true);
      const [clonedRes, settingsRes] = await Promise.all([
        api.get('/cloned-pages'),
        api.get('/page-settings')
      ]);

      const clonedPages = clonedRes.data;
      const pageSettings = settingsRes.data;

      const newConfigs = JSON.parse(JSON.stringify(siteConfigs));

      // Apply hidden settings
      pageSettings.forEach((setting: any) => {
        const site = newConfigs[setting.siteKey];
        if (site) {
          const page = site.pages.find((p: any) => p.id === setting.pageId);
          if (page) {
            const section = page.sections.find((s: any) => s.id === setting.sectionId);
            if (section) {
              section.isHidden = setting.isHidden;
            }
          }
        }
      });

      // Inject cloned pages
      clonedPages.forEach((cp: any) => {
        const site = newConfigs[cp.siteKey];
        if (site) {
          const page = site.pages.find((p: any) => p.id === cp.originalPageId);
          // Find original section in base config to copy its fields and type
          const origSite = siteConfigs[cp.siteKey];
          const origPage = origSite?.pages.find((p: any) => p.id === cp.originalPageId);
          const origSection = origPage?.sections.find((s: any) => s.id === cp.originalSectionId);
          
          if (page && origSection) {
            page.sections.push({
              ...origSection,
              id: cp._id, // Use DB id as section id
              title: cp.newName,
              endpoint: `cloned-pages/${cp._id}`,
              isCloned: true,
              isHidden: cp.isHidden,
              newUrlSlug: cp.newUrlSlug
            });
          }
        }
      });

      setDynamicConfigs(newConfigs);
    } catch (err) {
      console.error('Failed to load dynamic pages:', err);
    } finally {
      setFetchingConfigs(false);
    }
  };

  // We should fetch dynamic data on load and when it might change
  // For now, load once when user is available. GenericEditor can trigger a refresh via context or prop if needed.
  import.meta.hot?.on('vite:beforeUpdate', () => {}); // avoid unused import errors? No.
  
  useEffect(() => {
    if (user) {
      loadDynamicData();
    }
  }, [user]);

  if (loading || (user && fetchingConfigs)) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
    </div>
  );

  if (!user) return <Login />;

  const handleSelectSite = (site: string) => {
    setSelectedSite(site);
    if (site === 'overview' || site === 'roles' || site === 'all_leads') {
      setSelectedPage('');
      setSelectedSection('');
    } else {
      // Auto-select first page and first section
      const config = dynamicConfigs[site];
      if (config && config.pages.length > 0) {
        setSelectedPage(config.pages[0].id);
        if (config.pages[0].sections.length > 0) {
          setSelectedSection(config.pages[0].sections[0].id);
        }
      }
    }
  };

  const handleSelectPage = (pageId: string) => {
    setSelectedPage(pageId);
    const config = dynamicConfigs[selectedSite];
    const page = config?.pages.find((p: any) => p.id === pageId);
    if (page && page.sections.length > 0) {
      setSelectedSection(page.sections[0].id);
    } else {
      setSelectedSection('');
    }
  };

  const handleLocalToggleVisibility = (siteKey: string, pageId: string, sectionId: string, isHidden: boolean) => {
    setDynamicConfigs((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      const site = next[siteKey];
      if (site) {
        const page = site.pages.find((p: any) => p.id === pageId);
        if (page) {
          const section = page.sections.find((s: any) => s.id === sectionId);
          if (section) section.isHidden = isHidden;
        }
      }
      return next;
    });
  };

  const handleLocalDuplicate = (siteKey: string, pageId: string, sectionId: string, newName: string, newUrlSlug: string) => {
    setDynamicConfigs((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      const site = next[siteKey];
      if (site) {
        const page = site.pages.find((p: any) => p.id === pageId);
        const origSite = siteConfigs[siteKey];
        const origPage = origSite?.pages.find((p: any) => p.id === pageId);
        const origSection = origPage?.sections.find((s: any) => s.id === sectionId);
        
        if (page && origSection) {
          page.sections.push({
            ...origSection,
            id: 'mock_cloned_' + Date.now(),
            title: newName,
            endpoint: `cloned-pages/mock`,
            isCloned: true,
            isHidden: false,
            newUrlSlug: newUrlSlug
          });
        }
      }
      return next;
    });
  };

  const currentSiteConfig = dynamicConfigs[selectedSite];
  const currentPageConfig = currentSiteConfig?.pages.find((p: any) => p.id === selectedPage);
  const currentSectionConfig = currentPageConfig?.sections.find((s: any) => s.id === selectedSection);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar
        sites={dynamicConfigs}
        selectedSite={selectedSite}
        onSelectSite={handleSelectSite}
        selectedPage={selectedPage}
        onSelectPage={handleSelectPage}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Header */}
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
              <span>{selectedSite.replace('_', ' ')}</span>
              {selectedPage && (
                <>
                  <span className="opacity-50">/</span>
                  <span className="text-slate-500">{selectedPage}</span>
                </>
              )}
            </div>
            <div className="text-lg font-bold text-[#0f172a]">
              {selectedSite === 'overview' ? 'Dashboard' :
                selectedSite === 'all_leads' ? 'Consolidated Enquiries' :
                  selectedSite === 'roles' ? 'Role Management' :
                    (currentSectionConfig?.title || 'Editor')}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-72 group hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Quick search..."
                className="w-full bg-slate-100/50 border-none rounded-2xl pl-11 pr-4 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Server Live</span>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <div className="text-sm font-bold leading-none">{user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 group cursor-pointer hover:text-rose-500 transition-colors" onClick={logout}>Sign Out</div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-slate-800 p-0.5 shadow-md">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.email}&background=0f172a&color=fff`}
                  alt="Avatar"
                  className="w-full h-full rounded-[0.85rem]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-10 max-w-7xl mx-auto">
          {selectedSite === 'overview' ? (
            <Dashboard />
          ) : selectedSite === 'all_leads' ? (
            <AllLeads />
          ) : selectedSite === 'roles' ? (
            <RoleManagement />
          ) : selectedPage === 'dynamic_pages' ? (
            <DynamicPagesManager siteKey={selectedSite} />
          ) : currentSectionConfig ? (
            <GenericEditor
              siteKey={selectedSite}
              pageId={selectedPage}
              section={currentSectionConfig}
              onNavigate={(pageId, sectionId) => {
                setSelectedPage(pageId);
                setSelectedSection(sectionId);
              }}
              onRefreshConfigs={loadDynamicData}
              onLocalToggleVisibility={handleLocalToggleVisibility}
              onLocalDuplicate={handleLocalDuplicate}
            />
          ) : (
            <div className="h-[60vh] flex items-center justify-center text-slate-400 italic">
              Select a section from the sidebar to start editing.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
