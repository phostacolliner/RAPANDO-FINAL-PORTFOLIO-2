import React, { useState, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data/projects';
import { useData } from '../context/DataContext';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { projects: dbProjects } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeProjectsList = useMemo(() => {
    return dbProjects && dbProjects.length > 0 ? dbProjects : projectsData;
  }, [dbProjects]);

  const categories = [
    'All',
    'Data Analytics',
    'Finance',
    'Economics',
    'Research',
    'Web Development'
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return activeProjectsList;
    return activeProjectsList.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, activeProjectsList]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="projects" 
      className="py-20 md:py-28 bg-[#020817] relative border-t border-blue-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching reference image */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
            PORTFOLIO HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            FEATURED PROJECTS
          </h2>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full mt-3" />
        </div>

        {/* Dynamic Category Filter Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                id={`filter-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? 'bg-[#0D6EFD] text-white shadow-lg shadow-[#0D6EFD]/30 border border-[#00D4FF]/60'
                    : 'bg-[#081B35] text-slate-300 hover:text-white hover:bg-[#0c2445] border border-blue-900/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Carousel / Grid Container with Navigation Arrows */}
        <div className="relative group">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#081B35]/90 border border-[#00D4FF]/40 text-white hover:text-[#00D4FF] hover:bg-[#0D6EFD]/30 items-center justify-center shadow-xl shadow-black/60 transition-all focus:outline-none"
            aria-label="Scroll projects left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Projects Horizontal Scrollable Track / Grid */}
          <div
            ref={scrollContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 scrollbar-none"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={(p) => setActiveProject(p)}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#081B35]/90 border border-[#00D4FF]/40 text-white hover:text-[#00D4FF] hover:bg-[#0D6EFD]/30 items-center justify-center shadow-xl shadow-black/60 transition-all focus:outline-none"
            aria-label="Scroll projects right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

      </div>

      {/* Detailed Project Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
