import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { cn } from "@/lib/utils";
import { removeHTMLTags } from "@/lib/utils/string";

interface CharacterCountIndicatorProps {
  fieldId: number;
}

const CharacterCountIndicator = ({ fieldId }: CharacterCountIndicatorProps) => {
  const fieldValue = useDocumentBuilderStore(
    (state) =>
      state.fieldValues.find((fieldValue) => fieldValue.fieldId === fieldId)
        ?.value,
  );

  const renderCharCountIndicator = () => {
    const charCount = removeHTMLTags(fieldValue || "")?.length;
    const maxCount = charCount >= 400 ? 600 : 400;
    let colorClass = "";
    if (charCount < 400) {
      colorClass = "text-yellow-600";
    } else if (charCount <= 600) {
      colorClass = "text-green-600";
    } else if (charCount > 600) {
      colorClass = "text-red-600";
    }

    return (
      <p className={cn("tabular-nums whitespace-nowrap", colorClass)}>
        {charCount} / {maxCount}
        {maxCount === 400 ? "+" : ""}
      </p>
    );
  };

  return renderCharCountIndicator();
};

export default CharacterCountIndicator;
