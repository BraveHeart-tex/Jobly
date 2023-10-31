import ClearFiltersButton from "@/app/components/ClearFiltersButton";
import ApplicationStatusOptions from "@/app/utils/ApplicationStatusOptions";
import JobTypeOptions from "@/app/utils/JobTypeOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { redirect } from "next/navigation";

interface IJobSearchFormProps {
  page: number;
}

const JobSearchForm = ({ page }: IJobSearchFormProps) => {
  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData.entries());
    const { searchTerm, companySearchTerm, applicationStatus, jobType, sortTerm } = data;

    if (!searchTerm && !companySearchTerm && !applicationStatus && !jobType && !sortTerm) {
      return redirect("/dashboard/jobs");
    }

    redirect(
      `/dashboard/jobs?search=${searchTerm}&company=${companySearchTerm}&status=${applicationStatus}&jobType=${jobType}&sort=${sortTerm}&page=1`
    );
  };

  let filterKey = 0;

  return (
    <div>
      <form
        className="p-4 rounded-md shadow-md bg-card/80 dark:bg-gray-800 grid grid-cols-1"
        action={handleSubmit}
        id="jobSearchForm"
      >
        <h3 className="text-2xl lg:text-3xl text-facebook dark:text-foreground">Job Application Search Form</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
          <div>
            <Label htmlFor="searchTerm" className="text-foreground">
              Job Title
            </Label>
            <Input id="searchTerm" name="searchTerm" type="text" placeholder="Search by job title" />
          </div>
          <div>
            <Label htmlFor="companySearchTerm" className="text-foreground">
              Company
            </Label>
            <Input id="companySearchTerm" name="companySearchTerm" type="text" placeholder="Search by company name" />
          </div>
          <div>
            <Label htmlFor="applicationStatus" className="text-foreground">
              Application Status
            </Label>
            <Select name="applicationStatus">
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
              Job Type {filterKey}
            </Label>
            <Select name="jobType" defaultValue="all" key={filterKey}>
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
            <Select name="sortTerm" defaultValue="desc">
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
          <ClearFiltersButton />
        </div>
      </form>
    </div>
  );
};

export default JobSearchForm;
