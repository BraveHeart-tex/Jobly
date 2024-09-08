import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { documentRouter } from "@/features/candidate/documents/api/documentRouter";
import { jobTrackerRouter } from "@/features/candidate/jobTrackerBoard/api/jobTrackerRouter";
import { companyRouter } from "./routers/employer/companyRouter";
import { jobPostingRouter } from "./routers/employer/jobPostingRouter";
import { authRouter } from "./routers/shared/auth";
import { userJobListingRouter } from "@/features/candidate/jobs/api/jobRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  userJobListing: userJobListingRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
  jobPosting: jobPostingRouter,
  company: companyRouter,
});

export const createCaller = createCallerFactory(appRouter);
