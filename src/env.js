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
    UPLOADTHING_TOKEN: pipe(
      string(),
      nonEmpty("UPLOADTHING_TOKEN is required"),
    ),
    SECRET_CRON_KEY: pipe(string(), nonEmpty("SECRET_CRON_KEY is required")),
    ENCRYPTION_KEY: pipe(string(), nonEmpty("ENCRYPTION_KEY is required")),
  },

  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_CRON_KEY: process.env.SECRET_CRON_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
