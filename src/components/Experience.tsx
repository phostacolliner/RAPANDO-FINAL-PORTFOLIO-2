import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { experienceData } from '../data/experience';
import { useData } from '../context/DataContext';

export const Experience: React.FC = () => {
  const { experience: dbExperience } = useData();
  const activeExperience = dbExperience && dbExperience.length > 0 ? dbExperience : experienceData;

  return (
    <section 
      id="experience" 
      className="py-20 md:py-28 bg-[#040E1E] relative border-t border-blue-900/30"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
            CAREER TRAJECTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full mt-3" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-[#00D4FF] before:via-[#0D6EFD] before:to-transparent">
          {activeExperience.map((exp, idx) => (
            <div 
              key={exp.id} 
              className={`relative flex flex-col sm:flex-row items-start ${
                idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
              } gap-6 group`}
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#06152B] border-2 border-[#00D4FF] flex items-center justify-center text-[#00D4FF] shadow-lg shadow-[#00D4FF]/30 z-10">
                <Briefcase className="w-4 h-4" />
              </div>

              {/* Card */}
              <div className="w-full sm:w-[calc(50%-2rem)] pl-10 sm:pl-0">
                <div className="p-6 rounded-2xl bg-[#081B35]/90 border border-blue-900/40 hover:border-[#00D4FF]/50 transition-all duration-300 shadow-xl shadow-black/40 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#0D6EFD]/20 text-xs font-semibold text-[#00D4FF]">
                      {exp.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-tight">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="font-semibold text-slate-200">{exp.organization}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00D4FF] mt-0.5">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 border-t border-blue-900/40 flex flex-wrap gap-1.5">
                    {exp.toolsUsed.map((tool, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#06152B] border border-blue-800/30 text-[10px] font-mono text-slate-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
