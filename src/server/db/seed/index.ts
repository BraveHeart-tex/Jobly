import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import companies, {
  type CompanyInsertModel,
  type CompanySelectModel,
} from "@/server/db/schema/companies";
import jobPostings, {
  type JobPostingInsertModel,
} from "@/server/db/schema/jobPostings";

const connection = createPool({ uri: process.env.DATABASE_URL });
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

const createJobPostings = async (jobInsertModels: JobPostingInsertModel[]) => {
  const result = await db
    .insert(jobPostings)
    .values(jobInsertModels)
    .$returningId();
  return result.map((item) => item.id);
};

const makeCompanyDTOs = (amount = 100): CompanyInsertModel[] => {
  return Array.from({ length: amount }).map(() => ({
    name: faker.company.name(),
    foundedYear: faker.date.past().getFullYear().toString(),
    address: faker.location.streetAddress(),
    bio: faker.lorem.paragraph(),
    description: faker.lorem.paragraph(),
    employeeCount: faker.helpers.arrayElement(["1-10", "11-50", "51-100"]),
    industry: faker.helpers.arrayElement([
      "Education",
      "Government",
      "Healthcare",
      "Manufacturing",
      "Retail",
      "Technology",
      "Other",
    ]),
  }));
};

const makeJobPostingDTOs = (
  companyIds: CompanySelectModel["id"][],
): JobPostingInsertModel[] => {
  return companyIds.map((companyId) => ({
    companyId,
    title: faker.person.jobTitle(),
    content: faker.lorem.paragraph(),
    employmentType: faker.helpers.arrayElement(
      jobPostings.employmentType.enumValues,
    ),
    workType: faker.helpers.arrayElement(jobPostings.workType.enumValues),
    location: faker.location.city(),
  }));
};

seed();
