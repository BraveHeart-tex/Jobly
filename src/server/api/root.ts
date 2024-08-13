import { authRouter } from "@/server/api/routers/auth";
import { userJobListingRouter } from "@/server/api/routers/job";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { documentRouter } from "./routers/documentRouter";
import { jobTrackerRouter } from "./routers/jobTracker";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  userJobListing: userJobListingRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
});

export const createCaller = createCallerFactory(appRouter);
