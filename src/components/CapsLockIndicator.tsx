"use client";

import { ArrowBigUpDashIcon } from "lucide-react";
import useCapsLock from "./hooks/useCapsLock";

const CapsLockIndicator = () => {
  const isCapsLockActive = useCapsLock();

  if (!isCapsLockActive) return null;

  return (
    <div className="absolute right-0 top-0 h-9 flex items-center justify-center rounded-md bg-primary p-2 text-primary-foreground">
      <ArrowBigUpDashIcon />
    </div>
  );
};

export default CapsLockIndicator;
