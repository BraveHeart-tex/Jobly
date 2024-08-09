import { useDocumentBuilderSearchParams } from "@/app/home/candidate/tools/_hooks/useDocumentBuilderSearchParams";
import { Button } from "@/components/ui/button";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { usePDFViewerStore } from "@/lib/stores/usePDFViewerStore";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const DocumentBuilderPreviewHeader = () => {
  const { view, setView } = useDocumentBuilderSearchParams();
  const documentTitle = useDocumentBuilderStore(
    (state) => state.document.title,
  );
  const previousRenderValue = usePDFViewerStore(
    (state) => state.previousRenderValue,
  );

  const downloadPDF = () => {
    const fileName = `${documentTitle}.pdf`;
    if (!previousRenderValue) return;

    const link = document.createElement("a");
    link.href = previousRenderValue;
    link.download = fileName;
    link.click();
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between xl:justify-end mb-2",
      )}
    >
      <Button
        className={cn(
          "xl:hidden text-muted dark:text-secondary-foreground",
          view === "preview" && "flex xl:hidden",
        )}
        variant="ghost"
        onClick={() => {
          setView("builder");
        }}
      >
        <ArrowLeft />
      </Button>
      <Button
        className="self-end"
        disabled={!previousRenderValue}
        onClick={downloadPDF}
      >
        Download PDF
      </Button>
    </div>
  );
};
export default DocumentBuilderPreviewHeader;
