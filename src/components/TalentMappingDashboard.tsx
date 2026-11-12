import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Download, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  Building, 
  MapPin, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Grid3X3, 
  Table, 
  Share2, 
  ChevronRight,
  Info,
  Check,
  UserCheck
} from 'lucide-react';
import { 
  COMPETITOR_MATRIX, 
  MAPPED_CANDIDATES, 
  TALENT_MIGRATION_FLOWS, 
  COMPENSATION_BENCHMARKS,
  MappedCandidate,
  CompetitorMatrixRow 
} from '../data/mappingData';
import { motion, AnimatePresence } from 'motion/react';

interface TalentMappingDashboardProps {
  onSwitchToTalentHub: () => void;
  onSwitchToExpertism: () => void;
  onPostMandate: () => void;
}

export const TalentMappingDashboard: React.FC<TalentMappingDashboardProps> = ({
  onSwitchToTalentHub,
  onSwitchToExpertism,
  onPostMandate
}) => {
  const [activeSheetTab, setActiveSheetTab] = useState<'matrix' | 'roster' | 'migration' | 'comp'>('matrix');
  const [formulaSearch, setFormulaSearch] = useState('');
  const [filterDiscipline, setFilterDiscipline] = useState<string>('All');
  const [filterCompany, setFilterCompany] = useState<string>('All');
  const [filterMobility, setFilterMobility] = useState<string>('All');
  const [selectedCandidate, setSelectedCandidate] = useState<MappedCandidate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered candidate roster
  const filteredCandidates = useMemo(() => {
    return MAPPED_CANDIDATES.filter(c => {
      const matchSearch = formulaSearch === '' || 
        c.codeName.toLowerCase().includes(formulaSearch.toLowerCase()) ||
        c.currentCompany.toLowerCase().includes(formulaSearch.toLowerCase()) ||
        c.title.toLowerCase().includes(formulaSearch.toLowerCase()) ||
        c.verifiedSkills.some(s => s.toLowerCase().includes(formulaSearch.toLowerCase()));
      
      const matchDiscipline = filterDiscipline === 'All' || c.discipline === filterDiscipline;
      const matchCompany = filterCompany === 'All' || c.currentCompany === filterCompany;
      const matchMobility = filterMobility === 'All' || c.mobilityStatus === filterMobility;

      return matchSearch && matchDiscipline && matchCompany && matchMobility;
    });
  }, [formulaSearch, filterDiscipline, filterCompany, filterMobility]);

  // Export CSV function (authentic sheet capability)
  const handleExportCSV = () => {
    const headers = ['Ref_ID', 'Profile', 'Current_Company', 'Title', 'Discipline', 'Seniority', 'Location', 'Target_Salary_ZAR', 'Mobility_Status', 'Poachability_Score', 'Notice_Period'];
    const rows = filteredCandidates.map(c => [
      c.id,
      `"${c.codeName}"`,
      `"${c.currentCompany}"`,
      `"${c.title}"`,
      `"${c.discipline}"`,
      c.seniority,
      c.location,
      c.targetSalaryZAR,
      `"${c.mobilityStatus}"`,
      c.poachabilityScore,
      `"${c.noticePeriod}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Expertism_Talent_Mapping_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Exported active sheet to CSV successfully');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApproachCandidate = (cand: MappedCandidate) => {
    setToastMessage(`Headhunting approach initiated for ${cand.codeName} via Clinton P.`);
    setSelectedCandidate(null);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Excel Sheet Workbook Header Ribbon */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Talent Mapping & Competitor Matrix
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  LIVE WORKBOOK
                </span>
              </div>
              <p className="text-xs text-slate-400">
                South African Enterprise Technology Landscape • Headhunting & Attrition Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
              title="Download spreadsheet report"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onPostMandate}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Commission New Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Excel Formula & Quick Filter Bar */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono text-xs">
          <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-bold shrink-0">
            fx
          </div>
          <div className="text-slate-500 shrink-0 hidden sm:inline">
            =FILTER(Tech_Landscape,
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              value={formulaSearch}
              onChange={(e) => setFormulaSearch(e.target.value)}
              placeholder="Search by candidate, company (e.g. Standard Bank, Takealot), skill or role..."
              className="w-full bg-transparent text-white placeholder-slate-600 focus:outline-none text-xs"
            />
          </div>
          <div className="text-slate-500 shrink-0 hidden sm:inline">
            )
          </div>
          {formulaSearch && (
            <button 
              onClick={() => setFormulaSearch('')}
              className="text-slate-400 hover:text-white px-1.5 font-sans text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Excel Sub-Sheet Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveSheetTab('matrix')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeSheetTab === 'matrix'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Sheet 1: Competitor Matrix Heatmap</span>
          </button>

          <button
            onClick={() => setActiveSheetTab('roster')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeSheetTab === 'roster'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Sheet 2: Candidate Roster ({filteredCandidates.length})</span>
          </button>

          <button
            onClick={() => setActiveSheetTab('migration')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeSheetTab === 'migration'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Sheet 3: Talent Migration Corridors</span>
          </button>

          <button
            onClick={() => setActiveSheetTab('comp')}
            className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeSheetTab === 'comp'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Sheet 4: ZAR Comp Benchmarks</span>
          </button>
        </div>
      </div>

      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 1: COMPETITOR MATRIX HEATMAP */}
      {activeSheetTab === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-emerald-400" />
                <span>Tier-1 Enterprise Talent Matrix & Scarcity Index</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Comparative headcount density and median remuneration (ZAR) across top employers in Gauteng & Western Cape
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
                <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-semibold">
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
                        setActiveSheetTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
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
                        setActiveSheetTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
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
                        setActiveSheetTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
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
                        setActiveSheetTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
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

                    {/* Cell: Solution Arch */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('Solution Architecture');
                        setActiveSheetTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
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

                    {/* Cell: Product Lead */}
                    <td 
                      onClick={() => {
                        setFilterCompany(row.company);
                        setFilterDiscipline('Product Leadership');
                        setActiveSheetTab('roster');
                      }}
                      className="p-3 cursor-pointer hover:bg-slate-800/60 transition-colors"
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

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              <span>Clicking any cell opens the mapped candidate roster filtered directly for that company and discipline.</span>
            </div>
            <button
              onClick={() => setActiveSheetTab('roster')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Open Candidate Roster →
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATE ROSTER SPREADSHEET */}
      {activeSheetTab === 'roster' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Table className="w-5 h-5 text-emerald-400" />
                <span>Executive Candidate Roster Sheet</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Showing {filteredCandidates.length} of {MAPPED_CANDIDATES.length} vetted senior engineering & leadership profiles
              </p>
            </div>

            {/* Quick reset button */}
            {(filterCompany !== 'All' || filterDiscipline !== 'All' || filterMobility !== 'All' || formulaSearch !== '') && (
              <button
                onClick={() => {
                  setFilterCompany('All');
                  setFilterDiscipline('All');
                  setFilterMobility('All');
                  setFormulaSearch('');
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold"
              >
                Reset all filters
              </button>
            )}
          </div>

          {/* Interactive Filter Dropdowns (like Excel Header AutoFilter) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Filter by Employer</label>
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
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Filter by Discipline</label>
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
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Filter by Mobility Status</label>
              <select
                value={filterMobility}
                onChange={(e) => setFilterMobility(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 p-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
              >
                <option value="All">All Mobility Statuses</option>
                <option value="Receptive">🟢 Receptive</option>
                <option value="Passive">🟡 Passive</option>
                <option value="In Discussions">🔵 In Discussions</option>
                <option value="Locked (Non-Compete)">🔴 Locked (Non-Compete)</option>
              </select>
            </div>
          </div>

          {/* Excel Spreadsheet Table */}
          <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-semibold font-mono">
                  <th className="p-3 pl-4">ID</th>
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
              <tbody className="divide-y divide-slate-800/60">
                {filteredCandidates.map((c, i) => (
                  <tr 
                    key={c.id} 
                    className="hover:bg-slate-900/60 transition-colors group cursor-pointer"
                    onClick={() => setSelectedCandidate(c)}
                  >
                    <td className="p-3 pl-4 font-mono text-[11px] text-slate-400 font-semibold">
                      {c.id}
                    </td>

                    <td className="p-3">
                      <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {c.codeName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {c.title}
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="font-semibold text-slate-300">{c.currentCompany}</span>
                      <span className="block text-[10px] text-slate-500 font-mono">{c.noticePeriod} notice</span>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                        {c.seniority}
                      </span>
                    </td>

                    <td className="p-3 text-slate-400">
                      {c.location}
                    </td>

                    <td className="p-3 font-mono font-bold text-emerald-400">
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
                        <span className="font-mono text-[10px] text-slate-400 font-semibold">{c.poachabilityScore}%</span>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        c.mobilityStatus === 'Receptive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        c.mobilityStatus === 'Passive' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        c.mobilityStatus === 'In Discussions' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {c.mobilityStatus}
                      </span>
                    </td>

                    <td className="p-3 pr-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApproachCandidate(c);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-[11px] border border-emerald-500/30 transition-all"
                      >
                        Headhunt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Excel Sheet Status Bar */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span>READY</span>
              <span>COUNT: <strong className="text-white">{filteredCandidates.length}</strong></span>
              <span>RECEPTIVE: <strong className="text-emerald-400">{filteredCandidates.filter(c => c.mobilityStatus === 'Receptive').length}</strong></span>
            </div>
            <div className="flex items-center gap-4">
              <span>AVG POACHABILITY: <strong className="text-white">77.4%</strong></span>
              <span>MEDIAN COMP: <strong className="text-emerald-400">R2,200,000 ZAR</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TALENT MIGRATION CORRIDORS */}
      {activeSheetTab === 'migration' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>South African Tech Migration Corridors (2025 - 2026)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Empirical data on executive & principal engineer movement corridors across South African tech hubs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TALENT_MIGRATION_FLOWS.map((flow, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {flow.volume}
                    </span>
                    <span className="text-teal-400">
                      {flow.avgSalaryUplift}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Origin</span>
                    <p className="text-xs font-bold text-slate-200">{flow.source}</p>
                  </div>

                  <div className="flex justify-center my-1 text-emerald-400">
                    ↓
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Destination</span>
                    <p className="text-xs font-bold text-emerald-300">{flow.destination}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-medium block">Key Mobility Catalyst:</span>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{flow.primaryDrivers}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ZAR COMPENSATION BENCHMARKS */}
      {activeSheetTab === 'comp' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>2026 South Africa Tech Remuneration Benchmark Sheet</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Annual guaranteed packages in South African Rand (ZAR) across senior, principal, and executive levels
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Currency: ZAR (R)
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-slate-900 text-slate-400 border-b border-slate-800 font-semibold font-sans">
                  <th className="p-3.5 pl-4">Leadership & Technical Role</th>
                  <th className="p-3.5">25th Percentile</th>
                  <th className="p-3.5 text-emerald-400">Median (50th)</th>
                  <th className="p-3.5">75th Percentile</th>
                  <th className="p-3.5">90th Percentile (Elite)</th>
                  <th className="p-3.5 pr-4 text-right">YoY Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {COMPENSATION_BENCHMARKS.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-3.5 pl-4 font-sans font-bold text-white text-xs">
                      {b.role}
                    </td>
                    <td className="p-3.5 text-slate-400">{b.p25}</td>
                    <td className="p-3.5 font-bold text-emerald-400">{b.median}</td>
                    <td className="p-3.5 text-slate-300">{b.p75}</td>
                    <td className="p-3.5 font-bold text-teal-300">{b.p90}</td>
                    <td className="p-3.5 pr-4 text-right font-bold text-emerald-400 font-sans">
                      {b.yoyGrowth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Candidate Dossier Inspection Modal */}
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
                <p className="font-semibold text-slate-300 mb-2 font-sans">Verified Engineering Competencies</p>
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
                  <span>Headhunt via Clinton P.</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Confidential executive outreach will be orchestrated directly under Clinton P.’s retained practice with non-disclosure protections.
                </p>
                <div className="flex justify-end gap-3 pt-1">
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleApproachCandidate(selectedCandidate)}
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
