import { env } from "@/env";
import { type SQL, getTableColumns, sql } from "drizzle-orm";
import type { MySqlTable } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/mysql2";
import { type Pool, createPool } from "mysql2/promise";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn = globalForDb.conn ?? createPool({ uri: env.DATABASE_URL });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema, mode: "default", logger: false });

export const buildConflictUpdateColumns = <
  T extends MySqlTable,
  Q extends keyof T["_"]["columns"],
>(
  table: T,
  excludedColumns: Q[],
) => {
  const cls = getTableColumns(table);
  return Object.keys(cls).reduce(
    (acc, column) => {
      if (!excludedColumns.includes(column as Q)) {
        acc[column] = sql`values(${cls[column]})`;
      }
      return acc;
    },
    {} as Record<string, SQL>,
  );
};
