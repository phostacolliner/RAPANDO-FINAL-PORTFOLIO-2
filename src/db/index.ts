import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const { Pool } = pg;

// Connection pool configuration for Cloud SQL PostgreSQL
export const pool = new Pool({
  host: process.env.SQL_HOST || '/app/cloudsql/climbing-lens-n9v0l:europe-west2:ai-studio-09abf04f',
  user: process.env.SQL_USER || 'ai_studio_app_user',
  password: process.env.SQL_PASSWORD || '',
  database: process.env.SQL_DB_NAME || 'cloud_sql_development_database',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool, { schema });
