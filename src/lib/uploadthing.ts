import type { CustomFileRouter } from "@/app/api/uploadthing/core";
import {
  generateReactHelpers,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadDropzone = generateUploadDropzone<CustomFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<CustomFileRouter>();

export const mimeTypeToExtension: { [key: string]: string } = {
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
    "pps",
  "image/bmp": "bmp",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png",
  "application/pdf": "pdf",
  "text/plain": "txt",
  "application/rtf": "rtf",
};
