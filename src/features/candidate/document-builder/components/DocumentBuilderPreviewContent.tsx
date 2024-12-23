"use client";

import LondonTemplate from "@/features/candidate/document-builder/components/LondonTemplate";
import PDFViewer from "@/features/candidate/document-builder/components/PDFViewer";
import { preparePdfData } from "@/features/candidate/document-builder/components/utils";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useNetworkState } from "react-use";

const UPDATE_PDF_PROPS_DEBOUNCE_DURATION = 300 as const;

const DocumentBuilderPreviewContent = () => {
  const [reRender, setReRender] = useState(0);
  const { online, previous } = useNetworkState();
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
    <div className="rounded-md h-full w-full overflow-auto hide-scrollbar">
      <PDFViewer key={reRender}>
        <LondonTemplate
          data={preparePdfData({
            document: useDocumentBuilderStore.getState().document,
            sections: useDocumentBuilderStore.getState().sections,
            fields: useDocumentBuilderStore.getState().fields,
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
