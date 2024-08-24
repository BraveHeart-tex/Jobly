"use client";

// Basic Information:
//
//   Company Name
// Industry
// Website
//
//
// Company Details:
//
//   Founded Year
// Employee Count
// Address
//
//
// Company Description:
//
//   Short Bio
// Detailed Description
//
//
// Visual Assets:
//
//   Company Logo
// Cover Image

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
import { companyProfileSetupSchema } from "@/schemas/companyProfileSetupSchema";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button, type ButtonVariant } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

const CONTROL_BUTTON_VARIANT: ButtonVariant = "secondary";

const CompanyProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useExtendedForm(companyProfileSetupSchema);

  const onSubmit = () => {};

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
      <div className="p-2 border rounded-md flex items-center justify-center lg:col-span-3">
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
            className="gap-8 h-full grid"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="self-end">{renderControlButtons()}</div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CompanyProfileSetup;
