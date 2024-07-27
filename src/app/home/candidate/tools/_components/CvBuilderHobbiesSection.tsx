import DraggableSectionContainer from "@/app/home/candidate/tools/_components/DraggableSectionContainer";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Section, SectionField } from "@/server/db/schema";
import DocumentBuilderTextarea from "./DocumentBuilderTextarea";
import EditableSectionTitle from "./EditableSectionTitle";

type CvBuilderHobbiesSectionProps = {
  section: Section;
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
          field={field as SectionField}
          placeholder="e.g. Hiking, Cooking, Painting"
        />
      </div>
    </DraggableSectionContainer>
  );
};
export default CvBuilderHobbiesSection;
