import { env } from "@/env";
import { drizzle } from "drizzle-orm/mysql2";
import { type Pool, createPool } from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn = globalForDb.conn ?? createPool({ uri: env.DATABASE_URL });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema, mode: "default", logger: true });
