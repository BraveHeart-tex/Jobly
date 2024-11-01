"use client";
import FormDialog from "@/components/common/FormDialog";
import {
  type WorkExperienceData,
  workExperienceValidator,
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
import SelectInput from "@/components/common/SelectInput";
import {
  employmentOptions,
  workTypeOptions,
} from "@/features/candidate/jobs/components/JobListFilters";
import { useRouter } from "nextjs-toploader/app";
import MonthYearInput from "@/components/common/MonthYearInput";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import { showErrorToast, showSuccessToast } from "@/components/toastUtils";
import { useCreateWorkExperience } from "@/features/user/profile/hooks/useCreateWorkExperience";
import { useDeleteWorkExperience } from "@/features/user/profile/hooks/useDeleteWorkExperience";
import { useGetWorkExperience } from "@/features/user/profile/hooks/useGetWorkExperience";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { useUpdateWorkExperience } from "@/features/user/profile/hooks/useUpdateWorkExperience";

const WorkExperienceFormDialog = () => {
  const router = useRouter();
  const { idQuery, closeModal } = useProfilePageSearchParams();
  const isEditMode = !!idQuery;
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  const form = useExtendedForm<WorkExperienceData>(workExperienceValidator, {
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
    showSuccessToast(message);
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
        showErrorToast("Work experience was not found.");
        await closeModal();
        return;
      }

      if (!data.endDate) {
        setIsCurrentEmployment(true);
      }

      form.reset(data);
    });
  }, [idQuery]);

  const onSubmit = async (values: WorkExperienceData) => {
    if (isMutating) return;
    if (!form.formState.isDirty) {
      await closeModal();
      return;
    }

    if (values?.id) {
      updateWorkExperience({
        ...values,
        id: values.id as number,
      });
      return;
    }

    createWorkExperience(values);
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
    <FormDialog<WorkExperienceData>
      title={`${isEditMode ? "Edit" : "Add"} Work Experience`}
      onDeleteClick={isEditMode ? handleDelete : undefined}
      onClose={closeModal}
      onSubmit={onSubmit}
      isLoadingInitialData={isEditMode ? isFetchingWorkExperience : false}
      isCloseDisabled={isMutating}
      isSaveDisabled={isSaveDisabled}
      form={form}
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

export default WorkExperienceFormDialog;
