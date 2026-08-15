import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { eq, desc, asc } from 'drizzle-orm';
import { db } from './src/db/index.js';
import { seedDatabaseIfEmpty } from './src/db/seed.js';
import {
  adminUsers,
  profileInfo,
  projects,
  services,
  researchArticles,
  skills,
  experience,
  education,
  certifications,
  contactMessages,
} from './src/db/schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'colliner-phosta-admin-secret-key-2026';

// Authentication middleware for admin routes
interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; name: string; role: string };
}

function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; name: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Ensure uploads directory exists and is statically served
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // Run database check & seed initial data if tables are fresh
  await seedDatabaseIfEmpty();

  // ==========================================
  // 1. PUBLIC API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: 'cloud-sql-connected', timestamp: new Date().toISOString() });
  });

  // Profile Info
  app.get('/api/profile', async (req, res) => {
    try {
      const rows = await db.select().from(profileInfo).limit(1);
      if (rows.length === 0) {
        return res.json({
          fullName: 'Colliner Phosta',
          title: 'Data Analyst | Economist | Researcher | Business Intelligence Professional',
          tagline: 'Turning Data Into Decisions, Insights Into Strategy.',
          avatarUrl: '',
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
      }
      res.json(rows[0]);
    } catch (error) {
      console.error('Error getting profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile info' });
    }
  });

  // Projects
  app.get('/api/projects', async (req, res) => {
    try {
      const allProjects = await db.select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.createdAt));
      res.json(allProjects);
    } catch (error) {
      console.error('Error getting projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  app.get('/api/projects/:idOrSlug', async (req, res) => {
    try {
      const { idOrSlug } = req.params;
      const isNum = !isNaN(Number(idOrSlug));
      const result = isNum
        ? await db.select().from(projects).where(eq(projects.id, Number(idOrSlug))).limit(1)
        : await db.select().from(projects).where(eq(projects.slug, idOrSlug)).limit(1);

      if (result.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(result[0]);
    } catch (error) {
      console.error('Error getting project detail:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  });

  // Services
  app.get('/api/services', async (req, res) => {
    try {
      const allServices = await db.select().from(services).orderBy(asc(services.sortOrder), desc(services.createdAt));
      res.json(allServices);
    } catch (error) {
      console.error('Error getting services:', error);
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  // Research Articles
  app.get('/api/research', async (req, res) => {
    try {
      const allArticles = await db.select().from(researchArticles).orderBy(asc(researchArticles.sortOrder), desc(researchArticles.createdAt));
      res.json(allArticles);
    } catch (error) {
      console.error('Error getting research articles:', error);
      res.status(500).json({ error: 'Failed to fetch research articles' });
    }
  });

  // Skills
  app.get('/api/skills', async (req, res) => {
    try {
      const allSkills = await db.select().from(skills).orderBy(asc(skills.sortOrder), desc(skills.createdAt));
      res.json(allSkills);
    } catch (error) {
      console.error('Error getting skills:', error);
      res.status(500).json({ error: 'Failed to fetch skills' });
    }
  });

  // Experience
  app.get('/api/experience', async (req, res) => {
    try {
      const allExp = await db.select().from(experience).orderBy(asc(experience.sortOrder), desc(experience.createdAt));
      res.json(allExp);
    } catch (error) {
      console.error('Error getting experience:', error);
      res.status(500).json({ error: 'Failed to fetch experience' });
    }
  });

  // Education
  app.get('/api/education', async (req, res) => {
    try {
      const allEdu = await db.select().from(education).orderBy(asc(education.sortOrder), desc(education.createdAt));
      res.json(allEdu);
    } catch (error) {
      console.error('Error getting education:', error);
      res.status(500).json({ error: 'Failed to fetch education' });
    }
  });

  // Certifications
  app.get('/api/certifications', async (req, res) => {
    try {
      const allCerts = await db.select().from(certifications).orderBy(asc(certifications.sortOrder), desc(certifications.createdAt));
      res.json(allCerts);
    } catch (error) {
      console.error('Error getting certifications:', error);
      res.status(500).json({ error: 'Failed to fetch certifications' });
    }
  });

  // Public Contact Form Submission
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
      }

      const inserted = await db.insert(contactMessages).values({
        name,
        email,
        subject,
        message,
        isRead: false,
      }).returning();

      res.status(201).json({ success: true, message: 'Message sent successfully!', item: inserted[0] });
    } catch (error) {
      console.error('Error saving contact message:', error);
      res.status(500).json({ error: 'Failed to submit message' });
    }
  });

  // ==========================================
  // 2. AUTHENTICATION API ROUTES
  // ==========================================

  // Admin Login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const users = await db.select().from(adminUsers).where(eq(adminUsers.email, email.trim().toLowerCase())).limit(1);
      if (users.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'An error occurred during authentication' });
    }
  });

  // Check Current Session
  app.get('/api/auth/me', requireAdminAuth, async (req: AuthenticatedRequest, res) => {
    res.json({ success: true, user: req.user });
  });

  // Change Admin Password / Profile
  app.post('/api/auth/change-password', requireAdminAuth, async (req: AuthenticatedRequest, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
      }

      const users = await db.select().from(adminUsers).where(eq(adminUsers.id, req.user!.id)).limit(1);
      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = users[0];
      if (currentPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
          return res.status(400).json({ error: 'Current password does not match' });
        }
      }

      const newHash = await bcrypt.hash(newPassword, 10);
      await db.update(adminUsers).set({ passwordHash: newHash, updatedAt: new Date() }).where(eq(adminUsers.id, user.id));

      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password change error:', error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  });

  // ==========================================
  // 3. ADMIN MANAGEMENT CRUD ROUTES
  // ==========================================

  // Admin: Image Upload (Supports Base64 data URLs or binary payloads)
  app.post('/api/admin/upload-image', requireAdminAuth, async (req, res) => {
    try {
      const { imageBase64, fileName } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'imageBase64 string is required' });
      }

      // Extract format and raw base64 data
      let matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let ext = 'jpg';
      let buffer: Buffer;

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        if (mimeType.includes('png')) ext = 'png';
        else if (mimeType.includes('webp')) ext = 'webp';
        else if (mimeType.includes('gif')) ext = 'gif';
        else if (mimeType.includes('svg')) ext = 'svg';
        buffer = Buffer.from(matches[2], 'base64');
      } else {
        buffer = Buffer.from(imageBase64, 'base64');
      }

      const cleanName = (fileName || 'portrait').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
      const generatedFileName = `${cleanName}_${Date.now()}.${ext}`;
      const filePath = path.join(process.cwd(), 'uploads', generatedFileName);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${generatedFileName}`;
      res.json({ success: true, url: publicUrl, fileName: generatedFileName });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to save image' });
    }
  });

  // Admin: Update Profile Info
  app.put('/api/admin/profile', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      const existing = await db.select().from(profileInfo).limit(1);

      if (existing.length === 0) {
        const inserted = await db.insert(profileInfo).values({ ...data, updatedAt: new Date() }).returning();
        return res.json({ success: true, item: inserted[0] });
      }

      const updated = await db.update(profileInfo).set({ ...data, updatedAt: new Date() }).where(eq(profileInfo.id, existing[0].id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });

  // Admin: Projects CRUD
  app.post('/api/admin/projects', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      if (!data.title) {
        return res.status(400).json({ error: 'Project title is required' });
      }
      const slug = (data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) + '-' + Date.now().toString().slice(-4);
      
      const inserted = await db.insert(projects).values({
        slug,
        title: data.title,
        category: data.category || 'Data Analytics',
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        problemStatement: data.problemStatement || '',
        objectives: data.objectives || [],
        methodology: data.methodology || '',
        toolsUsed: data.toolsUsed || [],
        keyFindings: data.keyFindings || [],
        businessImpact: data.businessImpact || '',
        githubLink: data.githubLink || '',
        liveLink: data.liveLink || '',
        imageUrl: data.imageUrl || '',
        featured: data.featured ?? true,
        sortOrder: Number(data.sortOrder) || 0,
      }).returning();

      res.status(201).json({ success: true, item: inserted[0] });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  });

  app.put('/api/admin/projects/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await db.update(projects).set({
        title: data.title,
        category: data.category,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        problemStatement: data.problemStatement,
        objectives: data.objectives,
        methodology: data.methodology,
        toolsUsed: data.toolsUsed,
        keyFindings: data.keyFindings,
        businessImpact: data.businessImpact,
        githubLink: data.githubLink,
        liveLink: data.liveLink,
        imageUrl: data.imageUrl,
        featured: data.featured,
        sortOrder: Number(data.sortOrder),
        updatedAt: new Date(),
      }).where(eq(projects.id, id)).returning();

      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  });

  app.delete('/api/admin/projects/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(projects).where(eq(projects.id, id));
      res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  });

  // Admin: Services CRUD
  app.post('/api/admin/services', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      const inserted = await db.insert(services).values({
        title: data.title,
        subtitle: data.subtitle || '',
        description: data.description || '',
        deliverables: data.deliverables || [],
        tools: data.tools || [],
        icon: data.icon || 'BarChart3',
        sortOrder: Number(data.sortOrder) || 0,
      }).returning();
      res.status(201).json({ success: true, item: inserted[0] });
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ error: 'Failed to create service' });
    }
  });

  app.put('/api/admin/services/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await db.update(services).set({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        deliverables: data.deliverables,
        tools: data.tools,
        icon: data.icon,
        sortOrder: Number(data.sortOrder),
        updatedAt: new Date(),
      }).where(eq(services.id, id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  });

  app.delete('/api/admin/services/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(services).where(eq(services.id, id));
      res.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  // Admin: Research Articles CRUD
  app.post('/api/admin/research', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      const inserted = await db.insert(researchArticles).values({
        title: data.title,
        category: data.category || 'Econometrics',
        readTime: data.readTime || '6 min read',
        date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        shortSummary: data.shortSummary || '',
        abstract: data.abstract || '',
        methodology: data.methodology || '',
        dataset: data.dataset || '',
        keyFindings: data.keyFindings || [],
        policyImplications: data.policyImplications || [],
        tags: data.tags || [],
        sortOrder: Number(data.sortOrder) || 0,
      }).returning();
      res.status(201).json({ success: true, item: inserted[0] });
    } catch (error) {
      console.error('Error creating research article:', error);
      res.status(500).json({ error: 'Failed to create article' });
    }
  });

  app.put('/api/admin/research/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await db.update(researchArticles).set({
        title: data.title,
        category: data.category,
        readTime: data.readTime,
        date: data.date,
        shortSummary: data.shortSummary,
        abstract: data.abstract,
        methodology: data.methodology,
        dataset: data.dataset,
        keyFindings: data.keyFindings,
        policyImplications: data.policyImplications,
        tags: data.tags,
        sortOrder: Number(data.sortOrder),
        updatedAt: new Date(),
      }).where(eq(researchArticles.id, id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating research article:', error);
      res.status(500).json({ error: 'Failed to update article' });
    }
  });

  app.delete('/api/admin/research/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(researchArticles).where(eq(researchArticles.id, id));
      res.json({ success: true, message: 'Article deleted successfully' });
    } catch (error) {
      console.error('Error deleting research article:', error);
      res.status(500).json({ error: 'Failed to delete article' });
    }
  });

  // Admin: Skills CRUD
  app.post('/api/admin/skills', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      const inserted = await db.insert(skills).values({
        category: data.category,
        name: data.name,
        level: Number(data.level) || 85,
        experience: data.experience || '3+ Years',
        sortOrder: Number(data.sortOrder) || 0,
      }).returning();
      res.status(201).json({ success: true, item: inserted[0] });
    } catch (error) {
      console.error('Error creating skill:', error);
      res.status(500).json({ error: 'Failed to create skill' });
    }
  });

  app.put('/api/admin/skills/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await db.update(skills).set({
        category: data.category,
        name: data.name,
        level: Number(data.level),
        experience: data.experience,
        sortOrder: Number(data.sortOrder),
        updatedAt: new Date(),
      }).where(eq(skills.id, id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating skill:', error);
      res.status(500).json({ error: 'Failed to update skill' });
    }
  });

  app.delete('/api/admin/skills/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(skills).where(eq(skills.id, id));
      res.json({ success: true, message: 'Skill deleted successfully' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({ error: 'Failed to delete skill' });
    }
  });

  // Admin: Experience CRUD
  app.post('/api/admin/experience', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      const inserted = await db.insert(experience).values({
        role: data.role,
        organization: data.organization,
        location: data.location || 'Nairobi, Kenya',
        period: data.period,
        category: data.category || 'Analytics',
        responsibilities: data.responsibilities || [],
        toolsUsed: data.toolsUsed || [],
        sortOrder: Number(data.sortOrder) || 0,
      }).returning();
      res.status(201).json({ success: true, item: inserted[0] });
    } catch (error) {
      console.error('Error creating experience:', error);
      res.status(500).json({ error: 'Failed to create experience' });
    }
  });

  app.put('/api/admin/experience/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await db.update(experience).set({
        role: data.role,
        organization: data.organization,
        location: data.location,
        period: data.period,
        category: data.category,
        responsibilities: data.responsibilities,
        toolsUsed: data.toolsUsed,
        sortOrder: Number(data.sortOrder),
        updatedAt: new Date(),
      }).where(eq(experience.id, id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating experience:', error);
      res.status(500).json({ error: 'Failed to update experience' });
    }
  });

  app.delete('/api/admin/experience/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(experience).where(eq(experience.id, id));
      res.json({ success: true, message: 'Experience deleted successfully' });
    } catch (error) {
      console.error('Error deleting experience:', error);
      res.status(500).json({ error: 'Failed to delete experience' });
    }
  });

  // Admin: Education CRUD
  app.post('/api/admin/education', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      const inserted = await db.insert(education).values({
        degree: data.degree,
        institution: data.institution,
        location: data.location || 'Nairobi, Kenya',
        period: data.period,
        description: data.description || '',
        coreCourses: data.coreCourses || [],
        sortOrder: Number(data.sortOrder) || 0,
      }).returning();
      res.status(201).json({ success: true, item: inserted[0] });
    } catch (error) {
      console.error('Error creating education:', error);
      res.status(500).json({ error: 'Failed to create education' });
    }
  });

  app.put('/api/admin/education/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await db.update(education).set({
        degree: data.degree,
        institution: data.institution,
        location: data.location,
        period: data.period,
        description: data.description,
        coreCourses: data.coreCourses,
        sortOrder: Number(data.sortOrder),
        updatedAt: new Date(),
      }).where(eq(education.id, id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating education:', error);
      res.status(500).json({ error: 'Failed to update education' });
    }
  });

  app.delete('/api/admin/education/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(education).where(eq(education.id, id));
      res.json({ success: true, message: 'Education deleted successfully' });
    } catch (error) {
      console.error('Error deleting education:', error);
      res.status(500).json({ error: 'Failed to delete education' });
    }
  });

  // Admin: Certifications CRUD
  app.post('/api/admin/certifications', requireAdminAuth, async (req, res) => {
    try {
      const data = req.body;
      const inserted = await db.insert(certifications).values({
        name: data.name,
        issuer: data.issuer,
        year: data.year,
        topics: data.topics || [],
        credentialUrl: data.credentialUrl || '',
        sortOrder: Number(data.sortOrder) || 0,
      }).returning();
      res.status(201).json({ success: true, item: inserted[0] });
    } catch (error) {
      console.error('Error creating certification:', error);
      res.status(500).json({ error: 'Failed to create certification' });
    }
  });

  app.put('/api/admin/certifications/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const updated = await db.update(certifications).set({
        name: data.name,
        issuer: data.issuer,
        year: data.year,
        topics: data.topics,
        credentialUrl: data.credentialUrl,
        sortOrder: Number(data.sortOrder),
        updatedAt: new Date(),
      }).where(eq(certifications.id, id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating certification:', error);
      res.status(500).json({ error: 'Failed to update certification' });
    }
  });

  app.delete('/api/admin/certifications/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(certifications).where(eq(certifications.id, id));
      res.json({ success: true, message: 'Certification deleted successfully' });
    } catch (error) {
      console.error('Error deleting certification:', error);
      res.status(500).json({ error: 'Failed to delete certification' });
    }
  });

  // Admin: Contact Messages List & Actions
  app.get('/api/admin/messages', requireAdminAuth, async (req, res) => {
    try {
      const msgs = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
      res.json(msgs);
    } catch (error) {
      console.error('Error getting messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  app.put('/api/admin/messages/:id/read', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id)).returning();
      res.json({ success: true, item: updated[0] });
    } catch (error) {
      console.error('Error updating message status:', error);
      res.status(500).json({ error: 'Failed to update message' });
    }
  });

  app.delete('/api/admin/messages/:id', requireAdminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await db.delete(contactMessages).where(eq(contactMessages.id, id));
      res.json({ success: true, message: 'Message deleted' });
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ error: 'Failed to delete message' });
    }
  });

  // ==========================================
  // 4. VITE MIDDLEWARE & STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Colliner Phosta Portfolio & Admin Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
