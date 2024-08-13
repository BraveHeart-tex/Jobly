import { userJobListingRouter } from "@/server/api/routers/employee/job";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { documentRouter } from "./routers/employee/documentRouter";
import { jobTrackerRouter } from "./routers/employee/jobTracker";
import { authRouter } from "./routers/shared/auth";
import { jobPostingRouter } from "./routers/employer/jobPostingRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  userJobListing: userJobListingRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
  jobPosting: jobPostingRouter,
});

export const createCaller = createCallerFactory(appRouter);
