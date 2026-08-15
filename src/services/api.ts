import { Project, ServiceItem, ResearchArticle, SkillCategory, ExperienceItem, EducationItem, CertificationItem } from '../types';

// Fallback initial data in case of offline/transition
import { projectsData as fallbackProjects } from '../data/projects';
import { servicesData as fallbackServices } from '../data/services';
import { researchData as fallbackResearch } from '../data/research';
import { skillsData as fallbackSkills } from '../data/skills';
import { experienceData as fallbackExperience } from '../data/experience';
import { educationData as fallbackEducation, certificationsData as fallbackCertifications } from '../data/education';

const TOKEN_KEY = 'colliner_admin_jwt_token';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export interface ProfileData {
  id?: number;
  fullName: string;
  title: string;
  tagline: string;
  avatarUrl?: string;
  bio: string;
  aboutExtended: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
  kpiProjectsCount: number;
  kpiYearsExp: number;
  kpiSatisfaction: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// ----------------------------------------------------
// Public Fetchers
// ----------------------------------------------------

export async function fetchProfile(): Promise<ProfileData> {
  try {
    const res = await fetch('/api/profile');
    if (!res.ok) throw new Error('Failed to fetch profile');
    return await res.json();
  } catch (err) {
    return {
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
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch('/api/projects');
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    if (!data || data.length === 0) return fallbackProjects;
    return data.map((p: any) => ({
      id: p.slug || String(p.id),
      dbId: p.id,
      title: p.title,
      category: p.category,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      technologies: p.toolsUsed || [],
      image: p.imageUrl || '',
      fallbackImage: '/assets/projects/sales-dashboard.png',
      featured: p.featured,
      completionDate: '2024',
      problemStatement: p.problemStatement,
      objectives: p.objectives || [],
      methodology: typeof p.methodology === 'string' ? [p.methodology] : (p.methodology || []),
      toolsUsed: p.toolsUsed || [],
      keyFindings: p.keyFindings || [],
      businessImpact: typeof p.businessImpact === 'string' ? [p.businessImpact] : (p.businessImpact || []),
      metrics: [
        { label: 'Impact / Quality', value: 'High' }
      ],
      liveDemoUrl: p.liveLink || '#',
      githubUrl: p.githubLink || '#',
      sortOrder: p.sortOrder
    }));
  } catch (err) {
    return fallbackProjects;
  }
}

export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    if (!data || data.length === 0) return fallbackServices;
    return data.map((s: any) => ({
      id: String(s.id),
      dbId: s.id,
      title: s.title,
      category: s.subtitle || 'Analytics',
      iconName: s.icon || 'BarChart3',
      color: '#0D6EFD',
      description: s.description,
      deliverables: s.deliverables || [],
      tools: s.tools || [],
      sortOrder: s.sortOrder
    }));
  } catch (err) {
    return fallbackServices;
  }
}

export async function fetchResearch(): Promise<ResearchArticle[]> {
  try {
    const res = await fetch('/api/research');
    if (!res.ok) throw new Error('Failed to fetch research');
    const data = await res.json();
    if (!data || data.length === 0) return fallbackResearch;
    return data.map((r: any) => ({
      id: String(r.id),
      dbId: r.id,
      title: r.title,
      category: r.category,
      date: r.date,
      readTime: r.readTime,
      shortSummary: r.shortSummary,
      abstract: r.abstract,
      methodology: r.methodology,
      dataset: r.dataset,
      tags: r.tags || [],
      keyFindings: r.keyFindings || [],
      policyImplications: r.policyImplications || [],
      sortOrder: r.sortOrder
    }));
  } catch (err) {
    return fallbackResearch;
  }
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  try {
    const res = await fetch('/api/skills');
    if (!res.ok) throw new Error('Failed to fetch skills');
    const data = await res.json();
    if (!data || data.length === 0) return fallbackSkills;
    
    // Group skills by category
    const grouped: Record<string, { name: string; level: number; experience: string; dbId?: number }[]> = {};
    data.forEach((s: any) => {
      const cat = s.category || 'ANALYTICS';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({
        name: s.name,
        level: s.level,
        experience: s.experience,
        dbId: s.id
      });
    });

    return Object.keys(grouped).map((catKey) => ({
      category: catKey,
      description: `${catKey} core quantitative & technological proficiencies`,
      skills: grouped[catKey]
    }));
  } catch (err) {
    return fallbackSkills;
  }
}

export async function fetchExperience(): Promise<ExperienceItem[]> {
  try {
    const res = await fetch('/api/experience');
    if (!res.ok) throw new Error('Failed to fetch experience');
    const data = await res.json();
    if (!data || data.length === 0) return fallbackExperience;
    return data.map((e: any) => ({
      id: String(e.id),
      dbId: e.id,
      role: e.role,
      organization: e.organization,
      period: e.period,
      location: e.location,
      category: e.category,
      responsibilities: e.responsibilities || [],
      achievements: [],
      toolsUsed: e.toolsUsed || [],
      sortOrder: e.sortOrder
    }));
  } catch (err) {
    return fallbackExperience;
  }
}

export async function fetchEducation(): Promise<EducationItem[]> {
  try {
    const res = await fetch('/api/education');
    if (!res.ok) throw new Error('Failed to fetch education');
    const data = await res.json();
    if (!data || data.length === 0) return fallbackEducation;
    return data.map((edu: any) => ({
      dbId: edu.id,
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      location: edu.location,
      description: edu.description,
      coreCourses: edu.coreCourses || [],
      sortOrder: edu.sortOrder
    }));
  } catch (err) {
    return fallbackEducation;
  }
}

export async function fetchCertifications(): Promise<CertificationItem[]> {
  try {
    const res = await fetch('/api/certifications');
    if (!res.ok) throw new Error('Failed to fetch certifications');
    const data = await res.json();
    if (!data || data.length === 0) return fallbackCertifications;
    return data.map((c: any) => ({
      dbId: c.id,
      name: c.name,
      issuer: c.issuer,
      year: c.year,
      topics: c.topics || [],
      credentialUrl: c.credentialUrl,
      sortOrder: c.sortOrder
    }));
  } catch (err) {
    return fallbackCertifications;
  }
}

export async function submitContactMessage(payload: { name: string; email: string; subject: string; message: string }) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(err.error || 'Failed to submit contact message');
  }
  return await res.json();
}

// ----------------------------------------------------
// Admin API Calls
// ----------------------------------------------------

export async function adminLogin(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Invalid credentials');
  }
  authService.setToken(data.token);
  return data;
}

export async function adminCheckMe() {
  const token = authService.getToken();
  if (!token) return null;
  const res = await fetch('/api/auth/me', {
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) {
    authService.removeToken();
    return null;
  }
  return await res.json();
}

export async function adminUpdateProfile(profile: Partial<ProfileData>) {
  const res = await fetch('/api/admin/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(profile)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return await res.json();
}

// Admin Project CRUD
export async function adminCreateProject(project: any) {
  const res = await fetch('/api/admin/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(project)
  });
  if (!res.ok) throw new Error('Failed to create project');
  return await res.json();
}

export async function adminUpdateProject(id: number, project: any) {
  const res = await fetch(`/api/admin/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(project)
  });
  if (!res.ok) throw new Error('Failed to update project');
  return await res.json();
}

export async function adminDeleteProject(id: number) {
  const res = await fetch(`/api/admin/projects/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return await res.json();
}

// Admin Services CRUD
export async function adminCreateService(service: any) {
  const res = await fetch('/api/admin/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(service)
  });
  if (!res.ok) throw new Error('Failed to create service');
  return await res.json();
}

export async function adminUpdateService(id: number, service: any) {
  const res = await fetch(`/api/admin/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(service)
  });
  if (!res.ok) throw new Error('Failed to update service');
  return await res.json();
}

export async function adminDeleteService(id: number) {
  const res = await fetch(`/api/admin/services/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete service');
  return await res.json();
}

// Admin Research CRUD
export async function adminCreateResearch(article: any) {
  const res = await fetch('/api/admin/research', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(article)
  });
  if (!res.ok) throw new Error('Failed to create article');
  return await res.json();
}

export async function adminUpdateResearch(id: number, article: any) {
  const res = await fetch(`/api/admin/research/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(article)
  });
  if (!res.ok) throw new Error('Failed to update article');
  return await res.json();
}

export async function adminDeleteResearch(id: number) {
  const res = await fetch(`/api/admin/research/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete article');
  return await res.json();
}

// Admin Skills CRUD
export async function adminCreateSkill(skill: any) {
  const res = await fetch('/api/admin/skills', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(skill)
  });
  if (!res.ok) throw new Error('Failed to create skill');
  return await res.json();
}

export async function adminUpdateSkill(id: number, skill: any) {
  const res = await fetch(`/api/admin/skills/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(skill)
  });
  if (!res.ok) throw new Error('Failed to update skill');
  return await res.json();
}

export async function adminDeleteSkill(id: number) {
  const res = await fetch(`/api/admin/skills/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete skill');
  return await res.json();
}

// Admin Experience CRUD
export async function adminCreateExperience(item: any) {
  const res = await fetch('/api/admin/experience', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to create experience');
  return await res.json();
}

export async function adminUpdateExperience(id: number, item: any) {
  const res = await fetch(`/api/admin/experience/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to update experience');
  return await res.json();
}

export async function adminDeleteExperience(id: number) {
  const res = await fetch(`/api/admin/experience/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete experience');
  return await res.json();
}

// Admin Education CRUD
export async function adminCreateEducation(item: any) {
  const res = await fetch('/api/admin/education', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to create education');
  return await res.json();
}

export async function adminUpdateEducation(id: number, item: any) {
  const res = await fetch(`/api/admin/education/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to update education');
  return await res.json();
}

export async function adminDeleteEducation(id: number) {
  const res = await fetch(`/api/admin/education/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete education');
  return await res.json();
}

// Admin Certification CRUD
export async function adminCreateCertification(item: any) {
  const res = await fetch('/api/admin/certifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to create certification');
  return await res.json();
}

export async function adminUpdateCertification(id: number, item: any) {
  const res = await fetch(`/api/admin/certifications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Failed to update certification');
  return await res.json();
}

export async function adminDeleteCertification(id: number) {
  const res = await fetch(`/api/admin/certifications/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete certification');
  return await res.json();
}

// Admin Messages
export async function adminFetchMessages(): Promise<ContactMessage[]> {
  const res = await fetch('/api/admin/messages', {
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to fetch messages');
  return await res.json();
}

export async function adminMarkMessageRead(id: number) {
  const res = await fetch(`/api/admin/messages/${id}/read`, {
    method: 'PUT',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to mark message as read');
  return await res.json();
}

export async function adminDeleteMessage(id: number) {
  const res = await fetch(`/api/admin/messages/${id}`, {
    method: 'DELETE',
    headers: { ...authService.getAuthHeaders() }
  });
  if (!res.ok) throw new Error('Failed to delete message');
  return await res.json();
}

// Admin Image Upload
export async function adminUploadImage(imageBase64: string, fileName?: string): Promise<{ success: boolean; url: string; fileName: string }> {
  const res = await fetch('/api/admin/upload-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify({ imageBase64, fileName })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to upload image');
  }
  return data;
}

// Admin Change Password
export async function adminChangePassword(currentPassword: string, newPassword: string) {
  const res = await fetch('/api/auth/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authService.getAuthHeaders() },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to update password');
  }
  return data;
}
