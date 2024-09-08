import { userJobListingRouter } from "@/server/api/routers/employee/job";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { documentRouter } from "../../features/candidate/documents/api/documentRouter";
import { jobTrackerRouter } from "./routers/employee/jobTracker";
import { companyRouter } from "./routers/employer/companyRouter";
import { jobPostingRouter } from "./routers/employer/jobPostingRouter";
import { authRouter } from "./routers/shared/auth";

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
