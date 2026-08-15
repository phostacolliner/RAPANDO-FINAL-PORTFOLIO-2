import React, { useState } from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <div 
      id={`project-card-${project.id}`}
      className="rounded-xl overflow-hidden bg-[#081B35]/90 border border-blue-900/40 hover:border-[#00D4FF]/60 shadow-lg shadow-black/40 hover:shadow-[0_12px_30px_-8px_rgba(0,212,255,0.25)] transition-all duration-300 flex flex-col group"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#06152B]">
        {imageLoaded ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#06152B] to-[#081B35] text-center">
            <BarChart2 className="w-10 h-10 text-[#00D4FF] mb-2 opacity-60" />
            <span className="text-xs text-slate-300 font-medium">{project.title}</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-[#020817]/85 backdrop-blur-md border border-[#00D4FF]/40 text-[11px] font-medium text-[#00D4FF]">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#00D4FF] transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06152B] border border-blue-800/40 text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#06152B] text-slate-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Link */}
        <div className="pt-2 border-t border-blue-900/30">
          <button
            onClick={() => onViewDetails(project)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00D4FF] hover:text-white transition-colors group-hover:translate-x-1 duration-200 focus:outline-none"
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
