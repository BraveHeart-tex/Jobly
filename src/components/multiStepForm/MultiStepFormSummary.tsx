import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SummarizedStep<T> {
  label: string;
  value?: string | null;
  key: keyof T;
}

interface MultiStepFormSummaryProps<T> {
  summarizedSteps: SummarizedStep<T>[];
  goToStepByKey: (key: keyof T) => void;
}

const MultiStepFormSummary = <T,>({
  summarizedSteps,
  goToStepByKey,
}: MultiStepFormSummaryProps<T>) => {
  return (
    <div>
      <div>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Summary
        </h2>
        <p className="text-muted-foreground">
          Please review your information before submitting.
        </p>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {summarizedSteps.map((step) => (
            <div key={step.label} className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      className="text-foreground"
                      onClick={() => goToStepByKey(step.key)}
                    >
                      <EditIcon size={20} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to "{step.label}"</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p>
                <span className="font-medium">{step.label}</span>:{" "}
                {step.value || "Not Provided"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiStepFormSummary;
