import { Project } from '../types';

// Using generated images with fallback to public paths
import salesImg from '../assets/images/sales_dashboard_1786735564045.jpg';
import financeImg from '../assets/images/financial_analysis_1786735575077.jpg';
import econImg from '../assets/images/econometric_analysis_1786735589760.jpg';
import researchImg from '../assets/images/research_survey_1786735601269.jpg';
import webImg from '../assets/images/business_website_1786735615124.jpg';

export const projectsData: Project[] = [
  {
    id: 'sales-profitability-dashboard',
    title: 'Sales & Profitability Dashboard',
    category: 'Data Analytics',
    shortDescription: 'Power BI dashboard for sales performance, profitability and branch analysis.',
    fullDescription: 'An enterprise-grade Power BI analytical solution engineered to give executive leadership complete visibility into sales trajectories, gross margins, regional branch KPIs, and product mix profitability across multi-location operations.',
    technologies: ['Power BI', 'DAX', 'Excel', 'SQL', 'Power Query', 'Data Modeling'],
    image: salesImg,
    fallbackImage: '/assets/projects/sales-dashboard.png',
    featured: true,
    completionDate: '2024',
    problemStatement: 'Executive stakeholders lacked real-time visibility across regional distribution channels, experiencing a 2-week lag in monthly profitability reporting with disjointed spreadsheets and untracked discounts eroding margins.',
    objectives: [
      'Centralize transactional sales data across multiple branches into a cohesive relational star schema',
      'Engineer automated DAX measures for Year-over-Year (YoY), Month-to-Date (MTD), and variance metrics',
      'Provide drill-through capabilities from high-level enterprise KPIs down to SKU-level profitability',
      'Enable automated daily scheduled data refresh and interactive parameter-driven target forecasting'
    ],
    methodology: [
      'Extracted raw transactional POS and ERP records via automated SQL views and Power Query ETL pipelines',
      'Constructed a robust Star Schema dimensional model with dedicated Fact Sales and Dim Customer, Branch, and Date tables',
      'Authored optimized DAX measures utilizing CALCULATE, SUMX, SAMEPERIODLASTYEAR, and dynamic ranking',
      'Designed a high-contrast executive visual interface with contextual color hierarchies, tooltips, and bookmark navigation'
    ],
    toolsUsed: ['Microsoft Power BI', 'DAX Studio', 'Microsoft Excel (Advanced)', 'PostgreSQL', 'Power Query'],
    keyFindings: [
      'Top 20% of product SKUs contributed 74% of total gross profit, while 15% were operating at negative post-discount margins',
      'Regional variance revealed Branch East outperformed revenue targets by 18% due to high volume, but lagged in net margin due to logistics costs',
      'Quarterly seasonal discounting in Q3 drove 32% volume spikes without yielding net bottom-line growth'
    ],
    businessImpact: [
      'Eliminated 35+ hours of manual weekly spreadsheet consolidation for the commercial finance team',
      'Enabled leadership to identify and phase out 8 underperforming SKUs, recovering 4.2% in operating margin',
      'Reduced monthly reporting latency from 14 business days to real-time automated morning refreshes'
    ],
    metrics: [
      { label: 'Time Saved Weekly', value: '35 hrs' },
      { label: 'Margin Recovery', value: '+4.2%' },
      { label: 'Data Latency', value: '0 Days (Real-time)' }
    ],
    liveDemoUrl: 'https://app.powerbi.com',
    githubUrl: 'https://github.com/phostacolliner/sales-profitability-bi'
  },
  {
    id: 'financial-performance-analysis',
    title: 'Financial Performance Analysis',
    category: 'Finance',
    shortDescription: 'Comprehensive financial analysis with forecasting and variance insights.',
    fullDescription: 'Dynamic financial analytics and three-statement financial modeling suite with rolling 12-month budget-vs-actual variance tracking, cash runway projections, and DuPont return on equity decomposition.',
    technologies: ['Excel', 'Power BI', 'Financial Modelling', 'DAX', 'VBA / Power Automate', 'Scenario Analysis'],
    image: financeImg,
    fallbackImage: '/assets/projects/financial-analysis.png',
    featured: true,
    completionDate: '2024',
    problemStatement: 'Finance directors faced volatile cash flows, unpredictable seasonal working capital demands, and manual static annual budgets that failed to adapt to economic shifts and fluctuating raw material costs.',
    objectives: [
      'Build dynamic 3-statement integrated financial model linking P&L, Balance Sheet, and Cash Flow',
      'Implement multi-tier Monte Carlo and sensitivity models evaluating Base, Bull, and Bear macroeconomic conditions',
      'Create rolling 12-month cash flow and working capital forecasting algorithms to prevent liquidity shortfalls'
    ],
    methodology: [
      'Standardized chart-of-accounts mapping across historical financial records for 5 fiscal periods',
      'Structured automated financial schedules for CAPEX depreciation, debt amortization, and working capital cycles',
      'Engineered dynamic variance waterfalls breaking down price, volume, and currency exchange components',
      'Integrated Power BI visual dashboards for board-level quarterly financial presentations'
    ],
    toolsUsed: ['Microsoft Excel (Financial Modeling)', 'Power BI', 'DCF Valuation Models', 'Sensitivity Tables'],
    keyFindings: [
      'Working capital cash conversion cycle had expanded from 42 days to 68 days due to delayed enterprise receivables',
      'DuPont ROE decomposition demonstrated that margin contraction—rather than asset turnover—was the primary driver of lower equity returns',
      'Scenario stress testing indicated potential cash deficit under a 15% currency depreciation scenario without hedge coverage'
    ],
    businessImpact: [
      'Restructured debtor payment terms, reducing Cash Conversion Cycle by 18 days and unlocking $240K in trapped liquidity',
      'Equipped executive board with interactive what-if financial scenario sliders for quarterly capital expenditure decisions'
    ],
    metrics: [
      { label: 'Receivables DSO Cut', value: '-18 Days' },
      { label: 'Forecast Accuracy', value: '94.8%' },
      { label: 'Liquidity Optimized', value: '$240K' }
    ],
    liveDemoUrl: 'https://github.com/phostacolliner/financial-performance-modeling',
    githubUrl: 'https://github.com/phostacolliner/financial-performance-modeling'
  },
  {
    id: 'econometric-analysis-inflation',
    title: 'Econometric Analysis of Inflation',
    category: 'Economics',
    shortDescription: 'Time series and regression analysis of inflation drivers in Kenya.',
    fullDescription: 'Rigorous empirical macroeconomic econometric research studying the structural, monetary, and imported drivers of headline and core consumer price index (CPI) inflation in Kenya using cointegration and vector error correction modeling (VECM).',
    technologies: ['R', 'Stata', 'Econometrics', 'Time Series Analysis', 'VECM / VAR', 'ggplot2'],
    image: econImg,
    fallbackImage: '/assets/projects/econometric-analysis.png',
    featured: true,
    completionDate: '2023 - 2024',
    problemStatement: 'Persistent macroeconomic shocks, exchange rate volatility, and food price fluctuations created uncertainties in policy forecasting, requiring rigorous econometric decomposition of domestic monetary vs. external supply-side price drivers.',
    objectives: [
      'Examine the stationarity, unit root properties, and structural breaks across 15 years of quarterly macroeconomic data',
      'Specify and evaluate Vector Autoregression (VAR) and Vector Error Correction Models (VECM) for long-run cointegration',
      'Compute Impulse Response Functions (IRF) and Variance Decompositions to track shock transmission timelines'
    ],
    methodology: [
      'Collected and harmonized historical series from Central Bank of Kenya (CBK) and Kenya National Bureau of Statistics (KNBS)',
      'Executed Augmented Dickey-Fuller (ADF) and Phillips-Perron (PP) tests, confirming I(1) integration of price level and money supply',
      'Tested Johansen Cointegration and identified 2 cointegrating vectors governing equilibrium price determination',
      'Generated Impulse Response Functions (IRF) over a 24-quarter horizon to isolate pass-through elasticities'
    ],
    toolsUsed: ['R Studio', 'Stata 17', 'EViews', 'LaTeX', 'ggplot2', 'forecast / vars packages'],
    keyFindings: [
      'Exchange rate pass-through to headline CPI was statistically significant at p < 0.01, with peak impact occurring at lag t+2 quarters',
      'Food and energy price shocks accounted for 54% of short-run inflation variance, while broad money growth (M3) explained long-run trends',
      'The speed of adjustment parameter in the VECM indicated a 34.6% annual return toward long-run macroeconomic equilibrium'
    ],
    businessImpact: [
      'Authored comprehensive research monograph used for academic presentation and policy discourse',
      'Provided evidence-based recommendations on interest rate smoothing and strategic grain reserve buffers'
    ],
    metrics: [
      { label: 'Time Horizon', value: '15 Years (60 Qtrs)' },
      { label: 'Model R-Squared', value: '0.884' },
      { label: 'Pass-through Peak', value: 't+2 Qtrs' }
    ],
    liveDemoUrl: 'https://github.com/phostacolliner/kenya-inflation-econometrics',
    githubUrl: 'https://github.com/phostacolliner/kenya-inflation-econometrics'
  },
  {
    id: 'research-survey-analysis',
    title: 'Research & Survey Analysis',
    category: 'Research',
    shortDescription: 'Survey design, data collection and statistical analysis for evidence-based decisions.',
    fullDescription: 'End-to-end quantitative and qualitative research methodology framework, from stratified cluster sampling and digital survey instruments (ODK/Kobo) to inferential hypothesis testing, factor analysis, and executive research syntheses.',
    technologies: ['SPSS', 'R', 'Excel', 'Survey Design', 'KoboToolbox', 'Inferential Statistics'],
    image: researchImg,
    fallbackImage: '/assets/projects/research-analysis.png',
    featured: true,
    completionDate: '2023',
    problemStatement: 'Non-governmental and community organizations needed reliable baseline and endline evaluations of household socio-economic programs, but lacked rigorous survey sampling frames and reproducible statistical pipelines.',
    objectives: [
      'Design psychometrically validated questionnaires and digital data collection protocols with built-in logic skips',
      'Conduct multi-stage stratified random sampling ensuring statistical power > 0.85 and 95% confidence intervals',
      'Perform exploratory factor analysis (EFA), ANOVA, and multivariate logistic regression on respondent datasets'
    ],
    methodology: [
      'Developed KoboToolbox / ODK digital forms with GPS geo-fencing, audio audit checks, and validation constraints',
      'Executed systematic data cleaning protocols including Mahalanobis distance outlier checks and missing value imputation',
      'Ran parametric and non-parametric inferential statistical tests in SPSS and R to validate intervention hypotheses',
      'Compiled actionable executive infographics, stakeholder policy briefs, and statistical methodology appendixes'
    ],
    toolsUsed: ['IBM SPSS Statistics', 'R (tidyverse, psych)', 'KoboToolbox', 'Microsoft Excel', 'Tableau'],
    keyFindings: [
      'Target community micro-credit training interventions demonstrated a statistically significant 26.4% gain in household savings (p = 0.003)',
      'Logistic regression revealed literacy level (OR = 2.14) and mobile money adoption (OR = 3.82) were strongest adoption determinants'
    ],
    businessImpact: [
      'Successfully delivered research evaluation across 1,200+ respondent households with zero data loss',
      'Informed program donor renewals and policy allocation for subsequent fiscal development cycles'
    ],
    metrics: [
      { label: 'Sample Size', value: '1,200+ Households' },
      { label: 'Data Accuracy', value: '99.4%' },
      { label: 'Stat Significance', value: 'p < 0.001' }
    ],
    liveDemoUrl: 'https://github.com/phostacolliner/socioeconomic-survey-analysis',
    githubUrl: 'https://github.com/phostacolliner/socioeconomic-survey-analysis'
  },
  {
    id: 'business-website-development',
    title: 'Business Website Development',
    category: 'Web Development',
    shortDescription: 'Modern, responsive websites built for businesses and organizations.',
    fullDescription: 'High-performance, modern, and accessible web solutions combining intuitive user experience with enterprise-grade React, TypeScript, and Tailwind CSS architectures, responsive layouts, and interactive data visualization frontends.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js / Vite', 'Responsive Design', 'API Integration'],
    image: webImg,
    fallbackImage: '/assets/projects/business-website.png',
    featured: true,
    completionDate: '2024',
    problemStatement: 'SMEs and research consultancies struggled with outdated, slow legacy web presences that rendered poorly on mobile devices, lacked interactive reporting capabilities, and failed to convert client inquiries.',
    objectives: [
      'Engineer lightning-fast web applications with sub-second page loads and mobile-first responsive design',
      'Integrate interactive charting libraries (Recharts / D3) for client-facing analytics and live metrics',
      'Implement strict TypeScript type safety, modular component architecture, and automated CI/CD deployment'
    ],
    methodology: [
      'Architected modular React component hierarchy with reusable design systems and Tailwind styling tokens',
      'Constructed accessible form validations with client-side error handling and secure webhook integrations',
      'Optimized asset loading, web font rendering, and responsive image formats for 98+ Lighthouse scores'
    ],
    toolsUsed: ['React 18+', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React', 'Framer Motion', 'Git / GitHub'],
    keyFindings: [
      'Modern headless React architecture reduced time-to-interactive from 4.8 seconds to under 0.6 seconds',
      'Mobile user engagement rose by 42% following responsive layout restructuring and clean typography hierarchy'
    ],
    businessImpact: [
      'Delivered fully responsive, brand-aligned client portals with automated contact lead tracking',
      'Achieved 100/100 Core Web Vitals and accessibility compliance scores across audited viewports'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Load Time', value: '< 0.6s' },
      { label: 'Mobile Conversion', value: '+42%' }
    ],
    liveDemoUrl: 'https://github.com/phostacolliner/modern-business-web',
    githubUrl: 'https://github.com/phostacolliner/modern-business-web'
  }
];
