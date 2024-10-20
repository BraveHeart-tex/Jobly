// @ts-check
import { createNextjsEnv } from "@nurliman/env-valibot";
import { pipe, string, nonEmpty, url, optional, picklist } from "valibot";

export const env = createNextjsEnv({
  server: {
    DATABASE_URL: pipe(
      string(),
      nonEmpty("DATABASE_URL is required"),
      url("DATABASE_URL is not a valid URL"),
    ),
    NODE_ENV: optional(
      picklist(["development", "test", "production"]),
      "development",
    ),
    UPLOADTHING_SECRET: pipe(
      string(),
      nonEmpty("UPLOADTHING_SECRET is required"),
    ),
    UPLOADTHING_APP_ID: pipe(
      string(),
      nonEmpty("UPLOADTHING_APP_ID is required"),
    ),
    SECRET_CRON_KEY: pipe(string(), nonEmpty("SECRET_CRON_KEY is required")),
    ENCRYPTION_KEY: pipe(string(), nonEmpty("ENCRYPTION_KEY is required")),
  },

  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    SECRET_CRON_KEY: process.env.SECRET_CRON_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
