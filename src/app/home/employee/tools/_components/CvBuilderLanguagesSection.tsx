import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Section, SectionField } from "@/server/db/schema";
import { useRemoveFields } from "../_hooks/useRemoveFields";
import EditableSectionTitle from "./EditableSectionTitle";
import AddSectionItemButton from "./AddSectionItemButton";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { groupEveryN } from "@/lib/utils";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderInput from "./DocumentBuilderInput";
import DocumentBuilderSelect from "./DocumentBuilderSelect";

type CvBuilderLanguagesSectionProps = {
  section: Section;
};

const LANGUAGES_SECTION_ITEMS_COUNT = 2;
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
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === section.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();

  const renderGroupItems = () => {
    const groupedFields = groupEveryN(fields, LANGUAGES_SECTION_ITEMS_COUNT);

    return groupedFields.map((group) => {
      const languageField = group[0] as SectionField;
      const levelField = group[1] as SectionField;

      const language = getFieldValueByFieldId(languageField?.id as number)
        ?.value as string;
      const level = getFieldValueByFieldId(levelField?.id as number)
        ?.value as string;

      return (
        <CollapsibleSectionItemContainer
          triggerTitle={language || "(Not Specified)"}
          triggerDescription={level}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={languageField} />
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
    <div className="grid gap-2">
      <EditableSectionTitle section={section} />
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            {renderGroupItems()}
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
    </div>
  );
};

export default CvBuilderLanguagesSection;