"use client";
import { HTMLAttributes } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface IMotionDivProps {
  children: React.ReactNode;
}
const MotionDiv = ({
  children,
  ...props
}: IMotionDivProps & HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">) => {
  return <motion.div {...props}>{children}</motion.div>;
};
export default MotionDiv;
