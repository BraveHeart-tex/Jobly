import * as documentService from "@/features/candidate/documents/services/documentService";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  documentInsertValidator,
  documentUpdateValidator,
} from "@/validation/user/document/baseDocumentValidator";
import { documentSectionInsertValidator } from "@/validation/user/document/documentSectionValidators";
import { saveDocumentDetailsValidator } from "@/validation/user/document/saveDocumentDetailsValidator";
import { DocumentSectionFieldInsertValidator } from "@/validation/user/document/sectionFieldValidators";
import {
  array,
  minValue,
  number,
  object,
  parser,
  pipe,
  partial,
} from "valibot";

export const documentRouter = createTRPCRouter({
  createDocumentAndRelatedEntities: protectedProcedure
    .input(parser(partial(documentInsertValidator, ["userId"])))
    .mutation(async ({ input, ctx }) => {
      return documentService.createDocumentAndRelatedEntities({
        ...input,
        userId: ctx.user.id,
      });
    }),
  getDocumentDetails: protectedProcedure
    .input(
      parser(
        object({
          id: pipe(number(), minValue(1, "Please provide valid document id.")),
        }),
      ),
    )
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
    .input(parser(documentUpdateValidator))
    .mutation(async ({ input }) => {
      return documentService.updateDocument(input);
    }),
  deleteDocument: protectedProcedure
    .input(
      parser(
        object({
          documentId: pipe(
            number(),
            minValue(1, "Please provide valid document id."),
          ),
        }),
      ),
    )
    .mutation(async ({ ctx, input: { documentId } }) => {
      const userId = ctx.user.id;
      return documentService.deleteDocument({
        documentId,
        userId,
      });
    }),
  saveDocumentAndRelatedEntities: protectedProcedure
    .input(parser(saveDocumentDetailsValidator))
    .mutation(async ({ input }) => {
      return documentService.saveDocumentAndRelatedEntities(input);
    }),
  addFieldsWithValues: protectedProcedure
    .input(
      parser(
        object({
          fields: array(DocumentSectionFieldInsertValidator),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      return documentService.addFieldsWithValues(input.fields);
    }),
  removeFields: protectedProcedure
    .input(
      parser(
        object({
          fieldIds: array(number()),
        }),
      ),
    )
    .mutation(async ({ input }) => {
      return documentService.removeFields(input.fieldIds);
    }),
  addSectionByInternalTag: protectedProcedure
    .input(parser(documentSectionInsertValidator))
    .mutation(async ({ input }) => {
      return documentService.addSectionByInternalTag(input);
    }),
  deleteSection: protectedProcedure
    .input(
      parser(
        object({
          sectionId: pipe(
            number(),
            minValue(1, "Please provide a valid section id"),
          ),
        }),
      ),
    )
    .mutation(async ({ input: { sectionId } }) => {
      return documentService.deleteSection(sectionId);
    }),
});
