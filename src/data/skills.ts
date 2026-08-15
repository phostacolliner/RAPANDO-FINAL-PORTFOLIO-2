import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    category: 'ANALYTICS',
    description: 'Data ingestion, star schema modeling, interactive dashboarding & DAX optimization',
    skills: [
      { name: 'Power BI', level: 95, experience: 'Advanced DAX, Star Schema, Gateway Refreshes' },
      { name: 'Excel (Advanced)', level: 96, experience: 'Power Query, VBA, Nested Formulas, Financial Schedules' },
      { name: 'SQL', level: 88, experience: 'PostgreSQL, MySQL, Complex Joins, CTEs, Window Functions' },
      { name: 'Python', level: 85, experience: 'Pandas, NumPy, Matplotlib, Scikit-learn, Statsmodels' },
      { name: 'R', level: 88, experience: 'tidyverse, ggplot2, forecast, plm, stats' },
      { name: 'SPSS', level: 90, experience: 'Multivariate regression, Factor analysis, ANOVA, Chi-square' },
      { name: 'Stata', level: 88, experience: 'Panel regression, Instrumental Variables, VECM/VAR' }
    ]
  },
  {
    category: 'ECONOMICS',
    description: 'Applied macroeconomic theory, econometric specifications & causal inference',
    skills: [
      { name: 'Econometrics', level: 92, experience: 'VECM, Cointegration, ARCH/GARCH, Diagnostic Testing' },
      { name: 'Economic Modelling', level: 90, experience: 'Equilibrium models, Elasticity analysis, Growth forecasting' },
      { name: 'Time Series', level: 92, experience: 'ARIMA, SARIMA, Unit root tests, IRF decomposition' },
      { name: 'Regression Analysis', level: 95, experience: 'OLS, 2SLS, Fixed/Random Effects, Logistic regression' },
      { name: 'Causal Inference', level: 86, experience: 'Difference-in-Differences, Propensity Score Matching' }
    ]
  },
  {
    category: 'FINANCE',
    description: 'Corporate finance, budgeting, three-statement modeling & variance analytics',
    skills: [
      { name: 'Financial Analysis', level: 92, experience: 'DuPont ROE, Ratio analysis, Working capital cycle' },
      { name: 'Financial Modelling', level: 90, experience: 'Dynamic 3-statement models, DCF valuation, Debt schedules' },
      { name: 'Forecasting', level: 88, experience: 'Rolling 12-month projections, Monte Carlo simulations' },
      { name: 'Budgeting', level: 90, experience: 'Zero-based & flexible budgeting, Capex planning' },
      { name: 'Profitability Analysis', level: 94, experience: 'Product line margins, Customer lifetime value, Cost allocation' }
    ]
  },
  {
    category: 'RESEARCH',
    description: 'End-to-end quantitative research, sampling theory & monitoring frameworks',
    skills: [
      { name: 'Research Design', level: 92, experience: 'Experimental & quasi-experimental methodologies' },
      { name: 'Survey Design', level: 94, experience: 'KoboToolbox, ODK, Likert psychometrics, Skip logic' },
      { name: 'Data Collection', level: 95, experience: 'Stratified sampling, Field supervision, Geo-tagging' },
      { name: 'Statistical Analysis', level: 92, experience: 'Hypothesis testing, Non-parametric tests, Effect sizing' },
      { name: 'Monitoring & Evaluation', level: 88, experience: 'LogFrames, Theory of Change, Indicator tracking' }
    ]
  },
  {
    category: 'TECHNOLOGY',
    description: 'Modern front-end engineering, type-safe development & version control',
    skills: [
      { name: 'React', level: 88, experience: 'Hooks, State management, Component architecture' },
      { name: 'TypeScript', level: 86, experience: 'Strict typing, Generics, Interface contracts' },
      { name: 'Tailwind CSS', level: 92, experience: 'Responsive UI, Design systems, Modern animations' },
      { name: 'HTML & CSS', level: 95, experience: 'Semantic structure, Flexbox/Grid, Responsive layouts' },
      { name: 'Git & GitHub', level: 90, experience: 'Branch workflows, Versioning, CI/CD integrations' }
    ]
  }
];
