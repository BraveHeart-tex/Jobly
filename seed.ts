import { company, job } from "@/data-access/database/schema";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

dotenv.config();

// @ts-ignore
const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
});

const db = drizzle(connection);

const seed = async () => {
  try {
    for (let i = 0; i < 50; i++) {
      const [{ insertId: companyId }] = await db.insert(company).values({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        industry: faker.company.buzzPhrase(),
        location: faker.location.city(),
        website: faker.internet.url(),
      });

      console.log(`Company with id: ${companyId} created.`);
      await db.insert(job).values({
        title: faker.person.jobTitle(),
        description: faker.lorem.paragraph(),
        location: faker.location.city(),
        employmentType: faker.person.jobType(),
        salaryRange: faker.finance.amount(),
        companyId,
      });
    }
  } catch (error) {
    console.error("seed error", error);
    process.exit(1);
  }
};

seed().then(() => {
  console.log("seed completed");
  process.exit(0);
});
