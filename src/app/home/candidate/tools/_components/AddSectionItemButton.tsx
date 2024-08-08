"use client";
import { Button } from "@/components/ui/button";
import type { INTERNAL_SECTION_TAG } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionFieldValue } from "@/server/db/schema/documentSectionFieldValues";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import { getFieldInsertTemplateBySectionTag } from "@/server/utils/document.service.utils";
import { api } from "@/trpc/react";
import { PlusIcon } from "lucide-react";

type AddSectionItemButtonProps = {
	sectionId: DocumentSection["id"];
	templateOption: INTERNAL_SECTION_TAG;
	label: string;
};

const AddSectionItemButton = ({
	sectionId,
	templateOption,
	label,
}: AddSectionItemButtonProps) => {
	const sectionFields = useDocumentBuilderStore((state) =>
		state.fields.filter((field) => field.sectionId === sectionId),
	);
	const addField = useDocumentBuilderStore((state) => state.addField);
	const addFieldValue = useDocumentBuilderStore(
		(state) => state.addFieldValue,
	);

	const { mutate: addFields, isPending } =
		api.document.addFieldsWithValues.useMutation({
			onSuccess({ fieldInsertIds, fieldValueInsertIds }, { fields }) {
				const mappedFields = fields.map((item, index) => ({
					...item,
					id: fieldInsertIds[
						index
					] as DocumentSectionFieldValue["id"],
				}));

				const fieldValues = mappedFields.map((field, index) => ({
					id: fieldValueInsertIds[
						index
					] as DocumentSectionFieldValue["id"],
					fieldId: field.id,
					value: "",
				}));

				for (const field of mappedFields) {
					addField(field);
				}
				for (const fieldValue of fieldValues) {
					addFieldValue(fieldValue);
				}
			},
		});

	const getFinalDisplayOrder = () => {
		return sectionFields.reduce(
			(max, field) => Math.max(max, field.displayOrder),
			0,
		);
	};

	const handleAddItem = () => {
		const fieldsToInsert = getFieldInsertTemplateBySectionTag(
			sectionId,
			templateOption,
		);
		const finalOrder = getFinalDisplayOrder();

		const mappedFieldsToInsert = fieldsToInsert.map((field, index) => ({
			...field,
			displayOrder: finalOrder + index + 1,
		}));

		addFields({
			fields: mappedFieldsToInsert,
		});
	};

	return (
		<Button
			className="flex items-center gap-1 w-full hover:text-primary justify-start"
			variant="ghost"
			disabled={isPending}
			onClick={handleAddItem}
		>
			<PlusIcon /> {label}
		</Button>
	);
};

export default AddSectionItemButton;
