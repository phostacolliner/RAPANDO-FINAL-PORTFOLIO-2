export function downloadCurriculumVitae() {
  // Check if actual PDF file exists in assets
  const cvPath = '/assets/Colliner-Phosta-CV.pdf';
  
  // Try fetching the file first; if present, download directly
  fetch(cvPath, { method: 'HEAD' })
    .then((res) => {
      if (res.ok) {
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Colliner-Phosta-CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        generateStructuredCvDocument();
      }
    })
    .catch(() => {
      generateStructuredCvDocument();
    });
}

function generateStructuredCvDocument() {
  const cvContent = `
================================================================================
                               COLLINER PHOSTA
     Data Analyst | Economist | Researcher | Business Intelligence Professional
     Nairobi, Kenya • +254 722 450 893 • phostacolliner@gmail.com
     LinkedIn: linkedin.com/in/colliner-phosta • GitHub: github.com/phostacolliner
================================================================================

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
Results-driven Data Analyst, Economist, and Business Intelligence Specialist with 
deep expertise in data analytics, econometrics, financial intelligence, statistical 
survey research, and modern web technology. Proven record in turning complex, 
fragmented datasets into executive Power BI dashboards, automated SQL pipelines, 
and empirical econometric models that drive measurable commercial and policy impact.

CORE COMPETENCIES & TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Analytics & BI: Power BI (Advanced DAX, Star Schema, Power Query), Advanced Excel,
  SQL (PostgreSQL/MySQL), Python (Pandas, NumPy), R, SPSS, Stata, Business Central.
• Economics & Econometrics: Vector Error Correction Models (VECM), Cointegration,
  Time-Series Forecasting (ARIMA), OLS/Panel Regression, Causal Inference.
• Financial Intelligence: 3-Statement Financial Modeling, DuPont ROE Decomposition,
  Budget-vs-Actual Variance Analysis, DCF Valuation, Cash Conversion Cycle.
• Research & Evaluation: Survey Design (ODK/KoboToolbox), Stratified Sampling,
  Inferential Statistics, Factor Analysis, Monitoring & Evaluation (M&E).
• Web & Tech: React, TypeScript, Tailwind CSS, REST APIs, Git & GitHub.

EDUCATION
--------------------------------------------------------------------------------
Bachelor's Degree in Economics and Statistics (2020 – 2024)
Kirinyaga University, Kenya
• Focus: Applied Econometrics, Mathematical Statistics, Probability Theory,
  Macro/Microeconomics, Operations Research, Sample Survey Design.

SELECTED PROJECTS & DELIVERABLES
--------------------------------------------------------------------------------
1. Sales & Profitability Dashboard (Power BI, DAX, SQL, Excel)
   • Centralized multi-branch POS/ERP transactions into an automated Star Schema.
   • Authored dynamic DAX measures eliminating 35+ hours of weekly manual reporting.
   • Uncovered underperforming SKUs, recovering 4.2% in net operating margin.

2. Financial Performance Analysis (Financial Modeling, Power BI, Excel)
   • Built dynamic 3-statement forecast models and DuPont ROE breakdown.
   • Restructured debtor collection schedules, cutting DSO by 18 days ($240K liquidity).

3. Econometric Analysis of Inflation in Kenya (R, Stata, VECM, Cointegration)
   • Modeled 15-year quarterly macroeconomic time series (CBK/KNBS datasets).
   • Isolated exchange rate pass-through and short-run food volatility vs money supply.

4. Socio-Economic Survey & Impact Evaluation (SPSS, R, KoboToolbox)
   • Designed digital field survey instruments deployed across 1,200+ households.
   • Conducted propensity score matching and multivariate logistic regression.

5. Business Web & Analytics Portal (React, TypeScript, Tailwind CSS)
   • Developed accessible, responsive web interfaces with interactive Recharts.

PROFESSIONAL CERTIFICATIONS
--------------------------------------------------------------------------------
• Microsoft Certified: Power BI Data Analyst Associate (2024)
• Advanced Financial Modeling & Valuation - Corporate Finance Institute (2023)
• Applied Econometric Methods with R & Stata (2023)
• Modern Web Development & React Architecture (2024)
================================================================================
`;

  const blob = new Blob([cvContent.trim()], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Colliner-Phosta-CV.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
