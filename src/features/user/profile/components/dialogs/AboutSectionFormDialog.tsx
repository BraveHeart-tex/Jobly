"use client";
import { Textarea } from "@/components/ui/textarea";
import { useGetProfileAboutSection } from "@/features/user/profile/hooks/useGetProfileAboutSection";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { MAX_USER_BIO_LENGTH } from "@/server/db/schema/userBios";
import { useState } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import CreatableMultiSelect, {
  type OptionType,
} from "@/components/common/CreatableMultiSelect";
import { useLoadSkillOptions } from "@/features/employer/jobPosting/hooks/useLoadSkillOptions";
import { useCreateSkill } from "@/features/employer/jobPosting/hooks/useCreateSkill";
import type { MultiValue } from "react-select";
import HighlightedSkillsDndContext from "../HighlightedSkillsDndContext";
import HighlightedSkillItem from "../HighlightedSkillItem";
import { useSaveAboutSectionData } from "../../hooks/useSaveAboutSectionData";
import { toast } from "sonner";
import FormDialog from "@/components/common/FormDialog";
import { useRouter } from "next/navigation";

const MAX_HIGHLIGHTED_SKILLS_COUNT = 5 as const;

const AboutSectionFormDialog = () => {
  const router = useRouter();
  const { closeModal } = useProfilePageSearchParams();

  const {
    bio,
    highlightedSkills,
    setBio,
    setHighlightedSkills,
    isPendingAboutData,
  } = useGetProfileAboutSection();

  const { saveAboutInformation, isSavingAboutInformation } =
    useSaveAboutSectionData({
      onSuccess: async () => {
        await closeModal();
        router.refresh();
        toast.success("About section updated successfully.");
      },
    });

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

  const [showSkillsSelect, setShowSkillsSelect] = useState(false);

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = event.target.value;
    if (newValue.length > MAX_USER_BIO_LENGTH) {
      newValue = newValue.substring(0, MAX_USER_BIO_LENGTH);
    }
    setBio((prev) => ({
      ...prev,
      content: newValue,
    }));
  };

  const handleSave = async () => {
    saveAboutInformation({
      bio: {
        id: bio?.id,
        content: bio?.content || "",
      },
      highlightedSkills: highlightedSkills.map((item, index) => ({
        id: item.id,
        name: item.name,
        order: index + 1,
      })),
    });
  };

  const handleCreateSkill = (name: string) => {
    if (isLoadingOperation) return;
    createSkill({ name });
  };

  const handleSkillChange = (newValues: MultiValue<OptionType>) => {
    if (isLoadingOperation) return;
    const mappedValues = newValues.map((item) => ({
      id: Number(item.value as string),
      name: item.label,
    }));
    setHighlightedSkills(mappedValues);
  };

  const isLoadingOperation = isSavingAboutInformation || isCreatingSkill;

  const hasReachedMaxSkillsCount =
    highlightedSkills.length === MAX_HIGHLIGHTED_SKILLS_COUNT;

  const shouldShowSkillsSelect =
    showSkillsSelect && highlightedSkills.length < MAX_HIGHLIGHTED_SKILLS_COUNT;

  return (
    <FormDialog
      title="Edit About Section"
      onClose={closeModal}
      isLoadingInitialData={isPendingAboutData}
      onSubmit={handleSave}
      isCloseDisabled={isLoadingOperation}
      isSaveDisabled={
        isPendingAboutData || isCreatingSkill || isSavingAboutInformation
      }
    >
      <div className="space-y-1">
        <p className="text-sm">
          You can talk about your length of experience, your industry and your
          skills. Other people also mention their achievements or previous work
          experience.
        </p>
        <Textarea value={bio?.content} onChange={handleBioChange} rows={10} />
        <div className="flex justify-end">
          <p
            className={cn(
              "ml-auto text-muted-foreground text-xs",
              bio?.content.length === MAX_USER_BIO_LENGTH && "text-green-500",
            )}
          >
            {bio?.content.length} / {MAX_USER_BIO_LENGTH}
          </p>
        </div>
      </div>

      <div>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Skills
        </h3>
        <p className="text-sm">
          Show your most important skills - add {MAX_HIGHLIGHTED_SKILLS_COUNT}{" "}
          skills you want to be known for.
        </p>

        <div className="mt-2">
          {highlightedSkills.length > 0 ? (
            <div className="flex flex-col gap-2">
              <HighlightedSkillsDndContext
                highlightedSkills={highlightedSkills}
                setHighlightedSkills={setHighlightedSkills}
              >
                {highlightedSkills.map((skill) => (
                  <HighlightedSkillItem
                    key={skill.id}
                    skill={skill}
                    onRemoveClick={(id) =>
                      setHighlightedSkills((prev) =>
                        prev.filter((item) => item.id !== id),
                      )
                    }
                    shouldShowGripIcon={highlightedSkills.length > 1}
                  />
                ))}
              </HighlightedSkillsDndContext>
            </div>
          ) : null}

          {shouldShowSkillsSelect ? (
            <div className="w-full my-2">
              <CreatableMultiSelect
                value={highlightedSkills.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                controlShouldRenderValue={false}
                loadOptions={fetchSkills}
                onCreateOption={handleCreateSkill}
                onChange={(newValues) =>
                  handleSkillChange(newValues as MultiValue<OptionType>)
                }
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
    </FormDialog>
  );
};

export default AboutSectionFormDialog;
