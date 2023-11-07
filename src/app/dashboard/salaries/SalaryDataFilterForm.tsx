'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

interface SalaryDataFilterFormValues {
  jobTitle: string;
  citySearchTerm: string;
  sortTerm: string;
}

const SalaryDataFilterForm = () => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<SalaryDataFilterFormValues>({
    defaultValues: {
      jobTitle: "",
      citySearchTerm: "",
      sortTerm: "",
    },
  });

  const onSubmit = (data: SalaryDataFilterFormValues) => {
    startTransition(async () => {
      const { jobTitle, citySearchTerm, sortTerm } = data;
      if (!jobTitle && !citySearchTerm && !sortTerm) {
        router.push(`/dashboard/salaries?page=${1}`);
      } else {
        router.push(`/dashboard/salaries?page=${1}&city=${citySearchTerm}&search=${jobTitle}&sort=${sortTerm}`);
      }
    });
  };

  const clearAllFilters = () => {
    form.reset();
    router.push(`/dashboard/salaries?page=${1}`);
  };

  return (
    <div className="border bg-card/40 p-4 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"grid grid-cols-1 gap-2 lg:grid-cols-3"}>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Search by job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="citySearchTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City / State</FormLabel>
                  <FormControl>
                    <Input placeholder="Search by city / state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sortTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Salary By</FormLabel>
                  <Select onValueChange={(value) => form.setValue("sortTerm", value)} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        {field.value ? <SelectValue placeholder="Sort salaries by" /> : "Sort salaries by"}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"desc"}>Highest</SelectItem>
                      <SelectItem value={"asc"}>Lowest</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-1 mt-2">
              <Button
                disabled={isPending}
                type="button"
                className="w-full lg:w-max"
                variant="destructive"
                onClick={() => clearAllFilters()}
              >
                Clear Filters
              </Button>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full lg:w-max text-white bg-facebook hover:bg-facebook-600 transition-all dark:bg-primary"
              >
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SalaryDataFilterForm;
