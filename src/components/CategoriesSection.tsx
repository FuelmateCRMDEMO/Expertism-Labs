import React from 'react';
import { Cpu, Briefcase, Code, Palette, TrendingUp, PieChart, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface CategoriesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6 text-emerald-400" />,
  Briefcase: <Briefcase className="w-6 h-6 text-teal-400" />,
  Code: <Code className="w-6 h-6 text-cyan-400" />,
  Palette: <Palette className="w-6 h-6 text-emerald-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-teal-400" />,
  PieChart: <PieChart className="w-6 h-6 text-cyan-400" />
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2">
              Explore Domains
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Top Talent Categories
            </h2>
          </div>
          <p className="text-slate-400 max-w-md mt-4 md:mt-0 text-sm sm:text-base">
            From technical architects to elite ML researchers, discover verified experts across key disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-emerald-950/20 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {iconMap[cat.iconName]}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-900 text-sm font-semibold">
                <span className="text-slate-500 font-medium">{cat.count}+ Verified Experts</span>
                <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
