"use client";
import ApplicationStatusOptions from "@/app/utils/ApplicationStatusOptions";
import JobTypeOptions from "@/app/utils/JobTypeOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateGeneric } from "@/lib/generic";
import { getKeyByValue } from "@/lib/utils";
import { ApplicationStatus, JobApplication, JobType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IEditJobFormInputTypes {
  jobTitle: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  jobLocation: string;
  comments?: string;
}

interface IEditJobModalFormProps {
  currentJobApplication: JobApplication;
}

const EditJobModalForm = ({ currentJobApplication }: IEditJobModalFormProps) => {
  const router = useRouter();
  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IEditJobFormInputTypes>({
    defaultValues: {
      jobTitle: currentJobApplication.jobTitle,
      companyName: currentJobApplication.companyName,
      applicationStatus: ApplicationStatusOptions[currentJobApplication.applicationStatus],
      jobType: JobTypeOptions[currentJobApplication.jobType],
      jobLocation: currentJobApplication.location,
      comments: currentJobApplication.comments || "",
    },
  });

  const onSubmit = (data: IEditJobFormInputTypes) => {
    // @ts-ignore
    startTransition(async () => {
      let payload: Partial<JobApplication> = {
        ...data,
        applicationStatus: getKeyByValue(ApplicationStatusOptions, data.applicationStatus) as ApplicationStatus,
        jobType: getKeyByValue(JobTypeOptions, data.jobType) as JobType,
      };
      const result = await updateGeneric<JobApplication>({
        tableName: "jobApplication",
        data: payload,
        whereCondition: { id: currentJobApplication.id },
      });
      if (result?.error) {
        toast.error("An error occurred while updating the job application. Please try again later.");
      } else {
        toast.success("The job application was successfully updated.");
        revalidatePath("/dashboard/jobs");
        router.push("/dashboard/jobs");
      }
    });
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 text-facebook dark:text-foreground">
        <div className="flex flex-col gap-1">
          <Label>Job Title</Label>
          <Input
            type="text"
            id="jobTitle"
            {...register("jobTitle", {
              required: "Job Title is required.",
              minLength: {
                value: 3,
                message: "Job Title must be at least 3 characters long",
              },
              maxLength: {
                value: 100,
                message: "Job Title must be at most 100 characters long",
              },
            })}
            className="border-facebook-200 dark:border-gray-600 dark:focus:border-gray-500"
            placeholder="Job title"
          />
          <FormErrorMessage message={errors.jobTitle && errors.jobTitle.message} />
          <div className="flex flex-col gap-1">
            <Label>Company name</Label>
            <Input
              type="text"
              id="companyName"
              {...register("companyName", {
                required: "Company name is required.",
                minLength: {
                  value: 3,
                  message: "Company name must be at least 3 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Company name must be at most 50 characters long",
                },
              })}
              className="border-facebook-200 dark:border-gray-600 dark:focus:border-gray-500"
              placeholder="Company name"
            />
            <FormErrorMessage message={errors.companyName && errors.companyName.message} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Application Status</Label>
          <Select
            {...register("applicationStatus", {
              required: "Application status is required.",
            })}
            defaultValue={ApplicationStatusOptions[currentJobApplication.applicationStatus]}
          >
            <SelectTrigger className="w-full" defaultValue="all">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              {applicationStatusOptions.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormErrorMessage message={errors.applicationStatus && errors.applicationStatus.message} />
          <Label>Job Type</Label>
          <Select
            {...register("jobType", {
              required: "Job type is required.",
            })}
            defaultValue={JobTypeOptions[currentJobApplication.jobType]}
          >
            <SelectTrigger className="w-full" defaultValue="all">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypeOptions.map((option) => (
                <SelectItem value={option} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormErrorMessage message={errors.jobType && errors.jobType.message} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Job Location</Label>
          <Input
            id="jobLocation"
            {...register("jobLocation", {
              required: "Job location is required.",
              minLength: {
                value: 3,
                message: "Job location must be at least 3 characters long",
              },
              maxLength: {
                value: 50,
                message: "Job location must be at most 50 characters long",
              },
            })}
            className="border-facebook-200 dark:border-gray-600 dark:focus:border-gray-500"
            type="text"
            placeholder={"Job Location"}
          />
          <FormErrorMessage message={errors.jobLocation && errors.jobLocation.message} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Comments (Optional)</Label>
          <Textarea
            id="comments"
            {...register("comments")}
            className="border-facebook-200 dark:border-gray-600 dark:focus:border-gray-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            className="bg-facebook dark:bg-primary font-semibold h-9 hover:bg-facebook-400 transition-all dark:hover:bg-primary/80 w-full lg:w-max"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              router.push("/dashboard/jobs");
            }}
            className="bg-transparent text-foreground/80 rounded-md p-2 border border-border font-semibold capitalize"
          >
            Go back to jobs list
          </Button>
        </div>
      </form>
    </div>
  );
};

const FormErrorMessage = ({ message }: { message: string | undefined }) =>
  message ? <p className="text-destructive text-xs italic">{message}</p> : null;

export default EditJobModalForm;
