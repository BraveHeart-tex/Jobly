"use client";

import type { DocumentBuilderConfig } from "@/features/candidate/document-builder/types";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { useEffect, useTransition } from "react";

interface DocumentInitializerProps {
  documentData?: DocumentBuilderConfig;
}

const DocumentInitializer = ({ documentData }: DocumentInitializerProps) => {
  const [, startTransition] = useTransition();
  const initializeState = useDocumentBuilderStore(
    (state) => state.initializeState,
  );
  const callPdfUpdaterCallback = useDocumentBuilderStore(
    (state) => state.callPdfUpdaterCallback,
  );

  useEffect(() => {
    if (!documentData || Object.keys(documentData).length === 0) return;

    startTransition(async () => {
      await initializeState(documentData);
      callPdfUpdaterCallback();
    });
  }, [documentData, initializeState, callPdfUpdaterCallback]);

  return null;
};

export default DocumentInitializer;
