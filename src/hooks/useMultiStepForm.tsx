import { TRANSITION_DURATION_MS } from "@/components/multiStepForm/AnimatedFormFieldsContainer";
import type { ExtendedUseFormReturn } from "@/lib/hook-form/useExtendedForm";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";

export interface StepItem<T extends FieldValues = FieldValues> {
  stepTitle: string;
  fields: Array<Partial<keyof T>>;
}

interface useMultiStepFormProps<T extends FieldValues = FieldValues> {
  steps: Array<StepItem<T>>;
  form: ExtendedUseFormReturn<T, undefined, undefined>;
  disabledSteps?: Array<number>;
}

export const useMultiStepForm = <T extends FieldValues>({
  form,
  steps,
  disabledSteps = [],
}: useMultiStepFormProps<T>) => {
  const [currentStep, setCurrentStep] = useState(1);

  const getIsStepDisabled = (step: number) => disabledSteps?.includes(step);

  const handleStepChange = (type: "next" | "prev") => {
    const nextStepValue = type === "next" ? currentStep + 1 : currentStep - 1;
    const isStepDisabled = getIsStepDisabled(nextStepValue);
    if (isStepDisabled) return;

    setCurrentStep(nextStepValue);
    focusOnErroredFieldInStep(nextStepValue);
  };

  const goToStepByKey = (key: keyof T) => {
    const stepIndex = steps.findIndex((step) => step.fields.includes(key));
    if (stepIndex === -1) return;
    gotoStep(stepIndex + 1);
    focusField(key);
  };

  const gotoStep = (step: number) => {
    setCurrentStep(step);
    focusOnErroredFieldInStep(step);
  };

  const focusOnErroredFieldInStep = (
    nextStep: number,
    timeoutDuration: number = TRANSITION_DURATION_MS,
  ) => {
    const erroredKeys = form.getErroredKeys() as Array<Path<T>>;

    if (!erroredKeys || erroredKeys.length === 0) {
      return;
    }

    const stepsWithErrors = getErroredSteps(erroredKeys);
    if (!stepsWithErrors.includes(nextStep)) {
      return;
    }

    const firstErroredFieldKey = erroredKeys.find((key) => {
      const stepIndex = nextStep - 1;
      const step = steps[stepIndex];
      return step?.fields?.includes(key);
    });

    if (!firstErroredFieldKey) {
      return;
    }

    focusField(firstErroredFieldKey, timeoutDuration);
  };

  const focusField = (
    key: keyof T,
    timeoutDuration: number = TRANSITION_DURATION_MS,
  ) => {
    setTimeout(() => {
      form.setFocus(key as Path<T>);
    }, timeoutDuration);
  };

  const getErroredSteps = (erroredFieldKeys: Array<keyof T>) => {
    return steps
      .map((step, index) => {
        const stepHasErrors = step.fields.some((field) =>
          erroredFieldKeys.includes(field),
        );
        return stepHasErrors ? index + 1 : null;
      })
      .filter((step) => step !== null);
  };

  const goToFirstErroredStep = (erroredFieldKeys: Path<T>[]) => {
    const stepsWithErrors = getErroredSteps(erroredFieldKeys);
    gotoStep(stepsWithErrors[0] as number);
  };

  return {
    currentStep,
    setCurrentStep,
    getErroredSteps,
    focusOnErroredFieldInStep,
    gotoStep,
    handleStepChange,
    goToFirstErroredStep,
    goToStepByKey,
  };
};
