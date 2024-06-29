import EditableSectionTitle from "@/app/app/tools/_components/EditableSectionTitle";
import QuillEditor from "@/components/QuillEditor";
import { generateEditorModules } from "@/lib/utils";
import { Frown, Smile } from "lucide-react";

const CvBuilderProfessionalSummarySection = () => {
  // const documentDataValue = useDocumentBuilderStore(
  //   (state) => state.documentData.professionalSummary,
  // );
  // const setDocumentDataValue = useDocumentBuilderStore(
  //   (state) => state.setDocumentValue,
  // );

  const renderCharCountIndicator = () => {
    // documentDataValue?.replace(/<[^>]*>/g, "")?.length || 0;
    const charCount = 500;
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
        <Smile size={24} className="fill-green-500" />
      </div>
    );
  };

  return (
    <div className="grid gap-2">
      <div className="flex flex-col">
        <EditableSectionTitle defaultValue="Professional Summary" />
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
        value={""}
        onChange={() => {
          // setDocumentDataValue("professionalSummary", value);
        }}
      />
      <div className="w-full flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Tip: Aim for 400-600 characters in your application to boost your
          chances of landing an interview.
        </p>
        <div className="text-sm text-muted-foreground">
          {renderCharCountIndicator()}
        </div>
      </div>
    </div>
  );
};
export default CvBuilderProfessionalSummarySection;
