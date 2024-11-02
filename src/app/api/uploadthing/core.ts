import { updateUserAvatarUrlUseCase } from "@/features/user/profile/use-cases/users";
import { unCachedValidateRequest } from "@/lib/auth/validateRequest";
import { getUploadThingFileKeyFromUrl, utapi } from "@/server/uploadThing";

import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  userAvatar: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const { user } = await unCachedValidateRequest();

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
} satisfies FileRouter;

export type CustomFileRouter = typeof fileRouter;
