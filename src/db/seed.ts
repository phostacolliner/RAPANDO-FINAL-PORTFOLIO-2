import bcrypt from 'bcryptjs';
import { db } from './index.js';
import { 
  adminUsers, 
  profileInfo, 
  projects, 
  services, 
  researchArticles, 
  skills, 
  experience, 
  education, 
  certifications 
} from './schema.js';

export async function seedDatabaseIfEmpty() {
  try {
    // 1. Seed Admin User
    const existingUsers = await db.select().from(adminUsers).limit(1);
    if (existingUsers.length === 0) {
      const passwordHash = await bcrypt.hash('admin12345', 10);
      await db.insert(adminUsers).values({
        email: 'phostacolliner@gmail.com',
        passwordHash,
        name: 'Colliner Phosta',
        role: 'admin',
      });
      console.log('✅ Admin user created: phostacolliner@gmail.com (Password: admin12345)');
    }

    // 2. Seed Profile Info
    const existingProfile = await db.select().from(profileInfo).limit(1);
    if (existingProfile.length === 0) {
      await db.insert(profileInfo).values({
        fullName: 'Colliner Phosta',
        title: 'Data Analyst | Economist | Researcher | Business Intelligence Professional',
        tagline: 'Turning Data Into Decisions, Insights Into Strategy.',
        bio: "Results-driven professional with a Bachelor's degree in Economics and Statistics from Kirinyaga University. Specialized in transforming complex business and macroeconomic data into actionable intelligence, predictive insights, and high-impact visual dashboards.",
        aboutExtended: "I am an analytical thinker and quantitative problem-solver with deep expertise at the intersection of applied economics, statistical modeling, business intelligence, and financial analytics. Whether engineering automated Star-Schema Power BI architectures, specifying cointegration Vector Error Correction Models (VECM) for macroeconomic forecasting, or building full-stack web data tools, I bridge the gap between raw data and executive strategy.",
        phone: '0722450893',
        email: 'phostacolliner@gmail.com',
        location: 'Nairobi, Kenya',
        linkedin: 'https://linkedin.com/in/colliner-phosta',
        github: 'https://github.com/phostacolliner',
        twitter: 'https://twitter.com',
        kpiProjectsCount: 10,
        kpiYearsExp: 5,
        kpiSatisfaction: 100,
      });
      console.log('✅ Profile information seeded');
    }

    // 3. Seed Projects
    const existingProjects = await db.select().from(projects).limit(1);
    if (existingProjects.length === 0) {
      await db.insert(projects).values([
        {
          slug: 'sales-profitability-dashboard',
          title: 'Sales & Profitability Dashboard',
          category: 'Data Analytics',
          shortDescription: 'Power BI dashboard for sales performance, profitability and branch analysis.',
          fullDescription: 'An enterprise-grade Power BI analytical solution engineered to give executive leadership complete visibility into sales trajectories, gross margins, regional branch KPIs, and product mix profitability across multi-location operations.',
          problemStatement: 'Executive stakeholders lacked real-time visibility across regional distribution channels, experiencing a 2-week lag in monthly profitability reporting with disjointed spreadsheets and untracked discounts eroding margins.',
          objectives: [
            'Centralize transactional sales data across multiple branches into a cohesive relational star schema',
            'Engineer automated DAX measures for Year-over-Year (YoY), Month-to-Date (MTD), and variance metrics',
            'Provide drill-through capabilities from high-level enterprise KPIs down to SKU-level profitability',
            'Enable automated daily scheduled data refresh and interactive parameter-driven target forecasting'
          ],
          methodology: 'Extracted raw transactional POS and ERP records via automated SQL views and Power Query ETL pipelines. Constructed a robust Star Schema dimensional model with dedicated Fact Sales and Dim Customer, Branch, and Date tables. Authored optimized DAX measures utilizing CALCULATE, SUMX, and SAMEPERIODLASTYEAR.',
          toolsUsed: ['Microsoft Power BI', 'DAX Studio', 'Microsoft Excel (Advanced)', 'PostgreSQL', 'Power Query'],
          keyFindings: [
            'Top 20% of product SKUs contributed 74% of total gross profit, while 15% were operating at negative post-discount margins',
            'Regional variance revealed Branch East outperformed revenue targets by 18% due to high volume, but lagged in net margin due to logistics costs',
            'Quarterly seasonal discounting in Q3 drove 32% volume spikes without yielding net bottom-line growth'
          ],
          businessImpact: 'Eliminated 35+ hours of manual weekly spreadsheet consolidation for the commercial finance team. Enabled leadership to identify and phase out 8 underperforming SKUs, recovering 4.2% in operating margin.',
          githubLink: 'https://github.com/phostacolliner/sales-profitability-bi',
          liveLink: 'https://app.powerbi.com',
          imageUrl: '',
          featured: true,
          sortOrder: 1,
        },

        {
          slug: 'financial-performance-analysis',
          title: 'Financial Performance Analysis',
          category: 'Finance',
          shortDescription: 'Comprehensive financial analysis with forecasting and variance insights.',
          fullDescription: 'Dynamic financial analytics and three-statement financial modeling suite with rolling 12-month budget-vs-actual variance tracking, cash runway projections, and DuPont return on equity decomposition.',
          problemStatement: 'Finance directors faced volatile cash flows, unpredictable seasonal working capital demands, and manual static annual budgets that failed to adapt to economic shifts and fluctuating raw material costs.',
          objectives: [
            'Build dynamic 3-statement integrated financial model linking P&L, Balance Sheet, and Cash Flow',
            'Implement multi-tier sensitivity models evaluating Base, Bull, and Bear macroeconomic conditions',
            'Create rolling 12-month cash flow and working capital forecasting algorithms to prevent liquidity shortfalls'
          ],
          methodology: 'Standardized chart-of-accounts mapping across historical financial records for 5 fiscal periods. Structured automated financial schedules for CAPEX depreciation, debt amortization, and working capital cycles. Integrated Power BI visual dashboards for quarterly board presentations.',
          toolsUsed: ['Microsoft Excel (Financial Modeling)', 'Power BI', 'DCF Valuation Models', 'Sensitivity Tables'],
          keyFindings: [
            'Working capital cash conversion cycle had expanded from 42 days to 68 days due to delayed enterprise receivables',
            'DuPont ROE decomposition demonstrated that margin contraction was the primary driver of lower equity returns',
            'Scenario stress testing indicated potential cash deficit under a 15% currency depreciation scenario'
          ],
          businessImpact: 'Restructured debtor payment terms, reducing Cash Conversion Cycle by 18 days and unlocking $240K in trapped liquidity.',
          githubLink: 'https://github.com/phostacolliner/financial-performance-modeling',
          liveLink: 'https://github.com/phostacolliner/financial-performance-modeling',
          imageUrl: '',
          featured: true,
          sortOrder: 2,
        },
        {
          slug: 'econometric-analysis-inflation',
          title: 'Econometric Analysis of Inflation',
          category: 'Economics',
          shortDescription: 'Time series and regression analysis of inflation drivers in Kenya.',
          fullDescription: 'Rigorous empirical macroeconomic econometric research studying the structural, monetary, and imported drivers of headline and core consumer price index (CPI) inflation in Kenya using cointegration and vector error correction modeling (VECM).',
          problemStatement: 'Persistent macroeconomic shocks, exchange rate volatility, and food price fluctuations created uncertainties in policy forecasting, requiring rigorous econometric decomposition of domestic monetary vs. external supply-side price drivers.',
          objectives: [
            'Examine the stationarity, unit root properties, and structural breaks across 15 years of quarterly macroeconomic data',
            'Specify and evaluate Vector Autoregression (VAR) and Vector Error Correction Models (VECM) for long-run cointegration',
            'Compute Impulse Response Functions (IRF) and Variance Decompositions to track shock transmission timelines'
          ],
          methodology: 'Collected historical series from Central Bank of Kenya (CBK) and Kenya National Bureau of Statistics (KNBS). Executed Augmented Dickey-Fuller (ADF) tests, Johansen Cointegration test, and specified a VECM with Impulse Response Functions.',
          toolsUsed: ['R Studio', 'Stata 17', 'EViews', 'LaTeX', 'ggplot2', 'forecast / vars packages'],
          keyFindings: [
            'Exchange rate pass-through to headline CPI was statistically significant at p < 0.01, with peak impact occurring at lag t+2 quarters',
            'Food and energy price shocks accounted for 54% of short-run inflation variance, while broad money growth (M3) explained long-run trends',
            'The speed of adjustment parameter in the VECM indicated a 34.6% annual return toward long-run macroeconomic equilibrium'
          ],
          businessImpact: 'Authored comprehensive research monograph used for academic presentation and policy discourse on interest rate smoothing.',
          githubLink: 'https://github.com/phostacolliner/kenya-inflation-econometrics',
          liveLink: 'https://github.com/phostacolliner/kenya-inflation-econometrics',
          imageUrl: '',
          featured: true,
          sortOrder: 3,
        },
        {
          slug: 'research-survey-analysis',
          title: 'Research & Survey Analysis',
          category: 'Research',
          shortDescription: 'Survey design, data collection and statistical analysis for evidence-based decisions.',
          fullDescription: 'End-to-end quantitative and qualitative research methodology framework, from stratified cluster sampling and digital survey instruments (ODK/Kobo) to inferential hypothesis testing, factor analysis, and executive research syntheses.',
          problemStatement: 'Non-governmental and community organizations needed reliable baseline and endline evaluations of household socio-economic programs, but lacked rigorous survey sampling frames and reproducible statistical pipelines.',
          objectives: [
            'Design psychometrically validated questionnaires and digital data collection protocols with built-in logic skips',
            'Conduct multi-stage stratified random sampling ensuring statistical power > 0.85 and 95% confidence intervals',
            'Perform exploratory factor analysis (EFA), ANOVA, and multivariate logistic regression on respondent datasets'
          ],
          methodology: 'Developed KoboToolbox / ODK digital forms with GPS geo-fencing and audio audit checks. Executed systematic data cleaning protocols and inferential statistical tests in SPSS and R to validate intervention hypotheses.',
          toolsUsed: ['IBM SPSS Statistics', 'R (tidyverse, psych)', 'KoboToolbox', 'Microsoft Excel', 'Tableau'],
          keyFindings: [
            'Target community micro-credit training interventions demonstrated a statistically significant 26.4% gain in household savings (p = 0.003)',
            'Logistic regression revealed literacy level and mobile money adoption were strongest adoption determinants'
          ],
          businessImpact: 'Successfully delivered research evaluation across 1,200+ respondent households with zero data loss, informing program donor renewals.',
          githubLink: 'https://github.com/phostacolliner/socioeconomic-survey-analysis',
          liveLink: 'https://github.com/phostacolliner/socioeconomic-survey-analysis',
          imageUrl: '',
          featured: true,
          sortOrder: 4,
        },
        {
          slug: 'business-website-development',
          title: 'Business Website Development',
          category: 'Web Development',
          shortDescription: 'Modern, responsive websites built for businesses and organizations.',
          fullDescription: 'High-performance, modern, and accessible web solutions combining intuitive user experience with enterprise-grade React, TypeScript, and Tailwind CSS architectures, responsive layouts, and interactive data visualization frontends.',
          problemStatement: 'SMEs and research consultancies struggled with outdated, slow legacy web presences that rendered poorly on mobile devices, lacked interactive reporting capabilities, and failed to convert client inquiries.',
          objectives: [
            'Engineer lightning-fast web applications with sub-second page loads and mobile-first responsive design',
            'Integrate interactive charting libraries (Recharts / D3) for client-facing analytics and live metrics',
            'Implement strict TypeScript type safety, modular component architecture, and automated CI/CD deployment'
          ],
          methodology: 'Architected modular React component hierarchy with reusable design systems and Tailwind styling tokens. Constructed accessible form validations with client-side error handling and secure webhook integrations.',
          toolsUsed: ['React 18+', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React', 'Framer Motion', 'Git / GitHub'],
          keyFindings: [
            'Modern headless React architecture reduced time-to-interactive from 4.8 seconds to under 0.6 seconds',
            'Mobile user engagement rose by 42% following responsive layout restructuring and clean typography hierarchy'
          ],
          businessImpact: 'Delivered fully responsive, brand-aligned client portals with automated contact lead tracking and 99/100 Lighthouse performance.',
          githubLink: 'https://github.com/phostacolliner/modern-business-web',
          liveLink: 'https://github.com/phostacolliner/modern-business-web',
          imageUrl: '',
          featured: true,
          sortOrder: 5,
        }
      ]);
      console.log('✅ Projects seeded');
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('Database unavailable; skipping seed initialization:', message);
  }
}
