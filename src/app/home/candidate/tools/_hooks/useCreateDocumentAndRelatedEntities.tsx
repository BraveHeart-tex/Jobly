"use client";

import type { DocumentType } from "@/server/db/schema/documents";
import { api } from "@/trpc/react";

export const useCreateDocumentAndRelatedEntities = () => {
	const { mutateAsync: createDocumentAndRelatedEntities, isPending } =
		api.document.createDocumentAndRelatedEntities.useMutation();

	const handleCreateDocument = async (documentType: DocumentType) => {
		return await createDocumentAndRelatedEntities({
			title: "Untitled",
			language: "EN",
			type: documentType,
			allowedRoles: ["candidate"],
		});
	};

	return {
		createDocumentAndRelatedEntities: handleCreateDocument,
		isCreatingDocument: isPending,
	};
};
