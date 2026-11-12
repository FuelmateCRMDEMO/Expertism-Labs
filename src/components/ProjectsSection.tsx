import React, { useState } from 'react';
import { Briefcase, Calendar, DollarSign, ArrowRight, CheckCircle2, Search, Target, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/mockData';
import { Project } from '../types';
import { ProjectHealthWidget } from './ProjectHealthWidget';

interface ProjectsSectionProps {
  projects: Project[];
  onApplyProject: (project: Project) => void;
  onFindMatchingExperts?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  projects, 
  onApplyProject,
  onFindMatchingExperts 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedProjectId, setAppliedProjectId] = useState<string | null>(null);

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApply = (proj: Project) => {
    setAppliedProjectId(proj.id);
    onApplyProject(proj);
    setTimeout(() => {
      setAppliedProjectId(null);
    }, 3000);
  };

  return (
    <section className="py-16 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Client Briefs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Open Projects & Requirements
            </h1>
            <p className="text-slate-400 mt-2 text-base">
              Browse project briefs, compare technical requirements, and automatically calculate matching scores for candidates.
            </p>
          </div>

          <div className="mt-6 md:mt-0 w-full md:w-80">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects by skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Recharts-based Project Health & Telemetry Widget */}
        <ProjectHealthWidget projects={projects} />

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 sm:p-8 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                        {proj.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-3 hover:text-emerald-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">Client: <strong className="text-slate-200">{proj.client}</strong> • Posted {proj.postedDate}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Required Skills for Matching:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {proj.requiredSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-950 text-emerald-300 text-xs px-3 py-1 rounded-lg border border-emerald-500/30 font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="font-extrabold text-sm">R</span>
                      <span>{proj.budget}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{proj.timeline}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {onFindMatchingExperts && (
                      <button
                        onClick={() => onFindMatchingExperts(proj)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
                        title="Match candidate scores against this project"
                      >
                        <Target className="w-3.5 h-3.5" />
                        <span>Find Matching Experts</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleApply(proj)}
                      disabled={appliedProjectId === proj.id}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        appliedProjectId === proj.id
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {appliedProjectId === proj.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submitted!</span>
                        </>
                      ) : (
                        <>
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
