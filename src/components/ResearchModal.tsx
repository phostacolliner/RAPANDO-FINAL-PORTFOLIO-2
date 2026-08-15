import React from 'react';
import { X, Calendar, Clock, BookOpen, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ResearchArticle } from '../types';

interface ResearchModalProps {
  article: ResearchArticle | null;
  onClose: () => void;
}

export const ResearchModal: React.FC<ResearchModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#06152B] border border-[#00D4FF]/40 shadow-2xl shadow-black/80 text-left p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#081B35] border border-blue-900/60 text-slate-300 hover:text-white hover:border-[#00D4FF]"
          aria-label="Close research modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3 pr-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-xs font-semibold text-purple-300">
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
            {article.title}
          </h2>
        </div>

        {/* Abstract */}
        <div className="p-5 rounded-xl bg-[#081B35] border border-blue-900/40 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Abstract & Overview</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {article.abstract}
          </p>
        </div>

        {/* Methodology & Data Source */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#081B35]/60 border border-blue-900/30">
            <div className="font-bold text-[#00D4FF] uppercase mb-1">Methodological Framework</div>
            <div className="text-slate-300">{article.methodology}</div>
          </div>
          <div className="p-4 rounded-xl bg-[#081B35]/60 border border-blue-900/30">
            <div className="font-bold text-[#00D4FF] uppercase mb-1">Empirical Dataset</div>
            <div className="text-slate-300">{article.dataset}</div>
          </div>
        </div>

        {/* Key Findings */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00D4FF] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Research Findings</span>
          </div>
          <div className="space-y-2">
            {article.keyFindings.map((finding, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#081B35]/80 border border-blue-900/40 text-xs sm:text-sm text-slate-200">
                <span className="text-[#00D4FF] font-bold mt-0.5">•</span>
                <span>{finding}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Implications */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Strategic & Policy Implications</span>
          </div>
          <div className="space-y-2">
            {article.policyImplications.map((policy, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#081B35]/80 border border-emerald-500/30 text-xs sm:text-sm text-slate-200">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>{policy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="pt-3 border-t border-blue-900/40 flex flex-wrap gap-2">
          {article.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded bg-[#081B35] border border-blue-800/40 text-xs font-mono text-slate-300">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
