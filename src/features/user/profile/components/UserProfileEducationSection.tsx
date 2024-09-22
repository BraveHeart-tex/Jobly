import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EducationInformationCard from "@/features/user/profile/components/EducationInformationCard";
import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";
import { ArrowRightIcon, PenSquare, PlusIcon } from "lucide-react";
import Link from "next/link";

interface UserProfileEducationSectionProps {
  educationBackground: EducationalBackground[];
}

export const MAX_VISIBLE_EDUCATION_ITEM_COUNT = 5 as const;

const UserProfileEducationSection = ({
  educationBackground,
}: UserProfileEducationSectionProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-4 relative">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Education</h2>
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
            {educationBackground
              .slice(0, MAX_VISIBLE_EDUCATION_ITEM_COUNT)
              .map((education) => (
                <EducationInformationCard
                  key={education.id}
                  educationInformation={education}
                  className={educationBackground.length > 1 ? "border-b" : ""}
                />
              ))}
          </div>
        </div>
        {educationBackground.length > MAX_VISIBLE_EDUCATION_ITEM_COUNT && (
          <Link
            href={"#"}
            className="absolute bottom-0 left-0 w-full p-4 z-5 border-t bg-card text-center rounded-md rounded-t-none hover:bg-secondary transition-all"
          >
            <div className="flex items-center gap-1 justify-center text-base font-semibold">
              <p>Show all {educationBackground.length} education experiences</p>
              <ArrowRightIcon />
            </div>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfileEducationSection;
