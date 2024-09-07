"use client";
import type { StepItem } from "@/hooks/useMultiStepForm";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useId } from "react";
import type { FieldErrors } from "react-hook-form";
import { Button } from "../ui/button";

interface MultiFormStepsPanelProps {
  // biome-ignore lint/suspicious/noExplicitAny: We don't need a generic argument here
  formSteps: Array<StepItem<any>>;
  currentStep: number;
  disabledSteps?: Array<number>;
  focusOnErroredFieldInStep: (
    nextStep: number,
    timeoutDuration?: number,
  ) => void;
  gotoStep: (step: number) => void;
  // biome-ignore lint/suspicious/noExplicitAny: We don't need a generic argument here
  formErrors: FieldErrors<any>;
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
          const stepHasError = step.fields.some((field) =>
            Object.keys(formErrors).includes(field as string),
          );

          return (
            <div key={step.stepTitle} className="grid gap-1 w-full">
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
                <span className={cn(stepHasError && "text-destructive")}>
                  {step.stepTitle}
                </span>
                {isCurrentStep ? (
                  <motion.div
                    layoutId={layoutId}
                    transition={{ duration: 0.2 }}
                    className="inset absolute bg-muted w-full rounded-md h-full z-[-10]"
                  />
                ) : null}
                {stepHasError ? (
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
