"use client";

import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { useEffect } from "react";
import type { DocumentBuilderConfig } from "@/features/candidate/document-builder/types";
import appDb from "@/lib/appDb";

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

    const initLocalDb = async () => {
      const isInLocalDb = await appDb.documents
        .where("id")
        .equals(documentData.document.id)
        .first();

      if (isInLocalDb) return;

      appDb.documents.add(documentData.document);
      appDb.documentSections.bulkAdd(documentData.sections);
      appDb.documentSectionFields.bulkAdd(documentData.fields);
    };

    initLocalDb();
    callPdfUpdaterCallback();
  }, [documentData, initializeState, callPdfUpdaterCallback]);

  return null;
};

export default DocumentInitializer;
