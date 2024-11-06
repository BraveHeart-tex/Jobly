"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SHARED_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const GuestAuthPopover = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-1">
          <span>Login / Sign Up</span>
          <ChevronDownIcon size={17} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0">
        <div className="grid gap-4 border-b px-4 pb-4">
          <div className="grid gap-2 text-sm">
            <h3 className="font-semibold">Candidate (Looking for a job?)</h3>
            <p className="text-muted-foreground">
              Discover the perfect job for you!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`${SHARED_ROUTES.LOGIN}?portalType=candidate`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
              )}
              onClick={() => setOpen(false)}
            >
              Candidate Login
            </Link>
            <Link
              href={`${SHARED_ROUTES["SIGN-UP"]}?portalType=candidate`}
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="grid gap-4 px-4 mt-4">
          <div className="grid gap-2 text-sm">
            <h3 className="font-semibold">Employer</h3>
            <p className="text-muted-foreground">
              We have the perfect candidate for you
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href={`${SHARED_ROUTES.LOGIN}?portalType=employer`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
              )}
              onClick={() => setOpen(false)}
            >
              Employer Login
            </Link>
            <Link
              href={`${SHARED_ROUTES["SIGN-UP"]}?portalType=employer`}
              className={cn(
                buttonVariants({
                  variant: "default",
                }),
              )}
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default GuestAuthPopover;
