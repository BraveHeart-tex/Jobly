import { TRANSITION_DURATION_MS } from "@/components/multiStepForm/AnimatedFormFieldsContainer";
import type { ExtendedUseFormReturn } from "@/lib/hook-form/useExtendedForm";
import type { PartialRecord } from "@/lib/types";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";

interface useMultiStepFormProps<T extends FieldValues = FieldValues> {
  FIELD_TO_STEP_MAP: PartialRecord<keyof T, number>;
  form: ExtendedUseFormReturn<T, undefined, undefined>;
  disabledSteps?: Array<number>;
}

export const useMultiStepForm = <T extends FieldValues>({
  FIELD_TO_STEP_MAP,
  form,
  disabledSteps,
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

    const firstErroredFieldKey = erroredKeys.find(
      (key) => FIELD_TO_STEP_MAP[key] === nextStep,
    );

    if (!firstErroredFieldKey) {
      return;
    }

    setTimeout(() => {
      form.setFocus(firstErroredFieldKey);
    }, timeoutDuration);
  };

  const getErroredSteps = (
    erroredFieldKeys: Array<keyof typeof FIELD_TO_STEP_MAP>,
  ) => {
    return [
      ...new Set(
        erroredFieldKeys
          .map((field) => FIELD_TO_STEP_MAP[field])
          .filter((step): step is number => step !== undefined)
          .sort((a, b) => a - b),
      ),
    ];
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
  };
};
