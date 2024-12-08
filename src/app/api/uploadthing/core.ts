import { updateUserAvatarUrlUseCase } from "@/features/user/profile/use-cases/users";
import { validateRequest } from "@/lib/auth/validateRequest";
import { getUploadThingFileKeyFromUrl, utapi } from "@/server/uploadThing";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  userAvatar: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

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
    "application/vnd.ms-excel": { maxFileSize: "4MB" }, // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "4MB",
    }, // .xlsx

    // Word Documents
    "application/msword": { maxFileSize: "4MB" }, // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
    }, // .docx

    "application/vnd.ms-powerpoint": { maxFileSize: "4MB" }, // .ppt, .pps
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      { maxFileSize: "4MB" }, // .pptx
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
      maxFileSize: "4MB",
    },
    "image/bmp": { maxFileSize: "4MB" },
    "image/jpeg": { maxFileSize: "4MB" },
    "image/gif": { maxFileSize: "4MB" },
    "image/png": { maxFileSize: "4MB" },
    "application/pdf": { maxFileSize: "4MB" },
    "text/plain": { maxFileSize: "4MB" },
    "application/rtf": { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

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
