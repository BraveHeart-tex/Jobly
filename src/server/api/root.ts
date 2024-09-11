import { authRouter } from "@/features/auth/api/authRouter";
import { documentRouter } from "@/features/candidate/documents/api/documentRouter";
import { jobTrackerRouter } from "@/features/candidate/jobTrackerBoard/api/jobTrackerRouter";
import { userJobListingRouter } from "@/features/candidate/jobs/api/jobRouter";
import { companyRouter } from "@/features/employer/company/api/companyRouter";
import { jobPostingRouter } from "@/features/employer/jobPosting/api/jobPostingRouter";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  userJobListing: userJobListingRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
  jobPosting: jobPostingRouter,
  company: companyRouter,
});

export const createCaller = createCallerFactory(appRouter);
