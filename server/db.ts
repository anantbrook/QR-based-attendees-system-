import { drizzle } from 'drizzle-orm/neon-serverless';
import pkg from '@neondatabase/serverless';
const { Pool, neonConfig } = pkg;
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("Database connection configuration is missing. Please ensure the database is properly provisioned.");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
