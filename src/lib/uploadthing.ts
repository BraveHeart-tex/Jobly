import type { CustomFileRouter } from "@/app/api/uploadthing/core";
import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<CustomFileRouter>();
export const UploadDropzone = generateUploadDropzone<CustomFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<CustomFileRouter>();
