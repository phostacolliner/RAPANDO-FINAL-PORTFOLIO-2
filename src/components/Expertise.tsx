import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Coins, 
  TrendingUp, 
  BookOpen, 
  Code2 
} from 'lucide-react';

interface ExpertiseProps {
  onSelectCategory?: (category: string) => void;
}

export const Expertise: React.FC<ExpertiseProps> = ({ onSelectCategory }) => {
  const [counts, setCounts] = useState({ projects: 0, years: 0, quality: 0 });

  useEffect(() => {
    // Animate counter values
    const duration = 1200;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      
      setCounts({
        projects: Math.floor(progress * 10),
        years: Math.floor(progress * 5),
        quality: Math.floor(progress * 100)
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const expertisePillars = [
    {
      id: 'analytics',
      title: 'Data Analytics',
      icon: BarChart3,
      color: 'text-[#0D6EFD]'
    },
    {
      id: 'finance',
      title: 'Finance & Financial Analytics',
      icon: Coins,
      color: 'text-[#10B981]'
    },
    {
      id: 'econometrics',
      title: 'Econometrics & Economic Analysis',
      icon: TrendingUp,
      color: 'text-[#8B5CF6]'
    },
    {
      id: 'research',
      title: 'Research & Evaluation',
      icon: BookOpen,
      color: 'text-[#F59E0B]'
    },
    {
      id: 'web',
      title: 'Web & Software Development',
      icon: Code2,
      color: 'text-[#F97316]'
    }
  ];

  return (
    <section 
      id="expertise"
      className="py-10 bg-[#040E1E] border-y border-[#0D6EFD]/20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Small Section Header */}
        <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00D4FF] mb-6">
          EXPERTISE
        </div>

        {/* Main Grid: 5 Pillars + Divider + 3 Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-6 items-center">
          
          {/* 5 Core Pillars */}
          {expertisePillars.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                onClick={() => onSelectCategory && onSelectCategory(item.title)}
                className="flex flex-col items-start gap-2.5 p-3 rounded-lg bg-[#081B35]/40 hover:bg-[#081B35] border border-blue-900/30 hover:border-[#00D4FF]/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#06152B] border border-blue-800/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className={`w-5 h-5 ${item.color} group-hover:text-[#00D4FF] transition-colors`} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white leading-tight">
                  {item.title}
                </span>
              </div>
            );
          })}

          {/* 3 Metric Badges */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-3 grid grid-cols-3 gap-3 border-t lg:border-t-0 lg:border-l border-blue-800/40 pt-4 lg:pt-0 lg:pl-6">
            
            {/* Metric 1 */}
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00D4FF] font-mono leading-none">
                {counts.projects}+
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight">
                Projects Completed
              </div>
            </div>

            {/* Metric 2 */}
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#38BDF8] font-mono leading-none">
                {counts.years}+
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight">
                Years of Experience
              </div>
            </div>

            {/* Metric 3 */}
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0D6EFD] font-mono leading-none">
                {counts.quality}%
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1 leading-tight">
                Commitment to Quality & Impact
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
