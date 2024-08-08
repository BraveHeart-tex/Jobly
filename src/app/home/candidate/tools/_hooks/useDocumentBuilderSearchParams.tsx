"use client";

import { URL_SEARCH_QUERY_KEYS } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export const useDocumentBuilderSearchParams = () => {
	const [view, setView] = useQueryState(
		URL_SEARCH_QUERY_KEYS.DOCUMENT_BUILDER_VIEW,
		parseAsStringLiteral(["builder", "preview"]).withDefault("builder"),
	);

	return { view, setView };
};
