import { EducationItem, CertificationItem } from '../types';

export const educationData: EducationItem[] = [
  {
    degree: "Bachelor's Degree in Economics and Statistics",
    institution: 'Kirinyaga University',
    period: '2020 – 2024',
    location: 'Kirinyaga / Nairobi, Kenya',
    description: 'Comprehensive 4-year rigorous academic program combining theoretical economics, applied econometrics, mathematical statistics, probability theory, financial modeling, and computational quantitative methods.',
    coreCourses: [
      'Applied Econometrics & Time Series Analysis',
      'Mathematical Statistics & Probability Theory',
      'Macroeconomic & Microeconomic Theory',
      'Financial Economics & Capital Markets',
      'Operations Research & Quantitative Methods',
      'Sample Survey Theory & Research Methodology',
      'Data Analysis & Statistical Computing (R, SPSS, Stata)'
    ]
  }
];

export const certificationsData: CertificationItem[] = [
  {
    name: 'Microsoft Certified: Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    year: '2024',
    topics: ['Data Modeling', 'DAX Measures', 'Power Query ETL', 'Dashboard Optimization', 'Row-Level Security']
  },
  {
    name: 'Advanced Financial Modeling & Valuation',
    issuer: 'Corporate Finance & Analytics Institute',
    year: '2023',
    topics: ['3-Statement Modeling', 'DCF Valuation', 'Sensitivity Analysis', 'Scenario Planning']
  },
  {
    name: 'Applied Econometric Methods with R & Stata',
    issuer: 'Economic Research & Statistical Consortium',
    year: '2023',
    topics: ['Panel Data Regression', 'Vector Error Correction (VECM)', 'Instrumental Variables', 'ARIMA']
  },
  {
    name: 'Modern Web Development & React Architecture',
    issuer: 'Frontend & Tech Training',
    year: '2024',
    topics: ['React 18', 'TypeScript', 'Tailwind CSS', 'Interactive Data Visualizations']
  }
];
