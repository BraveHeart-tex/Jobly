import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as documentService from "../services/document.service";
import { z } from "zod";

export const documentRouter = createTRPCRouter({
  getUserDocuments: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return documentService.getUserDocuments(userId);
  }),
  deleteDocument: protectedProcedure
    .input(z.object({ documentId: z.number() }))
    .mutation(async ({ input: { documentId } }) => {
      return documentService.deleteDocument(documentId);
    }),
});
