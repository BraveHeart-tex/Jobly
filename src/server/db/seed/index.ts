import { env } from "@/env";
import companies, {
  type CompanyInsertModel,
} from "@/server/db/schema/companies";
import jobPostings, {
  type JobPostingInsertModel,
} from "@/server/db/schema/jobPostings";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import { makeCompanyDTOs, makeJobPostingDTOs } from "./seedUtils";

const connection = createPool({ uri: env.DATABASE_URL });
const db = drizzle(connection);

const seed = async () => {
  console.info("Seeding database...");
  try {
    const companyDTOs = makeCompanyDTOs(100);
    const companyIds = await createCompanies(companyDTOs);

    const jobPostingsDTOs = makeJobPostingDTOs(companyIds);
    const jobPostings = await createJobPostings(jobPostingsDTOs);

    console.info(`Created ${companyIds.length} companies.`);
    console.info(`Created ${jobPostings.length} job postings.`);
  } catch (error) {
    console.error("Seed error", error);
  } finally {
    console.info("Finished seeding database");
    connection.end();
  }
};

const createCompanies = async (companyInsertModels: CompanyInsertModel[]) => {
  const result = await db
    .insert(companies)
    .values(companyInsertModels)
    .$returningId();
  return result.map((item) => item.id);
};

const createJobPostings = async (
  jobPostingInsertModels: JobPostingInsertModel[],
) => {
  const result = await db
    .insert(jobPostings)
    .values(jobPostingInsertModels)
    .$returningId();
  return result.map((item) => item.id);
};

seed();
