import { env } from "@/env";
import { LOG_COLORS } from "@/lib/constants";
import type { Logger } from "drizzle-orm";

class DbLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    if (env.NODE_ENV !== "development") return;
    console.info(`${LOG_COLORS.RED} QUERY: ${query} ${LOG_COLORS.RESET}`);
    console.info(
      `${LOG_COLORS.YELLOW} PARAMS: ${JSON.stringify(params, null, 2)} ${LOG_COLORS.RESET}`,
    );
  }
}

export const dbLogger = new DbLogger();
