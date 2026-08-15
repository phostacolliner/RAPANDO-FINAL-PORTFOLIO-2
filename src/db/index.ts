import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const poolConfig = connectionString
  ? {
      connectionString,
      ssl: connectionString.includes('sslmode=require') || connectionString.includes('render.com')
        ? { rejectUnauthorized: false }
        : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
    }
  : {
      host: 'dpg-da0dtv8u01pc738uod3g-a.oregon-postgres.render.com',
      port: 5432,
      user: 'collinerportfolio_user',
      password: 'mdlByLnQIYb3muw5CYbO0sfcncgLx1ae',
      database: 'collinerportfolio',
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
    };

export const pool = new Pool(poolConfig);
export const db = drizzle(pool, { schema });
