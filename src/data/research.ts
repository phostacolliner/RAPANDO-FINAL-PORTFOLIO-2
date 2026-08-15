import { ResearchArticle } from '../types';

export const researchData: ResearchArticle[] = [
  {
    id: 'inflation-drivers-kenya',
    title: 'Understanding Inflation Drivers in Kenya: An Empirical Time-Series & VECM Approach',
    category: 'Econometrics',
    date: 'February 2024',
    readTime: '8 min read',
    shortSummary: 'Investigating the relative contribution of money supply growth, food price volatility, and currency exchange pass-through to headline inflation dynamics.',
    abstract: 'This empirical research paper employs cointegration and Vector Error Correction Modeling (VECM) across 60 quarterly periods to examine the transmission mechanisms of domestic monetary growth vs. imported supply-side commodity price shocks in Kenya.',
    methodology: 'Quarterly time-series spanning 15 years evaluated with ADF and Phillips-Perron unit root tests, Johansen cointegration rank determination, and Impulse Response Functions (IRFs).',
    dataset: 'Central Bank of Kenya (CBK) Quarterly Bulletins & Kenya National Bureau of Statistics (KNBS) CPI Series (2009–2024).',
    tags: ['VECM', 'Cointegration', 'Time Series', 'Monetary Policy', 'Inflation'],
    keyFindings: [
      'Food and energy supply shocks drive over 54% of short-term headline inflation volatility.',
      'Exchange rate depreciation exhibits a 2-quarter lag pass-through elasticity of 0.28 to non-food CPI.',
      'The speed of equilibrium adjustment is 34.6% per annum following macroeconomic shocks.'
    ],
    policyImplications: [
      'Monetary authorities should distinguish between transitory supply-side food shocks and structural monetary expansion.',
      'Targeted strategic grain reserves and foreign exchange hedging instruments reduce inflationary contagion.'
    ]
  },
  {
    id: 'data-driven-decision-making',
    title: 'Data-Driven Decision Making in Modern Organizations',
    category: 'Business Intelligence',
    date: 'January 2024',
    readTime: '6 min read',
    shortSummary: 'How star-schema dimensional modeling and automated BI pipelines bridge the gap between transactional raw data and executive strategy.',
    abstract: 'An architectural exploration of transforming fragmented departmental spreadsheets into single-source-of-truth business intelligence ecosystems with measurable ROI.',
    methodology: 'Comparative case study analysis of 4 enterprise BI implementations assessing reporting latency, data accuracy, and user adoption rates.',
    dataset: 'Operational and financial reporting logs from SME and commercial distribution entities.',
    tags: ['Business Intelligence', 'Power BI', 'Data Modeling', 'Executive KPIs'],
    keyFindings: [
      'Organizations with automated BI pipelines report 70% faster strategic decision turnaround.',
      'Data democratization with governed self-service dashboards reduces ad-hoc analyst request backlogs by 60%.'
    ],
    policyImplications: [
      'Standardized data dictionaries and governance frameworks are essential prerequisites before deploying advanced BI tools.'
    ]
  },
  {
    id: 'bi-financial-performance',
    title: 'The Role of Business Intelligence in Financial Performance',
    category: 'Macroeconomics',
    date: 'November 2023',
    readTime: '7 min read',
    shortSummary: 'Quantifying the correlation between dynamic variance forecasting and working capital optimization across emerging market firms.',
    abstract: 'Examining how modern financial modeling techniques coupled with real-time analytics dashboards improve cash conversion cycles and debt service coverage.',
    methodology: 'Financial ratio decomposition, DuPont analysis, and scenario simulation on commercial enterprise financials.',
    dataset: 'Aggregated financial statements and working capital metrics.',
    tags: ['Financial Modeling', 'Cash Conversion', 'DuPont Analysis', 'Forecasting'],
    keyFindings: [
      'Firms utilizing continuous rolling 12-month cash forecasts maintain 35% higher average liquidity buffers.',
      'Automated accounts receivable aging dashboards reduce Day Sales Outstanding (DSO) by an average of 14 days.'
    ],
    policyImplications: [
      'Integration of ERP data directly into dynamic financial models minimizes liquidity surprise risks.'
    ]
  },
  {
    id: 'evidence-based-policy',
    title: 'Evidence-Based Policy Analysis: Micro-Credit & Household Welfare',
    category: 'Development Economics',
    date: 'September 2023',
    readTime: '9 min read',
    shortSummary: 'Evaluating the socio-economic impact of rural community savings groups through quasi-experimental statistical matching.',
    abstract: 'Assessing how structured financial literacy and micro-credit interventions impact household resilience, educational expenditure, and female economic empowerment in rural Kenya.',
    methodology: 'Propensity Score Matching (PSM) and Difference-in-Differences (DiD) estimation on 1,200 survey respondents.',
    dataset: 'Primary household survey dataset collected via KoboToolbox with geo-tagged verification.',
    tags: ['Impact Evaluation', 'Survey Research', 'SPSS', 'Causal Inference'],
    keyFindings: [
      'Trained participants experienced an average 26.4% increase in monthly discretionary savings (p < 0.01).',
      'Child schooling retention rates were 18% higher in households with active women-led credit access.'
    ],
    policyImplications: [
      'Development programs should bundle micro-credit access with mandatory digital financial literacy training modules.'
    ]
  },
  {
    id: 'economic-trends-welfare',
    title: 'Economic Trends and Household Welfare in Developing Economies',
    category: 'Macroeconomics',
    date: 'July 2023',
    readTime: '7 min read',
    shortSummary: 'Analyzing how interest rate cycles and digital mobile money ecosystems alter household consumption smoothing behaviors.',
    abstract: 'An investigation into how high mobile money penetration alters traditional monetary policy transmission mechanisms at the consumer household level.',
    methodology: 'Multivariate regression and panel data analysis evaluating consumption expenditure against interest rate swings.',
    dataset: 'National socio-economic survey archives and financial inclusion datasets.',
    tags: ['Household Welfare', 'Mobile Money', 'Consumption Smoothing', 'Macroeconomics'],
    keyFindings: [
      'Mobile credit adoption acts as an effective informal consumption insurance during adverse agricultural climate shocks.',
      'Households with digital wallet access recover 40% faster from seasonal income contractions.'
    ],
    policyImplications: [
      'Consumer protection regulations for digital lending must balance financial inclusion with over-indebtedness safeguards.'
    ]
  }
];
