import type { CustomFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<CustomFileRouter>();
export const UploadDropzone = generateUploadDropzone<CustomFileRouter>();
