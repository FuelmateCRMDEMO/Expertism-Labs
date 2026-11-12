import React from 'react';
import { ShieldCheck, Zap, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onExploreExperts: () => void;
  onPostProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreExperts, onPostProject }) => {
  return (
    <div className="bg-slate-950 text-slate-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2">
            The Expertism Standard
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            How Expertism Talent Hub Works
          </h1>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            We connect ambitious companies with the top 3% of vetted global experts and technical leaders in under 48 hours.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-extrabold text-xl border border-emerald-500/20">
              01
            </div>
            <h3 className="text-xl font-bold text-white">Define Your Project or Need</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Post a project brief or search our curated roster of technical leaders, AI architects, product leads, and senior developers.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-extrabold text-xl border border-teal-500/20">
              02
            </div>
            <h3 className="text-xl font-bold text-white">Match with Vetted Experts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our vetting process accepts only the top 3% of applicants. Review detailed case studies, portfolios, and client ratings.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl relative space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-extrabold text-xl border border-cyan-500/20">
              03
            </div>
            <h3 className="text-xl font-bold text-white">Engage & Accelerate</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Kick off immediately with secure contracts, milestone escrow payments, and zero long-term overhead hassle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
