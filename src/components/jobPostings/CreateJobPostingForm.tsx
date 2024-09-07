"use client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type StepItem, useMultiStepForm } from "@/hooks/useMultiStepForm";
import { CONTROL_BUTTON_VARIANT } from "@/lib/constants";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { cn } from "@/lib/utils";
import {
  type JobPostingSchema,
  jobPostingSchema,
} from "@/schemas/jobPostingSchema";
import { DateTime } from "luxon";
import type { FieldErrors } from "react-hook-form";
import DateInput from "../DateInput";
import EditorInput from "../EditorInput";
import MultiFormStepsPanel from "../multiStepForm/MultiFormStepsPanel";
import ClientOnly from "../tools/ClientOnly";
import { employmentOptions, workTypeOptions } from "./JobListFilters";

const createJobPostingFormSteps: StepItem<JobPostingSchema>[] = [
  {
    stepTitle: "Preview Details",
    fields: ["title", "location", "workType", "employmentType", "salaryRange"],
  },
  {
    stepTitle: "Posting Description",
    fields: ["postingContent", "expiresAt"],
  },
  {
    stepTitle: "Summary",
    fields: [],
  },
];

const CreateJobPostingForm = () => {
  const form = useExtendedForm<JobPostingSchema>(
    jobPostingSchema.omit({ companyId: true }),
  );
  // TODO: Will remove later
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
    if (currentStep === 1) {
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
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full" ref={field.ref}>
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {workTypeOptions.map((option) => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full" ref={field.ref}>
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentOptions.map((option) => (
                          <SelectItem value={option.value} key={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

    if (currentStep === 2) {
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

    if (currentStep === 3) {
      return "Summary";
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
    <>
      <style jsx global>{`
      .tiptap.ProseMirror {
        min-height: 200px;
        padding: 10px;
        background: hsl(var(--background));
      }

      .editor-input-container {
        border: 1px solid hsl(var(--input));
      }

      .editor-input-menubar {
        border-bottom: 1px solid hsl(var(--input));
      }
    `}</style>
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
    </>
  );
};

export default CreateJobPostingForm;
