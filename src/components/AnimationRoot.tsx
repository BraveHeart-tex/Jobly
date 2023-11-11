"use client";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

interface IAnimationRootProps {
  children: React.ReactNode;
}

const AnimationRoot = ({ children }: IAnimationRootProps) => {
  return (
    <motion.main variants={variants} initial="hidden" animate="enter" transition={{ type: "linear" }}>
      {children}
    </motion.main>
  );
};
export default AnimationRoot;
