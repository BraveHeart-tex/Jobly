import type { MakeFieldsRequired } from "@/lib/types";
import type { JobPostingInsertModel } from "@/server/db/schema/jobPostings";
import type { User } from "lucia";
import { jobRepository } from "../repositories/jobRepository";
import type { GetJobListingsOutput } from "@/validators/getJobListingsSchema";

export const jobService = {
  async getJobById({
    jobId,
    userId,
  }: {
    jobId: number;
    userId: number;
  }) {
    return await jobRepository.getJobById({ jobId, userId });
  },
  async getViewedJobs(userId: number) {
    return await jobRepository.getViewedJobs(userId);
  },
  async getBookmarkedJobs(userId: number) {
    return await jobRepository.getBookmarkedJobs(userId);
  },

  async updateJob(
    data: MakeFieldsRequired<Partial<JobPostingInsertModel>, "id">,
  ) {
    return await jobRepository.updateJob(data);
  },

  async markJobAsViewed({
    jobId,
    userId,
  }: {
    jobId: number;
    userId: number;
  }) {
    return await jobRepository.markJobAsViewed({ jobId, userId });
  },

  async bookmarkJob({
    jobPostingId,
    userId,
  }: {
    jobPostingId: number;
    userId: number;
  }) {
    return await jobRepository.bookmarkJob({ jobPostingId, userId });
  },

  async deleteJobBookmark({
    userId,
    jobPostingId,
  }: {
    userId: number;
    jobPostingId: number;
  }) {
    return await jobRepository.deleteJobBookmark({ userId, jobPostingId });
  },
  async getJobListings({
    userId,
    query = "",
    page = 1,
    bookmarked = false,
    viewed = false,
    employmentType,
    workType,
  }: GetJobListingsOutput & { userId: User["id"] }) {
    const limit = 12;
    const skipAmount = (page - 1) * limit;

    const [jobDetailsList, jobDetailsListCount] = await Promise.all([
      jobRepository.getJobDetailsList({
        query,
        workType,
        employmentType,
        userId,
        bookmarked,
        viewed,
        limit,
        skipAmount,
      }),
      jobRepository.getJobDetailsCount({
        query,
        workType,
        employmentType,
        userId,
        bookmarked,
        viewed,
      }),
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
  },
};
