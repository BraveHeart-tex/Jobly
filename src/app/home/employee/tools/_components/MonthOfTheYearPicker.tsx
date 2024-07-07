"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import DocumentBuilderInput from "./DocumentBuilderInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DocumentInputWithPopover = () => {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <DocumentBuilderInput
          doNotRenderLabel
          value="Jul, 2018"
          onChange={() => {}}
        />
      </PopoverTrigger>
      <PopoverContent className="p-2 rounded-md">
        <div className="grid gap-2">
          <div className="w-full flex items-center justify-between">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setYear(year - 1)}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="text-sm rounded-md text-primary-foreground bg-primary py-1 px-2 tabular-nums">
              {year}
            </span>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setYear(year + 1)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2 mx-auto w-full place-items-center">
            {MONTHS.map((monthItem) => (
              <Button
                variant={month === monthItem ? "default" : "ghost"}
                className="h-8"
                key={monthItem}
                onClick={() => setMonth(monthItem)}
              >
                <p>{monthItem}</p>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
