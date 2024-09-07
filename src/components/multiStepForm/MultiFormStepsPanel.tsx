"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useId } from "react";
import type { FieldErrors } from "react-hook-form";

interface MultiFormStepsPanelProps {
  formSteps: {
    label: string;
  }[];
  currentStep: number;
  disabledSteps?: Array<number>;
  focusOnErroredFieldInStep: (
    nextStep: number,
    timeoutDuration?: number,
  ) => void;
  gotoStep: (step: number) => void;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  formErrors: FieldErrors<any>;
  STEP_TO_FIELDS_MAP: Record<number, string[]>;
  styles?: {
    containerClassNames: string;
    itemsContainerClassNames: string;
  };
}

const MultiFormStepsPanel = ({
  formSteps,
  disabledSteps,
  currentStep,
  focusOnErroredFieldInStep,
  gotoStep,
  formErrors,
  STEP_TO_FIELDS_MAP,
  styles,
}: MultiFormStepsPanelProps) => {
  const layoutId = useId();

  return (
    <div className={styles?.containerClassNames}>
      <div className={styles?.itemsContainerClassNames}>
        {formSteps.map((step, index) => {
          const stepValue = index + 1;
          const isDisabled = disabledSteps?.includes(stepValue);
          const isCurrentStep = stepValue === currentStep;
          const hasError = Object.keys(formErrors).find((key) =>
            STEP_TO_FIELDS_MAP[stepValue]?.includes(key),
          );
          return (
            <div key={step.label} className="grid gap-1 w-full">
              <span className="text-xs text-muted-foreground">
                Step {stepValue}
              </span>
              <Button
                variant="ghost"
                className={cn(
                  "relative hover:bg-muted/45",
                  isDisabled && "pointer-events-none opacity-40",
                )}
                onClick={() => {
                  if (isCurrentStep) {
                    focusOnErroredFieldInStep(stepValue, 0);
                    return;
                  }

                  gotoStep(stepValue);
                }}
              >
                <span className={cn(hasError && "text-destructive")}>
                  {step.label}
                </span>
                {isCurrentStep ? (
                  <motion.div
                    layoutId={layoutId}
                    transition={{ duration: 0.2 }}
                    className="inset absolute bg-muted w-full rounded-md h-full z-[-10]"
                  />
                ) : null}
                {hasError ? (
                  <motion.div
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bg-destructive top-[2px] left-[2px] rounded-full size-2 z-[5]"
                  />
                ) : null}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiFormStepsPanel;
