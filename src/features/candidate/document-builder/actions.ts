"use server";
import LondonTemplate from "@/features/candidate/document-builder/components/LondonTemplate";
import { preparePdfData } from "@/features/candidate/document-builder/components/utils";
import type { DocumentBuilderConfig } from "@/features/candidate/document-builder/types";
import { getDocumentDetails } from "@/features/candidate/documents/use-cases/documentService";
import { validateRequest } from "@/lib/auth/validateRequest";
import { isErrorObject } from "@/lib/guards";
import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";

export const downloadDocumentAsPdf = async (documentId: number) => {
  const { session, user } = await validateRequest();

  if (!session || !user) {
    return {
      error: "You must be signed in to perform this action",
    };
  }

  const documentDetails = await getDocumentDetails({
    id: documentId,
    userId: user?.id,
    source: "builder",
  });

  if (isErrorObject(documentDetails)) {
    return {
      error: documentDetails.error,
    };
  }

  const buffer = await generateDocumentAsPdf(documentDetails);

  const blob = new Blob([buffer], { type: "application/pdf" });

  return {
    blob,
    filename: `${documentDetails.document.title}.pdf`,
  };
};

const generateDocumentAsPdf = async (data: DocumentBuilderConfig) => {
  const buffer = await renderToBuffer(
    createElement(
      LondonTemplate,
      {
        data: preparePdfData(data),
      },
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ) as any,
  );

  return buffer;
};
