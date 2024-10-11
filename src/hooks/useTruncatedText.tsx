import { useState } from "react";

export const useTruncatedText = (text: string, maxVisibleLength: number) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowToggleButton = text.length > maxVisibleLength;

  const truncatedText =
    text.slice(0, maxVisibleLength) +
    (text.length > maxVisibleLength ? "..." : "");

  return { isExpanded, setIsExpanded, shouldShowToggleButton, truncatedText };
};
