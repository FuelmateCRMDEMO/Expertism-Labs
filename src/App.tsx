import React, { useState } from 'react';
import { Navbar, MainSectionTab } from './components/Navbar';
import { MarketMapTool } from './components/MarketMapTool';
import { ExpertismDashboard } from './components/ExpertismDashboard';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { TalentDirectory } from './components/TalentDirectory';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ExpertProfileModal } from './components/ExpertProfileModal';
import { PostProjectModal } from './components/PostProjectModal';
import { BecomeExpertModal } from './components/BecomeExpertModal';
import { DashboardModal } from './components/DashboardModal';
import { Expert, Project } from './types';
import { PROJECTS } from './data/mockData';
import { MatchingResult } from './utils/matchingScore';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Users, Briefcase } from 'lucide-react';

export default function App() {
  // Top Navigation Bar active sheet section: Market Map (Primary Tenant) | Talent Hub | Intel
  const [activeSection, setActiveSection] = useState<MainSectionTab>('market-map');

  // Sub-navigation inside Talent Hub view: 'marketplace' | 'projects' | 'about'
  const [talentHubSubTab, setTalentHubSubTab] = useState<'marketplace' | 'projects' | 'about'>('marketplace');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedExpertMatch, setSelectedExpertMatch] = useState<MatchingResult | null>(null);
  const [activeProjectForMatching, setActiveProjectForMatching] = useState<Project | null>(null);

  const [isPostProjectOpen, setIsPostProjectOpen] = useState(false);
  const [isBecomeExpertOpen, setIsBecomeExpertOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  const allProjects = [...customProjects, ...PROJECTS];

  const handleSearchFromHero = (query: string, category: string) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setActiveProjectForMatching(null);
    setTalentHubSubTab('marketplace');
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchQuery('');
    setTalentHubSubTab('marketplace');
  };

  const handleProjectCreated = (newProj: Project) => {
    setCustomProjects(prev => [newProj, ...prev]);
    setActiveProjectForMatching(newProj);
    setActiveSection('talent-hub');
    setTalentHubSubTab('marketplace');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navigation Bar with Market Map as primary tenant tab */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenPostProject={() => setIsPostProjectOpen(true)}
        onOpenBecomeExpert={() => setIsBecomeExpertOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Main Dynamic Viewport (Sheet Switcher) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: MARKET MAP (PRIMARY TENANT: Org Hierarchy, Competitor Density, Roster, Campaign Builder & Raid Pipeline) */}
          {activeSection === 'market-map' && (
            <motion.div
              key="sheet-market-map"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <MarketMapTool
                onOpenTalentHub={() => setActiveSection('talent-hub')}
                onOpenIntel={() => setActiveSection('intel')}
              />
            </motion.div>
          )}

          {/* TAB 2: TALENT HUB (Vetted On-Demand Marketplace, Rates & Matching Scores) */}
          {activeSection === 'talent-hub' && (
            <motion.div
              key="sheet-talent-hub"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 pb-16"
            >
              {/* Talent Hub Sub-Navigation Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Talent Hub On-Demand Marketplace</h2>
                    <p className="text-[11px] text-slate-400">Vetted engineers & architects with instant Matching Score analysis</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                  <button
                    onClick={() => setTalentHubSubTab('marketplace')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      talentHubSubTab === 'marketplace'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Find Experts</span>
                  </button>
                  <button
                    onClick={() => setTalentHubSubTab('projects')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      talentHubSubTab === 'projects'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Open Projects ({allProjects.length})</span>
                  </button>
                  <button
                    onClick={() => setTalentHubSubTab('about')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      talentHubSubTab === 'about'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Vetting Model</span>
                  </button>
                </div>
              </div>

              {/* Sub-tab view inside Talent Hub */}
              {talentHubSubTab === 'marketplace' && (
                <div className="space-y-8">
                  <Hero
                    onSearch={handleSearchFromHero}
                    onExploreExperts={() => setTalentHubSubTab('marketplace')}
                    onPostProject={() => setIsPostProjectOpen(true)}
                  />
                  <CategoriesSection onSelectCategory={handleSelectCategory} />
                  <TalentDirectory
                    onSelectExpert={(exp, matchResult) => {
                      setSelectedExpert(exp);
                      setSelectedExpertMatch(matchResult || null);
                    }}
                    initialSearchQuery={searchQuery}
                    initialCategory={selectedCategory}
                    allProjects={allProjects}
                    activeProject={activeProjectForMatching}
                    onSelectActiveProject={(proj) => setActiveProjectForMatching(proj)}
                  />
                </div>
              )}

              {talentHubSubTab === 'projects' && (
                <ProjectsSection
                  projects={allProjects}
                  onApplyProject={() => setSelectedExpert(null)}
                  onFindMatchingExperts={(proj) => {
                    setActiveProjectForMatching(proj);
                    setTalentHubSubTab('marketplace');
                  }}
                />
              )}

              {talentHubSubTab === 'about' && (
                <AboutSection
                  onExploreExperts={() => setTalentHubSubTab('marketplace')}
                  onPostProject={() => setIsPostProjectOpen(true)}
                />
              )}
            </motion.div>
          )}

          {/* TAB 3: INTEL (Executive Search, Retained Mandates & Corporate Advisory) */}
          {activeSection === 'intel' && (
            <motion.div
              key="sheet-intel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ExpertismDashboard
                onSwitchToTalentHub={() => setActiveSection('talent-hub')}
                onSwitchToMapping={() => setActiveSection('market-map')}
                onPostProject={() => setIsPostProjectOpen(true)}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={(tab) => {
          if (tab === 'home' || tab === 'about') setActiveSection('intel');
          else if (tab === 'experts' || tab === 'projects') setActiveSection('talent-hub');
          else setActiveSection('market-map');
        }}
        onOpenPostProject={() => setIsPostProjectOpen(true)}
        onOpenBecomeExpert={() => setIsBecomeExpertOpen(true)}
      />

      {/* Modals */}
      {selectedExpert && (
        <ExpertProfileModal
          expert={selectedExpert}
          onClose={() => {
            setSelectedExpert(null);
            setSelectedExpertMatch(null);
          }}
          matchingResult={selectedExpertMatch}
        />
      )}

      {isPostProjectOpen && (
        <PostProjectModal
          onClose={() => setIsPostProjectOpen(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}

      {isBecomeExpertOpen && (
        <BecomeExpertModal
          onClose={() => setIsBecomeExpertOpen(false)}
        />
      )}

      {isDashboardOpen && (
        <DashboardModal
          onClose={() => setIsDashboardOpen(false)}
          customProjects={customProjects}
        />
      )}
    </div>
  );
}
