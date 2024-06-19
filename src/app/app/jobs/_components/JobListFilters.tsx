"use client";

import { useJobsListPageSearchParams } from "@/app/app/jobs/_hooks/useJobsListPageSearchParams";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalizeString } from "@/lib/utils";
import {
  type JobEmploymentType,
  type JobWorkType,
  job,
} from "@/server/db/schema";
import { SlidersHorizontal } from "lucide-react";

const employmentOptions: {
  label: Capitalize<JobEmploymentType>;
  value: JobEmploymentType;
}[] = job.employmentType.enumValues.map((employmentType) => ({
  label: capitalizeString<JobEmploymentType>(employmentType),
  value: employmentType,
}));

const workTypeOptions: {
  label: Capitalize<JobWorkType>;
  value: JobWorkType;
}[] = job.workType.enumValues.map((workType) => ({
  label: capitalizeString<JobWorkType>(workType),
  value: workType,
}));

const JobListFilters = () => {
  const {
    viewed,
    setViewed,
    bookmarked,
    setBookmarked,
    workType,
    setWorkType,
    employmentType,
    setEmploymentType,
  } = useJobsListPageSearchParams();

  const clearAllFilters = () => {
    setBookmarked("false");
    setViewed("false");
    setWorkType("");
    setEmploymentType("");
  };

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button>
                <SlidersHorizontal size={18} />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Additional Filters</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent>
        <div className="grid gap-2">
          <h2 className="text-primary font-medium tracking-normal text-center">
            Additional Filters
          </h2>
          <div>
            <Label>Work Type</Label>
            <Select
              defaultValue={workType}
              value={workType}
              onValueChange={(value) => setWorkType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Work Type" />
              </SelectTrigger>
              <SelectContent>
                {workTypeOptions.map((option) => (
                  <SelectItem value={option.value} key={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Employment Type</Label>
            <Select
              defaultValue={employmentType}
              value={employmentType}
              onValueChange={(value) => setEmploymentType(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Employment Type" />
              </SelectTrigger>
              <SelectContent>
                {employmentOptions.map((option) => (
                  <SelectItem value={option.value} key={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="userViewedJob"
              checked={viewed === "true" || bookmarked === "true"}
              onCheckedChange={(checked) => {
                setViewed(checked ? "true" : "false");
              }}
            />
            <Label htmlFor="userViewedJob">Show Viewed Jobs</Label>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="userBookmarkedJob"
              checked={bookmarked === "true"}
              onCheckedChange={(checked) => {
                setBookmarked(checked ? "true" : "false");
              }}
            />
            <Label htmlFor="userBookmarkedJob">Show Bookmarked Jobs</Label>
          </div>
          <Button className="mt-1" variant="ghost" onClick={clearAllFilters}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JobListFilters;
