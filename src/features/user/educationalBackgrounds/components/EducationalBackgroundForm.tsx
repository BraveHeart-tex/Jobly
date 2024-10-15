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
  EducationalBackgroundValidator,
} from "@/validators/user/profile/educationValidator";
import { DateTime } from "luxon";
import { useProfilePageSearchParams } from "../../profile/hooks/useProfilePageSearchParams";
import { useConfirmStore } from "@/lib/stores/useConfirmStore";
import MonthYearInput from "@/components/common/MonthYearInput";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEducationalBackground } from "../hooks/useCreateEducationalBackground";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeleteEducationalBackground } from "../hooks/useDeleteEducationalBackground";

const EducationalBackgroundForm = () => {
  const router = useRouter();
  const { idQuery, closeModal } = useProfilePageSearchParams();
  const showConfirmDialog = useConfirmStore((state) => state.showConfirmDialog);

  const isEditMode = !!idQuery;

  const form = useExtendedForm<EducationalBackgroundData>(
    EducationalBackgroundValidator,
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

  const { createEducationalBackground, isCreatingEducationalBackground } =
    useCreateEducationalBackground({
      onSuccess: async () => {
        await closeModal();
        router.refresh();
        toast.success("Educational background added successfully.");
      },
    });

  const { deleteEducationalBackground, isDeletingEducationalBackground } =
    useDeleteEducationalBackground({
      onSuccess: async () => {
        await closeModal();
        router.refresh();
        toast.success("Educational background deleted successfully.");
      },
    });

  const onSubmit = (data: EducationalBackgroundData) => {
    if (isEditMode) {
    } else {
      createEducationalBackground(data);
    }
  };

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
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

  // TODO: remove later
  const isUpdatingEducationalBackground = false;
  const isFetchingEducationalBackground = false;

  const isMutating =
    isCreatingEducationalBackground ||
    isDeletingEducationalBackground ||
    isUpdatingEducationalBackground;

  const isSaveDisabled = isFetchingEducationalBackground || isMutating;

  return (
    <FormDialog
      title={`${isEditMode ? "Edit" : "Add"} Educational Background`}
      onDeleteClick={isEditMode ? handleDelete : undefined}
      onClose={closeModal}
      onSave={handleSave}
      isLoadingInitialData={
        isEditMode ? isFetchingEducationalBackground : false
      }
      isCloseDisabled={isMutating}
      isSaveDisabled={isSaveDisabled}
      isDirty={form.formState.isDirty}
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
                    <Textarea {...field} cols={30} rows={10} />
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

export default EducationalBackgroundForm;
