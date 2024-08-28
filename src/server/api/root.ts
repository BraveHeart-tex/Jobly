import { userJobListingRouter } from "@/server/api/routers/employee/job";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { documentRouter } from "./routers/employee/documentRouter";
import { jobTrackerRouter } from "./routers/employee/jobTracker";
import { jobPostingRouter } from "./routers/employer/jobPostingRouter";
import { authRouter } from "./routers/shared/auth";
import { companyRouter } from "./routers/employer/companyRouter";

// todo: refactor these under namespaces for employee, candidate
export const appRouter = createTRPCRouter({
  auth: authRouter,
  userJobListing: userJobListingRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
  jobPosting: jobPostingRouter,
  company: companyRouter,
});

export const createCaller = createCallerFactory(appRouter);
