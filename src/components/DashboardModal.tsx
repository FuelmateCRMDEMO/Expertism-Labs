import React, { useState } from 'react';
import { X, LayoutDashboard, Briefcase, Users, Star, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { EXPERTS, PROJECTS } from '../data/mockData';

interface DashboardModalProps {
  onClose: () => void;
  customProjects: any[];
}

export const DashboardModal: React.FC<DashboardModalProps> = ({ onClose, customProjects }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'saved'>('overview');

  const allProjects = [...customProjects, ...PROJECTS];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Expertism Client & Talent Dashboard</h2>
              <p className="text-xs text-slate-400">Manage engagements, posted briefs, and saved experts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Sub-header */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center gap-4 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-1 transition-colors border-b-2 ${activeTab === 'overview' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-1 transition-colors border-b-2 ${activeTab === 'projects' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            My Posted Projects ({allProjects.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-1 transition-colors border-b-2 ${activeTab === 'saved' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Shortlisted Experts ({EXPERTS.slice(0, 3).length})
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Engagements</div>
                  <div className="text-3xl font-extrabold text-emerald-400 mt-2">2</div>
                  <div className="text-xs text-slate-500 mt-1">AI RAG Pipeline & Fractional CPO</div>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Project Budget</div>
                  <div className="text-3xl font-extrabold text-teal-400 mt-2">R460,000</div>
                  <div className="text-xs text-slate-500 mt-1">Escrow secured & milestone protected</div>
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shortlisted Experts</div>
                  <div className="text-3xl font-extrabold text-cyan-400 mt-2">3</div>
                  <div className="text-xs text-slate-500 mt-1">Ready for interview</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white">Recent Activity & Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span>Dr. Alex Vance accepted your consultation request for AI RAG pipeline.</span>
                    </div>
                    <span className="text-slate-500 font-medium">10 mins ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                      <span>Project brief "Kubernetes Infrastructure Overhaul" published successfully.</span>
                    </div>
                    <span className="text-slate-500 font-medium">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Your Posted Project Briefs</h3>
              <div className="space-y-4">
                {allProjects.map((p) => (
                  <div key={p.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded border border-emerald-500/20">
                          {p.category}
                        </span>
                        <span className="text-xs text-slate-400">Posted {p.postedDate}</span>
                      </div>
                      <h4 className="font-bold text-white text-base">{p.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{p.client} • Budget: <strong className="text-emerald-400">{p.budget}</strong></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                        {p.status || 'Open'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Shortlisted Experts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EXPERTS.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-3">
                      <img src={exp.avatar} alt={exp.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{exp.name}</h4>
                        <p className="text-xs text-emerald-400 font-semibold">{exp.title}</p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-900">
                      <span>Rate: <strong className="text-white">R{exp.hourlyRate.toLocaleString()}/hr</strong></span>
                      <span className="text-emerald-400 font-bold">{exp.rating} ★</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
