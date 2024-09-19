"use client";
import { type PropsWithChildren, useEffect, useState } from "react";

const ClientOnly = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
