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
import { groupEveryN } from "@/lib/utils/object";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import { useRemoveFields } from "@/features/candidate/document-builder/hooks/useRemoveFields";
import SectionFieldsDndContext from "@/features/candidate/document-builder/components/SectionFieldsDndContext";
import {
  type SkillMetadataKey,
  parseSkillsMetadata,
} from "@/schemas/user/document/skillsSectionMetadataValidator";
import {
  useDocumentSectionByInternalTag,
  useSectionFields,
} from "@/features/candidate/document-builder/selectors";

export const SKILL_SECTION_ITEMS_COUNT = 2;

const CvBuilderSkillsSection = () => {
  const section = useDocumentSectionByInternalTag(INTERNAL_SECTION_TAGS.SKILLS);
  const sectionMetadata = parseSkillsMetadata(section?.metadata);
  const showExperienceLevel = sectionMetadata?.showExperienceLevel;
  const isCommaSeparated = sectionMetadata?.isCommaSeparated;

  const fields = useSectionFields(section?.id);
  const setSectionValue = useDocumentBuilderStore(
    (state) => state.setSectionValue,
  );

  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(fields, SKILL_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const skillField = group[0] as DocumentSectionField;
      const levelField = group[1] as DocumentSectionField;

      const skillValue = skillField?.value;
      const levelValue = levelField?.value;

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
              <DocumentBuilderInput autoFocus field={skillField} />
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

  const updateSectionMetadata = (
    key: SkillMetadataKey,
    value: boolean,
    prevSectionMetadata?: typeof sectionMetadata,
  ) => {
    setSectionValue({
      sectionId: section?.id as number,
      key: "metadata",
      value: JSON.stringify({
        ...(prevSectionMetadata || sectionMetadata),
        [key]: value,
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
            disabled={fields.length === 0 || isCommaSeparated}
            checked={showExperienceLevel}
            onCheckedChange={(checked) => {
              updateSectionMetadata("showExperienceLevel", checked);
            }}
          />
          <Label>Show experience level</Label>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Switch
            disabled={fields.length === 0}
            checked={isCommaSeparated}
            onCheckedChange={(checked) => {
              if (checked && showExperienceLevel) {
                updateSectionMetadata("showExperienceLevel", false, {
                  ...sectionMetadata,
                  isCommaSeparated: true,
                });
                return;
              }

              updateSectionMetadata("isCommaSeparated", checked);
            }}
          />
          <Label>Comma separated</Label>
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
