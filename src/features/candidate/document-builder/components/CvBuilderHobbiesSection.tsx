import DocumentBuilderTextarea from "@/features/candidate/document-builder/components/DocumentBuilderTextarea";
import DraggableSectionContainer from "@/features/candidate/document-builder/components/DraggableSectionContainer";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import { useSectionField } from "@/features/candidate/document-builder/selectors";
import type { DocumentSection } from "@/server/db/schema/documentSections";

interface CvBuilderHobbiesSectionProps {
  section: DocumentSection;
}

const CvBuilderHobbiesSection = ({ section }: CvBuilderHobbiesSectionProps) => {
  const field = useSectionField(section.id);

  if (!field) return null;

  return (
    <DraggableSectionContainer sectionId={section.id} className="grid gap-2">
      <EditableSectionTitle section={section} />
      <div>
        <DocumentBuilderTextarea
          field={field}
          placeholder="e.g. Hiking, Cooking, Painting"
        />
      </div>
    </DraggableSectionContainer>
  );
};
export default CvBuilderHobbiesSection;
