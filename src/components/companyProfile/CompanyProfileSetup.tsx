"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type CompanyProfileSetupSchema,
  companyProfileSetupSchema,
} from "@/schemas/companyProfileSetupSchema";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import type { FieldErrors } from "react-hook-form";
import {
  BASIC_INFORMATION_STEP,
  COMPANY_DESCRIPTION_STEP,
  COMPANY_DETAILS_STEP,
  COMPANY_PROFILE_SETUP_STEPS,
  CONTROL_BUTTON_VARIANT,
  FIELD_TO_STEP_MAP,
  STEP_TO_FIELDS_MAP,
  SUMMARY_STEP,
} from "./constants";
import type { CompanyProfileSetupFormKey } from "./types";
import AnimatedFormFieldsContainer, {
  TRANSITION_DURATION_MS,
} from "./AnimatedFormFieldsContainer";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AutoComplete from "../AutoComplete";
import { INDUSTRIES_DATASET } from "@/lib/datasets";

const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1,000",
  "1,001-5,000",
  "5,001-10,000",
  "10,001+",
];

const CompanyProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { mutate: registerCompanyDetails, isPending } =
    api.company.registerCompanyDetails.useMutation({
      onSuccess: () => {
        toast.success("Company details registered successfully.");
        router.refresh();
      },
    });

  const form = useExtendedForm<CompanyProfileSetupSchema>(
    companyProfileSetupSchema,
  );

  const onSubmit = (values: CompanyProfileSetupSchema) => {
    registerCompanyDetails(values);
  };

  const renderFormFields = () => {
    if (currentStep === BASIC_INFORMATION_STEP) {
      return (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <AutoComplete
                    options={INDUSTRIES_DATASET.map((d) => ({
                      label: d,
                      value: d,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Website</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (currentStep === COMPANY_DETAILS_STEP) {
      return (
        <>
          <FormField
            control={form.control}
            name="yearOfEstablishment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Establishment</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Size</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companySizeOptions.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (currentStep === COMPANY_DESCRIPTION_STEP) {
      return (
        <>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Company Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    placeholder={`Think of this as the company's "mission statement" or "value proposition".`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed Overview</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" rows={7} />
                </FormControl>
                <FormDescription>
                  Provide an overview of your company, including its founding
                  year, what it does, its mission, and what makes it unique
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    }

    if (currentStep === SUMMARY_STEP) {
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div>
                <div className="grid gap-2">
                  <p>
                    <span className="font-medium">Company Name</span>:{" "}
                    {form.getValues("name")}
                  </p>
                  <p>
                    <span className="font-medium">Industry</span>:{" "}
                    {form.getValues("industry")}
                  </p>
                  <p>
                    <span className="font-medium">Company Website</span>:{" "}
                    {form.getValues("website")}
                  </p>
                </div>
              </div>
              <div>
                <div className="grid gap-2">
                  <p>
                    <span className="font-medium">Year of Establishment</span>:{" "}
                    {form.getValues("yearOfEstablishment")}
                  </p>
                  <p>
                    <span className="font-medium">Company Size</span>:{" "}
                    {form.getValues("companySize")} employees
                  </p>
                  <p>
                    <span className="font-medium">Address</span>:{" "}
                    {form.getValues("address")}
                  </p>
                </div>
              </div>
              <div>
                <div className="grid gap-2">
                  <p>
                    <span className="font-medium">Short Bio</span>:{" "}
                    {form.getValues("bio")}
                  </p>
                  <p>
                    <span className="font-medium">Detailed Overview</span>:{" "}
                    {form.getValues("description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderControlButtons = () => {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === COMPANY_PROFILE_SETUP_STEPS.length;

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

  const handleStepChange = (type: "next" | "prev") => {
    const nextStepValue = type === "next" ? currentStep + 1 : currentStep - 1;
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
    const erroredKeys =
      form.getErroredKeys() as Array<CompanyProfileSetupFormKey>;

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

  const onFormError = (errors: FieldErrors<CompanyProfileSetupSchema>) => {
    const erroredFieldKeys = Object.keys(
      errors,
    ) as Array<CompanyProfileSetupFormKey>;

    const stepsWithErrors = getErroredSteps(erroredFieldKeys);

    gotoStep(stepsWithErrors[0] as number);
  };

  const getErroredSteps = (
    erroredFieldKeys: Array<CompanyProfileSetupFormKey>,
  ) => {
    return [
      ...new Set(
        erroredFieldKeys
          .map((field) => FIELD_TO_STEP_MAP[field])
          .sort((a, b) => a - b),
      ),
    ];
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="p-1 border rounded-md flex items-center justify-center lg:col-span-3 h-max">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-1 w-full">
            {COMPANY_PROFILE_SETUP_STEPS.map((step, index) => {
              const stepValue = index + 1;
              const isCurrentStep = stepValue === currentStep;
              const hasError = Object.keys(form.formState.errors).find((key) =>
                STEP_TO_FIELDS_MAP[stepValue]?.includes(key),
              );
              return (
                <div key={step.label} className="grid gap-1 w-full">
                  <span className="text-xs text-muted-foreground">
                    Step {stepValue}
                  </span>
                  <Button
                    variant="ghost"
                    className="relative hover:bg-muted/45"
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
                        layoutId="active-step-transition"
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
        <div className="lg:col-span-9">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onFormError)}
              className="grid gap-4 h-[calc(100vh-30rem)] overflow-y-auto px-2 overflow-x-hidden"
              key={currentStep}
            >
              <AnimatedFormFieldsContainer>
                {renderFormFields()}
              </AnimatedFormFieldsContainer>

              <div className="self-end">{renderControlButtons()}</div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CompanyProfileSetup;
