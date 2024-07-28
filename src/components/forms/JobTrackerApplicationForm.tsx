"use client";
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
import { useExtendedForm } from "@/lib/hook-form";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "../ui/dialog";
import {
  BanknoteIcon,
  BriefcaseBusinessIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "lucide-react";
import {
  type JobTrackerApplicationSchema,
  jobTrackerApplicationSchema,
} from "@/schemas/jobTrackerApplicationSchema";
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { api } from "@/trpc/react";

type JobTrackerApplicationFormProps = {
  defaultValues?: Partial<JobTrackerApplicationSchema>;
  onFormSubmit?: (values: JobTrackerApplicationSchema) => void;
};

const JobTrackerApplicationForm = ({
  defaultValues,
  onFormSubmit,
}: JobTrackerApplicationFormProps) => {
  const apiUtils = api.useUtils();
  const { mutate: addJobTrackerApplication, isPending } =
    api.jobTracker.addJobTrackerApplication.useMutation({
      onMutate: async (variables) => {
        await apiUtils.jobTracker.getJobTrackerApplications.cancel();

        const previousData =
          apiUtils.jobTracker.getJobTrackerApplications.getData();

        apiUtils.jobTracker.getJobTrackerApplications.setData(
          undefined,
          (oldData) => {
            if (!oldData) return oldData;
            return [
              ...oldData,
              {
                ...variables,
                id: crypto.randomUUID() as unknown as number,
                userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ];
          },
        );

        return { previousData };
      },
      onError: (_err, _newJob, context) => {
        apiUtils.jobTracker.getJobTrackerApplications.setData(
          undefined,
          context?.previousData,
        );
      },
      onSettled: (id) => {
        apiUtils.jobTracker.getJobTrackerApplications.invalidate();

        if (!id) return;

        apiUtils.jobTracker.getJobTrackerApplications.setData(
          undefined,
          (oldData) => {
            if (!oldData) return oldData;
            // find the item with the string id
            const optimisticItem = oldData.find(
              (item) => typeof item.id === "string",
            );

            if (!optimisticItem) return oldData;

            return oldData.map((oldItem) => {
              if (oldItem.id === optimisticItem.id) {
                oldItem.id = id;
              }
              return oldItem;
            });
          },
        );
      },
    });
  const userId = useCurrentUserStore((state) => state.user?.id) as number;
  const form = useExtendedForm<JobTrackerApplicationSchema>(
    jobTrackerApplicationSchema,
    {
      defaultValues: {
        ...defaultValues,
        userId,
      },
    },
  );

  const onSubmit = (values: JobTrackerApplicationSchema) => {
    if (isPending) return;

    addJobTrackerApplication(values, {
      onSuccess: () => {
        form.reset();
        onFormSubmit?.(values);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 mb-1">
                <BriefcaseBusinessIcon size={16} />
                Job Title
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 mb-1">
                <MapPinIcon size={16} />
                Location
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 mb-1">
                <LinkIcon size={16} />
                URL
              </FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 mb-1">
                <BanknoteIcon size={16} />
                Salary
              </FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 mb-1">
                <PencilIcon size={16} />
                Notes
              </FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 mb-1">
                <BriefcaseBusinessIcon size={16} />
                Job Description
              </FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex items-center gap-1">
          <DialogClose asChild>
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              className="w-full lg:w-max"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full lg:w-max"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobTrackerApplicationForm;
