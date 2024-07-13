import { saveDocumentDetailsSchema } from "@/schemas/saveDocumentDetailsSchema";
import { document, field, section } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import * as documentService from "../services/document.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const documentRouter = createTRPCRouter({
  createDocument: protectedProcedure
    .input(
      createInsertSchema(document).omit({
        userId: true,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return documentService.createDocument(
        {
          ...input,
          userId: ctx.user.id,
        },
        ctx.user,
      );
    }),
  getDocumentDetails: protectedProcedure
    .input(createInsertSchema(document).required().pick({ id: true }))
    .query(async ({ input, ctx }) => {
      return documentService.getDocumentDetails({
        id: input.id,
        userId: ctx.session.userId,
      });
    }),
  getUserDocuments: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return documentService.getUserDocuments(userId);
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
  deleteDocument: protectedProcedure
    .input(z.object({ documentId: z.number() }))
    .mutation(async ({ input: { documentId } }) => {
      return documentService.deleteDocument(documentId);
    }),
  saveDocumentDetails: protectedProcedure
    .input(saveDocumentDetailsSchema.partial())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return documentService.saveDocumentDetails({
        ...input,
        userId,
      });
    }),
  addFieldsWithValues: protectedProcedure
    .input(
      z.object({
        fields: z.array(createInsertSchema(field)),
      }),
    )
    .mutation(async ({ input }) => {
      return documentService.addFieldsWithValues(input.fields);
    }),
  removeFields: protectedProcedure
    .input(
      z.object({
        fieldIds: z.array(z.number().min(1)),
      }),
    )
    .mutation(async ({ input }) => {
      return documentService.removeFields(input.fieldIds);
    }),
  addSectionByInternalTag: protectedProcedure
    .input(createInsertSchema(section))
    .mutation(async ({ input }) => {
      return documentService.addSectionByInternalTag(input);
    }),
  deleteSection: protectedProcedure
    .input(z.object({ sectionId: z.number() }))
    .mutation(async ({ input: { sectionId } }) => {
      return documentService.deleteSection(sectionId);
    }),
});
