import DraggableSectionContainer from "@/app/home/candidate/tools/_components/DraggableSectionContainer";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import DocumentBuilderTextarea from "./DocumentBuilderTextarea";
import EditableSectionTitle from "./EditableSectionTitle";

type CvBuilderHobbiesSectionProps = {
  section: DocumentSection;
};

const CvBuilderHobbiesSection = ({ section }: CvBuilderHobbiesSectionProps) => {
  const field = useDocumentBuilderStore((state) =>
    state.fields.find((field) => field.sectionId === section.id),
  );

  return (
    <DraggableSectionContainer sectionId={section.id} className="grid gap-2">
      <EditableSectionTitle section={section} />
      <div>
        <DocumentBuilderTextarea
          field={field as DocumentSectionField}
          placeholder="e.g. Hiking, Cooking, Painting"
        />
      </div>
    </DraggableSectionContainer>
  );
};
export default CvBuilderHobbiesSection;
