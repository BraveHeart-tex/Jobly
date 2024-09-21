"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type StepItem, useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import userProfileFormSchema, {
  type UserProfileFormSchema,
} from "@/schemas/user/profile/userProfileFormSchema";
import ProfileFormSectionHeader from "./ProfileFormSectionHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DateInput from "@/components/common/dateInput/DateInput";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ProfileFormSectionContainer from "./ProfileFormSectionContainer";

const profileFormSteps: StepItem<UserProfileFormSchema>[] = [
  {
    stepTitle: "Personal Details",
    fields: [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "country",
      "city",
      "address",
      "postalCode",
      "drivingLicense",
      "placeOfBirth",
      "dateOfBirth",
      "professionalSummary",
    ],
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

const EditUserProfileForm = () => {
  const form = useExtendedForm<UserProfileFormSchema>(userProfileFormSchema);

  const { currentStep, setCurrentStep } =
    useMultiStepForm<UserProfileFormSchema>({
      steps: profileFormSteps,
      form,
    });

  const onSubmit = (data: UserProfileFormSchema) => {
    console.info(data);
  };

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full overflow-auto p-4 rounded-md border rounded-t-none h-[calc(100vh-13rem)]">
            {currentStep === 1 && (
              <ProfileFormSectionContainer>
                <ProfileFormSectionHeader
                  title="Personal Information"
                  description="Provide your basic personal details."
                />
                <div className="grid lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
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
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="drivingLicense"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driving License</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="placeOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Place of Birth</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <DateInput
                              ref={field.ref}
                              onChange={field.onChange}
                              value={field.value}
                              showFutureDates={false}
                              showTimeOptions={false}
                              format={DateTime.DATE_SHORT}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </ProfileFormSectionContainer>
            )}
            {currentStep === 2 && (
              <ProfileFormSectionContainer>
                <ProfileFormSectionHeader
                  title="Work Experience"
                  description="Add your most recent work experience."
                />
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="professionalSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="resize-none"
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ProfileFormSectionContainer>
            )}
            {currentStep === 3 && (
              <div>
                <ProfileFormSectionHeader
                  title="Education"
                  description="Add your educational background."
                />
              </div>
            )}
            {currentStep === 4 && (
              <div>
                <ProfileFormSectionHeader
                  title="Skills"
                  description="Highlight your skills and proficiency levels."
                />
              </div>
            )}
            <div className="flex justify-end mt-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUserProfileForm;
