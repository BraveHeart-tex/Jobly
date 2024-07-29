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
import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import { useJobTrackerBoardStore } from "@/lib/stores/useJobTrackerBoardStore";
import { compareMatchingKeys } from "@/lib/utils";
import {
  type JobTrackerApplicationSchema,
  jobTrackerApplicationSchema,
} from "@/schemas/jobTrackerApplicationSchema";
import type { JobTrackerApplication } from "@/server/db/schema";
import { api } from "@/trpc/react";
import {
  BanknoteIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "lucide-react";
import { toast } from "sonner";
import { DialogClose } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

type JobTrackerApplicationFormProps = {
  defaultValues?: Partial<JobTrackerApplicationSchema>;
  onFormSubmit?: () => void;
};

const JobTrackerApplicationForm = ({
  defaultValues,
  onFormSubmit,
}: JobTrackerApplicationFormProps) => {
  const trackedApplications = useJobTrackerBoardStore(
    (state) => state.trackedApplications,
  );
  const setApplications = useJobTrackerBoardStore(
    (state) => state.setTrackedApplications,
  );
  const { mutate: addJobTrackerApplication, isPending: isAdding } =
    api.jobTracker.addJobTrackerApplication.useMutation({
      onMutate: (variables) => {
        onFormSubmit?.();
        const oldApplications = trackedApplications;
        const newApplication = {
          ...variables,
          id: crypto.randomUUID() as unknown as number,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        } as JobTrackerApplication;
        setApplications((prev) => [...prev, newApplication]);
        return { oldApplications };
      },
      onError: (_error, _variables, context) => {
        toast.error("Something went wrong, please try again later");
        setApplications(context?.oldApplications ?? []);
      },
      onSuccess(insertId) {
        setApplications((prev) => {
          return prev.map((application) => {
            if (typeof application.id === "string") {
              application.id = insertId as number;
            }
            return application;
          });
        });
      },
    });
  const { mutate: updateJobTrackerApplication, isPending: isUpdating } =
    api.jobTracker.updateJobTrackerApplication.useMutation({
      onMutate: (variables) => {
        onFormSubmit?.();
        toast.success("Application updated successfully.");
        const oldApplications = trackedApplications;
        setApplications((prev) =>
          prev.map((application) => {
            if (application.id === variables.id) {
              return {
                ...application,
                ...variables,
                updatedAt: new Date().toISOString(),
              };
            }
            return application;
          }),
        );
        return { oldApplications };
      },
      onError: (_error, _variables, context) => {
        toast.error("Something went wrong, please try again later.");
        setApplications(context?.oldApplications ?? []);
      },
    });
  const availableDisplayOrder = trackedApplications.filter(
    (item) => item.status === defaultValues?.status,
  ).length;
  const userId = useCurrentUserStore((state) => state.user?.id) as number;
  const form = useExtendedForm<JobTrackerApplicationSchema>(
    jobTrackerApplicationSchema,
    {
      defaultValues: {
        ...defaultValues,
        userId,
        displayOrder: defaultValues?.displayOrder || availableDisplayOrder + 1,
      },
    },
  );
  const mode = form.watch("id") ? ("edit" as const) : ("create" as const);

  const onSubmit = (values: JobTrackerApplicationSchema) => {
    if (isAdding || isUpdating) return;

    if (mode === "create") {
      addJobTrackerApplication(values);
    }

    if (mode === "edit") {
      const hasMadeNoChanges = compareMatchingKeys(defaultValues, values);
      if (hasMadeNoChanges) {
        toast.info("You didn't make any changes.");
        return;
      }

      updateJobTrackerApplication({
        ...values,
        // biome-ignore lint/style/noNonNullAssertion: ID will be here because we are in edit mode
        id: values.id!,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 mb-1">
                <Building2Icon size={16} />
                Company
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
              disabled={isAdding || isUpdating}
              type="button"
              variant="outline"
              className="w-full lg:w-max"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isAdding || isUpdating}
            type="submit"
            className="w-full lg:w-max"
          >
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobTrackerApplicationForm;
