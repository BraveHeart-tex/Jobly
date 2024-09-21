"use client";
import { type HTMLMotionProps, motion } from "framer-motion";
import type { HTMLAttributes, ReactHTML } from "react";

type MotionClientWrapperProps<T extends keyof ReactHTML> = {
  tag?: T; // Prop to allow dynamic tags
} & HTMLMotionProps<T> &
  HTMLAttributes<HTMLElement>;

const MotionClientWrapper = <T extends keyof ReactHTML = "div">({
  tag,
  children,
  ...props
}: MotionClientWrapperProps<T>) => {
  const Component = motion(tag || "div");
  return <Component {...props}>{children}</Component>;
};

export default MotionClientWrapper;
