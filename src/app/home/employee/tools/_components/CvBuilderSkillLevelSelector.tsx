"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import type { InferValueTypeFromConst } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { SectionField } from "@/server/db/schema";

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
    indicator: "bg-red-400",
    background: "bg-red-200",
  },
  [SKILL_LEVELS.BEGINNER]: {
    indicator: "bg-orange-400",
    background: "bg-orange-200",
  },
  [SKILL_LEVELS.SKILLFUL]: {
    indicator: "bg-amber-500",
    background: "bg-amber-200",
  },
  [SKILL_LEVELS.EXPERIENCED]: {
    indicator: "bg-green-600",
    background: "bg-green-200",
  },
  [SKILL_LEVELS.EXPERT]: {
    indicator: "bg-indigo-500",
    background: "bg-indigo-200",
  },
};

type CvBuilderSkillLevelSelectorProps = {
  field: SectionField;
};

const CvBuilderSkillLevelSelector = ({
  field,
}: CvBuilderSkillLevelSelectorProps) => {
  const getFieldValueByFieldId = useDocumentBuilderStore(
    (state) => state.getFieldValueByFieldId,
  );
  const setFieldValue = useDocumentBuilderStore(
    (state) => state.setFieldValueByFieldId,
  );
  const fieldValueObject = field ? getFieldValueByFieldId(field?.id) : null;

  const currentValue =
    (fieldValueObject?.value as SKILL_LEVEL) || SKILL_LEVELS.NOVICE;

  return (
    <div className={"flex flex-col gap-2 w-full min-w-full"}>
      <Label className="text-foreground/80 font-normal w-full text-left">
        {field?.fieldName}
      </Label>
      <div
        className={cn(
          "rounded-md",
          SKILL_LEVEL_COLORS[currentValue].background,
        )}
      >
        {/* TODO: Place boxes here and place the button based on the value of the field to that box */}
        {Object.values(SKILL_LEVELS).map((value) => (
          <Button
            key={value}
            className={cn(SKILL_LEVEL_COLORS[currentValue].indicator)}
            onClick={() => setFieldValue(field.id, value)}
          />
        ))}
      </div>
    </div>
  );
};
export default CvBuilderSkillLevelSelector;
