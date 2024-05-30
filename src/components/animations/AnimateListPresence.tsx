"use client";
import { AnimatePresence } from "framer-motion";

interface IAnimateListPresenceProps {
  children: React.ReactNode;
}
const AnimateListPresence = ({ children }: IAnimateListPresenceProps) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};
export default AnimateListPresence;
