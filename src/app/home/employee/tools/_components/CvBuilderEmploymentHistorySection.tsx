"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import EditableSectionTitle from "./EditableSectionTitle";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderInput from "./DocumentBuilderInput";

const CvBuilderEmploymentHistorySection = () => {
  const section = useDocumentBuilderStore((state) => state.sections[2]);

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
          <div className="grid gap-4">
            <div className="grid gap-2 xl:grid-cols-2">
              <DocumentBuilderInput label="Job Title" />
              <DocumentBuilderInput label="Employer" />
            </div>
            <div className="grid gap-2 grid-cols-2">
              <DocumentBuilderInput label="Start Date" />
              <DocumentBuilderInput label="End Date" />
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      </div>
    </div>
  );
};

export default CvBuilderEmploymentHistorySection;
