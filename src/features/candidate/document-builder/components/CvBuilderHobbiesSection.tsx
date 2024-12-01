import DocumentBuilderTextarea from "@/features/candidate/document-builder/components/DocumentBuilderTextarea";
import DraggableSectionContainer from "@/features/candidate/document-builder/components/DraggableSectionContainer";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import {
  useDocumentSectionByInternalTag,
  useSectionField,
} from "@/features/candidate/document-builder/selectors";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";

const CvBuilderHobbiesSection = () => {
  const section = useDocumentSectionByInternalTag(
    INTERNAL_SECTION_TAGS.HOBBIES,
  );
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
