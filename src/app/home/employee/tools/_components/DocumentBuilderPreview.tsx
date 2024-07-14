"use client";
import { useDocumentBuilderSearchParams } from "@/app/home/employee/tools/_hooks/useDocumentBuilderSearchParams";
import { Button } from "@/components/ui/button";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { usePDFViewerStore } from "@/lib/stores/usePDFViewerStore";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";
import { ArrowLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNetworkState } from "react-use";
import DebouncedDocumentSaver from "./DebouncedDocumentSaver";
import MyDoc from "./MyDoc";
import PDFViewer from "./PDFViewer";

const UPDATE_PDF_PROPS_DEBOUNCE_DURATION = 500 as const;

const DocumentBuilderPreview = () => {
  const [reRender, setReRender] = useState(0);
  const { online, previous } = useNetworkState();
  const { currentPage, setCurrentPage, numberOfPages } = usePDFViewerStore();
  const { view, setView } = useDocumentBuilderSearchParams();
  const userLostConnection = !online && previous;

  useEffect(() => {
    const updatePdfProps = () => {
      setReRender((prev) => (prev === 0 ? 1 : 0));
    };
    const debouncedUpdatePdfProps = debounce(
      updatePdfProps,
      UPDATE_PDF_PROPS_DEBOUNCE_DURATION,
    );
    useDocumentBuilderStore.setState({
      pdfUpdaterCallback: debouncedUpdatePdfProps,
    });
  }, []);

  return (
    <div
      className={cn(
        "bg-muted-foreground dark:bg-secondary min-h-screen fixed top-0 right-0 w-1/2",
        view === "preview" && "w-full xl:w-1/2",
        view === "builder" && "hidden xl:block",
      )}
    >
      <div className="h-[90vh] w-[90%] xl:w-[66%] mx-auto pt-4">
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
          <Button className="self-end">Download PDF</Button>
        </div>
        <div className="bg-background rounded-md h-full w-full overflow-auto">
          <PDFViewer key={reRender}>
            <MyDoc data={useDocumentBuilderStore.getState()} />
          </PDFViewer>
          {userLostConnection ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-center text-muted-foreground mx-auto max-w-[75%]">
                Document preview is not available in offline mode. Don't worry!
                You can still edit your resume. We'll automatically save your
                changes when you're back online.
              </p>
            </div>
          ) : null}
        </div>
        <div className="w-full flex items-center justify-between mt-2 lg:mt-4">
          <DebouncedDocumentSaver />
          <div className="flex items-center gap-2">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              size="icon"
              variant="ghost"
              className="hover:bg-secondary text-muted rounded-full size-[30px]"
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
              className="hover:bg-secondary text-muted rounded-full size-[30px]"
            >
              <ChevronRightIcon size={24} />
            </Button>
          </div>
          <p className="text-xs text-muted dark:text-muted-foreground">
            Automatically saved
          </p>
        </div>
      </div>
    </div>
  );
};
export default DocumentBuilderPreview;
