import type {
	CompanyInsertModel,
	CompanySelectModel,
} from "@/server/db/schema/companies";
import jobPostings, {
	type JobPostingInsertModel,
} from "@/server/db/schema/jobPostings";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

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
	const now = DateTime.now();
	const twoMonthsFromNow = now.plus({ months: 2 });

	const expiresAt = getRandomDateTime(now, twoMonthsFromNow).toString();

	return companyIds.map((companyId) => ({
		companyId,
		title: faker.person.jobTitle(),
		content: faker.lorem.paragraph(),
		employmentType: faker.helpers.arrayElement(
			jobPostings.employmentType.enumValues,
		),
		workType: faker.helpers.arrayElement(jobPostings.workType.enumValues),
		location: faker.location.city(),
		expiresAt,
	}));
};

const getRandomDateTime = (start: DateTime, end: DateTime) => {
	const startMs = start.toMillis();
	const endMs = end.toMillis();
	const randomMs = startMs + Math.random() * (endMs - startMs);
	return DateTime.fromMillis(randomMs);
};
