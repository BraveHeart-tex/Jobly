"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import EditableSectionTitle from "./EditableSectionTitle";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderInput from "./DocumentBuilderInput";
import DocumentBuilderDatePickerInput from "./DocumentBuilderDatePickerInput";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";

const CvBuilderEmploymentHistorySection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) =>
        section.internalSectionTag === INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
    ),
  );

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
        <CollapsibleSectionItemContainer>
          <div className="grid gap-6">
            <div className="grid gap-8 grid-cols-2">
              <DocumentBuilderInput
                label="Job Title"
                onChange={() => {}}
                value=""
              />
              <DocumentBuilderInput
                label="Employer"
                onChange={() => {}}
                value=""
              />
            </div>
            <div className="grid gap-8 grid-cols-2">
              <div className="grid gap-4 grid-cols-2">
                <DocumentBuilderDatePickerInput
                  label="Start Date"
                  showPresentToggle={false}
                />
                <DocumentBuilderDatePickerInput
                  label="End Date"
                  showPresentToggle
                  presentToggleLabel="Currently Working"
                />
              </div>
              <DocumentBuilderInput label="City" onChange={() => {}} value="" />
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      </div>
    </div>
  );
};

export default CvBuilderEmploymentHistorySection;
