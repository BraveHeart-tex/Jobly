import { cn } from "@/lib/utils";
import type React from "react";

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const PageTitle = ({ children, ...props }: PageTitleProps) => {
  return (
    <h1
      {...props}
      className={cn(
        "scroll-m-20 text-2xl md:text-4xl font-semibold tracking-tight",
        props.className,
      )}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
