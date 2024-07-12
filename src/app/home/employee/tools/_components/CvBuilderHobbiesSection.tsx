import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Section, SectionField } from "@/server/db/schema";
import EditableSectionTitle from "./EditableSectionTitle";
import DocumentBuilderTextarea from "./DocumentBuilderTextarea";

type CvBuilderHobbiesSectionProps = {
  section: Section;
};

const CvBuilderHobbiesSection = ({ section }: CvBuilderHobbiesSectionProps) => {
  const field = useDocumentBuilderStore((state) =>
    state.fields.find((field) => field.sectionId === section.id),
  );

  return (
    <div>
      <div className="grid gap-2">
        <EditableSectionTitle section={section} />
        <div>
          <DocumentBuilderTextarea
            field={field as SectionField}
            placeholder="e.g. Hiking, Cooking, Painting"
          />
        </div>
      </div>
    </div>
  );
};
export default CvBuilderHobbiesSection;
