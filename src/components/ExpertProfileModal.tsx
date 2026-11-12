import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Mail, 
  ShieldCheck, 
  Send,
  Check,
  Sparkles,
  Target,
  AlertCircle
} from 'lucide-react';
import { Expert } from '../types';
import { MatchingResult } from '../utils/matchingScore';
import { MatchingScoreIndicator } from './MatchingScoreIndicator';
import { fireSuccessConfetti } from '../utils/confetti';
import { motion } from 'motion/react';

interface ExpertProfileModalProps {
  expert: Expert;
  onClose: () => void;
  matchingResult?: MatchingResult | null;
}

export const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({ 
  expert, 
  onClose,
  matchingResult 
}) => {
  const [bookingSent, setBookingSent] = useState(false);
  const [projectBrief, setProjectBrief] = useState(
    matchingResult?.mode === 'project'
      ? `Hi ${expert.name},\n\nWe are looking to engage an expert for our project "${matchingResult.targetLabel}". Your skill profile matches ${matchingResult.score}% with our technical requirements. Looking forward to discussing details.`
      : ''
  );
  const [clientEmail, setClientEmail] = useState('');
  const [clientName, setClientName] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectBrief || !clientEmail) return;
    setBookingSent(true);
    fireSuccessConfetti();
    setTimeout(() => {
      // keep success state
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-100">
        
        {/* Modal Header Bar */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Expert Profile & Precision Match Analysis
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Matching Score Breakdown Banner if matchingResult exists */}
          {matchingResult && (
            <div className="space-y-3">
              <MatchingScoreIndicator matchingResult={matchingResult} size="lg" />

              {/* Requirement Match Breakdown */}
              {matchingResult.mode === 'project' && (
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3 text-xs">
                  <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>Project Skill Alignment Matrix</span>
                    <span className="text-emerald-400">
                      {matchingResult.matchedRequirementsCount} of {matchingResult.totalRequirementsCount} requirements satisfied
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {matchingResult.matchedSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold"
                      >
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                        <span>{skill} (Verified Skill Match)</span>
                      </div>
                    ))}

                    {matchingResult.missingSkills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-400/80 shrink-0" />
                        <span>{skill} (Not explicitly listed in primary tags)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Overview Card */}
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-start gap-5">
              <div className="relative shrink-0">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-lg"
                />
                {expert.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-1 shadow">
                    <CheckCircle className="w-4 h-4 fill-emerald-500 text-slate-950" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-white">{expert.name}</h1>
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {expert.availability}
                  </span>
                </div>
                <p className="text-emerald-400 font-semibold text-sm">{expert.title}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{expert.rating}</span>
                    <span>({expert.reviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{expert.location}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 pt-1 font-medium">{expert.experience}</p>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-right w-full md:w-auto">
              <div className="text-2xl font-extrabold text-white">
                R{expert.hourlyRate.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/hour</span>
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-1">{expert.completedProjects} Projects Completed</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Bio, Skills, Portfolio */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">About the Expert</h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-5 rounded-xl border border-slate-800/80">
                  {expert.bio}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Verified Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {expert.skills.map((skill, idx) => {
                    const isMatched = matchingResult?.matchedSkills.some(
                      (ms) => ms.toLowerCase() === skill.toLowerCase() || skill.toLowerCase().includes(ms.toLowerCase())
                    );

                    return (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 ${
                          isMatched
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-bold shadow-sm shadow-emerald-500/10'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {isMatched && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />}
                        <span>{skill}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Education & Credential */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Education & Credentials</h3>
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{expert.education}</div>
                    <div className="text-xs text-slate-400">Verified by Expertism Talent Hub Credentials Team</div>
                  </div>
                </div>
              </div>

              {/* Portfolio */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Selected Case Studies & Results</h3>
                <div className="space-y-4">
                  {expert.portfolio.map((item, idx) => (
                    <div key={idx} className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                      <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-xs border border-emerald-500/20">
                        Impact: {item.metrics}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Booking / Hire Form */}
            <div className="space-y-6">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl sticky top-24">
                <h3 className="text-lg font-bold text-white mb-2">Engage {expert.name.split(' ')[0]}</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Send a project brief to request an introductory consultation or direct contract.
                </p>

                {bookingSent ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <h4 className="text-base font-bold text-white">Engagement Request Sent!</h4>
                    <p className="text-xs text-slate-300">
                      {expert.name} has been notified and will review your brief within 4 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name / Company</label>
                      <input
                        type="text"
                        required
                        placeholder="Acme Corp / John Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-slate-900 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@acmecorp.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-slate-900 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Scope & Objectives</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Describe your project requirements, timeline, and goals..."
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        className="w-full bg-slate-900 text-white placeholder-slate-500 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-xs font-medium"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Engagement Request</span>
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-4 border-t border-slate-900 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Secure Escrow & Zero Risk Vetting Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
