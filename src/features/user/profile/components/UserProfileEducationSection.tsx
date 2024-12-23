import { Card, CardContent } from "@/components/ui/card";
import AddProfileRecordButton from "@/features/user/profile/components/AddProfileRecordButton";
import EducationInformationCard from "@/features/user/profile/components/EducationInformationCard";
import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface UserProfileEducationSectionProps {
  educationBackground: EducationalBackground[];
}

export const MAX_VISIBLE_EDUCATION_ITEM_COUNT = 5 as const;

const UserProfileEducationSection = ({
  educationBackground,
}: UserProfileEducationSectionProps) => {
  if (educationBackground.length === 0) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-0 flex flex-col justify-between">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Education</h2>
          <AddProfileRecordButton modalLink="educationalBackground/new" />
        </div>
        <div className="p-4 py-0 pb-2">
          {educationBackground
            .slice(0, MAX_VISIBLE_EDUCATION_ITEM_COUNT)
            .map((education) => (
              <EducationInformationCard
                key={education.id}
                educationInformation={education}
              />
            ))}
        </div>

        {educationBackground.length > MAX_VISIBLE_EDUCATION_ITEM_COUNT && (
          <Link
            href={"#"}
            className="w-full px-2 py-[0.625rem] z-5 border-t bg-card text-center rounded-md rounded-t-none hover:bg-secondary transition-all"
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
