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
import { useEffect, useState, useTransition } from "react";
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
import { useGetWorkExperience } from "../../hooks/useGetWorkExperience";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { useDeleteWorkExperience } from "../../hooks/useDeleteWorkExperience";
import { useUpdateWorkExperience } from "../../hooks/useUpdateWorkExperience";

const WorkExperienceDialog = () => {
  const router = useRouter();
  const { idQuery, closeModal } = useProfilePageSearchParams();
  const isEditMode = !!idQuery;
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  const form = useExtendedForm<WorkExperienceData>(WorkExperienceValidator, {
    defaultValues: {
      id: isEditMode ? idQuery : undefined,
      jobTitle: "",
      employer: "",
      startDate: DateTime.now().toISODate(),
      endDate: null,
      employmentType: "full-time",
      workType: "office",
      location: "",
      description: "",
    },
  });

  const handleMutationSuccess = async (message: string) => {
    await closeModal();
    router.refresh();
    toast.success(message);
  };

  const { createWorkExperience, isCreatingWorkExperience } =
    useCreateWorkExperience({
      onSuccess: async () => {
        await handleMutationSuccess("Work experience added successfully.");
      },
    });

  const { deleteWorkExperience, isDeletingWorkExperience } =
    useDeleteWorkExperience({
      onSuccess: async () => {
        await handleMutationSuccess("Work experience deleted successfully.");
      },
    });

  const { updateWorkExperience, isUpdatingWorkExperience } =
    useUpdateWorkExperience({
      onSuccess: async () => {
        await handleMutationSuccess("Work experience updated successfully.");
      },
    });

  const { fetchWorkExperience } = useGetWorkExperience();

  const [isCurrentEmployment, setIsCurrentEmployment] = useState(false);
  const [isFetchingWorkExperience, startTransition] = useTransition();

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (!idQuery) return;

    startTransition(async () => {
      const data = await fetchWorkExperience(idQuery);
      if (!data) {
        toast.error("Work experience was not found.");
        await closeModal();
        return;
      }

      if (!data.endDate) {
        setIsCurrentEmployment(true);
      }

      form.reset(data);
    });
  }, [idQuery]);

  const onSubmit = (values: WorkExperienceData) => {
    if (isMutating) return;

    if (values?.id) {
      updateWorkExperience({
        ...values,
        id: values.id as number,
      });
      return;
    }

    createWorkExperience(values);
  };

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleDelete = () => {
    if (!idQuery) return;
    showConfirmDialog({
      title: "Are you sure you want to delete this work experience?",
      message: "This action cannot be undone.",
      primaryActionLabel: "Delete",
      onConfirm: async () => {
        deleteWorkExperience({
          id: idQuery,
        });
      },
    });
  };

  const isMutating =
    isCreatingWorkExperience ||
    isDeletingWorkExperience ||
    isUpdatingWorkExperience;

  const isSaveDisabled = isFetchingWorkExperience || isMutating;

  return (
    <FormDialog
      title={`${isEditMode ? "Edit" : "Add"} Work Experience`}
      onDeleteClick={isEditMode ? handleDelete : undefined}
      onClose={closeModal}
      onSave={handleSave}
      isLoadingInitialData={isEditMode ? isFetchingWorkExperience : false}
      isCloseDisabled={isMutating}
      isSaveDisabled={isSaveDisabled}
      isDirty={form.formState.isDirty}
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
            <div className="flex items-center gap-2">
              <Switch
                checked={isCurrentEmployment}
                onCheckedChange={(checked) => {
                  setIsCurrentEmployment(checked);
                  if (checked) {
                    form.setValue("endDate", null);
                  }
                }}
              />
              <Label>Currently working here</Label>
            </div>
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
