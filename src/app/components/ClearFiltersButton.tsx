"use client";
import { Button } from "@/components/ui/button";

const ClearFiltersButton = () => {
  return (
    <Button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        window.location.reload();
      }}
      className="font-semibold text-md"
      variant="destructive"
    >
      Clear Filters
    </Button>
  );
};
export default ClearFiltersButton;
