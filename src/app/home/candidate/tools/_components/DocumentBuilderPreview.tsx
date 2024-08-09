"use client";
import { useDocumentBuilderSearchParams } from "@/app/home/candidate/tools/_hooks/useDocumentBuilderSearchParams";
import { cn } from "@/lib/utils";
import DocumentBuilderPreviewContent from "./DocumentBuilderPreviewContent";
import DocumentBuilderPreviewFooter from "./DocumentBuilderPreviewFooter";
import DocumentBuilderPreviewHeader from "./DocumentBuilderPreviewHeader";

const DocumentBuilderPreview = () => {
  const { view } = useDocumentBuilderSearchParams();
  return (
    <div
      className={cn(
        "bg-muted-foreground dark:bg-secondary min-h-screen fixed top-0 right-0 w-1/2",
        view === "preview" && "w-full xl:w-1/2",
        view === "builder" && "hidden xl:block",
      )}
    >
      <div className="h-[90vh] w-[90%] xl:w-[66%] mx-auto pt-4">
        <DocumentBuilderPreviewHeader />
        <DocumentBuilderPreviewContent />
        <DocumentBuilderPreviewFooter />
      </div>
    </div>
  );
};
export default DocumentBuilderPreview;
