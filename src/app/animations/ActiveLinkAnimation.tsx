"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface IActiveLinkAnimationProps {
  href: string;
}

const ActiveLinkAnimation = ({ href }: IActiveLinkAnimationProps) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  if (!isActive) {
    return null;
  }

  return (
    <motion.span
      className={"absolute left-0 w-full h-1 bg-gray-300 dark:bg-gray-500 rounded-full bottom-0"}
      layoutId="underline"
    />
  );
};

export default ActiveLinkAnimation;
