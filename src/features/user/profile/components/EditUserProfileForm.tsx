"use client";
import DateInput from "@/components/common/dateInput/DateInput";
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
import { Textarea } from "@/components/ui/textarea";
import EducationInformationCard from "@/features/user/profile/components/EducationInformationCard";
import WorkExperienceTimeline from "@/features/user/profile/components/WorkExperienceTimeline";
import { type StepItem, useMultiStepForm } from "@/hooks/useMultiStepForm";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import { cn } from "@/lib/utils";
import userProfileFormSchema, {
  type UserProfileFormSchema,
} from "@/schemas/user/profile/userProfileFormSchema";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import Image from "next/image";
import ProfileFormDialog from "./ProfileFormDialog";
import ProfileFormSectionContainer from "./ProfileFormSectionContainer";
import ProfileFormSectionHeader from "./ProfileFormSectionHeader";
import WorkExperienceForm from "./WorkExperienceForm";

const profileFormSteps: StepItem<UserProfileFormSchema>[] = [
  {
    stepTitle: "Personal Details",
    fields: [
      "firstName",
      "lastName",
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

interface EditUserProfileFormProps {
  initialData?: UserProfileFormSchema;
}

const EditUserProfileForm = ({ initialData }: EditUserProfileFormProps) => {
  const form = useExtendedForm<UserProfileFormSchema>(userProfileFormSchema, {
    defaultValues: initialData,
  });

  const { currentStep, setCurrentStep } =
    useMultiStepForm<UserProfileFormSchema>({
      steps: profileFormSteps,
      form,
    });

  const onSubmit = (data: UserProfileFormSchema) => {
    console.info(data);
  };

  const workExperiences = form.getValues("workExperiences");
  const educationalBackground = form.getValues("educationalBackground");

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
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            {...field}
                            value={field.value || ""}
                          />
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
                          <Input
                            type="text"
                            {...field}
                            value={field.value || ""}
                          />
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
                          <Input
                            type="text"
                            {...field}
                            value={field.value || ""}
                          />
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
                          <Input
                            type="text"
                            {...field}
                            value={field.value || ""}
                          />
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
                          <Input
                            type="text"
                            {...field}
                            value={field.value || ""}
                          />
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
                          <Input
                            type="text"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="placeOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Place of Birth</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            value={field.value || ""}
                          />
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
                            value={field.value || ""}
                            showFutureDates={false}
                            showTimeOptions={false}
                            format={DateTime.DATE_SHORT}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="professionalSummary"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Professional Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value || ""}
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
            {currentStep === 2 && (
              <ProfileFormSectionContainer>
                <ProfileFormSectionHeader
                  title="Work Experience"
                  description="Add your most recent work experience."
                  headerActionElement={
                    <ProfileFormDialog
                      trigger={
                        <Button variant="secondary">Add Experience</Button>
                      }
                      title="Add Work Experience"
                      description="Use the form below to add your work experience."
                    >
                      <WorkExperienceForm />
                    </ProfileFormDialog>
                  }
                />
                {workExperiences.length > 0 ? (
                  <WorkExperienceTimeline experiences={workExperiences} />
                ) : (
                  <div className="flex items-center justify-center flex-col">
                    <Image
                      src={"/illustrations/empty-list.svg"}
                      className="dark:invert"
                      alt="Empty list"
                      width={300}
                      height={300}
                    />
                    <p className="text-muted-foreground text-base">
                      You haven't added any work experiences yet.
                    </p>
                  </div>
                )}
              </ProfileFormSectionContainer>
            )}
            {currentStep === 3 && (
              <ProfileFormSectionContainer>
                <ProfileFormSectionHeader
                  title="Education"
                  description="Add your educational background."
                />
                {educationalBackground.length > 0 ? (
                  <div className="grid gap-2">
                    {educationalBackground.map((educationInformation) => (
                      <EducationInformationCard
                        key={educationInformation.id}
                        educationInformation={educationInformation}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center flex-col">
                    <Image
                      src={"/illustrations/empty-list.svg"}
                      className="dark:invert"
                      alt="Empty list"
                      width={300}
                      height={300}
                    />
                    <p className="text-muted-foreground text-base">
                      You haven't added any educational information yet.
                    </p>
                  </div>
                )}
              </ProfileFormSectionContainer>
            )}
            {currentStep === 4 && (
              <div>
                <ProfileFormSectionHeader
                  title="Skills"
                  description="Highlight your skills and proficiency levels."
                />
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUserProfileForm;