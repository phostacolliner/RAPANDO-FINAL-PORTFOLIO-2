import React, { useState } from 'react';
import { skillsData } from '../data/skills';
import { useData } from '../context/DataContext';
import { Award, Zap } from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills: dbSkills } = useData();
  const activeSkillsData = dbSkills && dbSkills.length > 0 ? dbSkills : skillsData;

  const [activeCategory, setActiveCategory] = useState<string>('ANALYTICS');

  const currentCategory = activeSkillsData.find((c) => c.category === activeCategory) || activeSkillsData[0];

  return (
    <section 
      id="skills" 
      className="py-20 md:py-28 bg-[#020817] relative border-t border-blue-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
            TECHNICAL MASTERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            CORE SKILLS & PROFICIENCIES
          </h2>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full mt-3" />
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {activeSkillsData.map((cat) => {
            const isSelected = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                id={`skills-tab-${cat.category.toLowerCase()}`}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#0D6EFD] text-white shadow-lg shadow-[#0D6EFD]/30 border border-[#00D4FF]/60'
                    : 'bg-[#081B35] text-slate-300 hover:text-white hover:bg-[#0c2445] border border-blue-900/40'
                }`}
              >
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* Skills Card Container */}
        <div className="max-w-4xl mx-auto rounded-2xl p-6 sm:p-10 bg-[#06152B] border border-blue-900/50 shadow-2xl shadow-black/80 space-y-6">
          <div className="border-b border-blue-900/40 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>{currentCategory.category} DOMAIN FOCUS</span>
            </div>
            <p className="text-sm text-slate-300 mt-1">
              {currentCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCategory.skills.map((skill, idx) => (
              <div key={idx} className="space-y-2 p-3.5 rounded-xl bg-[#081B35]/70 border border-blue-900/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-white">{skill.name}</span>
                  <span className="font-mono text-xs text-[#00D4FF] font-semibold">{skill.level}%</span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-2 rounded-full bg-[#020817] overflow-hidden border border-blue-900/40">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0D6EFD] to-[#00D4FF] transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  {skill.experience}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
