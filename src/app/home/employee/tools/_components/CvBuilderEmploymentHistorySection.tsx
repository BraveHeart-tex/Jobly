"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import EditableSectionTitle from "./EditableSectionTitle";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderInput from "./DocumentBuilderInput";
import DocumentBuilderDatePickerInput from "./DocumentBuilderDatePickerInput";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { groupByN } from "@/lib/utils";
import type { SectionField } from "@/server/db/schema";

const AddEmploymentButton = () => {
  return (
    <Button
      className="flex items-center gap-1 w-full hover:text-primary justify-start"
      variant="ghost"
    >
      <PlusIcon /> Add employment
    </Button>
  );
};

const CvBuilderEmploymentHistorySection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) =>
        section.internalSectionTag === INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
    ),
  );
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === section?.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );

  const renderGroupItems = () => {
    const groupedFields = groupByN(fields, 6);

    return groupedFields.map((group) => {
      const jobTitleField = group[0] as SectionField;
      const startDateField = group[1] as SectionField;
      const endDateField = group[2] as SectionField;
      const employerField = group[3] as SectionField;
      const cityField = group[4] as SectionField;

      const jobTitle = getFieldValueByFieldId(jobTitleField?.id as number)
        ?.value as string;
      const startDate = getFieldValueByFieldId(startDateField?.id as number)
        ?.value as string;
      const endDate = getFieldValueByFieldId(endDateField?.id as number)
        ?.value as string;
      const employer = getFieldValueByFieldId(employerField?.id as number)
        ?.value as string;

      const triggerTitle = jobTitle ? `${jobTitle} at ${employer}` : employer;
      const description = `${startDate} - ${endDate}`;

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
            <AddEmploymentButton />
          </div>
        ) : (
          <div>
            <AddEmploymentButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default CvBuilderEmploymentHistorySection;
