import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export const TRANSITION_DURATION_MS = 300 as const;

interface AnimatedFormFieldsContainerProps extends PropsWithChildren {
  className?: string;
}

const AnimatedFormFieldsContainer = ({
  children,
  className,
}: AnimatedFormFieldsContainerProps) => {
  return (
    <motion.div
      className={cn(
        "flex flex-col gap-8 min-h-[calc(100vh-35rem)]  3xl:min-h-[calc(100vh-40rem)] overflow-y-auto px-2 overflow-x-hidden",
        className,
      )}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: TRANSITION_DURATION_MS / 1000, type: "tween" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedFormFieldsContainer;
