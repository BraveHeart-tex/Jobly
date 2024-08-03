import { faker } from "@faker-js/faker";
import type {
  CompanyInsertModel,
  CompanySelectModel,
} from "@/server/db/schema/companies";
import jobPostings, {
  type JobPostingInsertModel,
} from "@/server/db/schema/jobPostings";

export const makeCompanyDTOs = (amount = 100): CompanyInsertModel[] => {
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

export const makeJobPostingDTOs = (
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
