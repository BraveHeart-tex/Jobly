"use client";
import { pdf } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useAsync } from "react-use";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { usePDFViewerStore } from "@/lib/stores/usePDFViewerStore";
import { useViewportSize } from "../_hooks/useViewportSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  children: ReactElement;
}
const PDFViewer = ({ children }: PDFViewerProps) => {
  const { width, height } = useViewportSize();
  const {
    currentPage,
    previousRenderValue,
    setCurrentPage,
    setPreviousRenderValue,
    setNumberOfPages,
  } = usePDFViewerStore();

  const render = useAsync(async () => {
    if (!children) return null;

    const blob = await pdf(children).toBlob();
    const url = URL.createObjectURL(blob);
    return url;
  }, []);

  const onDocumentLoad = (d: { numPages: number }) => {
    setNumberOfPages(d.numPages);
    setCurrentPage(Math.min(currentPage, d.numPages));
  };

  const isFirstRendering = !previousRenderValue;
  const isLatestValueRendered = previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <div className="relative">
      {shouldShowPreviousDocument && previousRenderValue ? (
        <Document
          key={previousRenderValue}
          className="previous-document opacity-5"
          file={previousRenderValue}
          loading={null}
        >
          <Page
            key={currentPage}
            pageNumber={currentPage}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      ) : null}

      {render.value && (
        <Document
          className={shouldShowPreviousDocument ? "rendering-document" : null}
          file={render.value}
          loading={null}
          onLoadSuccess={onDocumentLoad}
        >
          <Page
            key={currentPage + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            pageNumber={currentPage}
            width={width < 768 ? 0.7 * width : 0.4 * width}
            height={width < 768 ? 0.7 * height : 0.4 * height}
            onRenderSuccess={() => {
              if (render.value !== undefined) {
                setPreviousRenderValue(render.value);
              }
            }}
          />
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;
