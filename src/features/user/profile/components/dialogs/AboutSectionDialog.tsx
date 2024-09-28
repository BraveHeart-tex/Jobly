"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useGetProfileAboutSection } from "@/features/user/profile/hooks/useGetProfileAboutSection";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { MAX_USER_BIO_LENGTH } from "@/server/db/schema/userBios";
import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GripIcon, InfoIcon, XIcon } from "lucide-react";
import CreatableMultiSelect, {
  type OptionType,
} from "@/components/common/CreatableMultiSelect";
import { useLoadSkillOptions } from "@/features/employer/jobPosting/hooks/useLoadSkillOptions";
import { useCreateSkill } from "@/features/employer/jobPosting/hooks/useCreateSkill";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import type { MultiValue } from "react-select";

const MAX_HIGHLIGHTED_SKILLS_COUNT = 5 as const;

const AboutSectionDialog = () => {
  const { closeModal } = useProfilePageSearchParams();
  const { data, isPendingAboutData } = useGetProfileAboutSection();
  const [bio, setBio] = useState(data?.bio || "");
  const [highlightedSkills, setHighlightedSkills] = useState<
    SkillSelectModel[]
  >(
    data?.highlightedSkills.map((item) => ({
      id: item.skillId,
      name: item.name,
    })) || [],
  );
  const [showSkillsSelect, setShowSkillsSelect] = useState(false);
  const fetchSkills = useLoadSkillOptions();

  const { createSkill, isCreatingSkill } = useCreateSkill({
    onSuccess: (data, variables) => {
      const insertId = data[0]?.id;
      if (insertId) {
        setHighlightedSkills((prev) => [
          ...prev,
          {
            id: insertId,
            name: variables.name,
          },
        ]);
      }
    },
  });

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = event.target.value;
    if (newValue.length > MAX_USER_BIO_LENGTH) {
      newValue = newValue.substring(0, MAX_USER_BIO_LENGTH);
    }
    setBio(newValue);
  };

  const handleSave = () => {};

  const handleCreateSkill = (name: string) => {
    createSkill({ name });
  };

  const handleSkillChange = (newValues: MultiValue<OptionType>) => {
    const mappedValues = newValues.map((item) => ({
      id: Number(item.value as string),
      name: item.label,
    }));
    setHighlightedSkills(mappedValues);
  };

  const hasReachedMaxSkillsCount =
    highlightedSkills.length === MAX_HIGHLIGHTED_SKILLS_COUNT;

  const shouldShowSkillsSelect =
    showSkillsSelect && highlightedSkills.length < MAX_HIGHLIGHTED_SKILLS_COUNT;

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          closeModal();
        }
      }}
    >
      <DialogContent className="max-h-[98%] overflow-hidden px-0 w-full lg:min-w-[42.5rem]">
        <DialogHeader className="px-6">
          <DialogTitle>
            {!isPendingAboutData ? "Edit About Section" : "Loading..."}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-1">
            <p className="text-sm">
              You can talk about your length of experience, your industry and
              your skills. Other people also mention their achievements or
              previous work experience.
            </p>
            <Textarea value={bio} onChange={handleBioChange} rows={10} />
            <div className="flex justify-end">
              <p
                className={cn(
                  "ml-auto text-muted-foreground text-xs",
                  bio.length === MAX_USER_BIO_LENGTH && "text-green-500",
                )}
              >
                {bio.length} / {MAX_USER_BIO_LENGTH}
              </p>
            </div>
          </div>

          <div>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Skills
            </h3>
            <p className="text-sm">
              Show your most important skills - add{" "}
              {MAX_HIGHLIGHTED_SKILLS_COUNT} skills you want to be known for.
            </p>

            <div className="mt-2">
              {highlightedSkills.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {highlightedSkills.map((skill) => (
                    <div key={skill.id} className="w-full">
                      <div className="flex items-center gap-2 w-full">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setHighlightedSkills((prev) =>
                              prev.filter((item) => item.id !== skill.id),
                            )
                          }
                        >
                          <XIcon />
                        </Button>
                        <p className="text-base font-semibold">{skill.name}</p>
                        {highlightedSkills.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="ml-auto"
                          >
                            <GripIcon />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {shouldShowSkillsSelect ? (
                <div className="w-full my-2">
                  <CreatableMultiSelect
                    value={highlightedSkills.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                    loadOptions={fetchSkills}
                    onCreateOption={handleCreateSkill}
                    onChange={handleSkillChange}
                  />
                </div>
              ) : (
                <div className="w-full my-4 space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowSkillsSelect(true)}
                    disabled={hasReachedMaxSkillsCount}
                  >
                    Add Skill
                  </Button>
                  {hasReachedMaxSkillsCount && (
                    <div className="flex items-center gap-1">
                      <InfoIcon size={16} strokeWidth={2} />
                      <p className="text-sm text-muted-foreground">
                        You have reached the maximum limit of{" "}
                        {MAX_HIGHLIGHTED_SKILLS_COUNT} skills.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 gap-1 lg:gap-0">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button
            onClick={handleSave}
            disabled={isPendingAboutData || isCreatingSkill}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutSectionDialog;
