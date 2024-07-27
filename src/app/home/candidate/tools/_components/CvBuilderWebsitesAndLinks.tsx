import AddSectionItemButton from "@/app/home/candidate/tools/_components/AddSectionItemButton";
import CollapsibleSectionItemContainer from "@/app/home/candidate/tools/_components/CollapsibleSectionItemContainer";
import DocumentBuilderInput from "@/app/home/candidate/tools/_components/DocumentBuilderInput";
import DraggableSectionContainer from "@/app/home/candidate/tools/_components/DraggableSectionContainer";
import EditableSectionTitle from "@/app/home/candidate/tools/_components/EditableSectionTitle";
import { useRemoveFields } from "@/app/home/candidate/tools/_hooks/useRemoveFields";
import {
  FIELDS_DND_INDEX_PREFIXES,
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { groupEveryN } from "@/lib/utils";
import type { Section, SectionField } from "@/server/db/schema";
import SectionFieldsDndContext from "./SectionFieldsDndContext";

export const WEBSITES_SOCIAL_LINKS_SECTION_ITEMS_COUNT = 2;

const CvBuilderWebsitesAndLinks = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) =>
        section.internalSectionTag ===
        INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS,
    ),
  ) as Section;
  const fields = useDocumentBuilderStore((state) =>
    state.fields.filter((field) => field?.sectionId === section.id),
  );
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const { removeFields } = useRemoveFields();
  const groupedFields = groupEveryN(
    fields,
    WEBSITES_SOCIAL_LINKS_SECTION_ITEMS_COUNT,
  );

  const renderGroupItems = () => {
    return groupedFields.map((group, index) => {
      const labelField = group[0] as SectionField;
      const linkField = group[1] as SectionField;

      const labelValue = getFieldValueByFieldId(labelField?.id as number)
        ?.value as string;
      const linkValue = getFieldValueByFieldId(linkField?.id as number)
        ?.value as string;

      const triggerTitle = labelValue || "(Untitled)";
      const description = linkValue || "";

      return (
        <CollapsibleSectionItemContainer
          id={`${FIELDS_DND_INDEX_PREFIXES.WEBSITES_AND_LINKS}-${index}`}
          triggerTitle={triggerTitle}
          triggerDescription={description}
          key={group[0]?.id}
          onDeleteItemClick={() => {
            const deletedFieldIds = group.map((field) => field.id);
            removeFields(deletedFieldIds);
          }}
        >
          <div className="grid gap-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <DocumentBuilderInput field={labelField} />
              <DocumentBuilderInput field={linkField} />
            </div>
          </div>
        </CollapsibleSectionItemContainer>
      );
    });
  };

  return (
    <DraggableSectionContainer sectionId={section.id}>
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          {
            SECTION_DESCRIPTIONS_BY_TAG[
              INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS
            ]
          }
        </p>
      </div>
      <div>
        {fields.length > 0 ? (
          <div className="grid gap-2">
            <SectionFieldsDndContext
              groupedFields={groupedFields}
              indexPrefix={FIELDS_DND_INDEX_PREFIXES.WEBSITES_AND_LINKS}
            >
              {renderGroupItems()}
            </SectionFieldsDndContext>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS}
              label="Add one more link"
            />
          </div>
        ) : (
          <div>
            <AddSectionItemButton
              sectionId={section?.id as number}
              templateOption={INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS}
              label="Add link"
            />
          </div>
        )}
      </div>
    </DraggableSectionContainer>
  );
};

export default CvBuilderWebsitesAndLinks;
