import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import AddSectionItemButton from "@/features/candidate/document-builder/components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/features/candidate/document-builder/components/CollapsibleSectionItemContainer";
import DocumentBuilderInput from "@/features/candidate/document-builder/components/DocumentBuilderInput";
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
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils/object";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import { parseReferencesMetadata } from "@/schemas/user/document/referencesSectionMetadataValidator";

export const REFERENCES_SECTION_ITEMS_COUNT = 4;

const CvBuilderReferencesSection = () => {
  const section = useDocumentSectionByInternalTag(
    INTERNAL_SECTION_TAGS.REFERENCES,
  );
  const fields = useSectionFields(section?.id);

  const sectionMetadata = parseReferencesMetadata(section?.metadata);
  const hideReferences = sectionMetadata?.hideReferences;

  const { removeFields } = useRemoveFields();
  const setSectionValue = useDocumentBuilderStore(
    (state) => state.setSectionValue,
  );
  const groupedFields = groupEveryN(fields, REFERENCES_SECTION_ITEMS_COUNT);

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const referentFullNameField = group[0] as DocumentSectionField;
      const companyField = group[1] as DocumentSectionField;
      const phoneField = group[2] as DocumentSectionField;
      const emailField = group[3] as DocumentSectionField;

      const referentFullName = referentFullNameField.value;
      const company = companyField.value;

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
              <DocumentBuilderInput autoFocus field={referentFullNameField} />
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
