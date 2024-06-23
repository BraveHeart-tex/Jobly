import dotenv from "dotenv";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { MySqlTransaction } from "drizzle-orm/mysql-core";
import {
  type MySql2PreparedQueryHKT,
  type MySql2QueryResultHKT,
  drizzle,
} from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";
import { insertCoverLetter, insertResume } from "seedUtils";

dotenv.config();

export type Trx = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;

const seed = async () => {
  console.info("starting seed");
  const connection = createConnection({
    uri: process.env.DATABASE_URL,
  });

  const db = drizzle(connection);

  await db.transaction(async (trx) => {
    for (let index = 0; index < 50; index++) {
      // await insertCompaniesWithJobsPostings(trx);
      await insertResume(trx);
      await insertCoverLetter(trx);
    }
  });
};

seed()
  .then(() => {
    console.info("seeding done");
    process.exit(1);
  })
  .catch((err) => {
    console.error("seed error", err);
    process.exit(0);
  });
