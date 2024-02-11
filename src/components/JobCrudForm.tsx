"use client";
import { ApplicationStatus, JobApplication, JobType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JobSchema from "@/schemas/JobSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APPLICATION_STATUS_OPTIONS, JOB_TYPE_OPTIONS, cn, deepEqual } from "@/lib/utils";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleJobFormSubmit } from "@/app/actions";
import { FaSpinner } from "react-icons/fa";
import { HiPencil, HiDocumentAdd } from "react-icons/hi";
import { toast } from "sonner";

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
    defaultValues:
      mode === "edit"
        ? initialData
        : {
            jobType: "FULL_TIME",
            applicationStatus: "PENDING",
          },
  });

  const onSubmit = (data: JobApplication) => {
    if (mode === "edit") {
      let checkPayload = { ...initialData } as any;

      const isDataEqual = deepEqual(data, checkPayload, ["createdAt", "updatedAt", "userId"]);

      if (isDataEqual) {
        toast.error("You haven't changed anything.");
        return;
      }
    }

    startTransition(async () => {
      if (mode === "edit") {
        const result = await handleJobFormSubmit({ mode: "edit", data, jobId: initialData.id });

        if (result?.error) {
          toast.error("An error occurred while updating the job application. Please try again later.");
        } else {
          toast.success("The job application was successfully updated.");
          form.reset();
          router.push("/dashboard/jobs");
        }
      } else {
        const result = await handleJobFormSubmit({ mode: "create", data });
        if (result?.error) {
          toast.error("An error occurred while creating the job application. Please try again later.");
        } else {
          router.push("/dashboard/jobs");
          toast.success("Job application created successfully.");
          form.reset();
        }
      }
    });
  };

  const mapStatus = (status: string) => {
    return Object.entries(APPLICATION_STATUS_OPTIONS).find(
      ([key, value]) => value === status
    )?.[0] as ApplicationStatus;
  };

  const mapJobTypes = (jobType: string) => {
    return Object.entries(JOB_TYPE_OPTIONS).find(([key, value]) => value === jobType)?.[0] as JobType;
  };

  const applicationStatusOptions = Object.values(APPLICATION_STATUS_OPTIONS);
  const jobTypeOptions = Object.values(JOB_TYPE_OPTIONS);

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
                value={JOB_TYPE_OPTIONS[field.value]}
              >
                <FormControl>
                  <SelectTrigger name="Select the job type">
                    {field.value ? <SelectValue placeholder="Select the job type" /> : "Select the job type"}
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
                value={APPLICATION_STATUS_OPTIONS[field.value]}
              >
                <FormControl>
                  <SelectTrigger name="Select your job application status">
                    {field.value ? (
                      <SelectValue placeholder="Select your application status" />
                    ) : (
                      "Select your application status"
                    )}
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
          className="bg-facebook hover:bg-facebook-600 flex items-center gap-1 dark:bg-primary w-full 2xl:w-max transition-all mt-2"
          disabled={isPending}
          name="Sumbit job application form"
        >
          {isPending ? (
            <FaSpinner size={18} className="animate-spin" />
          ) : mode === "edit" && !isPending ? (
            <HiPencil size={18} />
          ) : (
            !isPending && <HiDocumentAdd size={18} />
          )}
          {mode === "edit" ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default JobCrudForm;
