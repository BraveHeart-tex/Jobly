import { cn } from "@/lib/utils";
import type React from "react";

type SettingSectionTitleProps = React.ComponentProps<"h3">;

const SettingSectionTitle = ({
  className,
  children,
  ...props
}: SettingSectionTitleProps) => {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export default SettingSectionTitle;
