import { cn } from "@/src/lib/utils";

interface LoaderIconProps {
  className?: string;
}

const LoaderIcon = ({ className }: LoaderIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-loader-circle animate-spin w-6 h-6", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
export default LoaderIcon;
