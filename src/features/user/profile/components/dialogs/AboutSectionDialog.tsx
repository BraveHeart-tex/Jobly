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
import { GripIcon, XIcon } from "lucide-react";

const AboutSectionDialog = () => {
  const { closeModal } = useProfilePageSearchParams();
  const { data, isPending } = useGetProfileAboutSection();
  const [bio, setBio] = useState(data?.bio || "");
  const [highlightedSkills, setHighlightedSkills] = useState(
    data?.highlightedSkills || [],
  );
  const [showSkillsSelect, setShowSkillsSelect] = useState(false);

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = event.target.value;
    if (newValue.length > MAX_USER_BIO_LENGTH) {
      newValue = newValue.substring(0, MAX_USER_BIO_LENGTH);
    }
    setBio(newValue);
  };

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
            {!isPending ? "Edit About Section" : "Loading..."}
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
              Show your most important skills - add 5 skills you want to be
              known for.
            </p>

            <div className="mt-2">
              {highlightedSkills.length > 0 ? (
                <div>
                  {highlightedSkills.map((skill) => (
                    <div key={skill.skillId} className="w-full">
                      <div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setHighlightedSkills((prev) =>
                              prev.filter(
                                (item) => item.skillId !== skill.skillId,
                              ),
                            )
                          }
                        >
                          <XIcon />
                        </Button>
                        <p className="text-base font-semibold">{skill.name}</p>
                        {highlightedSkills.length > 1 && (
                          <Button type="button" variant="ghost" size="icon">
                            <GripIcon />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {showSkillsSelect ? (
                <div>Skills select</div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSkillsSelect(true)}
                >
                  Add Skill
                </Button>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="px-6 gap-1 lg:gap-0">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutSectionDialog;
