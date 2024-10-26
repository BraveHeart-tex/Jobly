import AddSectionItemButton from "@/features/candidate/document-builder/components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/features/candidate/document-builder/components/CollapsibleSectionItemContainer";
import DocumentBuilderDatePickerInput from "@/features/candidate/document-builder/components/DocumentBuilderDatePickerInput";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";
import DocumentBuilderRichTextInput from "@/features/candidate/document-builder/components/DocumentBuilderRichTextInput";
import DraggableSectionContainer from "@/features/candidate/document-builder/components/DraggableSectionContainer";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import SectionFieldsDndContext from "@/features/candidate/document-builder/components/SectionFieldsDndContext";
import { useRemoveFields } from "@/features/candidate/document-builder/hooks/useRemoveFields";
import {
  useDocumentSectionByInternalTag,
  useSectionFields,
} from "@/features/candidate/document-builder/selectors";
import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import { groupEveryN } from "@/lib/utils/object";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

export const EDUCATION_SECTION_ITEMS_COUNT = 6;

const CvBuilderEducationSection = () => {
  const section = useDocumentSectionByInternalTag(
    INTERNAL_SECTION_TAGS.EDUCATION,
  );
  const fields = useSectionFields(section?.id);

  const groupedFields = groupEveryN(fields, EDUCATION_SECTION_ITEMS_COUNT);

  const { removeFields } = useRemoveFields();

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const schoolField = group[0] as DocumentSectionField;
      const degreeField = group[1] as DocumentSectionField;
      const startDateField = group[2] as DocumentSectionField;
      const endDateField = group[3] as DocumentSectionField;
      const cityField = group[4] as DocumentSectionField;
      const descriptionField = group[5] as DocumentSectionField;

      const schoolTitle = schoolField?.value;
      const startDate = startDateField?.value;
      const endDate = endDateField?.value;
      const degree = degreeField?.value;

      let triggerTitle =
        degree && schoolTitle
          ? `${degree} at ${schoolTitle}`
          : degree
            ? degree
            : schoolTitle;
      let description = `${startDate} - ${endDate}`;
      if (!schoolTitle && !degree) {
        triggerTitle = "(Untitled)";
        description = "";
      }

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.EDUCATION}-${index}`}
          triggerTitle={triggerTitle}
          triggerDescription={description}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            const removedFieldIds = group.map((field) => field.id);
            removeFields(removedFieldIds);
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput autoFocus field={schoolField} />
              <DocumentBuilderInput field={degreeField} />
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
                  presentToggleLabel="Currently study here"
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <DocumentBuilderInput field={cityField} />
              </div>
              <div className="w-full col-span-2">
                <DocumentBuilderRichTextInput
                  field={descriptionField}
                  placeholder="e.g. Graduated with High Honors"
                />
              </div>
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  return (
    <DraggableSectionContainer sectionId={section.id}>
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          {SECTION_DESCRIPTIONS_BY_TAG[INTERNAL_SECTION_TAGS.EDUCATION]}
        </p>
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.EDUCATION}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.EDUCATION}
              label="Add one more education"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.EDUCATION}
              label="Add education"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};

export default CvBuilderEducationSection;
