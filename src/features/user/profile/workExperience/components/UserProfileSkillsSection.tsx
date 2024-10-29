import { Card, CardContent } from "@/components/ui/card";
import AddProfileRecordButton from "@/features/user/profile/components/AddProfileRecordButton";
import EditProfileRecordButton from "@/features/user/profile/components/EditProfileRecordButton";
import type { SkillWithExperience } from "@/features/user/profile/types";
import OpenSkillOrderDialogButton from "@/features/user/profile/workExperience/components/OpenSkillOrderDialogButton";
import { CheckCircleIcon } from "lucide-react";

interface UserProfileSkillsSectionProps {
  skills: SkillWithExperience[];
}

const UserProfileSkillsSection = ({
  skills,
}: UserProfileSkillsSectionProps) => {
  if (skills.length === 0) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto rounded-md">
      <CardContent className="p-0 flex flex-col justify-between">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Skills</h2>
          <div className="flex items-center gap-2">
            {skills.length > 1 && <OpenSkillOrderDialogButton />}
            <AddProfileRecordButton modalLink="skills/new" />
          </div>
        </div>
      </CardContent>

      <div className="p-4 grid gap-8 ">
        {skills.map((skill) => (
          <div key={skill.userSkillId} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-base">{skill.skillName}</p>
              <EditProfileRecordButton
                modalLink="skills/edit"
                recordId={skill.userSkillId}
              />
            </div>
            <div className="grid gap-2">
              {skill.workExperiences.map((workExperience) => (
                <SkillExperienceItem
                  key={`${workExperience.workExperienceId}-${skill.userSkillId}`}
                  title={workExperience.workExperienceTitle}
                />
              ))}
              {skill.educationalBackgrounds.map((educationalBackground) => (
                <SkillExperienceItem
                  key={`${educationalBackground.educationalBackgroundId}-${skill.userSkillId}`}
                  title={educationalBackground.educationalBackgroundTitle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

interface SkillExperienceItemProps {
  title: string;
}

const SkillExperienceItem = ({ title }: SkillExperienceItemProps) => {
  return (
    <p className="text-sm text-muted-foreground flex items-center gap-1">
      <CheckCircleIcon size={19} className="text-primary" />
      {title}
    </p>
  );
};

export default UserProfileSkillsSection;
