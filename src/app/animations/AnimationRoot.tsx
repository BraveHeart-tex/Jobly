"use client";
import { motion } from "framer-motion";

interface IAnimationRootProps {
  children: React.ReactNode;
}

const AnimationRoot = ({ children }: IAnimationRootProps) => {
  return (
    <motion.main
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{
        duration: 0.3,
      }}
    >
      {children}
    </motion.main>
  );
};
export default AnimationRoot;
