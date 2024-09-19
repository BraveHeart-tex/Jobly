import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AddSectionItemButton from "@/features/candidate/document-builder/components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/features/candidate/document-builder/components/CollapsibleSectionItemContainer";
import CvBuilderSkillLevelSelector from "@/features/candidate/document-builder/components/CvBuilderSkillLevelSelector";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";
import DraggableSectionContainer from "@/features/candidate/document-builder/components/DraggableSectionContainer";
import EditableSectionTitle from "@/features/candidate/document-builder/components/EditableSectionTitle";
import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils/objectUtils";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import { useRemoveFields } from "../hooks/useRemoveFields";
import SectionFieldsDndContext from "./SectionFieldsDndContext";

export const SKILL_SECTION_ITEMS_COUNT = 2;

const CvBuilderSkillsSection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) => section.internalSectionTag === INTERNAL_SECTION_TAGS.SKILLS,
    ),
  );
  const sectionMetadata = section?.metadata
    ? JSON.parse(section?.metadata)
    : {};
  const showExperienceLevel = sectionMetadata?.showExperienceLevel || false;
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === section?.id),
  );
  const setSectionValue = useDocumentBuilderStore(
    (state) => state.setSectionValue,
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(fields, SKILL_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const skillField = group[0] as DocumentSectionField;
      const levelField = group[1] as DocumentSectionField;

      const skillValue = getFieldValueByFieldId(skillField?.id as number)
        ?.value as string;
      const levelValue = getFieldValueByFieldId(levelField?.id as number)
        ?.value as string;

      const triggerTitle = skillValue || "(Untitled)";
      const description = levelValue || "";

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.SKILLS}-${index}`}
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
        ...sectionMetadata,
        showExperienceLevel: !checked,
      }),
    });
  };

  return (
    <DraggableSectionContainer sectionId={section?.id as number}>
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          {SECTION_DESCRIPTIONS_BY_TAG[INTERNAL_SECTION_TAGS.SKILLS]}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Switch
            disabled={fields.length === 0}
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
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.SKILLS}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
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
    </DraggableSectionContainer>
  );
};

export default CvBuilderSkillsSection;
