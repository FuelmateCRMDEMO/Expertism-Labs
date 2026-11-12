import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Building2, 
  Users, 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  ArrowUpDown, 
  Grid3X3, 
  GitBranch, 
  Table, 
  TrendingUp, 
  Briefcase, 
  CheckCircle2, 
  UserCheck, 
  FileText,
  Clock,
  Eye,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { 
  COMPETITOR_MATRIX, 
  MAPPED_CANDIDATES, 
  MARKET_MAP_PROJECTS, 
  ORG_CHART_SAMPLE, 
  TALENT_MIGRATION_FLOWS,
  COMPENSATION_BENCHMARKS,
  MappedCandidate,
  MarketMapProject,
  OrgHierarchyNode
} from '../data/mappingData';
import { motion, AnimatePresence } from 'motion/react';

interface MarketMapToolProps {
  onOpenTalentHub: () => void;
  onOpenIntel: () => void;
}

export const MarketMapTool: React.FC<MarketMapToolProps> = ({
  onOpenTalentHub,
  onOpenIntel
}) => {
  // Active sub-tool view inside Market Map
  const [activeToolTab, setActiveToolTab] = useState<'matrix' | 'org-tree' | 'roster' | 'pipeline'>('matrix');

  // Active Market Map Project
  const [projectsList, setProjectsList] = useState<MarketMapProject[]>(MARKET_MAP_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(MARKET_MAP_PROJECTS[0].id);

  // Filters for Roster & Matrix
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState<string>('All');
  const [filterDiscipline, setFilterDiscipline] = useState<string>('All');
  const [filterMobility, setFilterMobility] = useState<string>('All');

  // Org chart selected company
  const [selectedOrgCompany, setSelectedOrgCompany] = useState<string>('Takealot Group');

  // Selected candidate for detailed dossier
  const [selectedCandidate, setSelectedCandidate] = useState<MappedCandidate | null>(null);

  // New Project Creation Modal
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectSector, setNewProjectSector] = useState('Tier 1 Banking & FinTech');
  const [newProjectRole, setNewProjectRole] = useState('');
  const [newProjectBudget, setNewProjectBudget] = useState('R2,000,000 - R2,600,000');
  const [newProjectLocation, setNewProjectLocation] = useState('Johannesburg & Cape Town');

  // Pipeline stage tracking (Kanban state)
  const [pipelineState, setPipelineState] = useState<Record<string, 'Mapped' | 'Approached' | 'Assessing' | 'Shortlisted'>>({
    'TM-701': 'Approached',
    'TM-703': 'Shortlisted',
    'TM-704': 'Assessing',
    'TM-705': 'Approached',
    'TM-706': 'Mapped',
    'TM-708': 'Mapped',
    'TM-710': 'Shortlisted'
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedProject = projectsList.find(p => p.id === selectedProjectId) || projectsList[0];

  // Filtered candidate roster
  const filteredCandidates = useMemo(() => {
    return MAPPED_CANDIDATES.filter(c => {
      const matchSearch = searchQuery === '' || 
        c.codeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.verifiedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCompany = filterCompany === 'All' || c.currentCompany === filterCompany;
      const matchDiscipline = filterDiscipline === 'All' || c.discipline === filterDiscipline;
      const matchMobility = filterMobility === 'All' || c.mobilityStatus === filterMobility;

      return matchSearch && matchCompany && matchDiscipline && matchMobility;
    });
  }, [searchQuery, filterCompany, filterDiscipline, filterMobility]);

  // Create new project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProj: MarketMapProject = {
      id: `MMP-0${projectsList.length + 1}`,
      name: newProjectName,
      targetSector: newProjectSector,
      targetRole: newProjectRole || 'Principal Technical Architect',
      targetPackageZAR: newProjectBudget,
      location: newProjectLocation,
      mappedCount: 24,
      contactedCount: 6,
      shortlistedCount: 2,
      status: 'Active Mapping',
      keyTargetCompanies: ['Discovery Limited', 'Standard Bank Group', 'Peach Payments & Yoco'],
      createdAt: 'Just now'
    };

    setProjectsList(prev => [newProj, ...prev]);
    setSelectedProjectId(newProj.id);
    setIsNewProjectModalOpen(false);
    setToastMessage(`Market Map Campaign "${newProj.name}" initiated`);
    setTimeout(() => setToastMessage(null), 3500);

    // Reset inputs
    setNewProjectName('');
    setNewProjectRole('');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Ref_ID', 'Candidate_Alias', 'Company', 'Title', 'Discipline', 'Seniority', 'Location', 'Target_Salary_ZAR', 'Flight_Risk', 'Notice_Period'];
    const rows = filteredCandidates.map(c => [
      c.id,
      `"${c.codeName}"`,
      `"${c.currentCompany}"`,
      `"${c.title}"`,
      `"${c.discipline}"`,
      c.seniority,
      c.location,
      c.targetSalaryZAR,
      `${c.poachabilityScore}% (${c.flightRisk})`,
      `"${c.noticePeriod}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Expertism_Market_Map_${selectedProject.id}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Market Map dossier exported to CSV');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAdvancePipeline = (candidateId: string, nextStage: 'Mapped' | 'Approached' | 'Assessing' | 'Shortlisted') => {
    setPipelineState(prev => ({
      ...prev,
      [candidateId]: nextStage
    }));
    setToastMessage(`Candidate ${candidateId} advanced to ${nextStage}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* PRIMARY TENANT HERO HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Primary Tenant Platform</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">MAP WORKSPACE:</span>
              <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Market Map <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Intelligence</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The core executive mapping engine for South African tech organizations. Map competitor engineering hierarchies, identify flight risks, benchmark compensation, and execute precision headhunting raids.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span>New Market Map Project</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Dossier (CSV)</span>
              </button>
            </div>
          </div>

          {/* Active Campaign Selector Bar */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono shrink-0">
                Active Projects:
              </span>
              {projectsList.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 ${
                    selectedProjectId === proj.id
                      ? 'bg-slate-800 text-white border border-emerald-500/50 shadow'
                      : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    proj.status === 'Active Mapping' ? 'bg-emerald-500' :
                    proj.status === 'Outreach Phase' ? 'bg-cyan-500' : 'bg-amber-500'
                  }`}></span>
                  <span className="truncate max-w-[200px]">{proj.name}</span>
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 font-mono shrink-0">
              Target Package: <strong className="text-emerald-400">{selectedProject.targetPackageZAR}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* KPI INTELLIGENCE TILES */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Mapped Target Headcount</span>
            <span className="text-emerald-400 font-bold font-mono">100% Verified</span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {selectedProject.mappedCount * 8}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across 7 enterprise target employers</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>High Flight-Risk Leads</span>
            <span className="text-rose-400 font-bold font-mono">78% Avg Score</span>
          </div>
          <div className="text-3xl font-extrabold text-rose-400 font-mono">
            38
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Receptive to executive approaches</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Median Package Benchmark</span>
            <span className="text-teal-400 font-bold font-mono">ZAR</span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            R2.25M
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Principal & Staff level base + bonus</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Shortlisted for Raid</span>
            <span className="text-emerald-400 font-bold font-mono">Stage 4</span>
          </div>
          <div className="text-3xl font-extrabold text-teal-300 font-mono">
            {selectedProject.shortlistedCount} Candidates
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Executive client presentation ready</p>
        </div>
      </section>

      {/* CORE TOOL VIEW SWITCHER TABS */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveToolTab('matrix')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 ${
              activeToolTab === 'matrix'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>1. Competitor Scarcity Matrix</span>
          </button>

          <button
            onClick={() => setActiveToolTab('org-tree')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 ${
              activeToolTab === 'org-tree'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>2. Org Hierarchy Visualizer</span>
          </button>

          <button
            onClick={() => setActiveToolTab('roster')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 ${
              activeToolTab === 'roster'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>3. Target Candidate Roster ({filteredCandidates.length})</span>
          </button>

          <button
            onClick={() => setActiveToolTab('pipeline')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shrink-0 ${
              activeToolTab === 'pipeline'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>4. Headhunting Pipeline Bench</span>
          </button>
        </div>

        {/* Global Quick Search */}
        <div className="relative min-w-[200px] hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mapped talent..."
            className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 pl-8 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOOL TAB 1: COMPETITOR MATRIX HEATMAP */}
      {activeToolTab === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-emerald-400" />
                <span>Competitor Density & Scarcity Matrix (South Africa)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Comparative technical headcount and average compensation packages across primary South African targets
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                Critical Scarcity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                High Scarcity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                Normal Pool
              </span>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 font-semibold font-mono">
                  <th className="p-3.5 pl-4 sticky left-0 bg-slate-900 z-10 min-w-[200px]">Enterprise Target</th>
                  <th className="p-3.5 min-w-[140px]">Cloud & DevOps</th>
                  <th className="p-3.5 min-w-[140px]">AI & Data Science</th>
                  <th className="p-3.5 min-w-[140px]">Core Engineering</th>
                  <th className="p-3.5 min-w-[140px]">Cyber Security</th>
                  <th className="p-3.5 min-w-[140px]">Solution Arch</th>
                  <th className="p-3.5 min-w-[140px]">Product Lead</th>
                  <th className="p-3.5 pr-4 text-right min-w-[100px]">Mapped Tech</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {COMPETITOR_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3.5 pl-4 font-sans sticky left-0 bg-slate-950/95 z-10 border-r border-slate-800/80">
                      <div className="font-bold text-white text-xs">{row.company}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-600" />
                        {row.location}
                      </div>
                    </td>

                    {/* Cell: Cloud & DevOps */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('Cloud & DevOps');
                        setActiveToolTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
                      title="Filter candidate roster"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{row.disciplines['Cloud & DevOps'].count}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          row.disciplines['Cloud & DevOps'].scarcity === 'Critical' ? 'bg-rose-500' :
                          row.disciplines['Cloud & DevOps'].scarcity === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{row.disciplines['Cloud & DevOps'].avgCompZAR}</span>
                    </td>

                    {/* Cell: AI & Data Science */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('AI & Data Science');
                        setActiveToolTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
                      title="Filter candidate roster"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{row.disciplines['AI & Data Science'].count}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          row.disciplines['AI & Data Science'].scarcity === 'Critical' ? 'bg-rose-500' :
                          row.disciplines['AI & Data Science'].scarcity === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{row.disciplines['AI & Data Science'].avgCompZAR}</span>
                    </td>

                    {/* Cell: Core Engineering */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('Core Engineering');
                        setActiveToolTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
                      title="Filter candidate roster"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{row.disciplines['Core Engineering'].count}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          row.disciplines['Core Engineering'].scarcity === 'Critical' ? 'bg-rose-500' :
                          row.disciplines['Core Engineering'].scarcity === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{row.disciplines['Core Engineering'].avgCompZAR}</span>
                    </td>

                    {/* Cell: Cyber Security */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('Cyber Security');
                        setActiveToolTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
                      title="Filter candidate roster"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{row.disciplines['Cyber Security'].count}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          row.disciplines['Cyber Security'].scarcity === 'Critical' ? 'bg-rose-500' :
                          row.disciplines['Cyber Security'].scarcity === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{row.disciplines['Cyber Security'].avgCompZAR}</span>
                    </td>

                    {/* Cell: Solution Architecture */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('Solution Architecture');
                        setActiveToolTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
                      title="Filter candidate roster"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{row.disciplines['Solution Architecture'].count}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          row.disciplines['Solution Architecture'].scarcity === 'Critical' ? 'bg-rose-500' :
                          row.disciplines['Solution Architecture'].scarcity === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{row.disciplines['Solution Architecture'].avgCompZAR}</span>
                    </td>

                    {/* Cell: Product Leadership */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('Product Leadership');
                        setActiveToolTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
                      title="Filter candidate roster"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{row.disciplines['Product Leadership'].count}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          row.disciplines['Product Leadership'].scarcity === 'Critical' ? 'bg-rose-500' :
                          row.disciplines['Product Leadership'].scarcity === 'High' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}></span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{row.disciplines['Product Leadership'].avgCompZAR}</span>
                    </td>

                    <td className="p-3.5 pr-4 text-right font-sans font-bold text-emerald-400">
                      {row.totalMappedTech}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TOOL TAB 2: ORG HIERARCHY TREE VISUALIZER */}
      {activeToolTab === 'org-tree' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-emerald-400" />
                <span>Target Org Hierarchy & Reporting Tree</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Visual engineering department structure mapped for executive raid analysis
              </p>
            </div>

            {/* Select Target Company */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Select Company:</span>
              <select
                value={selectedOrgCompany}
                onChange={(e) => setSelectedOrgCompany(e.target.value)}
                className="bg-slate-950 text-xs font-bold text-emerald-400 px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Takealot Group">Takealot Group (Cape Town)</option>
                <option value="Standard Bank Group">Standard Bank Group (Johannesburg)</option>
              </select>
            </div>
          </div>

          {/* Org Tree Rendering */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-8 overflow-x-auto">
            {(() => {
              const nodes = ORG_CHART_SAMPLE[selectedOrgCompany] || ORG_CHART_SAMPLE['Takealot Group'];
              const rootNode = nodes.find(n => !n.reportsToId) || nodes[0];
              const childNodes = nodes.filter(n => n.reportsToId === rootNode.id);

              return (
                <div className="min-w-[650px] space-y-8 flex flex-col items-center">
                  {/* Root Node (Head / VP) */}
                  <div className="w-80 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-emerald-500/40 shadow-xl relative text-center">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      Department Head
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">{rootNode.name}</h3>
                    <p className="text-xs font-semibold text-emerald-400">{rootNode.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{rootNode.department} • {rootNode.tenure}</p>

                    <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-white">{rootNode.packageZAR}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        {rootNode.poachabilityScore}% Flight Risk
                      </span>
                    </div>
                  </div>

                  {/* Connector Line */}
                  <div className="w-0.5 h-6 bg-slate-700"></div>

                  {/* Child Reports Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    {childNodes.map((child) => (
                      <div 
                        key={child.id}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-white">{child.name}</h4>
                            <p className="text-[11px] text-slate-300">{child.title}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            child.mobilityStatus === 'Receptive' ? 'bg-emerald-500/10 text-emerald-400' :
                            child.mobilityStatus === 'Passive' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-cyan-500/10 text-cyan-400'
                          }`}>
                            {child.mobilityStatus}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span>Package: <strong className="text-white">{child.packageZAR}</strong></span>
                          <span>Tenure: {child.tenure}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {child.skills.map((s, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                              {s}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setToastMessage(`Headhunting dossier opened for ${child.name}`);
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          className="w-full py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30 transition-colors"
                        >
                          Target for Outreach
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TOOL TAB 3: TARGET CANDIDATE ROSTER SHEET */}
      {activeToolTab === 'roster' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Table className="w-5 h-5 text-emerald-400" />
                <span>Target Candidate Roster Sheet</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Showing {filteredCandidates.length} of {MAPPED_CANDIDATES.length} vetted tech leaders mapped in this project
              </p>
            </div>

            {(filterCompany !== 'All' || filterDiscipline !== 'All' || filterMobility !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setFilterCompany('All');
                  setFilterDiscipline('All');
                  setFilterMobility('All');
                  setSearchQuery('');
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold"
              >
                Reset all filters
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Employer</label>
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 p-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Companies</option>
                {Array.from(new Set(MAPPED_CANDIDATES.map(c => c.currentCompany))).map(comp => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Discipline</label>
              <select
                value={filterDiscipline}
                onChange={(e) => setFilterDiscipline(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 p-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Disciplines</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="AI & Data Science">AI & Data Science</option>
                <option value="Core Engineering">Core Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Solution Architecture">Solution Architecture</option>
                <option value="Product Leadership">Product Leadership</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Mobility Status</label>
              <select
                value={filterMobility}
                onChange={(e) => setFilterMobility(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 p-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Statuses</option>
                <option value="Receptive">🟢 Receptive</option>
                <option value="Passive">🟡 Passive</option>
                <option value="In Discussions">🔵 In Discussions</option>
                <option value="Locked (Non-Compete)">🔴 Locked (Non-Compete)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 font-semibold font-mono">
                  <th className="p-3 pl-4">Ref ID</th>
                  <th className="p-3">Candidate / Title</th>
                  <th className="p-3">Employer</th>
                  <th className="p-3">Seniority</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Target Comp (ZAR)</th>
                  <th className="p-3">Flight Risk</th>
                  <th className="p-3">Mobility</th>
                  <th className="p-3 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredCandidates.map((c) => (
                  <tr 
                    key={c.id} 
                    className="hover:bg-slate-900/60 transition-colors group cursor-pointer"
                    onClick={() => setSelectedCandidate(c)}
                  >
                    <td className="p-3 pl-4 text-slate-400 font-bold">{c.id}</td>
                    <td className="p-3 font-sans">
                      <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {c.codeName}
                      </div>
                      <div className="text-[11px] text-slate-400">{c.title}</div>
                    </td>
                    <td className="p-3 font-sans">
                      <span className="text-slate-200 font-semibold">{c.currentCompany}</span>
                      <span className="block text-[10px] text-slate-500 font-mono">{c.noticePeriod} notice</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {c.seniority}
                      </span>
                    </td>
                    <td className="p-3 font-sans text-slate-400">{c.location}</td>
                    <td className="p-3 font-bold text-emerald-400">
                      R{(c.targetSalaryZAR / 1000000).toFixed(2)}M / yr
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              c.flightRisk === 'High' ? 'bg-rose-500' :
                              c.flightRisk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${c.poachabilityScore}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-300 font-bold">{c.poachabilityScore}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.mobilityStatus === 'Receptive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        c.mobilityStatus === 'Passive' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      }`}>
                        {c.mobilityStatus}
                      </span>
                    </td>
                    <td className="p-3 pr-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdvancePipeline(c.id, 'Approached');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-[11px] border border-emerald-500/30 transition-all"
                      >
                        Add to Raid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TOOL TAB 4: HEADHUNTING PIPELINE KANBAN BENCH */}
      {activeToolTab === 'pipeline' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Executive Headhunting Raid Pipeline</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Active candidates undergoing discrete executive approaches for {selectedProject.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(['Mapped', 'Approached', 'Assessing', 'Shortlisted'] as const).map(stage => {
              const stageCandidates = MAPPED_CANDIDATES.filter(c => (pipelineState[c.id] || 'Mapped') === stage);

              return (
                <div key={stage} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between min-h-[350px]">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{stage}</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 text-emerald-400 font-bold">
                        {stageCandidates.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {stageCandidates.map(c => (
                        <div 
                          key={c.id} 
                          onClick={() => setSelectedCandidate(c)}
                          className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition-colors space-y-2 group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-bold text-white text-xs block group-hover:text-emerald-400 transition-colors">
                                {c.codeName}
                              </span>
                              <span className="text-[10px] text-slate-400">{c.currentCompany}</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-400 font-bold">
                              R{(c.targetSalaryZAR / 1000000).toFixed(1)}M
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                            <span>{c.discipline}</span>
                            <span className="text-rose-400 font-bold">{c.poachabilityScore}% Risk</span>
                          </div>

                          {stage !== 'Shortlisted' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const next = stage === 'Mapped' ? 'Approached' : stage === 'Approached' ? 'Assessing' : 'Shortlisted';
                                handleAdvancePipeline(c.id, next);
                              }}
                              className="w-full mt-2 py-1 rounded bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 font-bold text-[10px] transition-colors"
                            >
                              Advance Stage →
                            </button>
                          )}
                        </div>
                      ))}

                      {stageCandidates.length === 0 && (
                        <div className="text-center py-10 text-slate-600 text-xs font-medium">
                          No candidates in this stage
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* NEW MARKET MAP PROJECT MODAL */}
      <AnimatePresence>
        {isNewProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Commission New Market Map</h3>
                </div>
                <button
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Market Map Campaign Name</label>
                  <input
                    type="text"
                    required
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g. Cape Town Payments Staff Distributed Systems Leads"
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Target Sector</label>
                    <select
                      value={newProjectSector}
                      onChange={(e) => setNewProjectSector(e.target.value)}
                      className="w-full bg-slate-950 text-slate-200 p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Tier 1 Banking & FinTech">Tier 1 Banking & FinTech</option>
                      <option value="E-Commerce & Scale-ups">E-Commerce & Scale-ups</option>
                      <option value="Big Tech & Global Hubs">Big Tech & Global Hubs</option>
                      <option value="HealthTech & InsurTech">HealthTech & InsurTech</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Target Role Title</label>
                    <input
                      type="text"
                      required
                      value={newProjectRole}
                      onChange={(e) => setNewProjectRole(e.target.value)}
                      placeholder="e.g. Staff Distributed Engineer"
                      className="w-full bg-slate-950 text-white placeholder-slate-600 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Target ZAR Package Band</label>
                    <input
                      type="text"
                      required
                      value={newProjectBudget}
                      onChange={(e) => setNewProjectBudget(e.target.value)}
                      placeholder="e.g. R2,200,000 - R2,800,000"
                      className="w-full bg-slate-950 text-white placeholder-slate-600 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Geographic Hub</label>
                    <input
                      type="text"
                      required
                      value={newProjectLocation}
                      onChange={(e) => setNewProjectLocation(e.target.value)}
                      placeholder="e.g. Cape Town / Remote SA"
                      className="w-full bg-slate-950 text-white placeholder-slate-600 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewProjectModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                  >
                    Initialize Mapping Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANDIDATE INSPECTION DOSSIER MODAL */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-100 text-xs"
            >
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                    {selectedCandidate.id}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1.5">{selectedCandidate.codeName}</h3>
                  <p className="text-slate-400">{selectedCandidate.title} • {selectedCandidate.currentCompany}</p>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-slate-400 hover:text-white p-1 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Current Salary (ZAR)</span>
                  <span className="text-slate-300 font-bold">R{(selectedCandidate.currentSalaryZAR / 1000000).toFixed(2)}M / yr</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Target Salary (ZAR)</span>
                  <span className="text-emerald-400 font-bold">R{(selectedCandidate.targetSalaryZAR / 1000000).toFixed(2)}M / yr</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Flight Risk / Poachability</span>
                  <span className="text-white font-bold">{selectedCandidate.flightRisk} ({selectedCandidate.poachabilityScore}%)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Notice Period</span>
                  <span className="text-teal-400 font-bold">{selectedCandidate.noticePeriod}</span>
                </div>
              </div>

              <div>
                <p className="font-semibold text-slate-300 mb-2 font-sans">Verified Competencies</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.verifiedSkills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <UserCheck className="w-4 h-4" />
                  <span>Execute Headhunting Approach</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Discrete executive outreach orchestrated directly via Clinton P. under strict non-disclosure safeguards.
                </p>
                <div className="flex justify-end gap-3 pt-1">
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleAdvancePipeline(selectedCandidate.id, 'Approached');
                      setSelectedCandidate(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                  >
                    Initiate Approach
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
