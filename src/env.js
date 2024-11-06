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
    GOOGLE_CLIENT_ID: pipe(string(), nonEmpty("GOOGLE_CLIENT_ID is required")),
    GOOGLE_CLIENT_SECRET: pipe(
      string(),
      nonEmpty("GOOGLE_CLIENT_SECRET is required"),
    ),
    GOOGLE_REDIRECT_URI: pipe(
      string(),
      url("GOOGLE_REDIRECT_URI is not a valid URL"),
    ),
  },

  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    SECRET_CRON_KEY: process.env.SECRET_CRON_KEY,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
