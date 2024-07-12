import { Button } from "@/components/ui/button";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { Section, SectionInsertModel } from "@/server/db/schema";
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

type OtherSectionOption = {
  icon: LucideIcon;
} & Omit<SectionInsertModel, "documentId" | "displayOrder">;

const OTHER_SECTION_OPTIONS: OtherSectionOption[] = [
  {
    icon: SlidersHorizontalIcon,
    name: "Custom Section",
    internalSectionTag: INTERNAL_SECTION_TAGS.CUSTOM,
  },
  {
    icon: Flower2Icon,
    name: "Extra-curricular Activities",
    internalSectionTag: INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES,
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
  },
  {
    icon: BookOpenTextIcon,
    name: "Courses",
    internalSectionTag: INTERNAL_SECTION_TAGS.COURSES,
  },
  {
    icon: BriefcaseBusinessIcon,
    name: "Internships",
    internalSectionTag: INTERNAL_SECTION_TAGS.INTERNSHIP,
  },
  {
    icon: LanguagesIcon,
    name: "Languages",
    internalSectionTag: INTERNAL_SECTION_TAGS.LANGUAGES,
  },
];

const CvBuilderCustomSectionOptions = () => {
  const documentId = useDocumentBuilderStore((state) => state.document.id);
  const sections = useDocumentBuilderStore((state) => state.sections);
  const addSection = useDocumentBuilderStore((state) => state.addSection);
  const addField = useDocumentBuilderStore((state) => state.addField);
  const addFieldValue = useDocumentBuilderStore((state) => state.addFieldValue);

  const getIsOptionAlreadyAdded = (option: OtherSectionOption) =>
    sections.some(
      (section) =>
        option.internalSectionTag !== INTERNAL_SECTION_TAGS.CUSTOM &&
        section.internalSectionTag === option.internalSectionTag,
    );

  const { mutate: addSectionByInternalTag, isPending } =
    api.document.addSectionByInternalTag.useMutation({
      onSuccess: ({ section, fields, fieldValues }) => {
        addSection(section as Section);
        for (const field of fields) {
          addField(field);
        }
        for (const fieldValue of fieldValues) {
          addFieldValue(fieldValue);
        }
      },
    });

  const handleAddSection = (option: OtherSectionOption) => {
    const { name, internalSectionTag, fieldsContainerType } = option;
    const finalDisplayOrder =
      Math.max(...sections.map((section) => section.displayOrder)) + 1;
    const insertDto: SectionInsertModel = {
      documentId,
      name,
      internalSectionTag,
      fieldsContainerType: fieldsContainerType || "collapsible",
      displayOrder: finalDisplayOrder,
    };
    addSectionByInternalTag(insertDto);
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
