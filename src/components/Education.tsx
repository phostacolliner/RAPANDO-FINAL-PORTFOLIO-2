import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';
import { educationData, certificationsData } from '../data/education';
import { useData } from '../context/DataContext';

export const Education: React.FC = () => {
  const { education: dbEdu, certifications: dbCerts } = useData();
  const activeEdu = dbEdu && dbEdu.length > 0 ? dbEdu : educationData;
  const activeCerts = dbCerts && dbCerts.length > 0 ? dbCerts : certificationsData;

  return (
    <section 
      id="education" 
      className="py-20 md:py-28 bg-[#020817] relative border-t border-blue-900/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
            ACADEMIC QUALIFICATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            EDUCATION & CERTIFICATIONS
          </h2>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Degree (Kirinyaga University) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00D4FF]">
              <GraduationCap className="w-5 h-5" />
              <span>University Degree</span>
            </div>

            {activeEdu.map((edu, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#06152B] border border-[#00D4FF]/30 shadow-xl shadow-black/50 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-md bg-[#0D6EFD]/20 border border-[#0D6EFD]/40 text-xs font-bold text-[#00D4FF]">
                    {edu.period}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{edu.location}</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {edu.degree}
                </h3>

                <div className="text-base font-semibold text-[#00D4FF]">
                  {edu.institution}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {edu.description}
                </p>

                <div className="pt-2 border-t border-blue-900/40 space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase">Core Rigorous Coursework:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {edu.coreCourses.map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications & Specialized Training */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00D4FF]">
              <Award className="w-5 h-5" />
              <span>Professional Certifications & Training</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {activeCerts.map((cert, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-[#081B35]/90 border border-blue-900/40 hover:border-[#00D4FF]/50 transition-all shadow-md space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#00D4FF] font-semibold">{cert.issuer}</span>
                    <span className="text-slate-400 font-mono">{cert.year}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {cert.name}
                  </h4>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.topics.map((topic, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#06152B] border border-blue-800/30 text-[10px] font-mono text-slate-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
