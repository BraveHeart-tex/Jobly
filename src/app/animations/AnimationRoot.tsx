"use client";
import { motion } from "framer-motion";



interface IAnimationRootProps {
  children: React.ReactNode;
}

const AnimationRoot = ({ children }: IAnimationRootProps) => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "linear" }}
    >
      {children}
    </motion.main>
  );
};
export default AnimationRoot;
