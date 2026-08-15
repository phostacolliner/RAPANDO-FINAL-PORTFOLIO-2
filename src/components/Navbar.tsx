import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  Download, 
  Menu, 
  X, 
  ChevronRight, 
  FileText,
  Lock,
  Database
} from 'lucide-react';
import { downloadCurriculumVitae } from '../utils/generatePdfCv';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCvModal?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onNavigate,
  onOpenCvModal,
  onOpenAdmin
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'data-lab', label: 'Data Lab' },
    { id: 'research', label: 'Research' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleCvClick = () => {
    if (onOpenCvModal) {
      onOpenCvModal();
    } else {
      downloadCurriculumVitae();
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#020817]/90 backdrop-blur-md border-b border-[#0D6EFD]/20 shadow-lg shadow-black/40 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0D6EFD] to-[#00D4FF] flex items-center justify-center text-white shadow-md shadow-[#0D6EFD]/30 group-hover:scale-105 transition-transform">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white group-hover:text-[#00D4FF] transition-colors leading-tight">
                COLLINER PHOSTA
              </div>
              <div className="text-[10px] tracking-widest text-[#00D4FF]/90 font-medium uppercase leading-tight">
                DATA • ECONOMICS • FINANCE • TECHNOLOGY
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-all relative ${
                    isActive 
                      ? 'text-[#00D4FF] font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-[#081B35]/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#00D4FF] rounded-full shadow-[0_0_8px_#00D4FF]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="download-cv-btn-nav"
              onClick={handleCvClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#0D6EFD]/60 bg-[#081B35]/70 hover:bg-[#0D6EFD]/20 text-slate-100 hover:text-[#00D4FF] text-sm font-medium transition-all hover:border-[#00D4FF] shadow-sm hover:shadow-[0_0_15px_rgba(0,212,255,0.25)] focus:outline-none"
            >
              <Download className="w-4 h-4 text-[#00D4FF]" />
              <span>Download CV</span>
            </button>

            {onOpenAdmin && (
              <button
                id="admin-portal-nav-btn"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#06152B] border border-blue-900/60 hover:border-[#00D4FF] text-slate-300 hover:text-[#00D4FF] text-xs font-semibold transition-all shadow-sm"
                title="Admin Control Panel"
              >
                <Lock className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenAdmin && (
              <button
                id="mobile-admin-btn"
                onClick={onOpenAdmin}
                className="p-2 rounded-lg bg-[#081B35] border border-blue-900/50 text-[#00D4FF]"
                title="Admin Panel"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#081B35] border border-blue-900/50 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00D4FF]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#00D4FF]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06152B]/95 backdrop-blur-xl border-b border-blue-900/50 px-4 pt-3 pb-6 space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0D6EFD]/20 text-[#00D4FF] font-semibold border-l-4 border-[#00D4FF]'
                      : 'text-slate-300 hover:bg-[#081B35] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#00D4FF]' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-blue-900/40 space-y-2">
            <button
              id="mobile-download-cv-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                handleCvClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#0D6EFD] to-[#0099FF] text-white font-medium text-sm shadow-md hover:opacity-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Full CV (PDF)</span>
            </button>

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#081B35] border border-blue-900/60 text-slate-300 text-xs font-semibold hover:text-[#00D4FF]"
              >
                <Lock className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span>Admin Management Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
