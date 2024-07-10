import { Button } from "@/components/ui/button";
import {
  BookOpenTextIcon,
  BriefcaseBusinessIcon,
  ContactIcon,
  Flower2Icon,
  GuitarIcon,
  LanguagesIcon,
  SlidersHorizontalIcon,
  type LucideIcon,
} from "lucide-react";

const OTHER_SECTION_OPTIONS: { icon: LucideIcon; label: string }[] = [
  {
    icon: SlidersHorizontalIcon,
    label: "Custom Section",
  },
  {
    icon: Flower2Icon,
    label: "Extra-curricular Activities",
  },
  {
    icon: GuitarIcon,
    label: "Hobbies",
  },
  {
    icon: ContactIcon,
    label: "References",
  },
  {
    icon: BookOpenTextIcon,
    label: "Courses",
  },
  {
    icon: BriefcaseBusinessIcon,
    label: "Internships",
  },
  {
    icon: LanguagesIcon,
    label: "Languages",
  },
];

const CvBuilderCustomSectionOptions = () => {
  return (
    <div className="grid mt-12 gap-2 pb-10">
      <h3 className="whitespace-pre text-[22px] font-semibold">Add Section</h3>
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-2">
        {OTHER_SECTION_OPTIONS.map((option) => (
          <Button
            key={option.label}
            variant="ghost"
            className="flex items-center gap-2 w-full justify-start py-6 hover:text-primary"
          >
            <option.icon size={26} strokeWidth={1} className="text-primary" />
            <span className="text-base font-normal">{option.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default CvBuilderCustomSectionOptions;
