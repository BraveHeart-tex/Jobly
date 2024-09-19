"use client";
import DraggableSectionContainer from "@/features/candidate/document-builder/components/DraggableSectionContainer";
import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils/objectUtils";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import { useRemoveFields } from "../hooks/useRemoveFields";
import AddSectionItemButton from "./AddSectionItemButton";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderDatePickerInput from "./DocumentBuilderDatePickerInput";
import DocumentBuilderInput from "./DocumentBuilderInput";
import DocumentBuilderRichTextInput from "./DocumentBuilderRichTextInput";
import EditableSectionTitle from "./EditableSectionTitle";
import SectionFieldsDndContext from "./SectionFieldsDndContext";

export const EMPLOYMENT_SECTION_ITEMS_COUNT = 6;

const CvBuilderEmploymentHistorySection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) =>
        section.internalSectionTag === INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
    ),
  ) as DocumentSection;
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === section?.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const groupedFields = groupEveryN(fields, EMPLOYMENT_SECTION_ITEMS_COUNT);

  const { removeFields } = useRemoveFields();

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const jobTitleField = group[0] as DocumentSectionField;
      const startDateField = group[1] as DocumentSectionField;
      const endDateField = group[2] as DocumentSectionField;
      const employerField = group[3] as DocumentSectionField;
      const cityField = group[4] as DocumentSectionField;
      const employmentDescriptionField = group[5] as DocumentSectionField;

      const jobTitle = getFieldValueByFieldId(jobTitleField?.id as number)
        ?.value as string;
      const startDate = getFieldValueByFieldId(startDateField?.id as number)
        ?.value as string;
      const endDate = getFieldValueByFieldId(endDateField?.id as number)
        ?.value as string;
      const employer = getFieldValueByFieldId(employerField?.id as number)
        ?.value as string;

      let triggerTitle = jobTitle
        ? `${employer ? `${jobTitle} at ${employer}` : jobTitle}`
        : employer;
      let description = `${startDate} - ${endDate}`;
      if (!jobTitle && !employer) {
        triggerTitle = "(Untitled)";
        description = "";
      }

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.EMPLOYMENT}-${index}`}
          triggerTitle={triggerTitle}
          triggerDescription={description}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            const deletedFieldIds = group.map((field) => field.id);
            removeFields(deletedFieldIds);
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={jobTitleField} />
              <DocumentBuilderInput field={employerField} />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-4 col-span-2 lg:col-span-1">
                <DocumentBuilderDatePickerInput
                  field={startDateField}
                  showPresentToggle={false}
                />
                <DocumentBuilderDatePickerInput
                  field={endDateField}
                  showPresentToggle
                  presentToggleLabel="Currently Working"
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <DocumentBuilderInput field={cityField} />
              </div>
              <div className="w-full col-span-2">
                <DocumentBuilderRichTextInput
                  field={employmentDescriptionField}
                  placeholder="E.g. Designed and developed software solutions based on user needs and feedback."
                />
              </div>
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  return (
    <DraggableSectionContainer sectionId={section.id}>
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          {
            SECTION_DESCRIPTIONS_BY_TAG[
              INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY
            ]
          }
        </p>
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.EMPLOYMENT}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY}
              label="Add one more employment"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY}
              label="Add employment"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};

export default CvBuilderEmploymentHistorySection;
