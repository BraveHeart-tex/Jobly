"use client";

import { useDocumentBuilderSearchParams } from "@/app/home/employee/tools/_hooks/useDocumentBuilderSearchParams";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNetworkState } from "react-use";
import DebouncedDocumentSaver from "./DebouncedDocumentSaver";
import MyDoc from "./MyDoc";
import { pdfjs, Document, Page } from "react-pdf";
import { usePDF } from "@react-pdf/renderer";
import { useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DocumentBuilderPreview = () => {
  const { online, previous } = useNetworkState();
  const { view, setView } = useDocumentBuilderSearchParams();
  const userLostConnection = !online && previous;
  const [instance, setInstance] = usePDF({ document: <MyDoc /> });
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

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
        <div className="bg-background rounded-md h-full w-full">
          <Document
            file={instance.blob}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-full h-full min-h-full mx-auto flex flex-col justify-center items-center"
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
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

        <div className="w-full flex items-center justify-between mt-4 xl:mt-2">
          <DebouncedDocumentSaver />
          <div className="flex items-center gap-2">
            <Button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber(pageNumber - 1)}
              size="icon"
              variant="ghost"
              className="hover:bg-secondary text-muted rounded-full size-[30px]"
            >
              <ChevronLeftIcon size={24} />
            </Button>
            <span className="text-xs text-muted dark:text-muted-foreground tabular-nums">
              {pageNumber} of {numPages}
            </span>
            <Button
              disabled={pageNumber === numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
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
