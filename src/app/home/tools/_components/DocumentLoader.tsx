"use client";
import { useDocumentBuilderStore } from "@/lib/stores/useDocumentBuilderStore";
import { LoaderCircle } from "lucide-react";

const DocumentLoader = () => {
  const initialized = useDocumentBuilderStore((state) => state.initialized);

  if (initialized) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-muted/90 z-50">
      <LoaderCircle className="w-16 h-16 animate-spin text-foreground" />
    </div>
  );
};

export default DocumentLoader;
