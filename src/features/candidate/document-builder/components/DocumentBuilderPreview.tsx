"use client";
import DocumentBuilderPreviewContent from "@/features/candidate/document-builder/components/DocumentBuilderPreviewContent";
import DocumentBuilderPreviewFooter from "@/features/candidate/document-builder/components/DocumentBuilderPreviewFooter";
import DocumentBuilderPreviewHeader from "@/features/candidate/document-builder/components/DocumentBuilderPreviewHeader";
import { useDocumentBuilderSearchParams } from "@/features/candidate/document-builder/hooks/useDocumentBuilderSearchParams";
import { cn } from "@/lib/utils";

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
