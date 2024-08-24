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
import { Textarea } from "../ui/textarea";

const STEPS = [
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

const CONTROL_BUTTON_VARIANT: ButtonVariant = "secondary";
const BASIC_INFORMATION_STEP = 1 as const;
const COMPANY_DETAILS_STEP = 2 as const;
const COMPANY_DESCRIPTION_STEP = 3 as const;
const VISUAL_ASSETS_STEP = 4 as const;

const CompanyProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useExtendedForm<CompanyProfileSetupSchema>(
    companyProfileSetupSchema,
  );

  const onSubmit = () => {};

  const renderFormFields = () => {
    if (currentStep === BASIC_INFORMATION_STEP) {
      return (
        <AnimatedFormFieldsContainer>
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
        </AnimatedFormFieldsContainer>
      );
    }

    if (currentStep === COMPANY_DETAILS_STEP) {
      return (
        <AnimatedFormFieldsContainer>
          <FormField
            control={form.control}
            name="foundedYear"
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
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Count</FormLabel>
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
        </AnimatedFormFieldsContainer>
      );
    }

    if (currentStep === COMPANY_DESCRIPTION_STEP) {
      return (
        <AnimatedFormFieldsContainer>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Company Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
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
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Provide a brief overview of your company, including its
                  founding year, what it does, its mission, and what makes it
                  unique
                </FormDescription>
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
        </AnimatedFormFieldsContainer>
      );
    }

    //
    // Visual Assets:
    //
    //   Company Logo
    // Cover Image
    //
    if (currentStep === VISUAL_ASSETS_STEP) {
      return (
        <AnimatedFormFieldsContainer>
          File upload functionality here
        </AnimatedFormFieldsContainer>
      );
    }
  };

  const renderControlButtons = () => {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === STEPS.length;

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

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="p-1 border rounded-md flex items-center justify-center lg:col-span-3">
        <div className="flex items-center gap-2 lg:flex-col lg:items-start flex-wrap justify-center">
          {STEPS.map((step, index) => (
            <div key={step.label} className="grid gap-1 w-full">
              <span className="text-xs text-muted-foreground">
                Step {index + 1}
              </span>
              <Button
                variant="ghost"
                className="relative hover:bg-muted/45"
                onClick={() => setCurrentStep(index + 1)}
              >
                <span>{step.label}</span>
                {currentStep === index + 1 ? (
                  <motion.div
                    layoutId="active-step-transition"
                    transition={{ duration: 0.2 }}
                    className="inset absolute bg-muted w-full rounded-md h-full z-[-10]"
                  />
                ) : null}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-9">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full grid gap-4 lg:h-[380px] overflow-auto px-1"
          >
            {renderFormFields()}

            <div className="self-end">{renderControlButtons()}</div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CompanyProfileSetup;
