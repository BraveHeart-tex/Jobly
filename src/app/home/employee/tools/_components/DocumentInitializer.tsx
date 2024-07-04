"use client";

import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentBuilderConfig } from "@/lib/types";
import { useEffect } from "react";

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
