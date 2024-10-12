"use client";
import FormDialog from "@/components/common/FormDialog";
import { useProfilePageSearchParams } from "../../hooks/useProfilePageSearchParams";
import {
  type WorkExperienceData,
  WorkExperienceValidator,
} from "@/validators/user/profile/workExperienceValidator";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { DateTime } from "luxon";
import { useCreateWorkExperience } from "../../hooks/useCreateWorkExperience";
import SelectInput from "@/components/common/SelectInput";
import {
  employmentOptions,
  workTypeOptions,
} from "@/features/candidate/jobs/components/JobListFilters";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MonthYearInput from "@/components/common/MonthYearInput";

const WorkExperienceDialog = () => {
  const router = useRouter();
  const { closeModal } = useProfilePageSearchParams();
  const form = useExtendedForm<WorkExperienceData>(WorkExperienceValidator, {
    defaultValues: {
      jobTitle: "",
      employer: "",
      startDate: DateTime.now().toISO(),
      employmentType: "full-time",
      workType: "office",
      location: "",
      description: "",
    },
  });

  const { createWorkExperience, isCreatingWorkExperience } =
    useCreateWorkExperience({
      onSuccess: async () => {
        await closeModal();
        toast.success("Work experience added successfully.");
        router.refresh();
      },
    });

  const [isCurrentEmployment, setIsCurrentEmployment] = useState(false);

  const onSubmit = (values: WorkExperienceData) => {
    if (!values?.id) {
      createWorkExperience(values);
    } else {
    }
  };

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <FormDialog
      title="Add Work Experience"
      onClose={closeModal}
      onSave={handleSave}
      isCloseDisabled={isCreatingWorkExperience}
      isSaveDisabled={isCreatingWorkExperience}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <MonthYearInput
                      onChange={field.onChange}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={isCurrentEmployment}
                onCheckedChange={(checked) => {
                  setIsCurrentEmployment(checked);
                  if (checked) {
                    form.setValue("endDate", undefined);
                  }
                }}
              />
              <Label>Currently working here</Label>
            </div>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <MonthYearInput
                      onChange={field.onChange}
                      disabled={isCurrentEmployment}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-2">
              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Type</FormLabel>
                    <FormControl>
                      <SelectInput
                        options={workTypeOptions}
                        {...field}
                        placeholder="Select location type"
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      className="resize-none"
                      rows={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </FormDialog>
  );
};

export default WorkExperienceDialog;
