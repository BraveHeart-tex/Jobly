"use client";
import { searchJobs } from "@/app/actions";
import ApplicationStatusOptions from "@/app/utils/ApplicationStatusOptions";
import JobTypeOptions from "@/app/utils/JobTypeOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { LuFilterX } from "react-icons/lu";

export interface IJobSearchFormValues {
  searchTerm: string;
  companySearchTerm: string;
  applicationStatus: string;
  jobType: string;
  sortTerm: string;
}

const JobSearchForm = () => {
  const router = useRouter();
  let [isPending, startTransition] = useTransition();
  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      searchTerm: "",
      companySearchTerm: "",
      applicationStatus: "all",
      jobType: "all",
      sortTerm: "desc",
    },
  });

  const onSubmit = async (data: IJobSearchFormValues) => {
    startTransition(async () => {
      await searchJobs(data);
    });
  };

  return (
    <div>
      <form
        className="p-4 rounded-md shadow-md bg-card/60 dark:bg-gray-800 grid grid-cols-1"
        onSubmit={handleSubmit(onSubmit)}
        id="jobSearchForm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-4">
          <div>
            <Label htmlFor="searchTerm">Job Title</Label>
            <Input id="searchTerm" type="text" placeholder="Search by job title" {...register("searchTerm")} />
          </div>
          <div>
            <Label htmlFor="companySearchTerm">Company</Label>
            <Input
              id="companySearchTerm"
              {...register("companySearchTerm")}
              type="text"
              placeholder="Search by company name"
            />
          </div>
          <div>
            <Label htmlFor="applicationStatus">Application Status</Label>
            <Select {...register("applicationStatus")} onValueChange={(val) => setValue("applicationStatus", val)}>
              <SelectTrigger className="w-full" defaultValue="all">
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"}>All</SelectItem>
                {applicationStatusOptions.map((option) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <Select {...register("jobType")} defaultValue="all" onValueChange={(val) => setValue("jobType", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"}>All</SelectItem>
                {jobTypeOptions.map((option) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sortTerm">Sort</Label>
            <Select {...register("sortTerm")} defaultValue="desc" onValueChange={(val) => setValue("sortTerm", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort date by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"desc"}>Latest</SelectItem>
                <SelectItem value={"asc"}>Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            className="w-full md:w-max flex items-start gap-2 text-gray-50 bg-facebook hover:bg-facebook-300 dark:bg-gray-700 dark:hover:bg-gray-600 font-semibold text-md transition-all"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                Searching
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FaSearch /> Search
              </span>
            )}
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={(e) => {
              reset(
                {
                  applicationStatus: "all",
                  companySearchTerm: "",
                  jobType: "all",
                  searchTerm: "",
                  sortTerm: "desc",
                },
                {
                  keepValues: false,
                  keepDefaultValues: true,
                }
              );
              router.push("/dashboard/jobs");
            }}
            className="font-semibold text-md flex items-center gap-2"
            variant="destructive"
          >
            <LuFilterX /> Clear Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobSearchForm;
