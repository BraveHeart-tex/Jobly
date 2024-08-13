import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};
const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-2xl mt-8 px-3", className)}>
      {children}
    </div>
  );
};
export default PageContainer;
