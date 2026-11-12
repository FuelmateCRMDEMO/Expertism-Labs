import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Check, Briefcase, Bookmark, RotateCcw, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { fireSuccessConfetti } from '../utils/confetti';
import { motion, AnimatePresence } from 'motion/react';

const DRAFT_STORAGE_KEY = 'expertism_project_brief_draft';

interface ProjectDraft {
  title: string;
  client: string;
  category: string;
  budget: string;
  timeline: string;
  description: string;
  skillsStr: string;
  savedAt: string;
}

interface PostProjectModalProps {
  onClose: () => void;
  onProjectCreated: (project: any) => void;
}

export const PostProjectModal: React.FC<PostProjectModalProps> = ({ onClose, onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [description, setDescription] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Draft state tracking
  const [savedDraft, setSavedDraft] = useState<ProjectDraft | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [draftToastMessage, setDraftToastMessage] = useState<string | null>(null);

  // 1. Check for saved draft on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        const parsed: ProjectDraft = JSON.parse(stored);
        setSavedDraft(parsed);
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  // 2. Track when user edits content so we know changes are unsaved
  const hasContent = Boolean(
    title.trim() || client.trim() || description.trim() || skillsStr.trim() || budget.trim() || timeline.trim()
  );

  // 3. Save draft to localStorage
  const handleSaveDraft = () => {
    const draft: ProjectDraft = {
      title,
      client,
      category,
      budget,
      timeline,
      description,
      skillsStr,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setSavedDraft(draft);
      setHasUnsavedChanges(false);
      setDraftToastMessage('Draft saved successfully!');
      setTimeout(() => setDraftToastMessage(null), 3000);
    } catch {
      setDraftToastMessage('Could not save draft');
      setTimeout(() => setDraftToastMessage(null), 3000);
    }
  };

  // 4. Restore existing draft
  const handleRestoreDraft = () => {
    if (!savedDraft) return;
    setTitle(savedDraft.title || '');
    setClient(savedDraft.client || '');
    setCategory(savedDraft.category || CATEGORIES[0].name);
    setBudget(savedDraft.budget || '');
    setTimeline(savedDraft.timeline || '');
    setDescription(savedDraft.description || '');
    setSkillsStr(savedDraft.skillsStr || '');
    setHasUnsavedChanges(false);
    setDraftToastMessage('Draft restored!');
    setTimeout(() => setDraftToastMessage(null), 3000);
  };

  // 5. Discard draft
  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {}
    setSavedDraft(null);
    setDraftToastMessage('Draft cleared');
    setTimeout(() => setDraftToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj = {
      id: `proj-${Date.now()}`,
      title,
      client: client || 'Anonymous Enterprise',
      budget: budget || 'R160,000 - R350,000',
      timeline: timeline || '4 weeks',
      category,
      description,
      requiredSkills: skillsStr ? skillsStr.split(',').map(s => s.trim()) : ['General'],
      status: 'Open' as const,
      postedDate: 'Just now'
    };
    onProjectCreated(newProj);
    setSubmitted(true);

    // Clear saved draft on successful publish
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {}

    fireSuccessConfetti();
    setTimeout(() => {
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Post a Project Brief</h2>
          </div>
          <div className="flex items-center gap-2">
            {hasContent && !submitted && (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors"
                title="Save current progress as draft"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Draft Notification Banner */}
        <AnimatePresence>
          {savedDraft && !hasContent && !submitted && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-500/10 border-b border-emerald-500/20 px-6 py-3 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 text-emerald-300">
                <Bookmark className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  You have a saved draft from <strong>{savedDraft.savedAt}</strong>
                  {savedDraft.title ? `: "${savedDraft.title.slice(0, 30)}..."` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRestoreDraft}
                  className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore</span>
                </button>
                <button
                  type="button"
                  onClick={handleDiscardDraft}
                  className="text-slate-400 hover:text-slate-200 transition-colors px-1.5 py-1"
                >
                  Discard
                </button>
              </div>
            </motion.div>
          )}

          {draftToastMessage && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-slate-800 border-b border-slate-700 px-6 py-2 text-center text-xs font-semibold text-emerald-400 flex items-center justify-center gap-2"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{draftToastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

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
                className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25 ring-8 ring-emerald-500/10"
              >
                <Check className="w-8 h-8 stroke-[3]" />
              </motion.div>
              <h3 className="text-2xl font-extrabold text-white">Project Published Successfully!</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Your project brief is now live on the Expertism Talent Hub marketplace. Qualified experts will begin pitching shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior AI Engineer for Custom LLM RAG Pipeline"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Technologies"
                    value={client}
                    onChange={(e) => {
                      setClient(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full bg-slate-950 text-slate-200 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium cursor-pointer"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Budget Range (ZAR)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. R160,000 - R250,000"
                    value={budget}
                    onChange={(e) => {
                      setBudget(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estimated Timeline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 weeks"
                    value={timeline}
                    onChange={(e) => {
                      setTimeline(e.target.value);
                      setHasUnsavedChanges(true);
                    }}
                    className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Required Skills (comma-separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PyTorch, Python, LangChain, React"
                  value={skillsStr}
                  onChange={(e) => {
                    setSkillsStr(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full bg-slate-950 text-white placeholder-slate-600 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Detailed Project Scope</label>
                  {hasContent && (
                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 sm:hidden"
                    >
                      <Bookmark className="w-3 h-3" />
                      <span>Save draft</span>
                    </button>
                  )}
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the deliverables, technical stack, and expected outcomes..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full bg-slate-950 text-white placeholder-slate-600 p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-sm font-medium"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                {hasContent && (
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="sm:w-1/3 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Bookmark className="w-4 h-4 text-emerald-400" />
                    <span>Save Draft</span>
                  </button>
                )}

                <button
                  type="submit"
                  className={`${hasContent ? 'sm:w-2/3' : 'w-full'} py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 text-base`}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Publish Project Brief</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

