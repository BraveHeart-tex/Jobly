"use server";
import prisma from "@/app/libs/prismadb";
import { faker } from "@faker-js/faker/locale/en_US";
import { ApplicationStatus, JobType } from "@prisma/client";

export async function seedData() {
  const applicationStatus = ["PENDING", "REJECTED", "INTERVIEW", "OFFER"];

  const jobTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "VOLUNTEER", "INTERNSHIP"];

  await prisma.salaryEstimationDataset.deleteMany({});
  await prisma.jobApplication.deleteMany({});

  Array.from({ length: 250 }).forEach(async () => {
    await prisma.salaryEstimationDataset.create({
      data: {
        jobTitle: faker.person.jobTitle(),
        location: faker.location.city(),
        // yearly estimate
        salary_estimate: faker.number.int({ min: 30000, max: 500000 }),
      },
    });

    await prisma.jobApplication.create({
      data: {
        applicationStatus: applicationStatus[faker.number.int({ min: 0, max: 4 })] as ApplicationStatus,
        companyName: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        jobType: jobTypes[faker.number.int({ min: 0, max: 6 })] as JobType,
        location: faker.location.city(),
        userId: 1,
      },
    });
  });
}
