import type { DocumentBuilderConfig } from "@/features/candidate/document-builder/types";
import appDb from "@/lib/appDb";
import type { SaveDocumentDetailsData } from "@/schemas/user/document/saveDocumentDetailsValidator";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
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
  syncToServer: () => void;
}

type DocumentBuilderStore = DocumentBuilderState & DocumentBuilderActions;

let isSyncing = false;
let syncTimeout: NodeJS.Timeout | null = null;
const changesToSync = {
  fields: [] as DocumentSectionField[],
  sections: [] as DocumentSection[],
  document: {} as DocumentSelectModel,
};

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
      initializeState: async (initialState) => {
        const document = await appDb.documents.get({
          id: initialState.document.id,
        });

        if (!document) {
          appDb.documents.add(initialState.document);
        }

        const sections = await appDb.documentSections
          .where("documentId")
          .equals(initialState.document.id)
          .toArray();

        if (!sections || sections.length === 0) {
          appDb.documentSections.bulkAdd(initialState.sections);
        }

        const fields = await appDb.documentSectionFields
          .where("sectionId")
          .anyOf(initialState.sections.map((s) => s.id))
          .toArray();

        if (!fields || fields.length === 0) {
          appDb.documentSectionFields.bulkAdd(initialState.fields);
        }

        set({
          ...initialState,
          initialized: true,
        });
      },
      setDocumentObject: (document) => {
        set({ document });
      },
      setDocumentValue: async (key, value) => {
        const document = {
          ...get().document,
          [key]: value,
        };
        set({
          document,
        });

        get().callPdfUpdaterCallback();

        await appDb.documents.put(document);
        addToSyncQueue(document);
        get().syncToServer();
      },
      setSectionValue: ({ sectionId, key, value }) => {
        const sectionToUpdate = get().sections.find(
          (section) => section.id === sectionId,
        );

        if (!sectionToUpdate) return;

        const updatedSection = {
          ...sectionToUpdate,
          [key]: value,
        };

        set({
          sections: get().sections.map((section) => {
            if (section.id === sectionId) {
              return updatedSection;
            }
            return section;
          }),
        });

        get().callPdfUpdaterCallback();

        appDb.documentSections.put(updatedSection);
        addToSyncQueue(updatedSection);
        get().syncToServer();
      },

      addSection: async (section) => {
        await appDb.documentSections.add(section);
        set({ sections: [...get().sections, section] });
      },
      addField: async (field) => {
        await appDb.documentSectionFields.add(field);
        set({ fields: [...get().fields, field] });
      },

      removeFields: (fieldIds) => {
        const newFields = get().fields.filter(
          (field) => !fieldIds.includes(field.id),
        );
        set({ fields: newFields });
        get().callPdfUpdaterCallback();
      },
      removeSection: async (sectionId) => {
        const newSections = get().sections.filter(
          (section) => section.id !== sectionId,
        );
        const newFields = get().fields.filter(
          (field) => field.sectionId !== sectionId,
        );

        await appDb.documentSections.delete(sectionId);
        await appDb.documentSectionFields
          .where("sectionId")
          .equals(sectionId)
          .delete();

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
      setFieldValue: async (fieldId, value) => {
        const field = get().fields.find((field) => field.id === fieldId);
        if (!field) return;
        const updatedField = { ...field, value };
        await appDb.documentSectionFields.put(updatedField);

        set({
          fields: get().fields.map((f) =>
            f.id === fieldId ? updatedField : f,
          ),
        });

        get().callPdfUpdaterCallback();

        addToSyncQueue(updatedField);
        get().syncToServer();
      },
      syncToServer: async () => {
        if (isSyncing) return;
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = setTimeout(async () => {
          isSyncing = true;

          try {
            const fieldsToSync = changesToSync.fields;
            const sectionsToSync = changesToSync.sections;

            get().callSaveDocumentDetailsFn({
              fields: fieldsToSync,
              sections: sectionsToSync,
            });
          } catch (error) {
            console.error("error syncing to server");
          } finally {
            isSyncing = false;
          }
        }, 1000);
      },
    }),
    {
      name: "useDocumentBuilderStore",
    },
  ),
);

function addToSyncQueue(
  change: DocumentSectionField | DocumentSection | DocumentSelectModel,
) {
  if ("sectionId" in change) {
    changesToSync.fields.push(change);
    return;
  }

  if ("documentId" in change) {
    changesToSync.sections.push(change);
    return;
  }

  changesToSync.document = change;
}
