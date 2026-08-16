import React, { useState, useEffect } from 'react';
import { ArrowRight, Send, ChevronDown, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import portraitImg from '../assets/images/colliner_portrait_1786735551357.jpeg';

interface HeroProps {
  onExploreWork: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onContactClick }) => {
  const [imageError, setImageError] = useState(false);
  const { profile } = useData();

  useEffect(() => {
    setImageError(false);
  }, [profile?.avatarUrl]);

  return (
    <section 
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#020817] via-[#041024] to-[#020817]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 space-y-6 z-10">
            
            {/* Small Greeting Label */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#00D4FF] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                HELLO, I'M
              </span>
            </div>

            {/* Main Name Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              {profile?.fullName || 'COLLINER PHOSTA'}
            </h1>

            {/* Professional Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#00D4FF] leading-snug">
              {profile?.title || 'Data Analyst | Economist | Researcher | Business Intelligence Professional'}
            </h2>

            {/* Bio Statement */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {profile?.tagline || 'I transform data into actionable insights through analytics, econometrics, financial intelligence, research and technology to drive informed decisions and measurable impact.'}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-work-btn"
                onClick={onExploreWork}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-[#0D6EFD]/30 hover:shadow-[0_0_25px_rgba(13,110,253,0.5)] transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-get-in-touch-btn"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#081B35]/80 hover:bg-[#0c2445] text-slate-200 hover:text-white border border-[#0D6EFD]/40 hover:border-[#00D4FF] font-medium text-sm sm:text-base transition-all duration-200 shadow-sm hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]"
              >
                <span>Get In Touch</span>
                <Send className="w-4 h-4 text-[#00D4FF]" />
              </button>
            </div>

            {/* Scroll Down Indicator */}
            <div className="pt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-mono">
              <button 
                onClick={onExploreWork}
                className="flex items-center gap-1.5 hover:text-[#00D4FF] transition-colors focus:outline-none"
              >
                <span>SCROLL DOWN</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#00D4FF]" />
              </button>
            </div>
          </div>

          {/* Right Column: Portrait */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Portrait Frame */}
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square rounded-full p-1.5 bg-gradient-to-b from-[#00D4FF]/40 via-[#0D6EFD]/20 to-transparent shadow-2xl shadow-black/80 z-10 group">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#06152B] relative border border-blue-500/20">
                {!imageError ? (
                  <img
                    src={profile?.avatarUrl || portraitImg}
                    alt={`${profile?.fullName || 'Colliner Phosta'} - Data Analyst & Economist`}
                    className="w-full h-full object-cover object-top rounded-full filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#081B35] to-[#040E1E] p-6 text-center rounded-full">
                    <div className="w-20 h-20 rounded-full bg-[#0D6EFD]/20 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] mb-4">
                      <span className="text-2xl font-bold">CP</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">{profile?.fullName || 'Colliner Phosta'}</div>
                    <div className="text-xs text-[#00D4FF] mb-3">{profile?.title || 'Data Analyst & Economist'}</div>
                  </div>
                )}

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-60 pointer-events-none rounded-full" />
              </div>
            </div>

            {/* Handwritten Signature & Tagline Card */}
            <div className="relative mt-4 text-center z-10">
              <div className="font-signature text-3xl sm:text-4xl text-[#00D4FF] drop-shadow-[0_0_12px_rgba(0,212,255,0.4)] tracking-wide">
                Colliner Phosta
              </div>
              <div className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-300 uppercase mt-1">
                TURNING DATA INTO DECISIONS, <br className="sm:hidden" />
                INSIGHTS INTO STRATEGY.
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
