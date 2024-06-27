import EditableSectionTitle from "@/app/app/tools/_components/EditableSectionTitle";
import QuillEditor from "@/components/QuillEditor";
import { generateEditorModules } from "@/lib/utils";

const CvBuilderProfessionalSummarySection = () => {
  return (
    <div className="grid gap-4">
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
      />
    </div>
  );
};
export default CvBuilderProfessionalSummarySection;
