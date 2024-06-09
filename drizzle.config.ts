import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
