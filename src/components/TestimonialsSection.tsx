import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-2">
            Social Proof
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            Hear how founders, executives, and top consultants thrive with Expertism Talent Hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-950/80 border border-slate-800 p-8 rounded-3xl relative flex flex-col justify-between shadow-xl"
            >
              <div className="absolute top-6 right-6 text-slate-800">
                <Quote className="w-10 h-10" />
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-900 relative z-10">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{t.author}</h4>
                  <p className="text-xs text-slate-400">{t.role}, <strong className="text-slate-300">{t.company}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
