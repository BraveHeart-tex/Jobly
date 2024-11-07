import { updateUserAvatarUrlUseCase } from "@/features/user/profile/use-cases/users";
import { cachedValidateRequest } from "@/lib/auth/validateRequest";
import { getUploadThingFileKeyFromUrl, utapi } from "@/server/uploadThing";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  userAvatar: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const { user } = await cachedValidateRequest();

      if (!user) {
        throw new UploadThingError(
          "You must be logged in to upload a profile picture.",
        );
      }

      return { userId: user.id, previousAvatarUrl: user.avatarUrl };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl = file.url;
      const { previousAvatarUrl, userId } = metadata;

      const updateResult = await updateUserAvatarUrlUseCase(userId, fileUrl);

      if (!updateResult) {
        await utapi.deleteFiles(file.key);
        return {
          uploadedBy: userId,
          success: false,
          url: null,
        };
      }

      if (previousAvatarUrl) {
        await utapi.deleteFiles(
          getUploadThingFileKeyFromUrl(previousAvatarUrl),
        );
      }

      return { uploadedBy: userId, success: true, url: file.url };
    }),
  userDocuments: f({
    // Excel
    "application/vnd.ms-excel": { maxFileSize: "1MB" }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "1MB",
    }, // .xlsx

    // Word Documents
    "application/msword": { maxFileSize: "1MB" }, // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "1MB",
    }, // .docx

    "application/vnd.ms-powerpoint": { maxFileSize: "1MB" }, // .ppt, .pps
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      { maxFileSize: "1MB" }, // .pptx
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
      maxFileSize: "1MB",
    },
    "image/bmp": { maxFileSize: "1MB" },
    "image/jpeg": { maxFileSize: "1MB" },
    "image/gif": { maxFileSize: "1MB" },
    "image/png": { maxFileSize: "1MB" },
    "application/pdf": { maxFileSize: "1MB" },
    "text/plain": { maxFileSize: "1MB" },
    "application/rtf": { maxFileSize: "1MB" },
  })
    .middleware(async () => {
      const { user } = await cachedValidateRequest();

      if (!user) {
        throw new UploadThingError(
          "You must be logged in to upload a document.",
        );
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileUrl = file.url;
      const { userId } = metadata;
      return { uploadedBy: userId, success: true, url: fileUrl };
    }),
} satisfies FileRouter;

export type CustomFileRouter = typeof fileRouter;
