"use client";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Loader2, Upload } from "lucide-react";
import type { ReactNode } from "react";
import { buttonVariants } from "../ui/button";

const MyDocumentsTabs = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
          Uploaded Documents
        </h1>
        <UploadButton
          endpoint="imageUploader"
          className="ut-button:bg-primary ut-button:w-max ut-allowed-content:hidden ut-button:ut-uploading:bg-primary"
          content={{
            button({ isUploading }) {
              const UploadButtonContainer = ({
                children,
              }: { children: ReactNode }) => {
                return (
                  <div
                    className={cn(
                      "flex items-center gap-2 mt-0 z-10",
                      buttonVariants({ variant: "default" }),
                    )}
                  >
                    {children}
                  </div>
                );
              };

              if (isUploading) {
                return (
                  <UploadButtonContainer>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="hidden md:inline">Uploading...</span>
                  </UploadButtonContainer>
                );
              }

              return (
                <UploadButtonContainer>
                  <Upload size={18} />
                  <span className="hidden md:inline">Upload</span>
                </UploadButtonContainer>
              );
            },
            allowedContent({ isUploading }) {
              if (isUploading) return "Uploading...";
            },
          }}
        />
      </div>
    </div>
  );
};
export default MyDocumentsTabs;
