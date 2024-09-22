import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import WorkExperienceTimeline from "@/features/user/profile/components/WorkExperienceTimeline";
import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { ArrowRightIcon, PenSquare, PlusIcon } from "lucide-react";
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
      <CardContent className="p-4 relative">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Experience</h2>
            <div className="flex items-center gap-2">
              <Button size="icon" variant={"ghost"}>
                <PlusIcon />
              </Button>
              <Button size="icon" variant={"ghost"}>
                <PenSquare />
              </Button>
            </div>
          </div>
          <div className="py-4">
            <WorkExperienceTimeline experiences={workExperiences} />
          </div>
        </div>
        {workExperiences.length > MAX_VISIBLE_WORK_EXPERIENCE_COUNT && (
          <Link
            href={"#"}
            className="absolute bottom-0 left-0 w-full p-4 z-5 border-t bg-card text-center rounded-md rounded-t-none hover:bg-secondary transition-all"
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
