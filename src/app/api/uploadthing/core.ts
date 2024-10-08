import { validateRequest } from "@/lib/auth/validateRequest";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.info("Upload complete for userId:", metadata.userId);

      console.info("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type CustomFileRouter = typeof fileRouter;
