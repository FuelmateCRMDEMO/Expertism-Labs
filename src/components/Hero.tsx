import React, { useState } from 'react';
import { Search, ShieldCheck, Star, ArrowRight, CheckCircle2, Sparkles, Users, Award, TrendingUp } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface HeroProps {
  onSearch: (query: string, category: string) => void;
  onExploreExperts: () => void;
  onPostProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreExperts, onPostProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 pt-16 pb-24 border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-[-100px] w-[500px] h-[500px] bg-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Connect with <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Elite Vetted Experts</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instantly hire top-tier AI architects, engineering leads, product directors, and senior developers for your mission-critical projects.
          </p>

          {/* Search Bar Box */}
          <div className="mt-8 bg-slate-900/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-700/80 shadow-2xl shadow-emerald-950/40 max-w-3xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by skill (e.g. PyTorch, React, CFO, Growth)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 text-white placeholder-slate-500 pl-12 pr-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-medium transition-colors"
                />
              </div>

              <div className="w-full sm:w-52">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-950/80 text-slate-200 px-4 py-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm sm:text-base font-medium cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shrink-0 text-base"
              >
                <span>Find Talent</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
