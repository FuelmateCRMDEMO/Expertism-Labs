import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  Award, 
  Building2, 
  Mail, 
  PhoneCall, 
  ChevronRight,
  ExternalLink,
  Target,
  Sparkles
} from 'lucide-react';
import { 
  PRACTICE_METRICS, 
  EXECUTIVE_MANDATES, 
  CLIENT_PARTNERS, 
  PRACTICE_SERVICES,
  ExecutiveMandate 
} from '../data/expertismData';
import { motion, AnimatePresence } from 'motion/react';

interface ExpertismDashboardProps {
  onSwitchToTalentHub: () => void;
  onSwitchToMapping: () => void;
  onPostProject: () => void;
}

export const ExpertismDashboard: React.FC<ExpertismDashboardProps> = ({
  onSwitchToTalentHub,
  onSwitchToMapping,
  onPostProject
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchMandate, setSearchMandate] = useState<string>('');
  const [selectedMandate, setSelectedMandate] = useState<ExecutiveMandate | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  const statuses = ['All', 'Market Mapping', 'Longlist Review', 'Client Interviews', 'Offer Stage'];

  const filteredMandates = EXECUTIVE_MANDATES.filter(m => {
    const matchesStatus = selectedStatus === 'All' || m.status === selectedStatus;
    const matchesSearch = m.role.toLowerCase().includes(searchMandate.toLowerCase()) ||
                          m.clientIndustry.toLowerCase().includes(searchMandate.toLowerCase()) ||
                          m.location.toLowerCase().includes(searchMandate.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-300">
      
      {/* Executive Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>South Africa’s Technology Executive Search Practice</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Executive Leadership & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Tech Advisory</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Expertism partners with South Africa’s leading enterprise enterprises, banks, and high-growth scale-ups to appoint transformative CTOs, VPs of Engineering, and Heads of AI through proprietary market intelligence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setConsultationModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 stroke-[2.5]" />
              <span>Retain an Executive Search</span>
            </button>

            <button
              onClick={onSwitchToMapping}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2 group"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              <span>Explore Market Mapping Sheet</span>
            </button>
          </div>
        </div>

        {/* Practice Lead Signature Card */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-300">
              CP
            </div>
            <div>
              <p className="text-white font-semibold">Led by Clinton P.</p>
              <p className="text-slate-400">Managing Director • clintonp@expertism.co.za</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-4 h-4 text-emerald-400" />
              BBBEE Level 1 Contributor
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400" />
              Johannesburg & Cape Town, South Africa
            </span>
          </div>
        </div>
      </section>

      {/* KPI Performance Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRACTICE_METRICS.map((metric, i) => (
          <div 
            key={i}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>{metric.label}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-semibold text-[11px] border border-emerald-500/20">
                {metric.change}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight my-1">
              {metric.value}
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              {metric.subtext}
            </p>
          </div>
        ))}
      </section>

      {/* Active Executive Search Mandates Pipeline */}
      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Active Retained Search Mandates</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live executive searches currently managed across South African tech hubs
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchMandate}
                onChange={(e) => setSearchMandate(e.target.value)}
                placeholder="Search mandates, location, tech..."
                className="w-full bg-slate-950 text-xs text-white placeholder-slate-500 pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Post Mandate CTA */}
            <button
              onClick={onPostProject}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Submit New Mandate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedStatus === st
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Mandates List */}
        <div className="space-y-4">
          {filteredMandates.map((m) => (
            <div 
              key={m.id}
              onClick={() => setSelectedMandate(m)}
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-950 transition-all cursor-pointer group space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {m.id}
                    </span>
                    {m.confidential && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Confidential Search
                      </span>
                    )}
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      m.priority === 'Critical' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {m.priority} Priority
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {m.role}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {m.clientIndustry}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {m.location}
                    </span>
                    <span className="font-semibold text-emerald-400">
                      {m.salaryZAR}
                    </span>
                  </div>
                </div>

                {/* Progress & Status Pill */}
                <div className="sm:text-right shrink-0">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                    {m.status}
                  </span>
                  <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${m.progressPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                    {m.progressPercent}% Complete • {m.mappedCandidates} Mapped
                  </span>
                </div>
              </div>

              {/* Requirement tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {m.keyRequirements.map((req, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filteredMandates.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">
              No executive mandates match your filter criteria.
            </div>
          )}
        </div>
      </section>

      {/* Advisory Practice Services */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Practice Capabilities & Advisory</h2>
          <p className="text-xs text-slate-400 mt-1">
            Engineered specifically for the dynamics of the South African and continental African tech ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRACTICE_SERVICES.map((serv) => (
            <div 
              key={serv.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{serv.title}</h3>
                <p className="text-xs font-semibold text-emerald-400">{serv.tagline}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{serv.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Deliverables:</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {serv.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Client Partners Grid */}
      <section className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Trusted By Industry Leaders</p>
          <h3 className="text-xl font-bold text-white">South African Tech & Enterprise Ecosystem</h3>
          <p className="text-xs text-slate-400">
            Advising boards, founders, and executive committees on technology talent architecture
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CLIENT_PARTNERS.map((client, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center hover:border-slate-700 transition-colors group"
            >
              <span className="text-sm font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                {client.name}
              </span>
              <span className="text-[10px] text-slate-500 mt-1">
                {client.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Retain Executive Search Modal */}
      <AnimatePresence>
        {consultationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-100"
            >
              {consultationSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Consultation Request Received</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you. Clinton P. (clintonp@expertism.co.za) will review your mandate brief and connect within 4 business hours to arrange an executive briefing.
                  </p>
                  <button
                    onClick={() => {
                      setConsultationSubmitted(false);
                      setConsultationModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Retained Executive Search Brief</h3>
                      <p className="text-xs text-slate-400">Direct to Clinton P. • Managing Director</p>
                    </div>
                    <button
                      onClick={() => setConsultationModalOpen(false)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setConsultationSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Target Leadership Role</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Chief Technology Officer or Head of Architecture" 
                        className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Your Enterprise Name" 
                          className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Target Package (ZAR)</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. R2.5M - R3.2M p.a." 
                          className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Direct Contact Email / Phone</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="yourname@enterprise.co.za / +27..." 
                        className="w-full bg-slate-950 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Search Objective & Urgency</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Outline the critical transformation or mandate requirements..."
                        className="w-full bg-slate-950 text-xs p-3 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                      ></textarea>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setConsultationModalOpen(false)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                      >
                        Submit Retained Brief
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Selected Mandate Dossier Modal */}
      <AnimatePresence>
        {selectedMandate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-100"
            >
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                    {selectedMandate.id}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1.5">{selectedMandate.role}</h3>
                  <p className="text-xs text-slate-400">{selectedMandate.clientIndustry} • {selectedMandate.location}</p>
                </div>
                <button
                  onClick={() => setSelectedMandate(null)}
                  className="text-slate-400 hover:text-white p-1 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <p className="font-semibold text-slate-300 mb-1">Search Mandate Overview</p>
                  <p className="text-slate-400 leading-relaxed">{selectedMandate.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">Package Benchmark</span>
                    <span className="font-bold text-emerald-400 text-sm">{selectedMandate.salaryZAR}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Current Status</span>
                    <span className="font-bold text-white text-sm">{selectedMandate.status}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Competitor Candidates Mapped</span>
                    <span className="font-bold text-white text-sm">{selectedMandate.mappedCandidates} profiles</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Client Shortlist Count</span>
                    <span className="font-bold text-teal-400 text-sm">{selectedMandate.shortlistedCount} candidates</span>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-slate-300 mb-2">Key Competency Requirements</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMandate.keyRequirements.map((r, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">Lead Partner: {selectedMandate.leadPartner}</p>
                    <p className="text-slate-400 text-[11px]">Direct inquiry: clintonp@expertism.co.za</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMandate(null);
                      onSwitchToMapping();
                    }}
                    className="px-3.5 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
                  >
                    View in Talent Mapping
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
