import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, Search } from 'lucide-react';
import { researchData } from '../data/research';
import { ResearchArticle } from '../types';
import { useData } from '../context/DataContext';
import { ResearchModal } from './ResearchModal';

export const Research: React.FC = () => {
  const { research: dbResearch } = useData();
  const activeResearch = dbResearch && dbResearch.length > 0 ? dbResearch : researchData;

  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Econometrics', 'Business Intelligence', 'Macroeconomics', 'Development Economics'];

  const filteredArticles = filterCategory === 'All'
    ? activeResearch
    : activeResearch.filter((a) => a.category === filterCategory);

  return (
    <section 
      id="research" 
      className="py-20 md:py-28 bg-[#040E1E] relative border-t border-blue-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
            PUBLICATIONS & WORKING PAPERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            RESEARCH & ECONOMIC INSIGHTS
          </h2>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full mt-3" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-[#0D6EFD] text-white shadow-md shadow-[#0D6EFD]/30 border border-[#00D4FF]/50'
                  : 'bg-[#081B35] text-slate-300 hover:text-white hover:bg-[#0c2445] border border-blue-900/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              id={`research-card-${article.id}`}
              className="rounded-2xl p-6 bg-[#081B35]/85 border border-blue-900/40 hover:border-[#00D4FF]/60 shadow-xl shadow-black/40 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-[#0D6EFD]/20 border border-[#0D6EFD]/40 text-[#00D4FF] font-medium">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00D4FF] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {article.shortSummary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-blue-900/30 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors group-hover:translate-x-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ResearchModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
