import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Expertise } from './components/Expertise';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { DataLab } from './components/DataLab';
import { Research } from './components/Research';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvDownloadModal } from './components/CvDownloadModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DataProvider } from './context/DataContext';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Shortcut to open Admin (Ctrl+Shift+A or Cmd+Shift+A) or check url hash #admin
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Scroll spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'data-lab', 'research', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-[#020817] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#00D4FF]/30 selection:text-[#00D4FF]">
        
        {/* Fixed Navigation Bar */}
        <Navbar 
          activeSection={activeSection} 
          onNavigate={scrollToSection} 
          onOpenCvModal={() => setCvModalOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* 1. Hero Section */}
          <Hero 
            onExploreWork={() => scrollToSection('projects')}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* 2. Expertise & Metrics Bar */}
          <Expertise 
            onSelectCategory={(category) => scrollToSection('services')}
          />

          {/* 3. About Section */}
          <About 
            onExploreProjects={() => scrollToSection('projects')}
            onOpenCvModal={() => setCvModalOpen(true)}
          />

          {/* 4. Featured Projects Section */}
          <Projects />

          {/* 5. Services Section (WHAT I DO) */}
          <Services 
            onContactClick={() => scrollToSection('contact')}
          />

          {/* 6. Interactive Data Lab */}
          <DataLab />

          {/* 7. Research & Economic Insights */}
          <Research />

          {/* 8. Technical Skills & Proficiencies */}
          <Skills />

          {/* 9. Experience & Career Timeline */}
          <Experience />

          {/* 10. Education & Certifications */}
          <Education />

          {/* 11. Contact & Message Section */}
          <Contact />
        </main>

        {/* 12. Footer */}
        <Footer onOpenAdmin={() => setAdminOpen(true)} />

        {/* Curriculum Vitae Modal */}
        <CvDownloadModal 
          isOpen={cvModalOpen}
          onClose={() => setCvModalOpen(false)}
        />

        {/* Database-Driven Admin Management Dashboard */}
        <AdminDashboard 
          isOpen={adminOpen}
          onClose={() => {
            setAdminOpen(false);
            if (window.location.hash === '#admin') {
              history.replaceState(null, '', window.location.pathname);
            }
          }}
        />

      </div>
    </DataProvider>
  );
}
