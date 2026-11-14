import React from 'react';
import { Sparkles, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenPostProject: () => void;
  onOpenBecomeExpert: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPostProject, onOpenBecomeExpert }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('experts')} className="hover:text-emerald-400 transition-colors">
                  Find Experts
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-400 transition-colors">
                  Open Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-400 transition-colors">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Expertise</h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              <li>AI & Machine Learning</li>
              <li>Technical Leadership & Architecture</li>
              <li>Cloud Architecture & DevOps</li>
              <li>Product & UX Design</li>
              <li>Growth & Performance Marketing</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400">Get top expert insights and high-growth trends delivered weekly.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-slate-900 text-white placeholder-slate-600 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-xs font-medium"
              />
              <button
                onClick={() => alert('Successfully subscribed to Expertism Insights!')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Expertism Talent Hub. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security & Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
