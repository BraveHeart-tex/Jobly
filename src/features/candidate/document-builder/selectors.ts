import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import { useShallow } from "zustand/react/shallow";

export const useDocumentSectionByInternalTag = (
  internalSectionTag: DocumentSection["internalSectionTag"],
): DocumentSection => {
  return useDocumentBuilderStore(
    useShallow((state) =>
      state.sections.find(
        (section) => section.internalSectionTag === internalSectionTag,
      ),
    ),
  ) as DocumentSection;
};

export const useSectionFields = (
  sectionId: DocumentSection["id"] | undefined,
): DocumentSectionField[] => {
  return useDocumentBuilderStore(
    useShallow((state) =>
      state.fields.filter((field) => field.sectionId === sectionId),
    ),
  );
};

export const useSectionField = (
  sectionId: DocumentSection["id"] | undefined,
): DocumentSectionField | undefined => {
  return useDocumentBuilderStore(
    useShallow((state) =>
      state.fields.find((field) => field.sectionId === sectionId),
    ),
  );
};
