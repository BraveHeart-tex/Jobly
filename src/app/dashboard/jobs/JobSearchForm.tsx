"use client";
import { searchJobs } from "@/app/actions";
import ApplicationStatusOptions from "@/app/utils/ApplicationStatusOptions";
import JobTypeOptions from "@/app/utils/JobTypeOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export interface IJobSearchFormValues {
  searchTerm: string;
  companySearchTerm: string;
  applicationStatus: string;
  jobType: string;
  sortTerm: string;
}

const JobSearchForm = () => {
  const router = useRouter();
  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      searchTerm: "",
      companySearchTerm: "",
      applicationStatus: "all",
      jobType: "all",
      sortTerm: "desc",
    },
  });

  const onSubmit = async (data: IJobSearchFormValues) => {
    // reset();
    await searchJobs(data);
  };

  return (
    <div>
      <form
        className="p-4 rounded-md shadow-md bg-card/80 dark:bg-gray-800 grid grid-cols-1"
        onSubmit={handleSubmit(onSubmit)}
        id="jobSearchForm"
      >
        <h3 className="text-2xl lg:text-3xl text-facebook dark:text-foreground font-semibold">
          Job Application Search Form
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
          <div>
            <Label htmlFor="searchTerm" className="text-foreground">
              Job Title
            </Label>
            <Input id="searchTerm" type="text" placeholder="Search by job title" {...register("searchTerm")} />
          </div>
          <div>
            <Label htmlFor="companySearchTerm" className="text-foreground">
              Company
            </Label>
            <Input
              id="companySearchTerm"
              {...register("companySearchTerm")}
              type="text"
              placeholder="Search by company name"
            />
          </div>
          <div>
            <Label htmlFor="applicationStatus" className="text-foreground">
              Application Status
            </Label>
            <Select {...register("applicationStatus")}>
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
            <Label htmlFor="jobType" className="text-foreground">
              Job Type
            </Label>
            <Select {...register("jobType")} defaultValue="all">
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
            <Label htmlFor="sortTerm" className="text-foreground">
              Sort
            </Label>
            <Select {...register("sortTerm")} defaultValue="desc">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Job Type" />
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
            className="w-full md:w-max text-gray-50 bg-facebook hover:bg-facebook-300 dark:bg-foreground dark:hover:bg-foreground-300 font-semibold text-md transition-all"
          >
            Search
          </Button>
          <Button
            type="button"
            onClick={(e) => {
              reset();
              router.push("/dashboard/jobs");
            }}
            className="font-semibold text-md"
            variant="destructive"
          >
            Clear Filters
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobSearchForm;
