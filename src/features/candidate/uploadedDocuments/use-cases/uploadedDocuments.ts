"use server";
import { insertDocument } from "@/features/candidate/documents/data-access/documentRepository";
import { validateRequest } from "@/lib/auth/validateRequest";
import { mimeTypeToExtension } from "@/lib/constants";
import { utapi } from "@/server/uploadThing";
import { uploadDocumentFormValidator } from "@/schemas/user/document/uploadedDocuments/uploadDocumentFormValidator";
import { TRPCError } from "@trpc/server";
import { safeParse } from "valibot";

export const uploadDocumentUseCase = async (formData: FormData) => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("You must be logged in to upload a document");
  }

  const validatedData = safeParse(
    uploadDocumentFormValidator,
    Object.fromEntries(formData.entries()),
  );

  if (!validatedData?.success) {
    throw new Error("Invalid document data. Please try again.");
  }

  const [result] = await utapi.uploadFiles([validatedData.output.file]);

  if (!result) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload document",
    });
  }

  const url = result.data?.url;

  if (!url) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to upload document",
    });
  }

  return await insertDocument({
    source: "upload",
    title: validatedData.output.title,
    type: validatedData.output.type,
    url,
    userId: user.id,
    fileExtension:
      mimeTypeToExtension[
        validatedData.output.file.type as keyof typeof mimeTypeToExtension
      ],
  });
};
