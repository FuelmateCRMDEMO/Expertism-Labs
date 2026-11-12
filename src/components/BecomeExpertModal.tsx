import React, { useState } from 'react';
import { X, UserPlus, Check, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { fireSuccessConfetti } from '../utils/confetti';
import { motion } from 'motion/react';

interface BecomeExpertModalProps {
  onClose: () => void;
}

export const BecomeExpertModal: React.FC<BecomeExpertModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [rate, setRate] = useState('2500');
  const [linkedin, setLinkedin] = useState('');
  const [bio, setBio] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    fireSuccessConfetti();
    setTimeout(() => {
      onClose();
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-white">Join Expertism Talent Hub Roster</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-12 space-y-4"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/25 ring-8 ring-teal-500/10"
              >
                <Check className="w-8 h-8 stroke-[3]" />
              </motion.div>
              <h3 className="text-2xl font-extrabold text-white">Application Received!</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Our vetting committee will review your credentials and LinkedIn profile within 24 hours. Welcome to the Expertism network!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@expert.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Principal AI Architect / Fractional CPO"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 text-slate-200 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 text-sm font-medium cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Desired Hourly Rate (R ZAR)</label>
                  <input
                    type="number"
                    required
                    placeholder="2500"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Bio & Key Achievements</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Summarize your years of experience, notable clients, and core technical expertise..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-slate-950 text-white placeholder-slate-600 p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-teal-500 text-sm font-medium"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 text-base"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Submit Expert Application</span>
                </button>
              </div>

              <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Only top 3% of applicants are accepted into the network</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
