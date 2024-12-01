"use client";
import { type HTMLMotionProps, motion } from "framer-motion";
import type { HTMLAttributes } from "react";

type HtmlTag = keyof HTMLElementTagNameMap;

type MotionClientWrapperProps<T extends HtmlTag> = {
  tag?: T; // Prop to allow dynamic tags
} & HTMLMotionProps<T> &
  HTMLAttributes<HTMLElement>;

const MotionClientWrapper = <T extends HtmlTag = "div">({
  tag,
  children,
  ...props
}: MotionClientWrapperProps<T>) => {
  const Component = motion(tag || "div");
  return <Component {...props}>{children}</Component>;
};

export default MotionClientWrapper;
