"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

const AddJobTrackerDrawer = () => {
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddJobTrackerDrawer;
