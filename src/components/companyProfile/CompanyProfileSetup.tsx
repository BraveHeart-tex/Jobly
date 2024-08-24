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
import { useExtendedForm } from "@/lib/hook-form";
import {
  type CompanyProfileSetupSchema,
  companyProfileSetupSchema,
} from "@/schemas/companyProfileSetupSchema";
import { motion } from "framer-motion";
import { type PropsWithChildren, useState } from "react";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import type { FieldErrors } from "react-hook-form";

const COMPANY_PROFILE_SETUP_STEPS = [
  {
    label: "Basic Information",
  },
  {
    label: "Company Details",
  },
  {
    label: "Company Description",
  },
  {
    label: "Visual Assets",
  },
];

const CONTROL_BUTTON_VARIANT: ButtonVariant = "secondary";
const BASIC_INFORMATION_STEP = 1 as const;
const COMPANY_DETAILS_STEP = 2 as const;
const COMPANY_DESCRIPTION_STEP = 3 as const;
const VISUAL_ASSETS_STEP = 4 as const;

const FIELD_TO_STEP_MAP: Record<keyof CompanyProfileSetupSchema, number> = {
  name: BASIC_INFORMATION_STEP,
  industry: BASIC_INFORMATION_STEP,
  website: BASIC_INFORMATION_STEP,

  yearOfEstablishment: COMPANY_DETAILS_STEP,
  address: COMPANY_DETAILS_STEP,
  companySize: COMPANY_DETAILS_STEP,
  areasOfExpertise: COMPANY_DETAILS_STEP,

  bio: COMPANY_DESCRIPTION_STEP,
  description: COMPANY_DESCRIPTION_STEP,

  logo: VISUAL_ASSETS_STEP,
  coverImage: VISUAL_ASSETS_STEP,
};

const STEP_TO_FIELDS_MAP = Object.entries(FIELD_TO_STEP_MAP).reduce<
  Record<number, string[]>
>((acc, [field, step]) => {
  if (!acc[step]) {
    acc[step] = [];
  }

  // biome-ignore lint/style/noNonNullAssertion: It cannot be undefined at this point
  acc[step]!.push(field);

  return acc;
}, {});

const CompanyProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useExtendedForm<CompanyProfileSetupSchema>(
    companyProfileSetupSchema,
    {
      defaultValues: {
        name: "",
        industry: "",
        website: "",
        address: "",
        areasOfExpertise: "",
        bio: "",
        companySize: "",
        coverImage: "",
        description: "",
        logo: "",
        yearOfEstablishment: "",
      },
    },
  );

  const onSubmit = (values: CompanyProfileSetupSchema) => {
    console.info("values", values);
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
                  <Input {...field} />
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
                <FormLabel>Founding Year</FormLabel>
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
                <FormControl>
                  <Input {...field} />
                </FormControl>
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

    // Visual Assets: company logo, cover image
    if (currentStep === VISUAL_ASSETS_STEP) {
      return <>File upload functionality here</>;
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
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}
        <Button
          type={isLastStep ? "submit" : "button"}
          variant={isLastStep ? "default" : CONTROL_BUTTON_VARIANT}
          onClick={
            isLastStep ? undefined : () => setCurrentStep((prev) => prev + 1)
          }
        >
          {isLastStep ? "Submit" : "Next"}
        </Button>
      </div>
    );
  };

  const onFormError = (errors: FieldErrors<CompanyProfileSetupSchema>) => {
    const erroredFieldKeys = Object.keys(errors) as Array<
      keyof CompanyProfileSetupSchema
    >;
    const stepsWithErrors = erroredFieldKeys
      .map((field) => FIELD_TO_STEP_MAP[field])
      .sort((a, b) => a - b);

    setCurrentStep(stepsWithErrors[0] as number);
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="p-1 border rounded-md flex items-center justify-center lg:col-span-3">
          <div className="flex items-center gap-2 lg:flex-col lg:items-start flex-wrap justify-center">
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
                    onClick={() => setCurrentStep(stepValue)}
                  >
                    <span>{step.label}</span>
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
              className="h-full grid gap-4 lg:h-[395px] overflow-auto px-1"
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

const AnimatedFormFieldsContainer = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="grid gap-4"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CompanyProfileSetup;
