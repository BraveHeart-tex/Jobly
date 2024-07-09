"use client";
import EditableSectionTitle from "@/app/home/employee/tools/_components/EditableSectionTitle";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
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
    const charCount = fieldValue?.replace(/<[^>]*>/g, "")?.length;

    if (!charCount) {
      return <p>0 / 400+</p>;
    }

    if (charCount < 400) {
      return (
        <div className="flex items-center gap-2 text-orange-600">
          <p>{charCount} / 400+</p>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-green-600">
        <p>{charCount} / 600</p>
      </div>
    );
  };

  return (
    <div className="grid gap-2">
      <div className="grid">
        <EditableSectionTitle section={section} />
        <p className="text-sm text-muted-foreground">
          Craft 2-4 short and energetic sentences to captivate your reader!
          Highlight your role, experience, and most importantly, your greatest
          achievements, best qualities, and top skills.
        </p>
      </div>
      <DocumentBuilderRichTextInput field={field} renderLabel={false} />
      <div className="w-full items-center gap-10 justify-between hidden lg:flex">
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
