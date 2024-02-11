"use client";
import { searchJobs } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APPLICATION_STATUS_OPTIONS, JOB_TYPE_OPTIONS } from "@/lib/utils";
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
  const applicationStatusOptions = Object.values(APPLICATION_STATUS_OPTIONS);
  const jobTypeOptions = Object.values(JOB_TYPE_OPTIONS);
  const form = useForm({
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 rounded-md shadow-md bg-card/60 dark:bg-gray-800 grid grid-cols-1"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-4">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companySearchTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    onValueChange={field.onChange}
                    defaultValue={field.value || "All"}
                    value={field.value || "All"}
                  >
                    <FormControl>
                      <SelectTrigger name="Job Application Status">
                        <SelectValue placeholder={field.value} aria-label="All Application Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"all"}>All</SelectItem>
                      {applicationStatusOptions.map((option) => (
                        <SelectItem aria-label={option} value={option} key={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    onValueChange={field.onChange}
                    defaultValue={field.value || "all"}
                    value={field.value || "all"}
                  >
                    <FormControl>
                      <SelectTrigger name="Job Type">
                        <SelectValue placeholder="All" aria-label="All Job Types" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"all"}>All</SelectItem>
                      {jobTypeOptions.map((option) => (
                        <SelectItem value={option} key={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sortTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || "desc"}
                    value={field.value || "desc"}
                  >
                    <FormControl>
                      <SelectTrigger name="Sort direction of job applicaiton date">
                        <SelectValue placeholder="Sort date by" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"desc"}>Latest</SelectItem>
                      <SelectItem value={"asc"}>Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
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
                form.reset(
                  {
                    applicationStatus: "all",
                    companySearchTerm: "",
                    jobType: "all",
                    searchTerm: "",
                    sortTerm: "desc",
                  },
                  {
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
      </Form>
    </div>
  );
};

export default JobSearchForm;
