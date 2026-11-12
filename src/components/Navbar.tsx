import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  FileSpreadsheet, 
  PlusCircle, 
  LayoutDashboard, 
  Menu, 
  X,
  Layers,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  UserPlus,
  Compass
} from 'lucide-react';

export type MainSectionTab = 'market-map' | 'talent-hub' | 'intel';

interface NavbarProps {
  activeSection: MainSectionTab;
  setActiveSection: (section: MainSectionTab) => void;
  onOpenPostProject: () => void;
  onOpenBecomeExpert: () => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenPostProject,
  onOpenBecomeExpert,
  onOpenDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs: { id: MainSectionTab; name: string; sheetNum: string; subtitle: string; isPrimary?: boolean; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      id: 'market-map',
      name: 'Market Map',
      sheetNum: 'Primary',
      subtitle: 'Market Mapping & Org Intel',
      isPrimary: true,
      icon: Compass
    },
    {
      id: 'talent-hub',
      name: 'Talent Hub',
      sheetNum: 'Sheet 2',
      subtitle: 'On-Demand Vetted Talent',
      icon: Sparkles
    },
    {
      id: 'intel',
      name: 'Intel',
      sheetNum: 'Sheet 3',
      subtitle: 'Executive Search & Advisory',
      icon: Briefcase
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all select-none">
      
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveSection('market-map')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent flex items-center gap-1.5">
              Expertism
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">South Africa • Tech Practice</p>
          </div>
        </div>

        {/* Excel-Inspired Top Navigation Bar Tabs */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-left transition-all flex items-center gap-2.5 group ${
                  isActive 
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700/80 font-bold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
                title={`Switch sheet to ${tab.name}`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-emerald-400'
                }`}>
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {tab.name}
                    </span>
                    <span className={`text-[9px] font-mono font-semibold px-1 rounded ${
                      isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-500'
                    }`}>
                      {tab.sheetNum}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block leading-tight font-normal">
                    {tab.subtitle}
                  </span>
                </div>

                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Open Practice Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={onOpenPostProject}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Post Mandate / Brief</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Excel Sheet Workbook Bar (Sub-header strip reminiscent of Excel tabs) */}
      <div className="border-t border-slate-800/80 bg-slate-950 px-4 sm:px-8 py-1.5 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="hidden">PLATFORM:</span>
          <span className="hidden">Expertism_MarketMap_2026.xlsx</span>
          <span className="hidden">|</span>
          <span className="hidden">ACTIVE:</span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
            {activeSection === 'market-map' ? 'MARKET MAP' : activeSection.replace('-', ' ')}
          </span>
        </div>

        {/* Fast Sheet Switcher Pills (Mobile & Desktop) */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors flex items-center gap-1 ${
                activeSection === tab.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-5 space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Switch Workbook Sheet:
          </p>
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-colors ${
                    isActive 
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-white font-bold' 
                      : 'bg-slate-950 text-slate-300 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <div>
                      <span className="text-xs font-bold block">{tab.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{tab.subtitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{tab.sheetNum}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { onOpenPostProject(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Mandate / Brief</span>
            </button>
            <button
              onClick={() => { onOpenDashboard(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Open Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
