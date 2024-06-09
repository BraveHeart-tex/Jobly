import { authRouter } from "@/server/api/routers/auth";
import { jobRouter } from "@/server/api/routers/job";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  job: jobRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
