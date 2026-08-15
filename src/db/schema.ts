import { pgTable, serial, text, varchar, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 255 }).notNull().default('Colliner Phosta'),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const profileInfo = pgTable('profile_info', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull().default('Colliner Phosta'),
  title: text('title').notNull().default('Data Analyst | Economist | Researcher | Business Intelligence Professional'),
  tagline: text('tagline').notNull().default('Turning Data Into Decisions, Insights Into Strategy.'),
  avatarUrl: text('avatar_url'),
  bio: text('bio').notNull(),
  aboutExtended: text('about_extended').notNull(),
  phone: varchar('phone', { length: 50 }).notNull().default('0722450893'),
  email: varchar('email', { length: 255 }).notNull().default('phostacolliner@gmail.com'),
  location: varchar('location', { length: 255 }).notNull().default('Nairobi, Kenya'),
  linkedin: text('linkedin').notNull().default('https://linkedin.com/in/colliner-phosta'),
  github: text('github').notNull().default('https://github.com/phostacolliner'),
  twitter: text('twitter').default('https://twitter.com'),
  kpiProjectsCount: integer('kpi_projects_count').notNull().default(10),
  kpiYearsExp: integer('kpi_years_exp').notNull().default(5),
  kpiSatisfaction: integer('kpi_satisfaction').notNull().default(100),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  shortDescription: text('short_description').notNull(),
  fullDescription: text('full_description').notNull(),
  problemStatement: text('problem_statement').notNull(),
  objectives: jsonb('objectives').$type<string[]>().notNull().default([]),
  methodology: text('methodology').notNull(),
  toolsUsed: jsonb('tools_used').$type<string[]>().notNull().default([]),
  keyFindings: jsonb('key_findings').$type<string[]>().notNull().default([]),
  businessImpact: text('business_impact').notNull(),
  githubLink: text('github_link'),
  liveLink: text('live_link'),
  imageUrl: text('image_url'),
  featured: boolean('featured').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }).notNull(),
  description: text('description').notNull(),
  deliverables: jsonb('deliverables').$type<string[]>().notNull().default([]),
  tools: jsonb('tools').$type<string[]>().notNull().default([]),
  icon: varchar('icon', { length: 100 }).notNull().default('BarChart3'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const researchArticles = pgTable('research_articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 300 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  readTime: varchar('read_time', { length: 50 }).notNull().default('6 min read'),
  date: varchar('date', { length: 50 }).notNull(),
  shortSummary: text('short_summary').notNull(),
  abstract: text('abstract').notNull(),
  methodology: text('methodology').notNull(),
  dataset: text('dataset').notNull(),
  keyFindings: jsonb('key_findings').$type<string[]>().notNull().default([]),
  policyImplications: jsonb('policy_implications').$type<string[]>().notNull().default([]),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  level: integer('level').notNull().default(85),
  experience: varchar('experience', { length: 100 }).notNull().default('3+ Years'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const experience = pgTable('experience', {
  id: serial('id').primaryKey(),
  role: varchar('role', { length: 255 }).notNull(),
  organization: varchar('organization', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull().default('Nairobi, Kenya'),
  period: varchar('period', { length: 100 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  responsibilities: jsonb('responsibilities').$type<string[]>().notNull().default([]),
  toolsUsed: jsonb('tools_used').$type<string[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const education = pgTable('education', {
  id: serial('id').primaryKey(),
  degree: varchar('degree', { length: 255 }).notNull(),
  institution: varchar('institution', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  period: varchar('period', { length: 100 }).notNull(),
  description: text('description').notNull(),
  coreCourses: jsonb('core_courses').$type<string[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const certifications = pgTable('certifications', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  issuer: varchar('issuer', { length: 255 }).notNull(),
  year: varchar('year', { length: 50 }).notNull(),
  topics: jsonb('topics').$type<string[]>().notNull().default([]),
  credentialUrl: text('credential_url'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
