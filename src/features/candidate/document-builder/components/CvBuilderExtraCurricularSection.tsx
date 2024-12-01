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
} from "@/lib/constants";
import { groupEveryN } from "@/lib/utils/object";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

export const EXTRA_CURRICULAR_SECTION_ITEMS_COUNT = 6;

const CvBuilderExtraCurricularSection = () => {
  const section = useDocumentSectionByInternalTag(
    INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES,
  );
  const fields = useSectionFields(section.id);

  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(
    fields,
    EXTRA_CURRICULAR_SECTION_ITEMS_COUNT,
  );

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const functionTitleField = group[0] as DocumentSectionField;
      const startDateField = group[1] as DocumentSectionField;
      const endDateField = group[2] as DocumentSectionField;
      const employerField = group[3] as DocumentSectionField;
      const cityField = group[4] as DocumentSectionField;
      const descriptionField = group[5] as DocumentSectionField;

      const functionTitle = functionTitleField?.value;

      const startDate = startDateField?.value;
      const endDate = endDateField?.value;

      const employer = employerField?.value;

      let triggerTitle = functionTitle
        ? `${employer ? `${functionTitle} at ${employer}` : functionTitle}`
        : employer;

      let description = `${startDate} - ${endDate}`;
      if (!functionTitle && !employer) {
        triggerTitle = "(Untitled)";
        description = "";
      }

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.EXTRA_CURRICULAR_ACTIVITIES}-${index}`}
          triggerTitle={triggerTitle}
          triggerDescription={description}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput autoFocus field={functionTitleField} />
              <DocumentBuilderInput field={employerField} />
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
                  presentToggleLabel="Currently Working"
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <DocumentBuilderInput field={cityField} />
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
    <DraggableSectionContainer sectionId={section.id} className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={
                FIELDS_DND_INDEX_PREFIXES.EXTRA_CURRICULAR_ACTIVITIES
              }
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES}
              label="Add one more activity"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES}
              label="Add activity"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};

export default CvBuilderExtraCurricularSection;
