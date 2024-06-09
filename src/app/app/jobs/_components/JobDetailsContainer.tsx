"use client";
import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef } from "react";

type JobDetailsContainerProps = {
  children: ReactNode;
  className?: string;
  currentJobId?: number;
};

const JobDetailsContainer = ({
  children,
  className,
  currentJobId,
}: JobDetailsContainerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (currentJobId && containerRef?.current) {
      containerRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentJobId]);

  return (
    <article ref={containerRef} className={cn(className)}>
      {children}
    </article>
  );
};

export default JobDetailsContainer;
