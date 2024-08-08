"use client";
import { pdf } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useAsync } from "react-use";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { usePDFViewerStore } from "@/lib/stores/usePDFViewerStore";
import { cn } from "@/lib/utils";
import { useViewportSize } from "../../app/home/candidate/tools/_hooks/useViewportSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
	children: ReactElement;
}
const PDFViewer = ({ children }: PDFViewerProps) => {
	const currentPage = usePDFViewerStore((state) => state.currentPage);
	const setCurrentPage = usePDFViewerStore((state) => state.setCurrentPage);
	const previousRenderValue = usePDFViewerStore(
		(state) => state.previousRenderValue,
	);
	const setPreviousRenderValue = usePDFViewerStore(
		(state) => state.setPreviousRenderValue,
	);
	const setNumberOfPages = usePDFViewerStore(
		(state) => state.setNumberOfPages,
	);

	const { width, height } = useViewportSize();

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
		<div className="h-full bg-white z-10 transition-all relative">
			{shouldShowPreviousDocument && previousRenderValue ? (
				<Document
					key={previousRenderValue}
					className={"previous-document h-full w-full"}
					file={previousRenderValue}
					loading={null}
				>
					<Page
						key={currentPage}
						pageNumber={currentPage}
						renderAnnotationLayer={false}
						renderTextLayer={false}
						width={width < 768 ? 0.7 * width : 0.4 * width}
						height={width < 768 ? 0.7 * height : 0.4 * height}
						loading={null}
					/>
				</Document>
			) : null}

			{render.value && (
				<Document
					file={render.value}
					loading={null}
					className={cn(
						"z-10",
						shouldShowPreviousDocument &&
							"rendering-document hidden z-0",
					)}
					onLoadSuccess={onDocumentLoad}
				>
					<Page
						key={currentPage + 1}
						renderAnnotationLayer={false}
						renderTextLayer={false}
						pageNumber={currentPage}
						width={width < 768 ? 0.7 * width : 0.4 * width}
						height={width < 768 ? 0.7 * height : 0.4 * height}
						loading={null}
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
