import DraggableSectionContainer from "@/features/candidate/document-builder/components/DraggableSectionContainer";
import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import { groupEveryN } from "@/lib/utils/object";
import { useRemoveFields } from "@/features/candidate/document-builder/hooks/useRemoveFields";
import CollapsibleSectionItemContainer from "@/features/candidate/document-builder/components/CollapsibleSectionItemContainer";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";
import DocumentBuilderDatePickerInput from "@/features/candidate/document-builder/components/DocumentBuilderDatePickerInput";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import SectionFieldsDndContext from "@/features/candidate/document-builder/components/SectionFieldsDndContext";
import AddSectionItemButton from "@/features/candidate/document-builder/components/AddSectionItemButton";

interface CvBuilderCoursesSectionProps {
  section: DocumentSection;
}

export const COURSES_SECTION_ITEMS_COUNT = 4;

const CvBuilderCoursesSection = ({ section }: CvBuilderCoursesSectionProps) => {
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === section?.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(fields, COURSES_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const courseField = group[0] as DocumentSectionField;
      const institutionField = group[1] as DocumentSectionField;
      const startDateField = group[2] as DocumentSectionField;
      const endDateField = group[3] as DocumentSectionField;

      const course = getFieldValueByFieldId(courseField?.id as number)
        ?.value as string;
      const institution = getFieldValueByFieldId(institutionField?.id as number)
        ?.value as string;
      const startDate = getFieldValueByFieldId(startDateField?.id as number)
        ?.value as string;
      const endDate = getFieldValueByFieldId(endDateField?.id as number)
        ?.value as string;

      const triggerTitle = course
        ? institution
          ? `${course} at ${institution}`
          : course
        : institution || "(Not Specified)";
      const triggerDescription = startDate
        ? endDate
          ? `${startDate} - ${endDate}`
          : startDate
        : endDate
          ? endDate
          : "";

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.COURSES}-${index}`}
          triggerTitle={triggerTitle}
          triggerDescription={triggerDescription}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput autoFocus field={courseField} />
              <DocumentBuilderInput field={institutionField} />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-4 col-span-2 lg:col-span-1">
                <DocumentBuilderDatePickerInput
                  field={startDateField}
                  showPresentToggle={false}
                />
                <DocumentBuilderDatePickerInput
                  field={endDateField}
                  showPresentToggle
                  presentToggleLabel="Present"
                />
              </div>
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  return (
    <DraggableSectionContainer sectionId={section.id} className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.COURSES}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.COURSES}
              label="Add one more course"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.COURSES}
              label="Add course"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};

export default CvBuilderCoursesSection;
