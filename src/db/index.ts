import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('DATABASE_URL is not set. Postgres connection will not be configured for Render deployment.');
}

export const pool = new Pool({
  connectionString,
  ssl: connectionString && (connectionString.includes('sslmode=require') || connectionString.includes('render.com'))
    ? { rejectUnauthorized: false }
    : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const db = drizzle(pool, { schema });

