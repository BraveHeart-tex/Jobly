import { Button } from "@/components/ui/button";
import { Check, Cloud } from "lucide-react";

const DocumentBuilderPreview = () => {
  return (
    <div className="bg-muted-foreground dark:bg-secondary min-h-screen">
      <div className="h-[90vh] w-[63%] mx-auto pt-4">
        <div className="w-full flex items-center justify-end mb-2">
          <Button className="self-end">Download PDF</Button>
        </div>
        <div className="bg-background rounded-md h-full w-full" />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-muted dark:text-muted-foreground">
            <div className="relative">
              <Cloud size={28} strokeWidth={1} />
              <Check
                className="absolute top-[11px] left-[8px]"
                size={10}
                strokeWidth={2}
              />
            </div>
            <span className="text-xs">Saved</span>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};
export default DocumentBuilderPreview;
