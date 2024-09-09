"use client";
import ClientOnly from "@/components/common/ClientOnly";
import CreatableMultiSelect from "@/components/common/CreatableMultiSelect";
import DateInput from "@/components/common/DateInput";
import EditorInput from "@/components/common/EditorInput";
import SelectInput from "@/components/common/SelectInput";
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
import { type StepItem, useMultiStepForm } from "@/hooks/useMultiStepForm";
import { CONTROL_BUTTON_VARIANT } from "@/lib/constants";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { capitalizeString, cn, generateReadableEnumLabel } from "@/lib/utils";
import {
  type JobPostingSchema,
  jobPostingSchema,
} from "@/schemas/jobPostingSchema";
import { DateTime } from "luxon";
import type { FieldErrors } from "react-hook-form";
import { employmentOptions, workTypeOptions } from "./JobListFilters";

const createJobPostingFormSteps: StepItem<JobPostingSchema>[] = [
  {
    stepTitle: "Job Basics",
    fields: ["title", "location", "workType", "employmentType"],
  },
  {
    stepTitle: "Skills & Benefits",
    fields: ["skills", "benefits", "salaryRange"],
  },
  {
    stepTitle: "Job Description & Expiry",
    fields: ["postingContent", "expiresAt"],
  },
  {
    stepTitle: "Review & Submit",
    fields: [],
  },
];

const jobBenefitsDatasetExample = [
  "Health Insurance",
  "Paid Time Off",
  "Flexible Hours",
  "Retirement Plan",
  "Work From Home",
  "Gym Membership",
  "Parental Leave",
  "Professional Development",
  "Stock Options",
];

const jobSkillsDatasetExample = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "SQL",
  "HTML & CSS",
  "Python",
  "Communication",
  "Project Management",
  "Problem Solving",
];

const JOB_BASICS_STEP = 1;
const SKILLS_AND_BENEFITS_STEP = 2;
const DESCRIPTION_EXPIRY_STEP = 3;
const SUMMARY_STEP = 4;

const CreateJobPostingForm = () => {
  const form = useExtendedForm<JobPostingSchema>(
    jobPostingSchema.omit({ companyId: true }),
  );
  const isPending = false;

  const {
    currentStep,
    focusOnErroredFieldInStep,
    goToFirstErroredStep,
    gotoStep,
    handleStepChange,
  } = useMultiStepForm({
    steps: createJobPostingFormSteps,
    form,
    disabledSteps: [],
  });

  const onSubmit = (values: JobPostingSchema) => {
    console.info(values);
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

    if (currentStep === SKILLS_AND_BENEFITS_STEP) {
      return (
        <>
          <FormField
            control={form.control}
            name="benefits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Benefits</FormLabel>
                <FormControl>
                  <CreatableMultiSelect
                    placeholder="Select or add benefits"
                    options={jobBenefitsDatasetExample}
                    value={field.value}
                    onChange={(values) => {
                      field.onChange(values);
                    }}
                    onCreateOption={(value) => {
                      field.onChange([...field.value, value]);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <CreatableMultiSelect
                    placeholder="Select or add skills"
                    options={jobSkillsDatasetExample}
                    ref={field.ref}
                    value={field.value}
                    onChange={(newValues) => {
                      field.onChange(newValues);
                    }}
                    onCreateOption={(value) => {
                      field.onChange([...field.value, value]);
                    }}
                  />
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
                  <ClientOnly>
                    <DateInput
                      value={field.value}
                      onChange={field.onChange}
                      ref={field.ref}
                      showFutureDates
                      showTimeOptions
                      showPastDates={false}
                      format={DateTime.DATETIME_MED_WITH_WEEKDAY}
                    />
                  </ClientOnly>
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
        <MultiStepFormSummary
          summarizedSteps={[
            { label: "Job Posting Title", value: form.watch("title") },
            { label: "Location", value: form.watch("location") },
            {
              label: "Work Type",
              value: capitalizeString(form.watch("workType") || ""),
            },
            {
              label: "Employment Type",
              value: generateReadableEnumLabel(
                form.watch("employmentType") || "",
              ),
            },
            {
              label: "Salary Range",
              value: form.watch("salaryRange"),
            },
            {
              label: "Posting Expiration Date",
              value: DateTime.fromISO(form.watch("expiresAt")).toLocaleString(
                DateTime.DATETIME_MED_WITH_WEEKDAY,
              ),
            },
          ]}
        />
      );
    }
  };

  const renderControlButtons = () => {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === createJobPostingFormSteps.length;

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
            disabled={isPending}
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
          disabled={isPending}
        >
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    );
  };

  const onFormError = (errors: FieldErrors<JobPostingSchema>) => {
    goToFirstErroredStep(Object.keys(errors) as (keyof JobPostingSchema)[]);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <MultiFormStepsPanel
        currentStep={currentStep}
        focusOnErroredFieldInStep={focusOnErroredFieldInStep}
        formErrors={form.formState.errors}
        formSteps={createJobPostingFormSteps}
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
          className="flex flex-col h-[calc(100vh-19rem)] overflow-y-auto px-2 overflow-x-hidden lg:col-span-9 gap-8"
        >
          {renderFormFields()}
          <div>{renderControlButtons()}</div>
        </form>
      </Form>
    </div>
  );
};

export default CreateJobPostingForm;
