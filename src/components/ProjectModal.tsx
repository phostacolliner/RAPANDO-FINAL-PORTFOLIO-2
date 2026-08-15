import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  TrendingUp, 
  Target
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#06152B] border border-[#00D4FF]/40 shadow-2xl shadow-black/80 text-left p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#081B35] border border-blue-900/60 text-slate-300 hover:text-white hover:border-[#00D4FF] focus:outline-none"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#0D6EFD]/20 border border-[#0D6EFD]/50 text-xs font-semibold text-[#00D4FF]">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {project.completionDate}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {project.fullDescription}
          </p>
        </div>

        {/* Project Preview Image */}
        <div className="my-6 rounded-xl overflow-hidden border border-blue-900/50 aspect-video max-h-80 w-full bg-[#020817]">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Highlight Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#081B35] border border-blue-900/40 text-center">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{m.label}</div>
                <div className="text-xl sm:text-2xl font-bold text-[#00D4FF] font-mono mt-1">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Structured Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-sm">
          
          {/* Problem Statement & Objectives */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#081B35]/70 border border-blue-900/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00D4FF] uppercase tracking-wider mb-2">
                <Target className="w-4 h-4" />
                <span>Problem Statement</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#081B35]/70 border border-blue-900/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00D4FF] uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Objectives</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00D4FF] mt-0.5">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Findings & Business Impact */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#081B35]/70 border border-blue-900/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00D4FF] uppercase tracking-wider mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Key Findings & Analytical Insights</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {project.keyFindings.map((finding, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00D4FF] mt-0.5">•</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#081B35]/70 border border-blue-900/30">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>Business & Policy Impact</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {project.businessImpact.map((impact, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Tools and Technologies */}
        <div className="pt-4 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase mb-2">Technologies & Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-[#081B35] border border-blue-800/40 text-xs font-mono text-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#081B35] hover:bg-[#0c2445] border border-blue-800/50 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#0D6EFD]/30"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
