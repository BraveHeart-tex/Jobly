"use client";
import EditableSectionTitle from "@/app/home/employee/tools/_components/EditableSectionTitle";
import {
  INTERNAL_SECTION_TAGS,
  SECTION_DESCRIPTIONS_BY_TAG,
} from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { cn, removeHTMLTags } from "@/lib/utils";
import DocumentBuilderRichTextInput from "./DocumentBuilderRichTextInput";

const CvBuilderProfessionalSummarySection = () => {
  const section = useDocumentBuilderStore((state) =>
    state.sections.find(
      (section) =>
        section.internalSectionTag ===
        INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY,
    ),
  );
  const field = useDocumentBuilderStore((state) =>
    state.fields.find((field) => field.sectionId === section?.id),
  );
  const fieldValue = useDocumentBuilderStore(
    (state) =>
      state.fieldValues.find((fieldValue) => fieldValue.fieldId === field?.id)
        ?.value,
  );

  if (!field) return;

  const renderCharCountIndicator = () => {
    const charCount = removeHTMLTags(fieldValue || "")?.length;
    const maxCount = charCount >= 400 ? 600 : 400;
    const colorClass =
      charCount === 0
        ? ""
        : charCount < 400
          ? "text-yellow-600"
          : "text-green-600";

    return (
      <p className={cn("tabular-nums whitespace-nowrap", colorClass)}>
        {charCount} / {maxCount}
        {maxCount === 400 ? "+" : ""}
      </p>
    );
  };

  return (
    <div className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          {
            SECTION_DESCRIPTIONS_BY_TAG[
              INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY
            ]
          }
        </p>
      </div>
      <DocumentBuilderRichTextInput
        field={field}
        renderLabel={false}
        placeholder="E.g. Seasoned software developer with over 8 years of experience and a proven track record of..."
      />
      <div className="w-full items-center justify-between hidden lg:flex">
        <p className="text-sm text-muted-foreground">
          Tip: Aim for 400-600 characters in your application to boost your
          chances of landing an interview.
        </p>
        <div className="text-sm text-muted-foreground text-right">
          {renderCharCountIndicator()}
        </div>
      </div>
    </div>
  );
};
export default CvBuilderProfessionalSummarySection;
