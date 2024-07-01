import { Button } from "@/components/ui/button";
import DebouncedDocumentSaver from "./DebouncedDocumentSaver";

const DocumentBuilderPreview = () => {
  return (
    <div className="bg-muted-foreground dark:bg-secondary min-h-screen">
      <div className="h-[90vh] w-[63%] mx-auto pt-4">
        <div className="w-full flex items-center justify-end mb-2">
          <Button className="self-end">Download PDF</Button>
        </div>
        <div className="bg-background rounded-md h-full w-full" />
        <DebouncedDocumentSaver />
      </div>
    </div>
  );
};
export default DocumentBuilderPreview;
