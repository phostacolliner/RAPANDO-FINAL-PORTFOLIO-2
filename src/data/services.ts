import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    category: 'Analytics',
    iconName: 'BarChart3',
    color: '#0D6EFD',
    description: 'Transforming raw enterprise and operational data into clear, actionable visual intelligence and executive dashboards.',
    deliverables: [
      'Data Cleaning & Preparation',
      'Data Visualization',
      'Dashboard Development',
      'KPI Tracking & Reporting',
      'Predictive Analytics'
    ],
    tools: ['Power BI', 'Excel (Advanced/VBA)', 'SQL', 'Python', 'DAX']
  },
  {
    id: 'financial-analytics',
    title: 'Financial Analytics',
    category: 'Finance',
    iconName: 'Coins',
    color: '#10B981',
    description: 'Strategic financial intelligence, cash flow forecasting, variance tracking, and decision-support financial models.',
    deliverables: [
      'Financial Modelling',
      'Profitability Analysis',
      'Budgeting & Forecasting',
      'Financial Reporting',
      'Cash Flow Analysis'
    ],
    tools: ['Excel Financial Models', 'Power BI', 'DCF Valuation', 'Business Central']
  },
  {
    id: 'econometrics-economic-analysis',
    title: 'Econometrics & Economic Analysis',
    category: 'Economics',
    iconName: 'TrendingUp',
    color: '#8B5CF6',
    description: 'Empirical econometric modeling, macroeconomic forecasting, policy analysis, and causal inference on quantitative datasets.',
    deliverables: [
      'Regression Analysis',
      'Time Series Forecasting',
      'Causal Impact Analysis',
      'Panel Data Analysis',
      'Economic Modelling'
    ],
    tools: ['R', 'Stata', 'SPSS', 'Econometrics', 'EViews']
  },
  {
    id: 'research-evaluation',
    title: 'Research & Evaluation',
    category: 'Research',
    iconName: 'BookOpen',
    color: '#F59E0B',
    description: 'Rigorous quantitative and qualitative research design, survey instrumentation, M&E frameworks, and policy evaluation.',
    deliverables: [
      'Research Design',
      'Sampling & Data Collection',
      'Statistical Analysis (SPSS/Stata/R)',
      'Monitoring & Evaluation',
      'Policy & Impact Evaluation'
    ],
    tools: ['SPSS', 'KoboToolbox', 'R', 'Excel', 'ODK']
  },
  {
    id: 'web-software-development',
    title: 'Web & Software Development',
    category: 'Technology',
    iconName: 'Code2',
    color: '#F97316',
    description: 'Building modern, fast, responsive web applications, analytical portals, and custom digital software solutions.',
    deliverables: [
      'Business Websites',
      'Web Applications',
      'Interactive Dashboards',
      'API Integration',
      'Custom Solutions'
    ],
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js/Vite', 'Git/GitHub']
  }
];
