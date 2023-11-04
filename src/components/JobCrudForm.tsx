"use client";
import { ApplicationStatus, JobApplication, JobType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JobSchema from "@/schemas/JobSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import JobTypeOptions from "@/app/utils/JobTypeOptions";
import ApplicationStatusOptions from "@/app/utils/ApplicationStatusOptions";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { showErrorToast, showToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { handleJobFormSubmit } from "@/app/actions";

interface JobCrudFormProps {
  mode: "create";
  initialData?: JobApplication;
  formClassName?: string;
}

interface JobCrudFormPropsEdit {
  mode: "edit";
  initialData: JobApplication;
  formClassName?: string;
}

type JobCrudFormPropsUnion = JobCrudFormProps | JobCrudFormPropsEdit;

const JobCrudForm = ({ mode, initialData, formClassName }: JobCrudFormPropsUnion) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(JobSchema),
    defaultValues: mode === "edit" ? initialData : undefined,
  });

  const onSubmit = (data: JobApplication) => {
    startTransition(async () => {
      if (mode === "edit") {
        const result = await handleJobFormSubmit({ mode: "edit", data, jobId: initialData.id });

        if (result?.error) {
          showErrorToast({
            title: "Oops!",
            description: "Something went wrong while updating the job application.",
          });
        } else {
          showToast({
            title: "Success!",
            description: "Job application updated successfully.",
          });
          form.reset();
          router.push("/dashboard/jobs");
        }
      } else {
        const result = await handleJobFormSubmit({ mode: "create", data });
        if (result?.error) {
          showErrorToast({
            title: "Oops!",
            description: "Something went wrong while creating the job application.",
          });
        } else {
          showToast({
            title: "Success!",
            description: "Job application created successfully.",
          });
          form.reset();
          router.push("/dashboard/jobs");
        }
      }
    });
  };

  const mapStatus = (status: string) => {
    return Object.entries(ApplicationStatusOptions).find(([key, value]) => value === status)?.[0] as ApplicationStatus;
  };

  const mapJobTypes = (jobType: string) => {
    return Object.entries(JobTypeOptions).find(([key, value]) => value === jobType)?.[0] as JobType;
  };

  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid grid-cols-1 gap-2", formClassName)}>
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Data Scientist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="XYZ Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select
                onValueChange={(value) => form.setValue("jobType", mapJobTypes(value))}
                defaultValue={mode === "edit" ? JobTypeOptions[initialData.jobType] : field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypeOptions.map((option) => (
                    <SelectItem value={option} key={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="applicationStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Status</FormLabel>
              <Select
                onValueChange={(value) => form.setValue("applicationStatus", mapStatus(value))}
                defaultValue={
                  mode === "edit"
                    ? ApplicationStatusOptions[initialData.applicationStatus]
                    : ApplicationStatusOptions[field.value]
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select you application status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {applicationStatusOptions.map((option) => (
                    <SelectItem value={option} key={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Canary Islands" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                {/* @ts-ignore */}
                <Input placeholder="Canary Islands" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-facebook hover:bg-facebook-600 dark:bg-primary w-full lg:w-max transition-all"
        >
          {mode === "edit" ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default JobCrudForm;
