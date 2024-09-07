"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import { INDUSTRIES_DATASET } from "@/lib/datasets";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { cn, isObjectEmpty } from "@/lib/utils";
import {
  type CompanyProfileSetupSchema,
  companyProfileSetupSchema,
} from "@/schemas/companyProfileSetupSchema";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import type { FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import AutoComplete from "../AutoComplete";
import AnimatedFormFieldsContainer from "../multiStepForm/AnimatedFormFieldsContainer";
import {
  BASIC_INFORMATION_STEP,
  COMPANY_DESCRIPTION_STEP,
  COMPANY_DETAILS_STEP,
  COMPANY_PROFILE_SETUP_STEPS,
  CONTROL_BUTTON_VARIANT,
  COMPANY_SETUP_FORM_FIELD_TO_STEP_MAP,
  STEP_TO_FIELDS_MAP,
  SUMMARY_STEP,
} from "./constants";
import MultiFormStepsPanel from "../multiStepForm/MultiFormStepsPanel";

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
  const form = useExtendedForm<CompanyProfileSetupSchema>(
    companyProfileSetupSchema,
  );
  const router = useRouter();
  const { mutate: registerCompanyDetails, isPending } =
    api.company.registerCompanyDetails.useMutation({
      onSuccess: () => {
        toast.success("Company details registered successfully.");
        router.refresh();
      },
    });

  const makeDisabledSteps = () => {
    const disabledSteps = [];
    const { errors, touchedFields } = form.formState;
    const hasTouchedForm = !isObjectEmpty(touchedFields);
    const formHasErrors = !isObjectEmpty(errors);

    if (formHasErrors || !hasTouchedForm) {
      disabledSteps.push(SUMMARY_STEP);
    }

    return disabledSteps;
  };

  const disabledSteps = makeDisabledSteps();

  const {
    currentStep,
    focusOnErroredFieldInStep,
    gotoStep,
    goToFirstErroredStep,
    handleStepChange,
  } = useMultiStepForm<CompanyProfileSetupSchema>({
    FIELD_TO_STEP_MAP: COMPANY_SETUP_FORM_FIELD_TO_STEP_MAP,
    form,
    disabledSteps,
  });

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

  const onFormError = (errors: FieldErrors<CompanyProfileSetupSchema>) => {
    goToFirstErroredStep(
      Object.keys(errors) as (keyof CompanyProfileSetupSchema)[],
    );
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-4">
        <MultiFormStepsPanel
          STEP_TO_FIELDS_MAP={STEP_TO_FIELDS_MAP}
          currentStep={currentStep}
          formSteps={COMPANY_PROFILE_SETUP_STEPS}
          focusOnErroredFieldInStep={focusOnErroredFieldInStep}
          formErrors={form.formState.errors}
          gotoStep={gotoStep}
          disabledSteps={disabledSteps}
          styles={{
            containerClassNames:
              "p-1 border rounded-md flex items-center justify-center lg:col-span-3 h-max",
            itemsContainerClassNames:
              "grid gap-4 grid-cols-2 lg:grid-cols-1 w-full",
          }}
        />
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
