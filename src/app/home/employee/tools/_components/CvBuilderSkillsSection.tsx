import AddSectionItemButton from "@/app/home/employee/tools/_components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/app/home/employee/tools/_components/CollapsibleSectionItemContainer";
import CvBuilderSkillLevelSelector from "@/app/home/employee/tools/_components/CvBuilderSkillLevelSelector";
import DocumentBuilderInput from "@/app/home/employee/tools/_components/DocumentBuilderInput";
import EditableSectionTitle from "@/app/home/employee/tools/_components/EditableSectionTitle";
import { useRemoveFields } from "@/app/home/employee/tools/_hooks/useRemoveFields";
import {
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils";
import type { SectionField } from "@/server/db/schema";

const CvBuilderSkillsSection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) => section.internalSectionTag === INTERNAL_SECTION_TAGS.SKILLS,
    ),
  );
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
    const groupedFields = groupEveryN(fields, 2);

    return groupedFields.map((group) => {
      const skillField = group[0] as SectionField;
      const levelField = group[1] as SectionField;

      const skillValue = getFieldValueByFieldId(skillField?.id as number)
        ?.value as string;
      const levelValue = getFieldValueByFieldId(levelField?.id as number)
        ?.value as string;

      const triggerTitle = skillValue || "(Untitled)";
      const description = levelValue || "";

      return (
        <CollapsibleSectionItemContainer
          triggerTitle={triggerTitle}
          triggerDescription={description}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={skillField} />
              {/*<DocumentBuilderInput field={levelField} />*/}
              <CvBuilderSkillLevelSelector field={levelField} />
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
          {SECTION_DESCRIPTIONS_BY_TAG[INTERNAL_SECTION_TAGS.SKILLS]}
        </p>
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            {renderGroupItems()}
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.SKILLS}
              label="Add one more skill"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.SKILLS}
              label="Add skill"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CvBuilderSkillsSection;
