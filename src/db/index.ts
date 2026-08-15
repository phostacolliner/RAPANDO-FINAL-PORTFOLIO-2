import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Add your Render Postgres connection URL to the environment variables.');
}

const poolConfig = {
  connectionString,
  ssl:
    connectionString.includes('sslmode=require') || connectionString.includes('render.com')
      ? { rejectUnauthorized: false }
      : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
};

export const pool = new Pool(poolConfig);
export const db = drizzle(pool, { schema });

