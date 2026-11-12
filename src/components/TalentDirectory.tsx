import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Star, 
  MapPin, 
  CheckCircle, 
  ArrowUpRight, 
  Filter, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  Sparkles, 
  ArrowUpDown, 
  Check, 
  Briefcase, 
  X,
  Layers
} from 'lucide-react';
import { EXPERTS, CATEGORIES } from '../data/mockData';
import { Expert, Project } from '../types';
import { computeMatchingScore, MatchingResult } from '../utils/matchingScore';
import { MatchingScoreIndicator } from './MatchingScoreIndicator';
import { motion } from 'motion/react';

interface TalentDirectoryProps {
  onSelectExpert: (expert: Expert, matchingResult?: MatchingResult) => void;
  initialSearchQuery?: string;
  initialCategory?: string;
  allProjects?: Project[];
  activeProject?: Project | null;
  onSelectActiveProject?: (project: Project | null) => void;
}

export const TalentDirectory: React.FC<TalentDirectoryProps> = ({
  onSelectExpert,
  initialSearchQuery = '',
  initialCategory = '',
  allProjects = [],
  activeProject = null,
  onSelectActiveProject,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [maxRate, setMaxRate] = useState(3000);
  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'rate-asc' | 'rate-desc' | 'completed'>('match');

  // Compute matching score for each expert and filter/sort
  const expertsWithMatch = useMemo(() => {
    return EXPERTS.map((expert) => {
      const matchResult = computeMatchingScore(expert, searchQuery, activeProject);
      return {
        expert,
        matchResult,
      };
    });
  }, [searchQuery, activeProject]);

  const filteredAndSortedExperts = useMemo(() => {
    let result = expertsWithMatch.filter(({ expert }) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory ? expert.category === selectedCategory : true;
      const matchesAvailability = availabilityFilter ? expert.availability === availabilityFilter : true;
      const matchesRate = expert.hourlyRate <= maxRate;

      return matchesSearch && matchesCategory && matchesAvailability && matchesRate;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'match') {
        return b.matchResult.score - a.matchResult.score;
      }
      if (sortBy === 'rating') {
        return b.expert.rating - a.expert.rating;
      }
      if (sortBy === 'rate-asc') {
        return a.expert.hourlyRate - b.expert.hourlyRate;
      }
      if (sortBy === 'rate-desc') {
        return b.expert.hourlyRate - a.expert.hourlyRate;
      }
      if (sortBy === 'completed') {
        return b.expert.completedProjects - a.expert.completedProjects;
      }
      return 0;
    });

    return result;
  }, [expertsWithMatch, searchQuery, selectedCategory, availabilityFilter, maxRate, sortBy]);

  return (
    <section className="py-16 bg-slate-950 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Precision Matchmaking</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Explore Elite Experts & Matching Scores
          </h1>
          <p className="text-slate-400 mt-2 text-base max-w-3xl">
            Every candidate is dynamically evaluated with a real-time <strong>Matching Score</strong> compared against your search query keywords or active project requirements.
          </p>
        </div>

        {/* Dynamic Matching Context Control Banner */}
        <div className="mb-8 p-5 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 rounded-2xl shadow-xl shadow-emerald-950/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Active Match Target:
                  </span>
                  {activeProject ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold">
                      <Briefcase className="w-3.5 h-3.5" />
                      {activeProject.title}
                    </span>
                  ) : searchQuery.trim() ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-xs font-extrabold">
                      <Search className="w-3.5 h-3.5" />
                      Search Query: "{searchQuery}"
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">
                      Baseline Vetting & Domain Credentials (Select a project or type skills to calculate exact skill fit)
                    </span>
                  )}
                </div>

                {activeProject && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-300 flex-wrap">
                    <span className="text-slate-400 font-medium">Target Requirements:</span>
                    {activeProject.requiredSkills.map((req, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-950 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded font-semibold text-[11px]"
                      >
                        {req}
                      </span>
                    ))}
                    <span className="text-slate-400">({activeProject.category})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Selector & Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {allProjects.length > 0 && onSelectActiveProject && (
                <div className="relative">
                  <select
                    value={activeProject ? activeProject.id : ''}
                    onChange={(e) => {
                      const found = allProjects.find((p) => p.id === e.target.value) || null;
                      onSelectActiveProject(found);
                    }}
                    className="bg-slate-950 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="">🎯 Match with a Project...</option>
                    {allProjects.map((proj) => (
                      <option key={proj.id} value={proj.id}>
                        {proj.title.length > 36 ? `${proj.title.substring(0, 36)}...` : proj.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeProject && onSelectActiveProject && (
                <button
                  onClick={() => onSelectActiveProject(null)}
                  className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                  title="Clear Project Matching"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Project Match</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters & Sorting Toolbar */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-2xl mb-8 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Type skills to test match (e.g. PyTorch, React, PLG, AWS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-white placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full bg-slate-950 text-emerald-300 font-semibold px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
                >
                  <option value="match">⚡ Sort: Highest Match Score</option>
                  <option value="rating">★ Sort: Highest Rating</option>
                  <option value="completed">✓ Sort: Most Projects Done</option>
                  <option value="rate-asc">R Sort: Rate (Low to High)</option>
                  <option value="rate-desc">R Sort: Rate (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Rate Slider */}
            <div className="flex flex-col justify-center px-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1 font-medium">
                <span>Max Rate</span>
                <span className="text-emerald-400 font-bold">R{maxRate.toLocaleString()}/hr</span>
              </div>
              <input
                type="range"
                min="250"
                max="3000"
                step="100"
                value={maxRate}
                onChange={(e) => setMaxRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Counter and Active Indicators */}
        <div className="flex items-center justify-between mb-6 text-sm text-slate-400">
          <div className="flex items-center gap-3">
            <span>Showing <strong className="text-white">{filteredAndSortedExperts.length}</strong> vetted experts</span>
            {sortBy === 'match' && (
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                Sorted by Match Precision
              </span>
            )}
          </div>

          {(searchQuery || selectedCategory || availabilityFilter || activeProject) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setAvailabilityFilter('');
                setMaxRate(3000);
                if (onSelectActiveProject) onSelectActiveProject(null);
              }}
              className="text-emerald-400 hover:underline font-semibold text-xs flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Experts Grid */}
        {filteredAndSortedExperts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No experts found</h3>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search criteria or resetting filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedExperts.map(({ expert, matchResult }) => {
              const { score, matchedSkills } = matchResult;

              return (
                <motion.div
                  key={expert.id}
                  onClick={() => onSelectExpert(expert, matchResult)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } 
                  }}
                  whileTap={{ scale: 0.99 }}
                  className={`group bg-slate-900/90 border rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    score >= 90
                      ? 'border-slate-800 hover:border-emerald-400 hover:shadow-[0_16px_36px_-12px_rgba(16,185,129,0.28)] ring-1 ring-emerald-500/20 hover:ring-emerald-400/40'
                      : 'border-slate-800 hover:border-emerald-500/60 hover:shadow-[0_14px_32px_-12px_rgba(16,185,129,0.18)]'
                  }`}
                >
                  {/* Subtle dynamic background gradient glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-teal-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top Header: Avatar, Rate & Matching Score Indicator */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={expert.avatar}
                            alt={expert.name}
                            className={`w-14 h-14 rounded-2xl object-cover border-2 transition-all duration-300 group-hover:scale-[1.02] ${
                              score >= 90
                                ? 'border-emerald-500 shadow-md shadow-emerald-500/20 group-hover:border-emerald-400'
                                : 'border-slate-700 group-hover:border-emerald-500/50'
                            }`}
                          />
                          {expert.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow">
                              <CheckCircle className="w-3.5 h-3.5 fill-emerald-500 text-slate-950" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {expert.name}
                            </h3>
                            {expert.featured && (
                              <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/20">
                                TOP
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-emerald-400 font-semibold truncate max-w-[170px]">
                            {expert.title}
                          </p>
                        </div>
                      </div>

                      {/* Matching Score Indicator Component */}
                      <div className="shrink-0">
                        <MatchingScoreIndicator matchingResult={matchResult} size="md" />
                      </div>
                    </div>

                    {/* Rate & Availability Bar */}
                    <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-3.5 group-hover:border-slate-800 transition-colors">
                      <div className="flex items-center gap-1 font-bold text-white">
                        <span className="text-emerald-400 font-extrabold text-sm">R</span>
                        <span>{expert.hourlyRate.toLocaleString()}</span>
                        <span className="text-[11px] text-slate-400 font-normal">/hr</span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          expert.availability === 'Available Now'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : expert.availability === 'Part-time'
                            ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {expert.availability}
                      </span>
                    </div>

                    {/* Rating & Location */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-white">{expert.rating}</span>
                        <span className="text-[11px]">({expert.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{expert.location.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {expert.bio}
                    </p>

                    {/* Dynamic Skills with Match Highlighting */}
                    <div className="space-y-1.5 mb-5">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center justify-between">
                        <span>Skills & Specializations</span>
                        {matchedSkills.length > 0 && (
                          <span className="text-emerald-400 font-bold lowercase">
                            {matchedSkills.length} matched
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {expert.skills.map((skill, idx) => {
                          const isMatched = matchedSkills.some(
                            (ms) => ms.toLowerCase() === skill.toLowerCase() || skill.toLowerCase().includes(ms.toLowerCase())
                          );

                          return (
                            <span
                              key={idx}
                              className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1 ${
                                isMatched
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold shadow-sm shadow-emerald-500/10'
                                  : 'bg-slate-950 text-slate-400 border-slate-800'
                              }`}
                            >
                              {isMatched && <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />}
                              <span>{skill}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Match Summary & Action */}
                  <div className="pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs relative z-10">
                    <span className="text-[11px] text-slate-400 font-medium">
                      {expert.completedProjects} Projects Completed
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Fit & Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
