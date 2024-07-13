import AddSectionItemButton from "@/app/home/employee/tools/_components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/app/home/employee/tools/_components/CollapsibleSectionItemContainer";
import CvBuilderSkillLevelSelector from "@/app/home/employee/tools/_components/CvBuilderSkillLevelSelector";
import DocumentBuilderInput from "@/app/home/employee/tools/_components/DocumentBuilderInput";
import EditableSectionTitle from "@/app/home/employee/tools/_components/EditableSectionTitle";
import { useRemoveFields } from "@/app/home/employee/tools/_hooks/useRemoveFields";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils";
import type { SectionField } from "@/server/db/schema";

const SKILL_SECTION_ITEMS_COUNT = 2;

const CvBuilderSkillsSection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) => section.internalSectionTag === INTERNAL_SECTION_TAGS.SKILLS,
    ),
  );
  const sectionMetada = section?.metadata ? JSON.parse(section?.metadata) : {};
  const showExperienceLevel = sectionMetada?.showExperienceLevel || false;
  const fields = useDocumentBuilderStore((state) =>
    state.fields
      .filter((field) => field.sectionId === section?.id)
      .sort((a, b) => a.id - b.id),
  );
  const setSectionValue = useDocumentBuilderStore(
    (state) => state.setSectionValue,
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();

  const renderGroupItems = () => {
    const groupedFields = groupEveryN(fields, SKILL_SECTION_ITEMS_COUNT);

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
          triggerDescription={!showExperienceLevel ? undefined : description}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={skillField} />
              <CvBuilderSkillLevelSelector
                field={levelField}
                disabled={!showExperienceLevel}
              />
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  const handleShowExperienceLevelChange = (checked: boolean) => {
    setSectionValue({
      sectionId: section?.id as number,
      key: "metadata",
      value: JSON.stringify({
        ...sectionMetada,
        showExperienceLevel: !checked,
      }),
    });
  };

  return (
    <div className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          {SECTION_DESCRIPTIONS_BY_TAG[INTERNAL_SECTION_TAGS.SKILLS]}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Switch
            checked={showExperienceLevel === false}
            onCheckedChange={(checked) => {
              handleShowExperienceLevelChange(checked);
            }}
          />
          <Label>Don't show experience level</Label>
        </div>
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