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

const JobTrackerApplicationForm = ({
  defaultValues,
}: { defaultValues?: Partial<JobTrackerApplicationSchema> }) => {
  const userId = useCurrentUserStore((state) => state.user?.id);
  const form = useExtendedForm<JobTrackerApplicationSchema>(
    jobTrackerApplicationSchema,
    {
      defaultValues: {
        ...defaultValues,
        userId,
      },
    },
  );

  const onSubmit = (values: JobTrackerApplicationSchema) => {};

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
            <Button type="button" variant="outline" className="w-full lg:w-max">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" className="w-full lg:w-max">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobTrackerApplicationForm;
