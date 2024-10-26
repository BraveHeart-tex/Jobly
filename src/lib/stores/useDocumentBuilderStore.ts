import type { DocumentBuilderConfig } from "@/features/candidate/document-builder/types";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import type { SaveDocumentDetailsData } from "@/validators/user/document/saveDocumentDetailsValidator";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SetSectionValueParams<K extends keyof DocumentSection> {
  sectionId: DocumentSection["id"];
  key: K;
  value: DocumentSection[K];
}

export interface DocumentBuilderState {
  initialized: boolean;
  document: DocumentSelectModel;
  sections: DocumentSection[];
  fields: DocumentSectionField[];
  saveDocumentDetailsFn: (documentData: SaveDocumentDetailsData) => unknown;

  pdfUpdaterCallback: (data: DocumentBuilderConfig) => unknown;
}

interface DocumentBuilderActions {
  initializeState: (initialState: DocumentBuilderConfig) => void;
  setDocumentObject: (document: DocumentSelectModel) => void;
  setDocumentValue: <K extends keyof DocumentSelectModel>(
    key: K,
    value: DocumentSelectModel[K],
  ) => void;
  setSectionValue: <K extends keyof DocumentSection>(
    params: SetSectionValueParams<K>,
  ) => void;
  callSaveDocumentDetailsFn: (data: SaveDocumentDetailsData) => void;
  addSection: (section: DocumentSection) => void;
  addField: (field: DocumentSectionField) => void;
  removeFields: (fieldIds: DocumentSectionField["id"][]) => void;
  removeSection: (sectionId: DocumentSection["id"]) => void;
  callPdfUpdaterCallback: () => void;
  setFields: (fields: DocumentSectionField[]) => void;
  setSections: (sections: DocumentSection[]) => void;
  setFieldValue: (fieldId: DocumentSectionField["id"], value: string) => void;
}

type DocumentBuilderStore = DocumentBuilderState & DocumentBuilderActions;

export const useDocumentBuilderStore = create<
  DocumentBuilderStore,
  [["zustand/devtools", never]]
>(
  devtools(
    (set, get) => ({
      initialized: false,
      document: {} as DocumentSelectModel,
      sections: [],
      fields: [],
      saveDocumentDetailsFn: () => {},
      pdfUpdaterCallback: () => {},
      callSaveDocumentDetailsFn: (data) => {
        get().saveDocumentDetailsFn(data);
      },
      callPdfUpdaterCallback: () => {
        get().pdfUpdaterCallback({
          document: get().document,
          sections: get().sections,
          fields: get().fields,
        });
      },
      initializeState: (initialState) => {
        set({
          ...initialState,
          initialized: true,
        });
      },
      setDocumentObject: (document) => {
        set({ document });
      },
      setDocumentValue: (key, value) => {
        const document = {
          ...get().document,
          [key]: value,
        };
        set({
          document,
        });
        get().callSaveDocumentDetailsFn({
          document,
        });
        get().callPdfUpdaterCallback();
      },
      setSectionValue: ({ sectionId, key, value }) => {
        const sectionToUpdate = get().sections.find(
          (section) => section.id === sectionId,
        );
        if (!sectionToUpdate) return;

        set({
          sections: get().sections.map((section) => {
            if (section.id === sectionId) {
              return {
                ...section,
                [key]: value,
              };
            }
            return section;
          }),
        });
        get().callSaveDocumentDetailsFn({
          sections: [
            {
              ...sectionToUpdate,
              [key]: value,
            },
          ],
        });
        get().callPdfUpdaterCallback();
      },

      addSection: (section) => {
        set({ sections: [...get().sections, section] });
      },
      addField: (field) => {
        set({ fields: [...get().fields, field] });
      },

      removeFields: (fieldIds) => {
        const newFields = get().fields.filter(
          (field) => !fieldIds.includes(field.id),
        );
        set({ fields: newFields });
        get().callPdfUpdaterCallback();
      },
      removeSection: (sectionId) => {
        const newSections = get().sections.filter(
          (section) => section.id !== sectionId,
        );
        const newFields = get().fields.filter(
          (field) => field.sectionId !== sectionId,
        );

        set({
          sections: newSections,
          fields: newFields,
        });
        get().callPdfUpdaterCallback();
      },
      setFields: (fields) => {
        set({ fields });
        get().callPdfUpdaterCallback();
      },
      setSections: (sections) => {
        set({ sections });
        get().callPdfUpdaterCallback();
        get().callSaveDocumentDetailsFn({
          sections: sections,
        });
      },
      setFieldValue: (fieldId, value) => {
        const field = get().fields.find((field) => field.id === fieldId);
        if (!field) return;

        set({
          fields: get().fields.map((field) =>
            field.id === fieldId ? { ...field, value } : field,
          ),
        });

        get().callPdfUpdaterCallback();
        get().callSaveDocumentDetailsFn({
          fields: [{ ...field, value }],
        });
      },
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);
