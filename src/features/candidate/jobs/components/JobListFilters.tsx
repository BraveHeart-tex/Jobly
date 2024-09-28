"use client";

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
import { useJobsListPageSearchParams } from "@/features/candidate/jobs/hooks/useJobsListPageSearchParams";
import { generateReadableEnumLabel } from "@/lib/utils/stringUtils";
import jobPostings, {
  type JobPostingWorkType,
  type JobPostingEmploymentType,
} from "@/server/db/schema/jobPostings";
import { SlidersHorizontal } from "lucide-react";

export const employmentOptions: {
  label: string;
  value: JobPostingEmploymentType;
}[] = jobPostings.employmentType.enumValues.map((employmentType) => ({
  label: generateReadableEnumLabel(employmentType),
  value: employmentType,
}));

export const workTypeOptions: {
  label: string;
  value: JobPostingWorkType;
}[] = jobPostings.workType.enumValues.map((workType) => ({
  label: generateReadableEnumLabel(workType),
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
    clearAllFilters,
  } = useJobsListPageSearchParams();

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
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
              value={workType ?? ""}
              onValueChange={(value) =>
                setWorkType(value as JobPostingWorkType)
              }
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
              value={employmentType ?? ""}
              onValueChange={(value) =>
                setEmploymentType(value as JobPostingEmploymentType)
              }
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
          <Button
            className="mt-1"
            variant="secondary"
            onClick={clearAllFilters}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JobListFilters;
