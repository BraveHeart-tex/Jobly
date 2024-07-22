import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
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
import SectionFieldsDndContext from "./SectionFieldsDndContext";

export const EDUCATION_SECTION_ITEMS_COUNT = 6;

const CvBuilderEducationSection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) =>
        section.internalSectionTag === INTERNAL_SECTION_TAGS.EDUCATION,
    ),
  ) as Section;
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field?.sectionId === section.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const groupedFields = groupEveryN(fields, EDUCATION_SECTION_ITEMS_COUNT);

  const { removeFields } = useRemoveFields();

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const schoolField = group[0] as SectionField;
      const degreeField = group[1] as SectionField;
      const startDateField = group[2] as SectionField;
      const endDateField = group[3] as SectionField;
      const cityField = group[4] as SectionField;
      const descriptionField = group[5] as SectionField;

      const schoolTitle = getFieldValueByFieldId(schoolField?.id as number)
        ?.value as string;
      const startDate = getFieldValueByFieldId(startDateField?.id as number)
        ?.value as string;
      const endDate = getFieldValueByFieldId(endDateField?.id as number)
        ?.value as string;
      const degree = getFieldValueByFieldId(degreeField?.id as number)
        ?.value as string;

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
              <DocumentBuilderInput field={schoolField} />
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
    <div className="grid gap-2">
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
    </div>
  );
};

export default CvBuilderEducationSection;
