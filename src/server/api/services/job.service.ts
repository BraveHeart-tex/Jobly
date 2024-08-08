import type { MakeFieldsRequired } from "@/lib/types";
import type { GetJobListingsSchema } from "@/schemas/getJobListingsSchema";
import { db } from "@/server/db";
import {
	companies,
	jobPostings,
	userBookmarksJobPosting,
	userViewsJobPosting,
} from "@/server/db/schema";
import type { JobPostingInsertModel } from "@/server/db/schema/jobPostings";
import { and, desc, eq, getTableColumns, like, or, sql } from "drizzle-orm";
import type { User } from "lucia";
import {
	withBookmarkJoin,
	withUserViewsJobJoin,
} from "../../utils/job.service.utils";

export const getJobListings = async ({
	userId,
	query = "",
	page = 1,
	bookmarked = false,
	viewed = false,
	employmentType,
	workType,
}: GetJobListingsSchema & { userId: User["id"] }) => {
	const limit = 12;
	const skipAmount = (page - 1) * limit;

	const jobDetailsListQuery = db
		.selectDistinct({
			...getTableColumns(jobPostings),
			company: {
				name: companies.name,
				logo: companies.logo,
			},
			userViewedJob: userViewsJobPosting.viewerUserId,
			userBookmarkedJob: userBookmarksJobPosting.userId,
		})
		.from(jobPostings)
		.innerJoin(companies, eq(jobPostings.companyId, companies.id))
		.where(
			and(
				or(
					like(jobPostings.title, `%${query}%`),
					like(companies.name, `%${query}%`),
				),
				workType ? eq(jobPostings.workType, workType) : undefined,
				employmentType
					? eq(jobPostings.employmentType, employmentType)
					: undefined,
			),
		)
		.orderBy(desc(jobPostings.postedAt))
		.limit(limit)
		.offset(skipAmount)
		.$dynamic();

	const jobDetailsListCountQuery = db
		.select({
			count: sql<number>`count(*)`.as("count"),
		})
		.from(jobPostings)
		.innerJoin(companies, eq(jobPostings.companyId, companies.id))
		.where(
			and(
				or(
					like(jobPostings.title, `%${query}%`),
					like(companies.name, `%${query}%`),
				),
				workType ? eq(jobPostings.workType, workType) : undefined,
				employmentType
					? eq(jobPostings.employmentType, employmentType)
					: undefined,
			),
		)
		.$dynamic();

	const [jobDetailsList, jobDetailsListCount] = await Promise.all([
		withBookmarkJoin(
			withUserViewsJobJoin(jobDetailsListQuery, userId, viewed),
			userId,
			bookmarked,
		),
		withBookmarkJoin(
			withUserViewsJobJoin(jobDetailsListCountQuery, userId, viewed),
			userId,
			bookmarked,
		),
	]);

	const totalCount = jobDetailsListCount[0]?.count ?? 0;

	if (jobDetailsList.length === 0) {
		return {
			jobListings: [],
			hasNextPage: false,
			hasPreviousPage: page > 1,
			totalPages: Math.ceil(totalCount / limit),
			currentPage: page,
		};
	}

	return {
		jobListings: jobDetailsList,
		hasNextPage: totalCount > skipAmount + limit,
		hasPreviousPage: page > 1,
		totalPages: Math.ceil(totalCount / limit),
		currentPage: page,
	};
};

export const getJobById = async ({
	jobId,
	userId,
}: {
	jobId: number;
	userId: number;
}) => {
	const jobDetails = await db
		.selectDistinct({
			...getTableColumns(jobPostings),
			company: {
				name: companies.name,
				logo: companies.logo,
			},
			userViewedJob: userViewsJobPosting.viewerUserId,
			userBookmarkedJob: userBookmarksJobPosting.userId,
		})
		.from(jobPostings)
		.innerJoin(companies, eq(jobPostings.companyId, companies.id))
		.leftJoin(
			userViewsJobPosting,
			and(
				eq(jobPostings.id, userViewsJobPosting.viewedJobPostingId),
				eq(userViewsJobPosting.viewerUserId, userId),
			),
		)
		.leftJoin(
			userBookmarksJobPosting,
			and(
				eq(jobPostings.id, userBookmarksJobPosting.jobPostingId),
				eq(userBookmarksJobPosting.userId, userId),
			),
		)
		.where(and(eq(jobPostings.id, jobId)));
	return jobDetails[0];
};

export const updateJob = async (
	data: MakeFieldsRequired<Partial<JobPostingInsertModel>, "id">,
) => {
	return db.update(jobPostings).set(data).where(eq(jobPostings.id, data.id));
};

export const markJobAsViewed = async ({
	jobId,
	userId,
}: {
	jobId: number;
	userId: number;
}) => {
	return db.insert(userViewsJobPosting).values({
		viewedJobPostingId: jobId,
		viewerUserId: userId,
	});
};

export const bookmarkJob = async ({
	jobPostingId,
	userId,
}: {
	jobPostingId: number;
	userId: number;
}) => {
	return db.insert(userBookmarksJobPosting).values({
		jobPostingId,
		userId,
	});
};

export const deleteJobBookmark = async ({
	userId,
	jobPostingId,
}: {
	userId: number;
	jobPostingId: number;
}) => {
	return db
		.delete(userBookmarksJobPosting)
		.where(
			and(
				eq(userBookmarksJobPosting.jobPostingId, jobPostingId),
				eq(userBookmarksJobPosting.userId, userId),
			),
		);
};

export const getBookmarkedJobs = async (userId: number) => {
	return db
		.select({
			// TODO: Get only the needed columns later on instead of spreading
			...getTableColumns(jobPostings),
			bookmarkedAt: userBookmarksJobPosting.bookmarkedAt,
		})
		.from(jobPostings)
		.innerJoin(
			userBookmarksJobPosting,
			eq(jobPostings.id, userBookmarksJobPosting.jobPostingId),
		)
		.where(eq(userBookmarksJobPosting.userId, userId));
};

export const getViewedJobs = async (userId: number) => {
	return db
		.select({
			// TODO: Get only the needed columns later on instead of spreading
			...getTableColumns(jobPostings),
			viewedAt: userViewsJobPosting.viewedAt,
		})
		.from(jobPostings)
		.innerJoin(
			userViewsJobPosting,
			eq(jobPostings.id, userViewsJobPosting.viewedJobPostingId),
		)
		.where(eq(userViewsJobPosting.viewerUserId, userId));
};
