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
    <motion.div
      className={"absolute inset-0 w-full bg-facebook-700 dark:bg-gray-900 rounded-md"}
      layoutId="underline"
    />
  );
};

export default ActiveLinkAnimation;
