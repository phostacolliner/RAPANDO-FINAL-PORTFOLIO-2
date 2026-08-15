import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.SQL_HOST || '/app/cloudsql/climbing-lens-n9v0l:europe-west2:ai-studio-09abf04f',
    user: process.env.SQL_USER || 'ai_studio_app_user',
    password: process.env.SQL_PASSWORD || '',
    database: process.env.SQL_DB_NAME || 'cloud_sql_development_database',
    port: 5432,
    ssl: false,
  },
});
