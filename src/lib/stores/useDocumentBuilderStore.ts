import type { DocumentSectionFieldValue } from "@/server/db/schema/documentSectionFieldValues";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DocumentBuilderConfig } from "../types";

type SetSectionValueParams<K extends keyof DocumentSection> = {
	sectionId: DocumentSection["id"];
	key: K;
	value: DocumentSection[K];
};

type SaveDocumentDetailsParams = Partial<DocumentBuilderConfig>;

type DocumentBuilderState = {
	initialized: boolean;
	document: DocumentSelectModel;
	sections: DocumentSection[];
	fields: DocumentSectionField[];
	fieldValues: DocumentSectionFieldValue[];
	saveDocumentDetailsFn: (documentData: SaveDocumentDetailsParams) => unknown;
	pdfUpdaterCallback: (data: DocumentBuilderConfig) => unknown;
};

type DocumentBuilderActions = {
	initializeState: (initialState: DocumentBuilderConfig) => void;
	setDocumentObject: (document: DocumentSelectModel) => void;
	setDocumentValue: <K extends keyof DocumentSelectModel>(
		key: K,
		value: DocumentSelectModel[K],
	) => void;
	setSectionValue: <K extends keyof DocumentSection>(
		params: SetSectionValueParams<K>,
	) => void;
	getFieldValueByFieldId: (
		fieldId: DocumentSectionField["id"],
	) => DocumentSectionFieldValue | undefined;
	setFieldValueByFieldId: (
		fieldId: DocumentSectionField["id"],
		newValue: string,
	) => void;
	callSaveDocumentDetailsFn: (data: SaveDocumentDetailsParams) => void;
	addSection: (section: DocumentSection) => void;
	addField: (field: DocumentSectionField) => void;
	addFieldValue: (fieldValue: DocumentSectionFieldValue) => void;
	removeFields: (fieldIds: DocumentSectionField["id"][]) => void;
	removeSection: (sectionId: DocumentSection["id"]) => void;
	callPdfUpdaterCallback: () => void;
	setFields: (fields: DocumentSectionField[]) => void;
	setSections: (sections: DocumentSection[]) => void;
};

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
			fieldValues: [],
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
					fieldValues: get().fieldValues,
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
				const document = get().document;
				document[key] = value;
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
				sectionToUpdate[key] = value;
				set({
					sections: get().sections.map((section) => {
						if (section.id === sectionId) {
							return sectionToUpdate;
						}
						return section;
					}),
				});
				get().callSaveDocumentDetailsFn({
					sections: [sectionToUpdate],
				});
				get().callPdfUpdaterCallback();
			},
			getFieldValueByFieldId: (fieldId) => {
				return get().fieldValues.find(
					(fieldValue) => fieldValue.fieldId === fieldId,
				);
			},
			setFieldValueByFieldId: (fieldId, newValue) => {
				const fieldValueToUpdate = get().fieldValues.find(
					(fieldValue) => fieldValue.fieldId === fieldId,
				);
				if (!fieldValueToUpdate) return;
				fieldValueToUpdate.value = newValue;

				set({
					fieldValues: get().fieldValues.map((fieldValue) => {
						if (fieldValue.fieldId === fieldId) {
							return fieldValueToUpdate;
						}
						return fieldValue;
					}),
				});

				get().callSaveDocumentDetailsFn({
					fieldValues: [fieldValueToUpdate],
				});
				get().callPdfUpdaterCallback();
			},
			addSection: (section) => {
				set({ sections: [...get().sections, section] });
			},
			addField: (field) => {
				set({ fields: [...get().fields, field] });
			},
			addFieldValue: (fieldValue) => {
				set({ fieldValues: [...get().fieldValues, fieldValue] });
			},
			removeFields: (fieldIds) => {
				const newFields = get().fields.filter(
					(field) => !fieldIds.includes(field.id),
				);
				const newFieldValues = get().fieldValues.filter(
					(fieldValue) => !fieldIds.includes(fieldValue.fieldId),
				);
				set({ fields: newFields, fieldValues: newFieldValues });
				get().callPdfUpdaterCallback();
			},
			removeSection: (sectionId) => {
				const newSections = get().sections.filter(
					(section) => section.id !== sectionId,
				);
				const newFields = get().fields.filter(
					(field) => field.sectionId !== sectionId,
				);
				const newFieldValues = get().fieldValues.filter((fieldValue) =>
					newFields
						.map((field) => field.id)
						.includes(fieldValue.fieldId),
				);
				set({
					sections: newSections,
					fields: newFields,
					fieldValues: newFieldValues,
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
		}),
		{
			name: "useDocumentBuilderStore",
		},
	),
);
