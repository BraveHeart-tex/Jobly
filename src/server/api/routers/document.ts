import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as documentService from "../services/document.service";

export const documentRouter = createTRPCRouter({
  getUserDocuments: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return documentService.getUserDocuments(userId);
  }),
});
