import AddSectionItemButton from "@/features/candidate/document-builder/components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/features/candidate/document-builder/components/CollapsibleSectionItemContainer";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";
import DocumentBuilderSelect from "@/features/candidate/document-builder/components/DocumentBuilderSelect";
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

interface CvBuilderLanguagesSectionProps {
  section: DocumentSection;
}

export const LANGUAGES_SECTION_ITEMS_COUNT = 2;
const LANGUAGE_LEVELS = [
  "Native Speaker",
  "Highly Proficient",
  "Very good command",
  "Good working knowledge",
  "Working knowledge",
  "C2",
  "C1",
  "B2",
  "B1",
  "A2",
  "A1",
];

const CvBuilderLanguagesSection = ({
  section,
}: CvBuilderLanguagesSectionProps) => {
  const fields = useSectionFields(section?.id);

  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(fields, LANGUAGES_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const languageField = group[0] as DocumentSectionField;
      const levelField = group[1] as DocumentSectionField;

      const language = languageField?.value;
      const level = levelField?.value;

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.LANGUAGES}-${index}`}
          triggerTitle={language || "(Not Specified)"}
          triggerDescription={level}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput autoFocus field={languageField} />
              <DocumentBuilderSelect
                field={levelField}
                options={LANGUAGE_LEVELS.map((level) => ({
                  value: level,
                  label: level,
                }))}
                placeholder="Select level"
              />
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  return (
    <DraggableSectionContainer sectionId={section.id} className="grid gap-2">
      <EditableSectionTitle section={section} />
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.LANGUAGES}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.LANGUAGES}
              label="Add one more language"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.LANGUAGES}
              label="Add language"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};

export default CvBuilderLanguagesSection;
