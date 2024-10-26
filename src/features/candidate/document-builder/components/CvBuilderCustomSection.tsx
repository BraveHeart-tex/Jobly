import AddSectionItemButton from "@/features/candidate/document-builder/components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/features/candidate/document-builder/components/CollapsibleSectionItemContainer";
import DocumentBuilderDatePickerInput from "@/features/candidate/document-builder/components/DocumentBuilderDatePickerInput";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";
import DocumentBuilderRichTextInput from "@/features/candidate/document-builder/components/DocumentBuilderRichTextInput";
import DraggableSectionContainer from "@/features/candidate/document-builder/components/DraggableSectionContainer";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import SectionFieldsDndContext from "@/features/candidate/document-builder/components/SectionFieldsDndContext";
import { useRemoveFields } from "@/features/candidate/document-builder/hooks/useRemoveFields";
import { useSectionFields } from "@/features/candidate/document-builder/selectors";
import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
} from "@/lib/constants";
import { groupEveryN } from "@/lib/utils/object";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";

interface CvBuilderCustomSectionProps {
  section: DocumentSection;
}

export const CUSTOM_SECTION_ITEMS_COUNT = 5;

const CvBuilderCustomSection = ({ section }: CvBuilderCustomSectionProps) => {
  const fields = useSectionFields(section.id);

  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(fields, CUSTOM_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const nameField = group[0] as DocumentSectionField;
      const cityField = group[1] as DocumentSectionField;
      const startDateField = group[2] as DocumentSectionField;
      const endDateField = group[3] as DocumentSectionField;
      const descriptionField = group[4] as DocumentSectionField;

      const name = nameField?.value;
      const city = cityField?.value;
      const startDate = startDateField?.value;
      const endDate = endDateField?.value;

      const triggerTitle = name
        ? city
          ? `${name}, ${city}`
          : name
        : "(Not Specified)";
      const triggerDescription = startDate
        ? endDate
          ? `${startDate} - ${endDate}`
          : startDate
        : endDate
          ? endDate
          : "";

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.CUSTOM}-${index}`}
          triggerTitle={triggerTitle}
          triggerDescription={triggerDescription}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput autoFocus field={nameField} />
              <DocumentBuilderInput field={cityField} />
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
              <div className="w-full col-span-2">
                <DocumentBuilderRichTextInput field={descriptionField} />
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
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.CUSTOM}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.CUSTOM}
              label="Add one more item"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.CUSTOM}
              label="Add item"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};

export default CvBuilderCustomSection;
