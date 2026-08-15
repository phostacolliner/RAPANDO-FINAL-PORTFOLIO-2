import React from 'react';

export const HeroVisuals: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0D6EFD]/15 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-2xl -z-10" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d284f15_1px,transparent_1px),linear-gradient(to_bottom,#0d284f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_65%_40%,#000_70%,transparent_100%)] -z-10" />

      {/* Floating Analytics Card 1: Top Right Line Chart */}
      <div className="absolute top-4 right-4 md:right-8 w-48 sm:w-56 p-3 rounded-xl bg-[#081B35]/80 backdrop-blur-md border border-[#00D4FF]/25 shadow-xl shadow-black/40 transform rotate-1 hover:rotate-0 transition-transform duration-500 hidden sm:block">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-300">Model Convergence</span>
          <span className="text-[10px] text-[#00D4FF] font-semibold">99.4%</span>
        </div>
        <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 30">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M0,25 Q15,20 30,12 T60,18 T85,5 T100,2" fill="none" stroke="#00D4FF" strokeWidth="2" />
          <path d="M0,25 Q15,20 30,12 T60,18 T85,5 T100,2 L100,30 L0,30 Z" fill="url(#lineGrad)" />
          <circle cx="85" cy="5" r="3" fill="#00D4FF" className="animate-ping opacity-75" />
          <circle cx="85" cy="5" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Floating Analytics Card 2: Donut 78% KPI (from reference image) */}
      <div className="absolute top-36 right-0 sm:-right-4 w-32 sm:w-36 p-3 rounded-xl bg-[#081B35]/85 backdrop-blur-md border border-blue-500/30 shadow-xl shadow-black/50 text-center transform -rotate-2 hover:rotate-0 transition-transform duration-500 hidden md:block">
        <div className="relative w-16 h-16 mx-auto mb-1 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#00D4FF]"
              strokeDasharray="78, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-sm font-bold text-white font-mono">78%</span>
        </div>
        <div className="text-[10px] text-slate-300 font-medium">Variance Explained</div>
      </div>

      {/* Floating Analytics Card 3: Bar Sparkline */}
      <div className="absolute bottom-28 right-6 w-44 p-2.5 rounded-lg bg-[#06152B]/90 backdrop-blur-md border border-blue-400/20 shadow-lg hidden lg:block">
        <div className="text-[9px] text-slate-400 mb-1.5 flex justify-between">
          <span>QoQ Revenue Growth</span>
          <span className="text-emerald-400 font-bold">+24.2%</span>
        </div>
        <div className="flex items-end gap-1.5 h-8 pt-1">
          {[35, 45, 60, 50, 75, 68, 90, 82, 100].map((h, idx) => (
            <div
              key={idx}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-xs transition-all duration-300 ${
                idx === 8 ? 'bg-[#00D4FF]' : 'bg-[#0D6EFD]/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
