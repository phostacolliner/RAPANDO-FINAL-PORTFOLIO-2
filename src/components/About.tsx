import React from 'react';
import { 
  GraduationCap, 
  Layers, 
  Wrench, 
  CheckCircle2, 
  Award,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface AboutProps {
  onExploreProjects: () => void;
  onOpenCvModal?: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreProjects, onOpenCvModal }) => {
  const { profile } = useData();

  return (
    <section 
      id="about" 
      className="py-20 md:py-28 bg-[#020817] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
            ABOUT ME
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
            Turning Data Into Decisions
          </h2>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Professional Biography */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              {profile?.bio || "I am a Data Analyst, Economist, Researcher, and Business Intelligence Specialist dedicated to converting complex datasets into actionable strategy and measurable organizational outcomes."}
            </p>

            <p>
              {profile?.aboutExtended || "Holding a solid quantitative foundation in Economics and Statistics, my expertise bridges empirical econometric research, statistical modeling, corporate financial analytics, and modern business intelligence architectures."}
            </p>

            <p>
              I specialize in authoring high-impact <strong className="text-white">Power BI & Excel dashboards</strong>, building reproducible statistical and econometric pipelines in <strong className="text-[#00D4FF]">R, Python, SPSS, and Stata</strong>, optimizing relational SQL databases, and designing rigorous quantitative survey research frameworks (KoboToolbox/ODK).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Star Schema & DAX Data Modeling',
                'Empirical Econometric & VECM Modeling',
                '3-Statement Financial Modeling & Variance',
                'Quantitative Survey & M&E Design',
                'SQL & Relational Database Optimization',
                'Modern Responsive Web Applications'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00D4FF] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all shadow-md hover:shadow-[0_0_20px_rgba(13,110,253,0.4)]"
              >
                <span>View My Portfolio Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenCvModal && (
                <button
                  onClick={onOpenCvModal}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-blue-500/30 hover:border-[#00D4FF] bg-[#081B35]/70 hover:bg-[#081B35] text-slate-200 hover:text-white font-medium text-sm transition-all"
                >
                  <Award className="w-4 h-4 text-[#00D4FF]" />
                  <span>View Credentials & CV</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Professional Profile Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#081B35]/80 backdrop-blur-xl border border-blue-500/25 shadow-2xl shadow-black/50 space-y-6">
              
              {/* Header */}
              <div className="border-b border-blue-900/50 pb-4">
                <div className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider">Professional Profile</div>
                <div className="text-xl font-bold text-white mt-1">Colliner Phosta</div>
                <div className="text-xs text-slate-400">Nairobi, Kenya • Data & Economics</div>
              </div>

              {/* Education Block */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
                  <GraduationCap className="w-4 h-4" />
                  <span>Education</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06152B] border border-blue-900/40">
                  <div className="font-semibold text-white text-sm">Bachelor's Degree in Economics and Statistics</div>
                  <div className="text-xs text-slate-300 mt-0.5">Kirinyaga University (2020 – 2024)</div>
                </div>
              </div>

              {/* Core Areas */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
                  <Layers className="w-4 h-4" />
                  <span>Core Disciplines</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Data Analytics', 'Economics', 'Finance', 'Research & M&E', 'Technology'].map((area) => (
                    <span 
                      key={area}
                      className="px-3 py-1 rounded-md text-xs font-medium bg-[#0D6EFD]/20 border border-[#0D6EFD]/40 text-blue-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Tech Stack */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
                  <Wrench className="w-4 h-4" />
                  <span>Primary Analytics Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Power BI', 'Excel', 'SQL', 'Python', 'R', 'SPSS', 'Stata', 'Business Central', 'React', 'Tailwind'].map((tool) => (
                    <span 
                      key={tool}
                      className="px-2.5 py-1 rounded bg-[#06152B] border border-blue-900/50 text-[11px] font-mono text-slate-300 hover:text-[#00D4FF] hover:border-[#00D4FF]/40 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
