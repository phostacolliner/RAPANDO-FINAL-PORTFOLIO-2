export interface Project {
  id: string;
  title: string;
  category: 'Data Analytics' | 'Finance' | 'Economics' | 'Research' | 'Web Development';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  fallbackImage?: string;
  problemStatement: string;
  objectives: string[];
  methodology: string[];
  toolsUsed: string[];
  keyFindings: string[];
  businessImpact: string[];
  metrics: { label: string; value: string; change?: string }[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  completionDate: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  color: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: number; // percentage e.g. 90
    experience: string;
    badge?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  category: 'Analytics' | 'Finance' | 'Research' | 'Operations';
  responsibilities: string[];
  achievements: string[];
  toolsUsed: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  description: string;
  coreCourses: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  topics: string[];
}

export interface ResearchArticle {
  id: string;
  title: string;
  category: 'Econometrics' | 'Macroeconomics' | 'Business Intelligence' | 'Development Economics';
  date: string;
  readTime: string;
  shortSummary: string;
  abstract: string;
  keyFindings: string[];
  policyImplications: string[];
  methodology: string;
  dataset: string;
  tags: string[];
  charts?: {
    type: 'line' | 'bar';
    title: string;
    data: { name: string; value: number; benchmark?: number }[];
  };
}

export interface DataLabDataset {
  id: string;
  title: string;
  category: string;
  description: string;
  kpis: { label: string; value: string; change: string; positive: boolean }[];
  chartType: 'revenue' | 'forecast' | 'inflation' | 'segments';
}
