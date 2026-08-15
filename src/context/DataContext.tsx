import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Project, 
  ServiceItem, 
  ResearchArticle, 
  SkillCategory, 
  ExperienceItem, 
  EducationItem, 
  CertificationItem 
} from '../types';
import { 
  fetchProfile, 
  fetchProjects, 
  fetchServices, 
  fetchResearch, 
  fetchSkills, 
  fetchExperience, 
  fetchEducation, 
  fetchCertifications,
  ProfileData 
} from '../services/api';

interface DataContextType {
  profile: ProfileData;
  projects: Project[];
  services: ServiceItem[];
  research: ResearchArticle[];
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const defaultProfile: ProfileData = {
  fullName: 'Colliner Phosta',
  title: 'Data Analyst | Economist | Researcher | Business Intelligence Professional',
  tagline: 'Turning Data Into Decisions, Insights Into Strategy.',
  bio: "Results-driven professional with a Bachelor's degree in Economics and Statistics from Kirinyaga University. Specialized in transforming complex business and macroeconomic data into actionable intelligence, predictive insights, and high-impact visual dashboards.",
  aboutExtended: "I am an analytical thinker and quantitative problem-solver with deep expertise at the intersection of applied economics, statistical modeling, business intelligence, and financial analytics.",
  phone: '0722450893',
  email: 'phostacolliner@gmail.com',
  location: 'Nairobi, Kenya',
  linkedin: 'https://linkedin.com/in/colliner-phosta',
  github: 'https://github.com/phostacolliner',
  twitter: 'https://twitter.com',
  kpiProjectsCount: 10,
  kpiYearsExp: 5,
  kpiSatisfaction: 100,
};

const DataContext = createContext<DataContextType>({
  profile: defaultProfile,
  projects: [],
  services: [],
  research: [],
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  loading: true,
  refreshData: async () => {},
});

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [research, setResearch] = useState<ResearchArticle[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experience, setExperience] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [
        profileRes,
        projectsRes,
        servicesRes,
        researchRes,
        skillsRes,
        experienceRes,
        educationRes,
        certsRes,
      ] = await Promise.allSettled([
        fetchProfile(),
        fetchProjects(),
        fetchServices(),
        fetchResearch(),
        fetchSkills(),
        fetchExperience(),
        fetchEducation(),
        fetchCertifications(),
      ]);

      if (profileRes.status === 'fulfilled') setProfile(profileRes.value);
      if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value);
      if (servicesRes.status === 'fulfilled') setServices(servicesRes.value);
      if (researchRes.status === 'fulfilled') setResearch(researchRes.value);
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value);
      if (experienceRes.status === 'fulfilled') setExperience(experienceRes.value);
      if (educationRes.status === 'fulfilled') setEducation(educationRes.value);
      if (certsRes.status === 'fulfilled') setCertifications(certsRes.value);
    } catch (err) {
      console.error('Error loading database contents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <DataContext.Provider
      value={{
        profile,
        projects,
        services,
        research,
        skills,
        experience,
        education,
        certifications,
        loading,
        refreshData: loadAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
