import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

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
      transition={{ duration: 0.3, type: "tween" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedFormFieldsContainer;
