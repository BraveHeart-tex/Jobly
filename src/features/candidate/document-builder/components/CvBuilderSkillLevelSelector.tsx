"use client";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { InferValueTypeFromConst } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";

const SKILL_LEVELS = {
  NOVICE: "Novice",
  BEGINNER: "Beginner",
  SKILLFUL: "Skillful",
  EXPERIENCED: "Experienced",
  EXPERT: "Expert",
} as const;

type SKILL_LEVEL = InferValueTypeFromConst<typeof SKILL_LEVELS>;

const SKILL_LEVEL_COLORS = {
  [SKILL_LEVELS.NOVICE]: {
    indicator: "bg-red-600 dark:bg-red-300",
    background: "bg-red-400 dark:bg-red-600",
  },
  [SKILL_LEVELS.BEGINNER]: {
    indicator: "bg-orange-600 dark:bg-orange-300",
    background: "bg-orange-400 dark:bg-orange-600",
  },
  [SKILL_LEVELS.SKILLFUL]: {
    indicator: "bg-amber-600 dark:bg-amber-300",
    background: "bg-amber-400 dark:bg-amber-600",
  },
  [SKILL_LEVELS.EXPERIENCED]: {
    indicator: "bg-green-600 dark:bg-green-300",
    background: "bg-green-400 dark:bg-green-600",
  },
  [SKILL_LEVELS.EXPERT]: {
    indicator: "bg-indigo-600 dark:bg-indigo-300",
    background: "bg-indigo-400 dark:bg-indigo-600",
  },
};

interface CvBuilderSkillLevelSelectorProps {
  field: DocumentSectionField;
  disabled?: boolean;
}

const CvBuilderSkillLevelSelector = ({
  field,
  disabled,
}: CvBuilderSkillLevelSelectorProps) => {
  const setFieldValue = useDocumentBuilderStore((state) => state.setFieldValue);
  const currentValue = (field?.value as SKILL_LEVEL) || SKILL_LEVELS.NOVICE;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 w-full min-w-full h-[85px]",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      <Label className="text-foreground/80 font-normal w-full text-left">
        {field?.fieldName}
      </Label>
      <div className="relative h-12 rounded-md bg-background">
        <div className="absolute inset-0 flex">
          {Object.values(SKILL_LEVELS).map((level) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={level}
              className={cn(
                "flex-1 border-r last:border-r-0 border-input cursor-pointer rounded-sm",
                SKILL_LEVEL_COLORS[level].background,
              )}
              onClick={() => setFieldValue(field.id, level)}
            />
          ))}
        </div>
        <div
          className={cn(
            "absolute top-0 bottom-0 w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
            SKILL_LEVEL_COLORS[currentValue].indicator,
          )}
          style={{
            left: `calc(${
              Object.values(SKILL_LEVELS).indexOf(currentValue) * 20
            }% + 10%)`,
            transform: "translateX(-50%) translateY(50%)",
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        {Object.values(SKILL_LEVELS).map((level) => (
          <span key={level}>{level}</span>
        ))}
      </div>
    </div>
  );
};
export default CvBuilderSkillLevelSelector;
