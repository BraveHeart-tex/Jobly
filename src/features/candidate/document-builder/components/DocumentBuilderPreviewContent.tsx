"use client";

import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useNetworkState } from "react-use";
import PDFViewer from "./PDFViewer";
import LondonTemplate from "./LondonTemplate";
import { preparePdfData } from "./utils";

const UPDATE_PDF_PROPS_DEBOUNCE_DURATION = 500 as const;

const DocumentBuilderPreviewContent = () => {
  const [reRender, setReRender] = useState(0);
  const { online, previous } = useNetworkState();
  const userLostConnection = !online && previous;
  const { document, sections, fields, fieldValues } = useDocumentBuilderStore();

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
    <div className="rounded-md h-full w-full overflow-auto hide-scrollbar">
      <PDFViewer key={reRender}>
        <LondonTemplate
          data={preparePdfData({
            document,
            sections,
            fields,
            fieldValues,
          })}
        />
      </PDFViewer>
      {userLostConnection ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-center text-muted-foreground mx-auto max-w-[75%]">
            Document preview is not available in offline mode. Don't worry! You
            can still edit your resume. We'll automatically save your changes
            when you're back online.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default DocumentBuilderPreviewContent;
