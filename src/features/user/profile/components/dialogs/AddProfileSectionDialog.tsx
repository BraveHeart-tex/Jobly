"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ModalDialogMapKey } from "@/features/user/profile/components/FormDialogContainer";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";

interface AddProfileSectionDialogProps {
  className?: string;
}

interface ProfileSectionOption {
  label: string;
  description: string;
  modalLink: ModalDialogMapKey;
}

const profileSectionOptions: ProfileSectionOption[] = [
  {
    label: "About Me",
    description:
      "Tell us a little about yourself, your background, and what you're passionate about.",
    modalLink: "about",
  },
  {
    label: "Work Experience",
    description:
      "Summarize your professional journey, highlighting key roles, projects, and achievements.",
    modalLink: "workExperience/new",
  },
  {
    label: "Education",
    description:
      "Provide details about your academic background, degrees, and any relevant coursework or certifications.",
    modalLink: "educationalBackground/new",
  },
  {
    label: "Skill",
    description: "Showcase your key skills and expertise.",
    modalLink: "skills/new",
  },
];

const AddProfileSectionDialog = ({
  className,
}: AddProfileSectionDialogProps) => {
  const { openModal } = useProfilePageSearchParams();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn(className)}>
          Add Profile Section
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Profile Section</DialogTitle>
          <DialogDescription>
            Make your profile stand out by adding a profile section.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          {profileSectionOptions.map((option) => (
            <Button
              key={option.label}
              variant="outline"
              className="w-full p-6 h-full flex flex-col items-start whitespace-normal"
              onClick={() => {
                openModal(option.modalLink);
              }}
            >
              <span className="text-foreground text-lg">{option.label}</span>
              <span className="text-muted-foreground font-normal text-left">
                {option.description}
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProfileSectionDialog;
