import { authRouter } from "@/server/api/routers/auth";
import { jobRouter } from "@/server/api/routers/job";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { documentRouter } from "./routers/document";
import { jobTrackerRouter } from "./routers/jobTracker";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  job: jobRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
});

export const createCaller = createCallerFactory(appRouter);
