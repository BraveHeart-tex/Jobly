import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils";
import type { Section, SectionField } from "@/server/db/schema";
import { useRemoveFields } from "../_hooks/useRemoveFields";
import AddSectionItemButton from "./AddSectionItemButton";
import CollapsibleSectionItemContainer from "./CollapsibleSectionItemContainer";
import DocumentBuilderInput from "./DocumentBuilderInput";
import DocumentBuilderSelect from "./DocumentBuilderSelect";
import EditableSectionTitle from "./EditableSectionTitle";
import SectionFieldsDndContext from "./SectionFieldsDndContext";

type CvBuilderLanguagesSectionProps = {
  section: Section;
};

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
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === section.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(fields, LANGUAGES_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const languageField = group[0] as SectionField;
      const levelField = group[1] as SectionField;

      const language = getFieldValueByFieldId(languageField?.id as number)
        ?.value as string;
      const level = getFieldValueByFieldId(levelField?.id as number)
        ?.value as string;

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
    </div>
  );
};

export default CvBuilderLanguagesSection;
