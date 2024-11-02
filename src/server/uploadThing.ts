import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();

export const getUploadThingFileKeyFromUrl = (url: string) => {
  return url.split("/").pop() || "";
};

export const deleteFilesFromStorage = async (url: string) => {
  await utapi.deleteFiles(getUploadThingFileKeyFromUrl(url));
};
