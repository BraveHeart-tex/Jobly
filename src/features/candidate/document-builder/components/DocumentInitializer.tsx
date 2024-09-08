"use client";

import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentBuilderConfig } from "@/lib/types";
import { useEffect } from "react";

interface DocumentInitializerProps {
  documentData?: DocumentBuilderConfig;
}

const DocumentInitializer = ({ documentData }: DocumentInitializerProps) => {
  const initializeState = useDocumentBuilderStore(
    (state) => state.initializeState,
  );
  const callPdfUpdaterCallback = useDocumentBuilderStore(
    (state) => state.callPdfUpdaterCallback,
  );

  useEffect(() => {
    if (!documentData || Object.keys(documentData).length === 0) return;

    initializeState(documentData);
    callPdfUpdaterCallback();
  }, [documentData, initializeState, callPdfUpdaterCallback]);

  return null;
};

export default DocumentInitializer;
