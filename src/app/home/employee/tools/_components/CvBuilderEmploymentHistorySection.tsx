"use client";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils";
import type { SectionField } from "@/server/db/schema";
import AddSectionItemButton from "./AddSectionItemButton";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderDatePickerInput from "./DocumentBuilderDatePickerInput";
import DocumentBuilderInput from "./DocumentBuilderInput";
import EditableSectionTitle from "./EditableSectionTitle";
import DocumentBuilderRichTextInput from "./DocumentBuilderRichTextInput";

const CvBuilderEmploymentHistorySection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) =>
        section.internalSectionTag === INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
    ),
  );
  const fields = useDocumentBuilderStore((state) =>
    state.fields
      .filter((field) => field.sectionId === section?.id)
      .sort((a, b) => a.id - b.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );

  const renderGroupItems = () => {
    const groupedFields = groupEveryN(fields, 6);

    return groupedFields.map((group) => {
      const jobTitleField = group[0] as SectionField;
      const startDateField = group[1] as SectionField;
      const endDateField = group[2] as SectionField;
      const employerField = group[3] as SectionField;
      const cityField = group[4] as SectionField;
      const employmentDescriptionField = group[5] as SectionField;

      const jobTitle = getFieldValueByFieldId(jobTitleField?.id as number)
        ?.value as string;
      const startDate = getFieldValueByFieldId(startDateField?.id as number)
        ?.value as string;
      const endDate = getFieldValueByFieldId(endDateField?.id as number)
        ?.value as string;
      const employer = getFieldValueByFieldId(employerField?.id as number)
        ?.value as string;

      let triggerTitle = jobTitle ? `${jobTitle} at ${employer}` : employer;
      let description = `${startDate} - ${endDate}`;
      if (!jobTitle && !employer) {
        triggerTitle = "(Untitled)";
        description = "";
      }

      return (
        <CollapsibleSectionItemContainer
          triggerTitle={triggerTitle}
          triggerDescription={description}
          key={group[0]?.id}
        >
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-8">
              <DocumentBuilderInput field={jobTitleField} />
              <DocumentBuilderInput field={employerField} />
            </div>
            <div className="grid gap-8 grid-cols-2">
              <div className="grid gap-4 grid-cols-2">
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
              <DocumentBuilderInput field={cityField} />
              <div className="w-full col-span-2">
                <DocumentBuilderRichTextInput
                  field={employmentDescriptionField}
                />
              </div>
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  return (
    <div className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          List your key accomplishments from the past decade. Use bullet points
          and include specific metrics where possible (e.g., 'Increased X by Y%
          through Z initiative').
        </p>
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            {renderGroupItems()}
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption="employmentHistory"
              label="Add one more employment"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption="employmentHistory"
              label="Add employment"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CvBuilderEmploymentHistorySection;
