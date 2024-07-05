"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import EditableSectionTitle from "./EditableSectionTitle";

const CvBuilderEmploymentHistorySection = () => {
  const section = useDocumentBuilderStore((state) => state.sections[2]);
  // const fields = useDocumentBuilderStore((state) =>
  //   state.fields.filter((field) => field.sectionId === section?.id),
  // );

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
    </div>
  );
};

export default CvBuilderEmploymentHistorySection;
