"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CtxUserAttributes } from "@/lib/auth";
import { type StepItem, useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import userProfileFormSchema, {
  type UserProfileFormSchema,
} from "@/schemas/user/userProfileFormSchema";

const profileFormSteps: StepItem<UserProfileFormSchema>[] = [
  {
    stepTitle: "Personal Details",
    fields: [],
  },
  {
    stepTitle: "Work Experience",
    fields: [],
  },
  {
    stepTitle: "Education",
    fields: [],
  },
  {
    stepTitle: "Skills",
    fields: [],
  },
];

interface EditUserProfileFormProps {
  user: CtxUserAttributes;
}

const EditUserProfileForm = ({ user }: EditUserProfileFormProps) => {
  const form = useExtendedForm(userProfileFormSchema);

  const {
    currentStep,
    setCurrentStep,
    focusOnErroredFieldInStep,
    goToFirstErroredStep,
    gotoStep,
    handleStepChange,
    goToStepByKey,
  } = useMultiStepForm({
    steps: profileFormSteps,
    form,
  });

  return (
    <div>
      <nav
        className="flex space-x-1 rounded-lg bg-muted p-1 overflow-x-auto w-full rounded-b-none"
        aria-label="Tabs"
      >
        {profileFormSteps.map((step, index) => {
          const stepValue = index + 1;
          return (
            <button
              type="button"
              onClick={() => setCurrentStep(stepValue)}
              key={step.stepTitle}
              className={cn(
                "w-full rounded-md px-3 py-1.5 text-sm font-medium leading-5 text-muted-foreground relative whitespace-nowrap",
              )}
              aria-current={currentStep === stepValue ? "page" : undefined}
            >
              {currentStep === stepValue && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-background rounded-md"
                  style={{ borderRadius: 6 }}
                  transition={{ type: "spring", duration: 0.6, bounce: 0.1 }}
                />
              )}
              <span className="relative z-10">{step.stepTitle}</span>
            </button>
          );
        })}
      </nav>
      <div className="w-full overflow-auto p-4 rounded-md border rounded-t-none h-[calc(100vh-13rem)]">
        {currentStep === 1 && (
          <div>
            <div className="grid gap-2">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Personal Information
              </h2>
              <p className="text-muted-foreground text-sm">
                Provide your basic personal details.
              </p>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <div className="grid gap-2">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Work Experience
              </h2>
              <p className="text-muted-foreground text-sm">
                Add your most recent work experience.
              </p>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <div className="grid gap-2">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Education
              </h2>
              <p className="text-muted-foreground text-sm">
                Add your educational background.
              </p>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div>
            <div className="grid gap-2">
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Skills
              </h2>
              <p className="text-muted-foreground text-sm">
                Highlight your skills and proficiency levels.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUserProfileForm;
