import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WorkExperienceTimeline from "@/features/user/profile/components/WorkExperienceTimeline";
import type { WorkExperience } from "@/server/db/schema/workExperiences";
import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CalendarIcon,
  PenSquare,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

interface UserProfileWorkExperienceSectionProps {
  workExperiences: WorkExperience[];
}

export const MAX_VISIBLE_WORK_EXPERIENCE_COUNT = 5 as const;

const UserProfileWorkExperienceSection = ({
  workExperiences,
}: UserProfileWorkExperienceSectionProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-0 flex flex-col justify-between">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Experience</h2>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant={"ghost"}>
                  <PlusIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 py-2 w-[12.5rem]">
                <Link
                  href={"#"}
                  className="flex items-center gap-2 hover:bg-muted p-2 text-[0.93rem]"
                >
                  <BriefcaseBusinessIcon size={19} />
                  <span className="font-medium">Add position</span>
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-2 hover:bg-muted p-2 text-[0.93rem]"
                >
                  <CalendarIcon size={19} />
                  <span className="font-medium">Add career gap</span>
                </Link>
              </PopoverContent>
            </Popover>
            <Button size="icon" variant={"ghost"}>
              <PenSquare />
            </Button>
          </div>
        </div>

        <div className="p-4 py-0 pb-2">
          <WorkExperienceTimeline experiences={workExperiences} />
        </div>

        {workExperiences.length > MAX_VISIBLE_WORK_EXPERIENCE_COUNT && (
          <Link
            href={"#"}
            className="w-full px-2 py-[0.625rem] z-5 border-t border-b-0 bg-card text-center rounded-md rounded-t-none hover:bg-secondary transition-all"
          >
            <div className="flex items-center gap-1 justify-center text-base font-semibold">
              <p>Show all {workExperiences.length} work experiences</p>
              <ArrowRightIcon />
            </div>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
export default UserProfileWorkExperienceSection;
