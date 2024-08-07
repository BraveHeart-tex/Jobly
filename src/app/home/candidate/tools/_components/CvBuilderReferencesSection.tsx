import DraggableSectionContainer from "@/app/home/candidate/tools/_components/DraggableSectionContainer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import EditableSectionTitle from "./EditableSectionTitle";
import SectionFieldsDndContext from "./SectionFieldsDndContext";

type CvBuilderReferencesSectionProps = {
  section: Section;
};

export const REFERENCES_SECTION_ITEMS_COUNT = 4;

const CvBuilderReferencesSection = ({
  section,
}: CvBuilderReferencesSectionProps) => {
  const sectionMetadata = section?.metadata
    ? JSON.parse(section?.metadata)
    : {};
  const hideReferences = sectionMetadata?.hideReferences || false;
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field.sectionId === section?.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();
  const setSectionValue = useDocumentBuilderStore(
    (state) => state.setSectionValue,
  );
  const groupedFields = groupEveryN(fields, REFERENCES_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const referentFullNameField = group[0] as SectionField;
      const companyField = group[1] as SectionField;
      const phoneField = group[2] as SectionField;
      const emailField = group[3] as SectionField;

      const referentFullName = getFieldValueByFieldId(
        referentFullNameField?.id as number,
      )?.value as string;
      const company = getFieldValueByFieldId(companyField?.id as number)
        ?.value as string;

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.REFERENCES}-${index}`}
          triggerTitle={referentFullName || "(Not Specified)"}
          triggerDescription={company}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            removeFields(group.map((field) => field.id));
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={referentFullNameField} />
              <DocumentBuilderInput field={companyField} />
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={phoneField} />
              <DocumentBuilderInput field={emailField} />
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  const handleHideReferencesChange = (checked: boolean) => {
    setSectionValue({
      sectionId: section?.id as number,
      key: "metadata",
      value: JSON.stringify({
        ...sectionMetadata,
        hideReferences: checked,
      }),
    });
  };

  return (
    <DraggableSectionContainer sectionId={section.id} className="grid gap-2">
      <div className="grid gap-2">
        <EditableSectionTitle section={section} />
        <div className="mt-2 flex items-center gap-2">
          <Switch
            disabled={fields.length === 0}
            defaultChecked={hideReferences}
            onCheckedChange={(checked) => {
              handleHideReferencesChange(checked);
            }}
          />
          <Label>
            I'd like to hide references and make them available only upon
            request
          </Label>
        </div>
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.REFERENCES}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.REFERENCES}
              label="Add one more reference"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.REFERENCES}
              label="Add reference"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};
export default CvBuilderReferencesSection;
