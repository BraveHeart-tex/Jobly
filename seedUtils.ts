import { company, document, job } from "@/server/db/schema";
import { faker } from "@faker-js/faker";
import type { Trx } from "seed";

const TEST_USER_ID = 7 as const;

export const insertCompaniesWithJobsPostings = async (trx: Trx) => {
  const [companyResult] = await trx.insert(company).values({
    name: faker.company.name(),
    employeeCount: faker.number.int({ min: 10, max: 10000 }).toString(),
    bio: faker.company.catchPhraseDescriptor(),
    website: faker.internet.url(),
    address: faker.company.catchPhraseDescriptor(),
    foundedYear: faker.number.int({ min: 1900, max: 2024 }).toString(),
  });

  await trx.insert(job).values({
    benefits: "Testing, food card, in-house gym, good office",
    companyId: companyResult.insertId,
    title: faker.person.jobTitle(),
    content: faker.person.jobDescriptor(),
    location: faker.location.streetAddress(),
    workType: faker.helpers.arrayElement(job.workType.enumValues),
  });
};

export const insertResume = (trx: Trx) => {
  return trx.insert(document).values({
    language: "TR",
    title: faker.person.jobTitle(),
    userId: TEST_USER_ID,
    type: "resume",
  });
};

export const insertCoverLetter = (trx: Trx) => {
  return trx.insert(document).values({
    language: "TR",
    title: faker.person.jobTitle(),
    userId: TEST_USER_ID,
    type: "cover_letter",
  });
};
