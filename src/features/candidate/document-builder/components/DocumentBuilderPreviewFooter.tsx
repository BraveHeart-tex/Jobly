import { Button } from "@/components/ui/button";
import DebouncedDocumentSaver from "@/features/candidate/document-builder/components/DebouncedDocumentSaver";
import { usePDFViewerStore } from "@/lib/stores/usePDFViewerStore";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const DocumentBuilderPreviewFooter = () => {
  const currentPage = usePDFViewerStore((state) => state.currentPage);
  const setCurrentPage = usePDFViewerStore((state) => state.setCurrentPage);
  const numberOfPages = usePDFViewerStore((state) => state.numberOfPages);

  return (
    <div className="w-full flex items-center justify-between mt-2">
      <DebouncedDocumentSaver />
      <div className="flex items-center gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          size="icon"
          variant="ghost"
          className="hover:bg-secondary text-muted rounded-full size-[30px] dark:bg-muted-foreground"
        >
          <ChevronLeftIcon size={24} />
        </Button>
        <span className="text-xs text-muted dark:text-muted-foreground tabular-nums">
          {currentPage} of {numberOfPages}
        </span>
        <Button
          disabled={currentPage === numberOfPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          size="icon"
          variant="ghost"
          className="hover:bg-secondary text-muted rounded-full size-[30px] dark:bg-muted-foreground"
        >
          <ChevronRightIcon size={24} />
        </Button>
      </div>
      <p className="text-xs text-muted dark:text-muted-foreground">
        Automatically saved
      </p>
    </div>
  );
};

export default DocumentBuilderPreviewFooter;
