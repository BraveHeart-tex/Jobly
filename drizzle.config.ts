import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema",
	dialect: "mysql",
	out: "./migrations",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
} satisfies Config;
