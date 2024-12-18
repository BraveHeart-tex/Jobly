"use client";
import SelectInput from "@/components/common/SelectInput";
import CreatableSelect from "@/components/common/select/CreatableSelect";
import AnimatedFormFieldsContainer from "@/components/multiStepForm/AnimatedFormFieldsContainer";
import MultiFormStepsPanel from "@/components/multiStepForm/MultiFormStepsPanel";
import MultiStepFormSummary from "@/components/multiStepForm/MultiStepFormSummary";
import { showSuccessToast } from "@/components/toastUtils";
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
import { Textarea } from "@/components/ui/textarea";
import { type StepItem, useMultiStepForm } from "@/hooks/useMultiStepForm";
import { CONTROL_BUTTON_VARIANT } from "@/lib/constants";
import { INDUSTRIES_DATASET } from "@/lib/datasets";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { cn } from "@/lib/utils";
import { isObjectEmpty } from "@/lib/utils/object";
import { api } from "@/trpc/react";
import {
  companyProfileValidator,
  type CompanyProfileOutput,
} from "@/schemas/employer/companyProfile/companyProfileSetupValidator";
import { useRouter } from "nextjs-toploader/app";
import type { FieldErrors } from "react-hook-form";

const companyProfileSteps: StepItem<CompanyProfileOutput>[] = [
  {
    stepTitle: "Basic Information",
    fields: ["name", "industry", "website"],
  },
  {
    stepTitle: "Company Details",
    fields: [
      "yearOfEstablishment",
      "address",
      "companySize",
      "areasOfExpertise",
    ],
  },
  {
    stepTitle: "Company Description",
    fields: ["bio", "description"],
  },
  {
    stepTitle: "Summary",
    fields: [],
  },
];

const BASIC_INFORMATION_STEP = 1;
const COMPANY_DETAILS_STEP = 2;
const COMPANY_DESCRIPTION_STEP = 3;
const SUMMARY_STEP = 4;

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
  const form = useExtendedForm<CompanyProfileOutput>(companyProfileValidator, {
    defaultValues: {
      name: "",
      bio: "",
      website: "",
      industry: "",
      address: "",
      yearOfEstablishment: "",
      companySize: "",
      areasOfExpertise: "",
      description: "",
    },
  });
  const router = useRouter();
  const { mutate: registerCompanyDetails, isPending } =
    api.company.registerCompanyDetails.useMutation({
      onSuccess: () => {
        showSuccessToast("Company details registered successfully.");
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
    goToStepByKey,
  } = useMultiStepForm<CompanyProfileOutput>({
    steps: companyProfileSteps,
    form,
    disabledSteps,
  });

  const onSubmit = (values: CompanyProfileOutput) => {
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
                  <CreatableSelect
                    value={{
                      label: field.value || "",
                      value: field.value || "",
                    }}
                    options={INDUSTRIES_DATASET.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    isMulti={false}
                    placeholder="Select industry"
                    formatCreateLabel={(label) => `Add "${label}"`}
                    ref={field.ref}
                    onChange={(value) => {
                      field.onChange(value?.value);
                    }}
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
                <SelectInput
                  options={companySizeOptions.map((size) => ({
                    label: size,
                    value: size,
                  }))}
                  {...field}
                  placeholder="Select company size"
                />
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
        <MultiStepFormSummary<CompanyProfileOutput>
          goToStepByKey={goToStepByKey}
          summarizedSteps={[
            {
              label: "Company Name",
              value: form.getValues("name"),
              key: "name",
            },
            {
              label: "Industry",
              value: form.getValues("industry"),
              key: "industry",
            },
            {
              label: "Company Website",
              value: form.getValues("website"),
              key: "website",
            },
            {
              label: "Year of Establishment",
              value: form.getValues("yearOfEstablishment"),
              key: "yearOfEstablishment",
            },
            {
              label: "Company Size",
              value: form.getValues("companySize"),
              key: "companySize",
            },
            {
              label: "Company Address",
              value: form.getValues("address"),
              key: "address",
            },
            {
              label: "Short Company Bio",
              value: form.getValues("bio"),
              key: "bio",
            },
            {
              label: "Detailed Overview",
              value: form.getValues("description"),
              key: "description",
            },
          ]}
        />
      );
    }
  };

  const renderControlButtons = () => {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === companyProfileSteps.length;

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

  const onFormError = (errors: FieldErrors<CompanyProfileOutput>) => {
    goToFirstErroredStep(Object.keys(errors) as (keyof CompanyProfileOutput)[]);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-4">
        <MultiFormStepsPanel
          currentStep={currentStep}
          formSteps={companyProfileSteps}
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
