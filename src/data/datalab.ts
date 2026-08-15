export interface DataLabItem {
  id: string;
  name: string;
  category: string;
  description: string;
  kpis: { label: string; value: string; change: string; positive: boolean }[];
  timeframe: string;
}

export const dataLabProjects: DataLabItem[] = [
  {
    id: 'sales-analytics',
    name: 'Executive Sales & Revenue Engine',
    category: 'Sales Analytics',
    description: 'Interactive monthly revenue tracking, gross margin dynamics, and channel distribution breakdown.',
    timeframe: 'Jan 2024 - Dec 2024',
    kpis: [
      { label: 'Total Revenue', value: '$1.48M', change: '+18.4% YoY', positive: true },
      { label: 'Gross Margin', value: '42.6%', change: '+3.1%', positive: true },
      { label: 'Sales Growth', value: '+24.2%', change: 'vs Target', positive: true },
      { label: 'Avg Order Value', value: '$840', change: '+8.5%', positive: true }
    ]
  },
  {
    id: 'financial-analytics',
    name: 'Financial Health & Variance Simulator',
    category: 'Financial Analytics',
    description: 'Three-statement variance simulator comparing actuals vs budgeted OPEX and operating cash flows.',
    timeframe: 'FY 2023 - 2024',
    kpis: [
      { label: 'EBITDA Margin', value: '28.4%', change: '+2.4%', positive: true },
      { label: 'Cash Runway', value: '14.2 Mos', change: '+2.1 Mos', positive: true },
      { label: 'OPEX Variance', value: '-3.8%', change: 'Under Budget', positive: true },
      { label: 'ROE (DuPont)', value: '22.1%', change: '+1.8%', positive: true }
    ]
  },
  {
    id: 'economic-indicators',
    name: 'Kenya Macroeconomic & Inflation Tracker',
    category: 'Economic Indicators',
    description: 'Empirical econometric indicators tracking Headline CPI, Food Inflation, and CBK Central Bank Rate.',
    timeframe: '2020 - 2024 (Quarterly)',
    kpis: [
      { label: 'Headline CPI', value: '6.8%', change: '-0.9% MoM', positive: true },
      { label: 'Core Inflation', value: '3.6%', change: 'Stable', positive: true },
      { label: 'CBK Base Rate', value: '12.5%', change: 'Monetary Stance', positive: true },
      { label: 'FX USD/KES', value: '129.5', change: '+4.2% Stability', positive: true }
    ]
  },
  {
    id: 'customer-analytics',
    name: 'Customer Segmentation & LTV Engine',
    category: 'Customer Analytics',
    description: 'Cohort retention, RFM customer clustering, and customer lifetime value (LTV/CAC) analysis.',
    timeframe: 'Active Cohorts (N=12,400)',
    kpis: [
      { label: 'Total Active Customers', value: '12,480', change: '+14.2%', positive: true },
      { label: 'LTV / CAC Ratio', value: '4.8x', change: 'Top Decile', positive: true },
      { label: 'Churn Rate', value: '2.1%', change: '-0.7% MoM', positive: true },
      { label: 'NPS Score', value: '68', change: '+6 pts', positive: true }
    ]
  }
];

export const salesMonthlyData = [
  { month: 'Jan', revenue: 95000, target: 90000, profit: 39900, units: 1120 },
  { month: 'Feb', revenue: 105000, target: 98000, profit: 45150, units: 1240 },
  { month: 'Mar', revenue: 118000, target: 105000, profit: 51920, units: 1390 },
  { month: 'Apr', revenue: 112000, target: 110000, profit: 47040, units: 1310 },
  { month: 'May', revenue: 128000, target: 115000, profit: 55040, units: 1480 },
  { month: 'Jun', revenue: 135000, target: 120000, profit: 59400, units: 1560 },
  { month: 'Jul', revenue: 124000, target: 122000, profit: 52080, units: 1420 },
  { month: 'Aug', revenue: 132000, target: 125000, profit: 56760, units: 1510 },
  { month: 'Sep', revenue: 142000, target: 130000, profit: 62480, units: 1640 },
  { month: 'Oct', revenue: 156000, target: 135000, profit: 70200, units: 1780 },
  { month: 'Nov', revenue: 168000, target: 145000, profit: 75600, units: 1910 },
  { month: 'Dec', revenue: 185000, target: 160000, profit: 85100, units: 2150 }
];

export const regionalDistributionData = [
  { name: 'Nairobi Central', value: 42, color: '#0D6EFD' },
  { name: 'Coast / Mombasa', value: 24, color: '#00D4FF' },
  { name: 'Rift Valley / Nakuru', value: 18, color: '#38BDF8' },
  { name: 'Western / Kisumu', value: 16, color: '#60A5FA' }
];

export const macroInflationData = [
  { period: '2022 Q1', headline: 5.6, food: 8.9, energy: 6.4, core: 3.1 },
  { period: '2022 Q2', headline: 7.1, food: 12.4, energy: 9.8, core: 3.4 },
  { period: '2022 Q3', headline: 8.7, food: 15.3, energy: 11.2, core: 3.8 },
  { period: '2022 Q4', headline: 9.5, food: 15.8, energy: 12.1, core: 4.1 },
  { period: '2023 Q1', headline: 9.2, food: 14.1, energy: 12.4, core: 4.0 },
  { period: '2023 Q2', headline: 7.9, food: 10.3, energy: 11.8, core: 3.9 },
  { period: '2023 Q3', headline: 7.3, food: 8.4, energy: 12.9, core: 3.7 },
  { period: '2023 Q4', headline: 6.6, food: 7.7, energy: 11.5, core: 3.5 },
  { period: '2024 Q1', headline: 6.3, food: 6.0, energy: 8.2, core: 3.6 },
  { period: '2024 Q2', headline: 5.8, food: 5.4, energy: 7.1, core: 3.4 },
  { period: '2024 Q3', headline: 4.9, food: 4.6, energy: 5.8, core: 3.3 },
  { period: '2024 Q4', headline: 4.4, food: 4.1, energy: 5.2, core: 3.2 }
];
