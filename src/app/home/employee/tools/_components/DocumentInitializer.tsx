"use client";

import { useEffect } from "react";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentBuilderConfig } from "@/lib/types";

type DocumentInitializerProps = {
  documentData?: DocumentBuilderConfig;
};

const DocumentInitializer = ({ documentData }: DocumentInitializerProps) => {
  const initializeState = useDocumentBuilderStore(
    (state) => state.initializeState,
  );

  useEffect(() => {
    if (!documentData || Object.keys(documentData).length === 0) return;

    initializeState(documentData);
  }, [documentData, initializeState]);

  return null;
};

export default DocumentInitializer;
