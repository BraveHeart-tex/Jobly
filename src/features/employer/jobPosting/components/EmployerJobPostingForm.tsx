"use client";

import EditorInput from "@/components/common/EditorInput";
import SelectInput from "@/components/common/SelectInput";
import DateInput from "@/components/common/dateInput/DateInput";
import AnimatedFormFieldsContainer from "@/components/multiStepForm/AnimatedFormFieldsContainer";
import MultiFormStepsPanel from "@/components/multiStepForm/MultiFormStepsPanel";
import MultiStepFormSummary from "@/components/multiStepForm/MultiStepFormSummary";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  employmentOptions,
  workTypeOptions,
} from "@/features/candidate/jobs/components/JobListFilters";
import { useUpdateJobPosting } from "@/features/employer/jobPosting/hooks/useUpdateJobPosting";
import { type StepItem, useMultiStepForm } from "@/hooks/useMultiStepForm";
import { CONTROL_BUTTON_VARIANT } from "@/lib/constants";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import type { MakeFieldsRequired } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  capitalizeString,
  generateReadableEnumLabel,
} from "@/lib/utils/string";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import type { FieldErrors } from "react-hook-form";
import { useCreateJobPosting } from "../hooks/useCreateJobPosting";
import { useCreateSkill } from "../hooks/useCreateSkill";
import { useLoadSkillOptions } from "../hooks/useLoadSkillOptions";

import { oneWeekFromNow } from "@/validators/jobPostingValidator";
import {
  type EmployerJobPostingFormOutput,
  EmployerJobPostingFormValidator,
} from "@/validators/jobPostingFormValidator";
import type { MultiValue } from "react-select";
import BaseCreatableMultiSelect from "@/components/common/select/CreatableMultiSelect";
import type { OptionType } from "@/components/common/select/types";
import { showSuccessToast } from "@/components/toastUtils";

const jobPostingFormSteps: StepItem<EmployerJobPostingFormOutput>[] = [
  {
    stepTitle: "Job Basics",
    fields: ["title", "location", "workType", "employmentType"],
  },
  {
    stepTitle: "Skills & Salary Range",
    fields: ["skills", "salaryRange"],
  },
  {
    stepTitle: "Job Description & Expiry",
    fields: ["expiresAt", "postingContent"],
  },
  {
    stepTitle: "Review & Submit",
    fields: [],
  },
];

const JOB_BASICS_STEP = 1;
const SKILLS_AND_SALARY_STEP = 2;
const DESCRIPTION_EXPIRY_STEP = 3;
const SUMMARY_STEP = 4;

interface EmployerJobPostingFormProps {
  initialData?: MakeFieldsRequired<EmployerJobPostingFormOutput, "id">;
}

const EmployerJobPostingForm = ({
  initialData,
}: EmployerJobPostingFormProps) => {
  const router = useRouter();
  const form = useExtendedForm<EmployerJobPostingFormOutput>(
    EmployerJobPostingFormValidator,
    {
      defaultValues: {
        skills: [],
        title: "",
        location: "",
        workType: "office",
        salaryRange: "",
        postingContent: "",
        employmentType: "full-time",
        expiresAt: oneWeekFromNow,
        status: "draft",
        ...initialData,
      },
    },
  );
  const isEditMode = !!initialData;

  const goToPath = (path: string) => {
    router.push(path);
    router.refresh();
  };

  const { createJobPosting, isCreatingJobPosting } = useCreateJobPosting({
    onSuccess: () => {
      showSuccessToast("Job posting created successfully.");
      goToPath(EMPLOYER_ROUTES.PUBLISHED_LISTINGS);
    },
  });

  const { updateJobPosting, isUpdatingJobPosting } = useUpdateJobPosting({
    onSuccess: () => {
      showSuccessToast("Job posting updated successfully.");
      goToPath(EMPLOYER_ROUTES.PUBLISHED_LISTINGS);
    },
  });

  const { createSkill, isCreatingSkill } = useCreateSkill({
    onSuccess: (data, variables) => {
      const insertId = data[0]?.id;
      if (insertId) {
        form.setValue("skills", [
          ...form.getValues("skills"),
          {
            id: insertId,
            name: variables.name,
          },
        ]);
      }
    },
  });

  const loadSkillOptions = useLoadSkillOptions();

  const {
    currentStep,
    focusOnErroredFieldInStep,
    goToFirstErroredStep,
    gotoStep,
    handleStepChange,
    goToStepByKey,
  } = useMultiStepForm({
    steps: jobPostingFormSteps,
    form,
  });

  const onSubmit = (values: EmployerJobPostingFormOutput) => {
    if (isEditMode) {
      updateJobPosting({
        ...values,
        id: values.id as number,
      });
      return;
    }

    createJobPosting(values);
  };

  const handleCreateSkill = (name: string) => {
    createSkill({ name });
  };

  const renderFormFields = () => {
    if (currentStep === JOB_BASICS_STEP) {
      return (
        <>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Posting Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-2">
            <FormField
              control={form.control}
              name="workType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Type</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={workTypeOptions}
                      {...field}
                      placeholder="Select Work Type"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <FormControl>
                    <SelectInput
                      options={employmentOptions}
                      {...field}
                      placeholder="Select Employment Type"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </>
      );
    }

    if (currentStep === SKILLS_AND_SALARY_STEP) {
      return (
        <>
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <BaseCreatableMultiSelect
                    placeholder="Select or add skills"
                    loadOptions={loadSkillOptions}
                    ref={field.ref}
                    value={field.value.map((skill) => ({
                      label: skill?.name,
                      value: skill?.id,
                    }))}
                    onChange={(newValues) => {
                      if (!newValues) {
                        field.onChange([]);
                        return;
                      }

                      const mappedValues = (
                        newValues as MultiValue<OptionType>
                      ).map((item) => ({
                        id: Number(item.value as string),
                        name: item.label,
                      }));

                      field.onChange(mappedValues);
                    }}
                    onCreateOption={handleCreateSkill}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salaryRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (currentStep === DESCRIPTION_EXPIRY_STEP) {
      return (
        <>
          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel>Posting Expiration Date</FormLabel>
                <FormControl>
                  <DateInput
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                    showFutureDates
                    showTimeOptions
                    showPastDates={false}
                    format={DateTime.DATETIME_MED_WITH_WEEKDAY}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postingContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Posting Content</FormLabel>
                <FormControl>
                  <EditorInput
                    initialValue={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (currentStep === SUMMARY_STEP) {
      return (
        <MultiStepFormSummary<EmployerJobPostingFormOutput>
          goToStepByKey={goToStepByKey}
          summarizedSteps={[
            {
              label: "Job Posting Title",
              value: form.watch("title"),
              key: "title",
            },
            {
              label: "Location",
              value: form.watch("location"),
              key: "location",
            },
            {
              label: "Work Type",
              value: capitalizeString(form.watch("workType") || ""),
              key: "workType",
            },
            {
              label: "Employment Type",
              value: generateReadableEnumLabel(
                form.watch("employmentType") || "",
              ),
              key: "employmentType",
            },
            {
              label: "Salary Range",
              value: form.watch("salaryRange"),
              key: "salaryRange",
            },
            {
              label: "Posting Expiration Date",
              value: DateTime.fromISO(form.watch("expiresAt")).toLocaleString(
                DateTime.DATETIME_MED_WITH_WEEKDAY,
              ),
              key: "expiresAt",
            },
          ]}
        />
      );
    }
  };

  const renderControlButtons = () => {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === jobPostingFormSteps.length;
    const areControlButtonsDisabled =
      isCreatingJobPosting || isCreatingSkill || isUpdatingJobPosting;

    return (
      <div
        className={cn(
          "w-full flex items-center justify-between",
          isFirstStep && "justify-end",
        )}
      >
        {!isFirstStep && (
          <Button
            type="button"
            variant={CONTROL_BUTTON_VARIANT}
            disabled={areControlButtonsDisabled}
            onClick={() => {
              handleStepChange("prev");
            }}
          >
            Back
          </Button>
        )}
        <Button
          type={isLastStep ? "submit" : "button"}
          variant={isLastStep ? "default" : CONTROL_BUTTON_VARIANT}
          onClick={
            isLastStep
              ? undefined
              : () => {
                  handleStepChange("next");
                }
          }
          disabled={areControlButtonsDisabled}
        >
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    );
  };

  const onFormError = (errors: FieldErrors<EmployerJobPostingFormOutput>) => {
    goToFirstErroredStep(
      Object.keys(errors) as (keyof EmployerJobPostingFormOutput)[],
    );
  };

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <MultiFormStepsPanel
        currentStep={currentStep}
        focusOnErroredFieldInStep={focusOnErroredFieldInStep}
        formErrors={form.formState.errors}
        formSteps={jobPostingFormSteps}
        gotoStep={gotoStep}
        disabledSteps={[]}
        styles={{
          containerClassNames:
            "p-1 border rounded-md flex items-center justify-center lg:col-span-3 h-max",
          itemsContainerClassNames:
            "grid gap-4 grid-cols-2 lg:grid-cols-1 w-full",
        }}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onFormError)}
          key={currentStep}
          className="lg:col-span-9"
        >
          <AnimatedFormFieldsContainer>
            {renderFormFields()}
          </AnimatedFormFieldsContainer>
          <div className="mt-4">{renderControlButtons()}</div>
        </form>
      </Form>
    </div>
  );
};

export default EmployerJobPostingForm;
