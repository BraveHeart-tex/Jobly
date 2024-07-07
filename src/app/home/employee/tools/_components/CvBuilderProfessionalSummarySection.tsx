import EditableSectionTitle from "@/app/home/employee/tools/_components/EditableSectionTitle";
import QuillEditor from "@/components/QuillEditor";
import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { generateEditorModules } from "@/lib/utils";
import { Frown, Smile } from "lucide-react";

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

  const setFieldValue = useDocumentBuilderStore(
    (state) => state.setFieldValueByFieldId,
  );

  if (!field) return;

  const renderCharCountIndicator = () => {
    const charCount = fieldValue?.replace(/<[^>]*>/g, "")?.length;

    if (!charCount) {
      return <p>0 / 400+</p>;
    }

    if (charCount < 400) {
      return (
        <div className="flex items-center gap-2">
          <p>{charCount} / 400+</p>
          <Frown size={24} className="text-gray-900" fill="orange" />
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <p>{charCount} / 600</p>
        <Smile size={24} className="fill-green-500 text-gray-900" />
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
      <QuillEditor
        modules={generateEditorModules({
          formatting: ["bold", "italic", "underline", "strike"],
          lists: true,
          links: true,
        })}
        value={fieldValue || ""}
        onChange={(value) => {
          if (!field) return;
          setFieldValue(field.id, value);
        }}
      />
      <div className="w-full flex items-center gap-4">
        <p className="text-sm text-muted-foreground w-[80%]">
          Tip: Aim for 400-600 characters in your application to boost your
          chances of landing an interview.
        </p>
        <div className="text-sm text-muted-foreground w-[20%] text-right">
          {renderCharCountIndicator()}
        </div>
      </div>
    </div>
  );
};
export default CvBuilderProfessionalSummarySection;
