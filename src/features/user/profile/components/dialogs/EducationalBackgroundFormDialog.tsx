"use client";
import FormDialog from "@/components/common/FormDialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useExtendedForm } from "@/lib/hook-form/useExtendedForm";
import {
  type EducationalBackgroundData,
  educationalBackgroundValidator,
} from "@/validation/user/profile/educationalBackgroundValidator";
import { DateTime } from "luxon";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import MonthYearInput from "@/components/common/MonthYearInput";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEducationalBackground } from "@/features/user/educationalBackgrounds/hooks/useCreateEducationalBackground";
import { useRouter } from "nextjs-toploader/app";
import { useDeleteEducationalBackground } from "@/features/user/educationalBackgrounds/hooks/useDeleteEducationalBackground";
import { useEffect, useTransition } from "react";
import { useGetEducationalBackground } from "@/features/user/educationalBackgrounds/hooks/useGetEducationalBackground";
import { useUpdateEducationalBackground } from "@/features/user/educationalBackgrounds/hooks/useUpdateEducationalBackground";
import { showErrorToast, showSuccessToast } from "@/components/toastUtils";

const EducationalBackgroundFormDialog = () => {
  const router = useRouter();
  const { idQuery, closeModal } = useProfilePageSearchParams();
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);
  const [isFetchingEducationalBackground, startTransition] = useTransition();

  const isEditMode = !!idQuery;

  const form = useExtendedForm<EducationalBackgroundData>(
    educationalBackgroundValidator,
    {
      defaultValues: {
        school: "",
        fieldOfStudy: "",
        gpa: null,
        startDate: DateTime.now().toISODate(),
        endDate: null,
        description: "",
      },
    },
  );

  const handleMutationSuccess = async (message: string) => {
    await closeModal();
    router.refresh();
    showSuccessToast(message);
  };

  const { createEducationalBackground, isCreatingEducationalBackground } =
    useCreateEducationalBackground({
      onSuccess: async () => {
        await handleMutationSuccess(
          "Educational background added successfully.",
        );
      },
    });

  const { deleteEducationalBackground, isDeletingEducationalBackground } =
    useDeleteEducationalBackground({
      onSuccess: async () => {
        await handleMutationSuccess(
          "Educational background deleted successfully.",
        );
      },
    });

  const { updateEducationalBackground, isUpdatingEducationalBackground } =
    useUpdateEducationalBackground({
      onSuccess: async () => {
        await handleMutationSuccess(
          "Educational background updated successfully.",
        );
      },
    });

  const { fetchEducationalBackground } = useGetEducationalBackground();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!idQuery) return;

    startTransition(async () => {
      const data = await fetchEducationalBackground(idQuery);
      if (!data) {
        showErrorToast("Educational background not found");
        await closeModal();
        return;
      }

      form.reset(data);
    });
  }, [idQuery]);

  const onSubmit = async (data: EducationalBackgroundData) => {
    if (!form.formState.isDirty) {
      await closeModal();
      return;
    }

    if (isEditMode) {
      updateEducationalBackground({
        ...data,
        id: idQuery as number,
      });
    } else {
      createEducationalBackground(data);
    }
  };

  const handleDelete = () => {
    showConfirmDialog({
      title: "Are you sure you want to delete this educational background?",
      message: "This action cannot be undone.",
      primaryActionLabel: "Delete",
      onConfirm: () => {
        if (!idQuery) return;
        deleteEducationalBackground({
          id: idQuery,
        });
      },
    });
  };

  const isMutating =
    isCreatingEducationalBackground ||
    isDeletingEducationalBackground ||
    isUpdatingEducationalBackground;

  const isSaveDisabled = isFetchingEducationalBackground || isMutating;

  return (
    <FormDialog<EducationalBackgroundData>
      title={`${isEditMode ? "Edit" : "Add"} Educational Background`}
      onDeleteClick={isEditMode ? handleDelete : undefined}
      onClose={closeModal}
      onSubmit={onSubmit}
      isLoadingInitialData={
        isEditMode ? isFetchingEducationalBackground : false
      }
      form={form}
      isCloseDisabled={isMutating}
      isSaveDisabled={isSaveDisabled}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fieldOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Of Study</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
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
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
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
              name="gpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      value={field.value || ""}
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      cols={30}
                      rows={10}
                      value={field.value || ""}
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

export default EducationalBackgroundFormDialog;
