import { LOG_COLORS } from "@/lib/utils";
import type { Logger } from "drizzle-orm";

class DbLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.info(`${LOG_COLORS.RED} QUERY: ${query} ${LOG_COLORS.RESET}`);
    console.info(
      `${LOG_COLORS.YELLOW} PARAMS: ${JSON.stringify(params, null, 2)} ${LOG_COLORS.RESET}`,
    );
  }
}

export const dbLogger = new DbLogger();
