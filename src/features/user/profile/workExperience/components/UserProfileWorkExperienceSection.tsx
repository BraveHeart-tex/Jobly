import { DateTime } from "luxon";
import type { WorkExperience } from "@/server/db/schema/workExperiences";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import ClientOnly from "@/components/common/ClientOnly";
import AddProfileRecordButton from "@/features/user/profile/components/AddProfileRecordButton";
import GroupedExperienceCard from "@/features/user/profile/workExperience/components/GroupedExperienceCard";
import SingleExperienceCard from "@/features/user/profile/workExperience/components/SingleExperienceCard";
import type { ExperienceGroup } from "@/features/user/profile/workExperience/types";

interface UserProfileWorkExperienceSectionProps {
  experiences: WorkExperience[];
}

export const MAX_VISIBLE_WORK_EXPERIENCE_COUNT = 5 as const;

const UserProfileWorkExperienceSection = ({
  experiences,
}: UserProfileWorkExperienceSectionProps) => {
  const shouldGroupExperiences = (
    current: WorkExperience,
    nextIndex: number,
  ): boolean => {
    if (!current) return false;

    const next = experiences[nextIndex];
    if (!next || current.employer !== next.employer) return false;

    const currentStart = DateTime.fromISO(current.startDate);

    const nextEnd = DateTime.fromISO(next.endDate || DateTime.now().toISO());

    const hasExperiencesBetween = experiences.some((exp) => {
      if (exp.employer === current.employer) return false;

      const expStart = DateTime.fromISO(exp.startDate);
      const expEnd = DateTime.fromISO(exp.endDate || DateTime.now().toISO());

      return (
        (expStart >= currentStart && expStart <= nextEnd) ||
        (expEnd >= currentStart && expEnd <= nextEnd)
      );
    });

    return !hasExperiencesBetween;
  };

  const groupedExperiences = experiences.reduce<ExperienceGroup[]>(
    (acc, exp, index) => {
      const existingGroup = acc.find(
        (group) => group.employer === exp.employer,
      );

      if (!existingGroup) {
        acc.push({
          employer: exp.employer,
          experiences: [exp],
          canBeGrouped: shouldGroupExperiences(exp, index + 1),
        });
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
      } else if (shouldGroupExperiences(experiences[index - 1]!, index)) {
        existingGroup.experiences.push(exp);
      } else {
        acc.push({
          employer: exp.employer,
          experiences: [exp],
          canBeGrouped: shouldGroupExperiences(exp, index + 1),
        });
      }

      return acc;
    },
    [],
  );

  if (experiences.length === 0) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-0 flex flex-col justify-between">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Experience</h2>
          <AddProfileRecordButton modalLink="workExperience/new" />
        </div>
      </CardContent>

      <ClientOnly>
        <div className="p-4 py-0 pb-2 grid gap-8">
          {groupedExperiences.map((group) =>
            group.experiences.length === 1 ? (
              <SingleExperienceCard
                key={group.experiences[0]?.id}
                experience={group.experiences[0] as WorkExperience}
              />
            ) : (
              <GroupedExperienceCard
                key={group.experiences[0]?.id}
                group={group}
              />
            ),
          )}
        </div>
      </ClientOnly>

      {groupedExperiences.length > MAX_VISIBLE_WORK_EXPERIENCE_COUNT && (
        <Link
          href={"#"}
          className="w-full px-2 py-[0.625rem] z-5 border-t border-b-0 bg-card text-center rounded-md rounded-t-none hover:bg-secondary transition-all"
        >
          <div className="flex items-center gap-1 justify-center text-base font-semibold">
            <p>Show all {groupedExperiences.length} work experiences</p>
            <ArrowRightIcon />
          </div>
        </Link>
      )}
    </Card>
  );
};

export default UserProfileWorkExperienceSection;
