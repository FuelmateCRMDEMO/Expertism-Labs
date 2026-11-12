import React from 'react';
import { Sparkles, CheckCircle2, Target, AlertCircle } from 'lucide-react';
import { MatchingResult } from '../utils/matchingScore';

interface MatchingScoreIndicatorProps {
  matchingResult: MatchingResult;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const MatchingScoreIndicator: React.FC<MatchingScoreIndicatorProps> = ({
  matchingResult,
  size = 'md',
  showDetails = false,
}) => {
  const { score, matchedSkills, mode, targetLabel, totalRequirementsCount } = matchingResult;

  // Determine color scheme based on score
  const getColorScheme = (val: number) => {
    if (val >= 90) {
      return {
        stroke: '#10b981', // emerald-500
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        glow: 'shadow-emerald-500/20',
        badgeText: 'text-emerald-300',
        label: 'Top Match',
      };
    }
    if (val >= 75) {
      return {
        stroke: '#14b8a6', // teal-500
        text: 'text-teal-400',
        bg: 'bg-teal-500/10',
        border: 'border-teal-500/30',
        glow: 'shadow-teal-500/20',
        badgeText: 'text-teal-300',
        label: 'Strong Match',
      };
    }
    if (val >= 50) {
      return {
        stroke: '#f59e0b', // amber-500
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        glow: 'shadow-amber-500/20',
        badgeText: 'text-amber-300',
        label: 'Moderate Match',
      };
    }
    return {
      stroke: '#64748b', // slate-500
      text: 'text-slate-400',
      bg: 'bg-slate-800/80',
      border: 'border-slate-700',
      glow: '',
      badgeText: 'text-slate-400',
      label: 'Low Match',
    };
  };

  const scheme = getColorScheme(score);

  // SVG circular calculations
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  if (size === 'sm') {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${scheme.bg} ${scheme.border} ${scheme.text} text-xs font-bold transition-all shadow-sm`}
        title={`Matching Score: ${score}% (${scheme.label})`}
      >
        <Sparkles className="w-3 h-3" />
        <span>{score}% Match</span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`p-5 rounded-2xl border ${scheme.bg} ${scheme.border} ${scheme.glow} shadow-lg transition-all`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  stroke={scheme.stroke}
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-base font-extrabold ${scheme.text}`}>{score}%</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${scheme.badgeText}`}>
                  {scheme.label}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {mode === 'project' ? 'Project Alignment' : mode === 'query' ? 'Search Query Fit' : 'Vetted Track Record'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {mode === 'project' ? `Matched with: ${targetLabel}` : mode === 'query' ? `Comparing: ${targetLabel}` : 'Overall Vetting & Skill Readiness'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {matchedSkills.length > 0 ? (
                  <span>
                    Direct skill matches: <strong className="text-slate-200">{matchedSkills.join(', ')}</strong>
                  </span>
                ) : (
                  <span>No direct skill keywords overlap; evaluated on general domain credentials.</span>
                )}
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className={`text-2xl font-extrabold ${scheme.text}`}>
              {score}/100
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Precision Fit</div>
          </div>
        </div>
      </div>
    );
  }

  // Default 'md' size: Designed for expert profile cards
  return (
    <div
      className={`group/match relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl border ${scheme.bg} ${scheme.border} ${scheme.glow} transition-all`}
    >
      {/* Circular Mini Gauge */}
      <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
        <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 38 38">
          <circle
            cx="19"
            cy="19"
            r={14}
            className="stroke-slate-800/80"
            strokeWidth="3.2"
            fill="transparent"
          />
          <circle
            cx="19"
            cy="19"
            r={14}
            stroke={scheme.stroke}
            strokeWidth="3.2"
            strokeDasharray={2 * Math.PI * 14}
            strokeDashoffset={2 * Math.PI * 14 - (score / 100) * (2 * Math.PI * 14)}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-[11px] font-black tracking-tight ${scheme.text}`}>
            {score}%
          </span>
        </div>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-extrabold tracking-tight ${scheme.text}`}>
            {score}% Match
          </span>
          {score >= 90 && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5 truncate max-w-[130px]">
          {mode === 'project'
            ? `${matchedSkills.length}/${totalRequirementsCount} skills match`
            : mode === 'query' && matchedSkills.length > 0
            ? `${matchedSkills.length} matching skill${matchedSkills.length > 1 ? 's' : ''}`
            : scheme.label}
        </span>
      </div>
    </div>
  );
};
