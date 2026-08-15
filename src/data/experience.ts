import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'data-analyst-bi',
    role: 'Data Analyst & BI Specialist',
    organization: 'Analytics & Business Intelligence Practice',
    period: '2023 – Present',
    location: 'Nairobi, Kenya',
    category: 'Analytics',
    responsibilities: [
      'Engineered automated Power BI executive reporting dashboards tracking daily KPIs across multi-branch retail & commercial channels',
      'Developed optimized SQL queries and data transformation pipelines connecting ERP databases to centralized analytical cubes',
      'Collaborated with operational directors to identify margin leakages and optimize branch inventory turnover rates'
    ],
    achievements: [
      'Automated weekly reporting pipelines, saving 35+ hours of manual data preparation per month',
      'Identified low-margin product lines leading to a 4.2% recovery in net operating profitability'
    ],
    toolsUsed: ['Power BI', 'DAX', 'SQL', 'Excel (Power Query)', 'PostgreSQL']
  },
  {
    id: 'research-economist',
    role: 'Research & Economic Analyst',
    organization: 'Economic Policy & Socioeconomic Research',
    period: '2022 – 2024',
    location: 'Nairobi, Kenya',
    category: 'Research',
    responsibilities: [
      'Conducted econometric time-series and regression analyses investigating price dynamics, exchange rate shocks, and consumer trends',
      'Designed structured survey questionnaires and mobile data collection protocols (KoboToolbox/ODK) for field evaluations',
      'Authored rigorous statistical summaries, policy briefs, and econometric working papers for stakeholders'
    ],
    achievements: [
      'Led quantitative evaluation for 1,200+ respondent households with a 99.4% survey completeness rate',
      'Built econometric VECM models explaining 88% of quarterly inflation variation in empirical investigations'
    ],
    toolsUsed: ['R (ggplot2/forecast)', 'Stata', 'SPSS', 'KoboToolbox', 'Econometrics']
  },
  {
    id: 'financial-analyst',
    role: 'Financial & Operations Analyst',
    organization: 'Commercial Analytics & Financial Modeling',
    period: '2021 – 2023',
    location: 'Nairobi, Kenya',
    category: 'Finance',
    responsibilities: [
      'Constructed dynamic 3-statement integrated financial models with rolling 12-month cash runway forecasts',
      'Performed budget-vs-actual variance tracking, DuPont return on equity decompositions, and scenario stress tests',
      'Assisted in implementing Business Central ERP data mapping for streamlined financial statement reconciliations'
    ],
    achievements: [
      'Streamlined working capital debtor collection schedules, cutting DSO by 18 days and unlocking liquidity',
      'Maintained 94.8% quarterly budget variance forecast precision across operational expenditure lines'
    ],
    toolsUsed: ['Microsoft Excel (Financial Models)', 'Power BI', 'Business Central', 'VBA']
  }
];
