"use client";
import { cn } from "@/src/lib/utils";
import { useIsPresent } from "framer-motion";
import { motion } from "framer-motion";
interface IListAnimationProps {
  children: React.ReactNode;
  className?: string;
}

const ListAnimation = ({ children, className }: IListAnimationProps) => {
  const isPresent = useIsPresent();
  const animations = {
    style: { opacity: isPresent ? 1 : 0 },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  };
  return (
    <motion.article className={cn(className)} {...animations}>
      {children}
    </motion.article>
  );
};
export default ListAnimation;
