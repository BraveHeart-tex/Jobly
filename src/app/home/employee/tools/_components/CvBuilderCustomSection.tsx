import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils";
import type { Section, SectionField } from "@/server/db/schema";
import { useRemoveFields } from "../_hooks/useRemoveFields";
import AddSectionItemButton from "./AddSectionItemButton";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderDatePickerInput from "./DocumentBuilderDatePickerInput";
import DocumentBuilderInput from "./DocumentBuilderInput";
import DocumentBuilderRichTextInput from "./DocumentBuilderRichTextInput";
import EditableSectionTitle from "./EditableSectionTitle";

type CvBuilderCustomSectionProps = {
  section: Section;
};

const CUSTOM_SECTION_ITEMS_COUNT = 5;

const CvBuilderCustomSection = ({ section }: CvBuilderCustomSectionProps) => {
  const fields = useDocumentBuilderStore((state) =>
    state.fields
      .filter((field) => field.sectionId === section?.id)
      .sort((a, b) => a.id - b.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();

  const renderGroupItems = () => {
    const groupedFields = groupEveryN(fields, CUSTOM_SECTION_ITEMS_COUNT);

    return groupedFields.map((group) => {
      const nameField = group[0] as SectionField;
      const cityField = group[1] as SectionField;
      const startDateField = group[2] as SectionField;
      const endDateField = group[3] as SectionField;
      const descriptionField = group[4] as SectionField;

      const name = getFieldValueByFieldId(nameField?.id as number)
        ?.value as string;
      const city = getFieldValueByFieldId(cityField?.id as number)
        ?.value as string;
      const startDate = getFieldValueByFieldId(startDateField?.id as number)
        ?.value as string;
      const endDate = getFieldValueByFieldId(endDateField?.id as number)
        ?.value as string;

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
          triggerTitle={triggerTitle}
          triggerDescription={triggerDescription}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={nameField} />
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
    <div className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            {renderGroupItems()}
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
    </div>
  );
};

export default CvBuilderCustomSection;