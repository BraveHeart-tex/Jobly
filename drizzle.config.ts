import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/database/schema.ts",
  dialect: "mysql",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: 3306,
    database: process.env.DATABASE_NAME!,
  },
}) satisfies Config;
