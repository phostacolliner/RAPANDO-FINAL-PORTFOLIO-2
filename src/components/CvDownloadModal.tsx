import React from 'react';
import { X, Download, Printer, GraduationCap, Briefcase, Award, CheckCircle2, FileText } from 'lucide-react';
import { downloadCurriculumVitae } from '../utils/generatePdfCv';

interface CvDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvDownloadModal: React.FC<CvDownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#06152B] border border-[#00D4FF]/40 shadow-2xl shadow-black/90 p-6 sm:p-8 text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Actions */}
        <div className="flex items-center justify-between border-b border-blue-900/40 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Curriculum Vitae Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#081B35] border border-blue-900/50 text-xs font-medium text-slate-300 hover:text-white hover:border-[#00D4FF]"
            >
              <Printer className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Print</span>
            </button>

            <button
              onClick={() => {
                downloadCurriculumVitae();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0D6EFD] hover:bg-[#0b5ed7] text-xs font-semibold text-white shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#081B35] text-slate-300 hover:text-white hover:border-[#00D4FF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Paper View */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#020817] border border-blue-900/40 text-slate-200 space-y-6 text-sm">
          
          {/* Header */}
          <div className="text-center border-b border-blue-900/50 pb-5 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              COLLINER PHOSTA
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-[#00D4FF]">
              Data Analyst | Economist | Researcher | Business Intelligence Professional
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Nairobi, Kenya • 0722450893 • phostacolliner@gmail.com
            </p>
            <p className="text-xs text-slate-400 font-mono">
              linkedin.com/in/colliner-phosta • github.com/phostacolliner
            </p>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <div className="text-xs font-bold font-mono text-[#00D4FF] uppercase tracking-wider">
              Professional Summary
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Quantitative specialist combining rigorous econometric modeling with advanced business intelligence and financial analytics. Expert in building end-to-end automated Power BI data models (Star Schema, DAX), executing empirical research in R/SPSS/Stata, and transforming complex business records into strategic insights.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <div className="text-xs font-bold font-mono text-[#00D4FF] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            <div className="p-3 rounded-lg bg-[#06152B] border border-blue-900/30 text-xs">
              <div className="flex justify-between items-center font-bold text-white">
                <span>Bachelor's Degree in Economics and Statistics</span>
                <span className="font-mono text-slate-400">2020 – 2024</span>
              </div>
              <div className="text-[#00D4FF] mt-0.5">Kirinyaga University</div>
              <div className="text-slate-400 mt-1">
                Concentrations: Applied Econometrics, Time Series Analysis, Mathematical Statistics, Financial Modeling, Survey Sampling Theory.
              </div>
            </div>
          </div>

          {/* Core Technical Expertise */}
          <div className="space-y-2">
            <div className="text-xs font-bold font-mono text-[#00D4FF] uppercase tracking-wider">
              Technical Competencies
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-[#06152B]">
                <strong className="text-white">Analytics & BI:</strong> Power BI (Advanced DAX), Excel (Power Query, VBA), SQL (PostgreSQL), Python (Pandas), Business Central
              </div>
              <div className="p-2.5 rounded bg-[#06152B]">
                <strong className="text-white">Econometrics & Stats:</strong> R, Stata, SPSS, VECM, Cointegration, ARIMA Forecasting, Panel Regression
              </div>
              <div className="p-2.5 rounded bg-[#06152B]">
                <strong className="text-white">Finance & Valuation:</strong> 3-Statement Modeling, DuPont ROE, Working Capital Optimization, Variance Analysis
              </div>
              <div className="p-2.5 rounded bg-[#06152B]">
                <strong className="text-white">Research & Web:</strong> KoboToolbox, ODK Survey Design, M&E Frameworks, React, TypeScript, Tailwind CSS
              </div>
            </div>
          </div>

          {/* Highlight Projects */}
          <div className="space-y-2">
            <div className="text-xs font-bold font-mono text-[#00D4FF] uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Selected Portfolio Projects</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded bg-[#06152B]">
                <div className="font-bold text-white">Sales & Profitability Dashboard (Power BI / SQL / DAX)</div>
                <div>Centralized multi-branch POS records into star schema; saved 35+ hours/week and recovered 4.2% margin.</div>
              </div>
              <div className="p-2.5 rounded bg-[#06152B]">
                <div className="font-bold text-white">Econometric Analysis of Inflation in Kenya (R / Stata / VECM)</div>
                <div>Modeled 15-year quarterly price series, isolating currency pass-through and short-run food volatility.</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
