import React from 'react';
import { Linkedin, Github, Twitter, ChevronUp, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020817] border-t border-blue-900/40 py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright & Admin Portal */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <span>© 2026 Colliner Phosta. All Rights Reserved.</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-slate-400 hover:text-[#00D4FF] inline-flex items-center gap-1 transition-colors pl-2 border-l border-blue-900/60"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

          {/* Center: Brand Disciplines */}
          <div className="text-center font-medium text-slate-300">
            Data <span className="text-[#00D4FF]">|</span> Economics <span className="text-[#00D4FF]">|</span> Finance <span className="text-[#00D4FF]">|</span> Research <span className="text-[#00D4FF]">|</span> Technology
          </div>

          {/* Right: Social Links & Back-To-Top */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/colliner-phosta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#081B35] border border-blue-900/40 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-colors"
              aria-label="Colliner Phosta LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/phostacolliner"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#081B35] border border-blue-900/40 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-colors"
              aria-label="Colliner Phosta GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#081B35] border border-blue-900/40 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-colors"
              aria-label="Colliner Phosta Twitter/X Profile"
            >
              <Twitter className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#0D6EFD]/20 border border-[#0D6EFD]/40 text-[#00D4FF] hover:bg-[#0D6EFD] hover:text-white transition-all ml-2"
              aria-label="Scroll to top of page"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
