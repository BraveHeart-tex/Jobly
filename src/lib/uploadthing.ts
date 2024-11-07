import type { CustomFileRouter } from "@/app/api/uploadthing/core";
import {
  FileExcel,
  FilePdf,
  FilePowerpoint,
  FileRich,
  FileWord,
} from "@/components/icons/FileExtensionIcons";
import { generateReactHelpers } from "@uploadthing/react";
import { FileImage, FileText } from "lucide-react";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<CustomFileRouter>();

export const mimeTypeToExtension = {
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
} as const;

export const mimeTypeToIcon = {
  "application/vnd.ms-excel": FileExcel,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    FileExcel,
  "application/msword": FileWord,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    FileWord,
  "application/vnd.ms-powerpoint": FilePowerpoint,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    FilePowerpoint,
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
    FilePowerpoint,
  "image/bmp": FileImage,
  "image/jpeg": FileImage,
  "image/gif": FileImage,
  "image/png": FileImage,
  "application/pdf": FilePdf,
  "text/plain": FileText,
  "application/rtf": FileRich,
};
