import { company, job } from "@/server/db/schema";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import { createConnection } from "mysql2";

dotenv.config();

const seed = async () => {
  console.log("starting seed");
  const connection = createConnection({
    uri: process.env.DATABASE_URL,
  });

  const db = drizzle(connection);

  await db.transaction(async (trx) => {
    for (let index = 0; index < 50; index++) {
      const [companyResult] = await trx.insert(company).values({
        name: faker.company.name(),
        employeeCount: faker.number.int({ min: 10, max: 10000 }).toString(),
        bio: faker.company.catchPhraseDescriptor(),
        website: faker.internet.url(),
        address: faker.company.catchPhraseDescriptor(),
        foundedYear: faker.number.int({ min: 1900, max: 2024 }).toString(),
      });

      await trx.insert(job).values({
        applicationCount: 0,
        benefits: "Testing, food card, in-house gym, good office",
        companyId: companyResult.insertId,
        title: faker.person.jobTitle(),
        description: faker.person.jobDescriptor(),
        location: faker.location.streetAddress(),
        workType: faker.helpers.arrayElement(job.workType.enumValues),
      });
    }
  });
};

seed()
  .then(() => {
    console.log("seeding done");
    process.exit(1);
  })
  .catch((err) => {
    console.error("seed error", err);
    process.exit(0);
  });
