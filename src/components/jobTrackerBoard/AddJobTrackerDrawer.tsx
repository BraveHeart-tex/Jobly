"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import JobTrackerApplicationForm from "../forms/JobTrackerApplicationForm";
import type { JobTrackerApplicationStatus } from "@/server/db/schema";

type AddJobTrackerDrawerProps = {
  status: JobTrackerApplicationStatus;
};

const AddJobTrackerDrawer = ({ status }: AddJobTrackerDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-full rounded-t-none flex items-center gap-1"
          variant="secondary"
        >
          <PlusIcon size={17} />
          Add Job
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-full lg:min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Add Job Application</SheetTitle>
          <SheetDescription>
            Use the form below to add your job application to track it with
            ease!
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8">
          <JobTrackerApplicationForm
            defaultValues={{
              status,
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddJobTrackerDrawer;
