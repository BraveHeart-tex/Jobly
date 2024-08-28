import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export const TRANSITION_DURATION_MS = 300 as const;

const AnimatedFormFieldsContainer = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="grid gap-4"
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -100,
      }}
      transition={{ duration: TRANSITION_DURATION_MS / 1000, type: "tween" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedFormFieldsContainer;
