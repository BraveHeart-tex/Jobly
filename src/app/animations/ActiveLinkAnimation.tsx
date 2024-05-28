"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface IActiveLinkAnimationProps {
  href: string;
  className?: string;
}

const ActiveLinkAnimation = ({ href, className }: IActiveLinkAnimationProps) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  if (!isActive) {
    return null;
  }

  return <motion.div className={cn("absolute inset-0 w-full bg-primary rounded-md", className)} layoutId="underline" />;
};

export default ActiveLinkAnimation;
