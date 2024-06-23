import { document } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import * as documentService from "../services/document.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
  updateDocument: protectedProcedure
    .input(
      createInsertSchema(document)
        .partial()
        .extend({ id: z.number().min(1) }),
    )
    .mutation(async ({ input }) => {
      return documentService.updateDocument(input);
    }),
});
