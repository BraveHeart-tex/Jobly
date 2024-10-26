import { Button } from "@/components/ui/button";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type {
  DocumentSection,
  DocumentSectionInsertModel,
} from "@/server/db/schema/documentSections";
import { api } from "@/trpc/react";
import {
  BookOpenTextIcon,
  BriefcaseBusinessIcon,
  ContactIcon,
  Flower2Icon,
  GuitarIcon,
  LanguagesIcon,
  type LucideIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

interface OtherSectionOption
  extends Omit<
    DocumentSectionInsertModel,
    "documentId" | "displayOrder" | "defaultName"
  > {
  icon: LucideIcon;
}

const OTHER_SECTION_OPTIONS: OtherSectionOption[] = [
  {
    icon: SlidersHorizontalIcon,
    name: "Custom Section",
    internalSectionTag: INTERNAL_SECTION_TAGS.CUSTOM,
    fieldsContainerType: "collapsible",
    itemCountPerContainer: 5,
  },
  {
    icon: Flower2Icon,
    name: "Extra-curricular Activities",
    internalSectionTag: INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES,
    fieldsContainerType: "collapsible",
    itemCountPerContainer: 6,
  },
  {
    icon: GuitarIcon,
    name: "Hobbies",
    internalSectionTag: INTERNAL_SECTION_TAGS.HOBBIES,
    fieldsContainerType: "static",
  },
  {
    icon: ContactIcon,
    name: "References",
    internalSectionTag: INTERNAL_SECTION_TAGS.REFERENCES,
    metadata: JSON.stringify({
      hideReferences: true,
    }),
    fieldsContainerType: "collapsible",
    itemCountPerContainer: 4,
  },
  {
    icon: BookOpenTextIcon,
    name: "Courses",
    internalSectionTag: INTERNAL_SECTION_TAGS.COURSES,
    fieldsContainerType: "collapsible",
    itemCountPerContainer: 4,
  },
  {
    icon: BriefcaseBusinessIcon,
    name: "Internships",
    internalSectionTag: INTERNAL_SECTION_TAGS.INTERNSHIPS,
    fieldsContainerType: "collapsible",
    itemCountPerContainer: 6,
  },
  {
    icon: LanguagesIcon,
    name: "Languages",
    internalSectionTag: INTERNAL_SECTION_TAGS.LANGUAGES,
    fieldsContainerType: "collapsible",
    itemCountPerContainer: 2,
  },
];

const CvBuilderCustomSectionOptions = () => {
  const documentId = useDocumentBuilderStore((state) => state.document.id);
  const addSection = useDocumentBuilderStore((state) => state.addSection);
  const addField = useDocumentBuilderStore((state) => state.addField);

  const getIsOptionAlreadyAdded = (option: OtherSectionOption) =>
    useDocumentBuilderStore
      .getState()
      .sections.some(
        (section) =>
          option.internalSectionTag !== INTERNAL_SECTION_TAGS.CUSTOM &&
          section.internalSectionTag === option.internalSectionTag,
      );

  const { mutate: addSectionByInternalTag, isPending } =
    api.document.addSectionByInternalTag.useMutation({
      onSuccess: ({ section, fields }) => {
        addSection(section as DocumentSection);
        for (const field of fields) {
          addField(field);
        }
      },
    });

  const handleAddSection = (option: OtherSectionOption) => {
    const {
      name,
      internalSectionTag,
      fieldsContainerType,
      itemCountPerContainer,
    } = option;

    const finalDisplayOrder =
      Math.max(
        ...useDocumentBuilderStore
          .getState()
          .sections.map((section) => section.displayOrder),
      ) + 1;

    addSectionByInternalTag({
      documentId,
      name,
      internalSectionTag,
      fieldsContainerType: fieldsContainerType || "collapsible",
      displayOrder: finalDisplayOrder,
      itemCountPerContainer,
      defaultName: name,
    });
  };

  return (
    <div className="grid mt-12 gap-2 pb-10">
      <h3 className="whitespace-pre text-[22px] font-semibold">Add Section</h3>
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-2">
        {OTHER_SECTION_OPTIONS.map((option) => (
          <Button
            disabled={isPending || getIsOptionAlreadyAdded(option)}
            key={option.name}
            variant="ghost"
            className="flex items-center gap-2 w-full justify-start py-6 hover:text-primary"
            onClick={() => handleAddSection(option)}
          >
            <option.icon size={26} strokeWidth={1} className="text-primary" />
            <span className="text-base font-normal">{option.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default CvBuilderCustomSectionOptions;
